<template>
    <v-container>
        <v-dialog v-model="dialog">
            <v-form @submit.prevent>
                <v-card>
                    <v-col cols="12" md="6">
                        <v-select label="Category" v-model="category" multiple="" :items="categories" item-title="name" item-value="id"></v-select>
                    </v-col>
                    {{ category }}
                    <v-btn block class="mt-2">Submit</v-btn>
                </v-card>
            </v-form>
        </v-dialog>
    </v-container>
    <!-- <v-dialog v-model="dialog" max-width="800px">
        <v-card>
            <v-card-title>
                <span class="text-h5">{ formTitle }</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Category name"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog> -->
</template>
<script>
export default {
    data: () => ({
        dialog: true,
        firstName: '',
        category:null,
        categories: [
            {
                "id": 1,
                "name": "Onepeace"
            },
            {
                "id": 2,
                "name": "Naruto"
            },
            {
                "id": 3,
                "name": "Dragon ball"
            }
        ],
        rules: [
            value => {
                if (value) return true

                return 'You must enter a first name.'
            },
        ],
    }),
}
</script>