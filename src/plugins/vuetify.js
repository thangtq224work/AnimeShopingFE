/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

import { VDataTable } from 'vuetify/labs/VDataTable'

export default createVuetify({
  components:{VDataTable},
  theme: {
    defaultTheme: 'light',
    
  },
})

// const myCustomLightTheme = {
//   dark: true,
//   colors: {
//     background: '#2196F3',
//     surface: '#2196F3',
//     primary: '#6200EE',
//     'primary-darken-1': '#2196F3',
//     secondary: '#03DAC6',
//     'secondary-darken-1': '#018786',
//     error: '#B00020',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FB8C00',
//   }
// }

// const myCustomLightTheme2 = {
//   dark: false,
//   colors: {
//     background: '#018786',
//     surface: '#F8F8F8',
//     primary: '#6200EE',
//     'primary-darken-1': '#3700B3',
//     secondary: '#03DAC6',
//     'secondary-darken-1': '#018786',
//     error: '#B00020',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FB8C00',
//   }
// }
// export default createVuetify({
//   theme: {
//     defaultTheme: 'myCustomLightTheme',
//     themes: {
//       myCustomLightTheme,
//       myCustomLightTheme2
//     }
//   },
// })
