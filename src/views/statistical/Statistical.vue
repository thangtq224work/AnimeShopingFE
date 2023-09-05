<template>
  <v-container fluid style="padding: 0;">
    <!-- <v-sheet class="ma-5" elevation="4" :rounded="true">
      <v-row>
        <v-col class="h-100 text-center" cols="12" md="4">Doanh thu</v-col>
        <v-col class="h-100 text-center" cols="12" md="4">Lợi nhuận</v-col>
        <v-col class="h-100 text-center" cols="12" md="4">Chi phí</v-col>
      </v-row>
    </v-sheet> -->
    <v-sheet class="ma-5" elevation="4" :rounded="true">
      <v-card id="chart">
        <!-- <v-card-title class="text-center">
        Top sản phẩm bán chạy
      </v-card-title> -->
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <VueApexCharts width="450" type="donut" :options="chartOptions" :series="series"></VueApexCharts>
            </v-col>
            <v-col cols="12" md="6">
              <v-row style="height: 100%;" class="justify-start align-center">
                <div>
                  <v-select v-model="pieParams.top" label="Top sell product" variant="outlined" :items="['3', '5', '7']"
                    class="mb-3"></v-select>
                  <VueDatePicker v-model="pieParams.from" locale="vi" :enable-time-picker="false" :teleport="true"
                    class="mb-3" placeholder="from"></VueDatePicker>
                  <VueDatePicker v-model="pieParams.to" locale="vi" :enable-time-picker="false" :teleport="true"
                    class="mb-3" placeholder="to"></VueDatePicker>
                  <v-btn @click="topSellHandler">
                    Show
                  </v-btn>
                </div>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider thickness="3"></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="3">
              <div>
                <v-select v-model="year" label="Top sell product" variant="outlined" :items="items" @update:model-value="statisticalHandler"
                  class="mb-3"></v-select>
              </div>
            </v-col>
            <v-col cols="12" md="12">
              <apexchart type="area" height="350" :options="lineChartOptions" :series="lineSeries"></apexchart>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-sheet>
  </v-container>
</template>
<script setup>
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts'
import { getTopSellProduct, getTopSellProductV2, statistical } from '@/services/statisticalService'
import { onMounted } from 'vue';
const formData = ref({});
const pieParams = ref({
  top: 3,
  from: null,
  to: null
});
const year = ref(2023);
const yearData = ref([]);
const pieData = ref([]);
const series = ref([]);
const items = ref([
  {
    title: "2023",
    value: 2023
  },
  {
    title: "2022",
    value: 2022
  },
  {
    title: "2021",
    value: 2021
  }
])
const lineSeries = ref([
  // {
  //   name: "Desktops",
  //   data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  // }, {
  //   name: "Laptops",
  //   data: [19, 21, 45, 11, 19, 92, 19, 51, 118]
  // }
])
const lineChartOptions = ref({
  chart: {
    height: 350,
    type: 'area',
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  title: {
    text: 'Profit and expense per Year',
    align: 'center'
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  xaxis: {
    categories: yearData.value,
  }
})
const chartOptions = ref({
  chart: {
    id: 'top__sell__chart',
    type: 'donut',
    width: 100
  },
  dataLabels: {
    enabled: true,
  },
  legend: {
    show: true,
    position: 'bottom',
  },
  title: {
    text: 'Top sell product',
    align: 'left'

  },
  labels: pieData.value,
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
        }
      }
    }
  }
})
const statisticalHandler = async () => {
  await statistical(year.value).then((resp) => {
    if (resp.data.code >= 200 && resp.data.code < 300) {
      const map = build(resp.data.data);
      lineSeries.value = [];
      const profit = {
        name:"Lợi nhuận",
        data:[]
      };
      const expense = {
        name:"Chi phí",
        data:[]
      };
      for (let i = 0; i < 12; i++) {
        yearData.value[i] = `${i >= 9 ? i+1 : `0${i+1}`}/${year.value}`;
        profit.data[i] = map.get(i+1)?.profit || 0;
        expense.data[i] = map.get(i+1)?.expense || 0;
      }
      lineSeries.value.push(profit);
      lineSeries.value.push(expense);

      console.log(map);
    }
  })
}
const build = (data) => {
  const map = new Map();
  data.forEach(i => {
    map.set(i.date, i);
  });
  return map;
}
const topSellHandler = async () => {
  if (pieParams.value.from != null) {
    pieParams.value.from = new Date(pieParams.value.from).getTime();
  }

  if (pieParams.value.to != null) {
    pieParams.value.to = new Date(pieParams.value.to).getTime();
  }
  await topSell();
}
const topSell = async () => {
  await getTopSellProductV2(pieParams.value).then((resp) => {
    if (resp.data.code >= 200 && resp.data.code < 300) {
      const data = resp.data.data;
      series.value = [];
      chartOptions.value.labels = [];
      for (let i = 0; i < data.length; i++) {
        series.value[i] = data[i].quantity;
        pieData.value[i] = data[i].pname;
      }
      const length = pieData.value.length;
      if (length > data.length) {
        pieData.value.splice(data.length, length);
      }
      // series.value = [];
      // chartOptions.value.labels = [];
      // resp.data.data.map(element => {
      //   series.value.push(element.quantity);
      //   chartOptions.value.labels.push(element.name);
      // });
    }
  })

}
onMounted(async () => {
  year.value = new Date().getFullYear();
  await topSell();
  await statisticalHandler();
})
</script>
