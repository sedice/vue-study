import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'

import './assets/main.css'
import 'ant-design-vue/dist/antd.css'

import { createApp } from 'vue'
import App from './App.vue'

import './classDecorator'

const app = createApp(App)

app.mount('#app')
