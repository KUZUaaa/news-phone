import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/index.less'
import 'amfe-flexible'
import './utils/dayjs'
import i18n from './utils/vueIn'
import { getItem } from '@/utils/storage'
import { Locale } from 'vant';
import enUS from 'vant/es/locale/lang/en-US';
import zhCN from 'vant/lib/locale/lang/zh-CN'

Vue.use(Vant)

Vue.config.productionTip = false

i18n.locale = getItem('LANGUAGE')
if (getItem('LANGUAGE') == 'zh') {
    Locale.use('zh-CN', zhCN)
} else {
    Locale.use('en-US', enUS)
}


new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')