<template>
    <v-footer class="mx-md-12" theme="#FCE4EC" color="#FCE4EC">
        <v-row>
            <v-col cols="12" md="4" >
                <v-list bg-color="#FCE4EC">
                    <v-list-subheader class="footer__vList__title">Thông tin</v-list-subheader>
                    <v-list-item>Địa chỉ : Số 1 , Đường Cầu Giấy, Thành Phố Hà Nội</v-list-item>
                    <v-list-item>Khung giờ làm việc : 8h - 20h (Nghỉ CN)</v-list-item>
                </v-list>
            </v-col>
            <v-col cols="12" md="4">
                <v-list bg-color="#FCE4EC">
                    <v-list-subheader class="footer__vList__title">Về chúng tôi</v-list-subheader>
                    <v-list-item href="/">Giới thiêu</v-list-item>
                    <v-list-item href="/">Liên hệ</v-list-item>
                    <v-list-item href="/">Chính sách</v-list-item>
                    <v-list-item href="/">Hướng dẫn</v-list-item>
                </v-list>
            </v-col>
            <v-col cols="12" md="4">
                <v-col cols="12" md="4">
                <v-list bg-color="#FCE4EC">
                    <v-list-subheader class="footer__vList__title">Liên hệ</v-list-subheader>
                    <v-list-item href='https://zalo.me/' target="_blank">Zalo</v-list-item>
                    <v-list-item href="https://www.facebook.com/"  target="_blank">Facebook</v-list-item>
                </v-list>
            </v-col>
        
            </v-col>
        </v-row>
    </v-footer>
</template>
<style>
.footer__vList__title{
    /* font-size: larger; */
    font-size: 20px;
    font-weight: bold;
}
</style>