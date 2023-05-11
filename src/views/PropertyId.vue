<template>
    <v-card>
        <VRow>
            <v-table fixed-header hover density="comfortable" class="custom-table" loading
          loading-text="Loading... Please wait">
          <thead>
            <tr>
              <th class="text-center">
                #
              </th>
              <th class="text-center">
                Name
              </th>
              <th class="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in propertie?.data" :key="item.name">
              <td class="text-center">{{ item.id }}</td>
              <td class="text-center">{{ item.name }}</td>
              <td class="text-center">
                <v-icon class="btn_icon" size="small" @click="editItem(item.id)">
                  mdi-pencil
                </v-icon>
                <!-- <v-icon class="btn_icon" size="small" @click="deleteItem(item.id)">
                  mdi-delete
                </v-icon> -->
                <v-icon class="btn_icon" size="small" @click="infor(item.id)">
                  mdi-format-horizontal-align-right
                </v-icon>
              </td>

            </tr>
          </tbody>
        </v-table>
        </VRow>
    </v-card>
</template>
<script setup>
    
</script>