<template>
    <v-app>
        <v-app-bar>
            <v-toolbar-title>
                Logo
            </v-toolbar-title>
            <!-- <v-spacer/> -->
            <v-list class="d-flex align-center">
                <v-list-item>Home</v-list-item>
                <v-list-item>Review</v-list-item>
                <v-list-item>Product</v-list-item>
                <v-list-item>About me</v-list-item>
                <v-list-item :to='{name:"dashboard"}'>Manager</v-list-item>
            </v-list>
        </v-app-bar>
        <v-main>
            <v-container>
                <v-row>
                    <v-col lg="6">

                    </v-col>
                    <v-col lg="6">
                        
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>