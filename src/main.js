
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import JsBarcode  from 'jsbarcode'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

axios.defaults.baseURL = 'http://127.0.0.1:10888'

const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        },
      },

  })

app.use(router)
app.use(vuetify)
app.use(store)

app.config.globalProperties.$axios = axios;
app.config.globalProperties.JsBarcode = JsBarcode;

app.mount('#app')
