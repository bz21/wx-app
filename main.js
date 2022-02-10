import Vue from "vue";
import App from "./App";
import * as filters from "./utils/filters.js"; // global filter
import uView from "uview-ui";
import store from "./store";

import zhCN from './uni_modules/yinrh-i18n/language/zh_CN.js'
import enUS from './uni_modules/yinrh-i18n/language/en_US.js'
import Hant from './uni_modules/yinrh-i18n/language/zh_Hant.js'
import VueI18n from './uni_modules/yinrh-i18n/vue-i18n'

// #ifdef H5
// 在h5页面手动挂载 h5唤醒app插件
// import airBtn from "@/components/m-airbtn/index.vue";
// let btn = Vue.component("airBtn", airBtn); //全局注册
// document.body.appendChild(new btn().$mount().$el);
// #endif


Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

const msg = (title, duration = 1500, mask = false, icon = "none") => {
  //统一提示方便全局修改
  if (Boolean(title) === false) {
    return;
  }
  uni.showToast({
    title,
    duration,
    mask,
    icon,
  });
};
// 引入vuex
Vue.prototype.$store = store;
Vue.use(uView);
Vue.config.productionTip = false;
// 主题色
Vue.prototype.$mainColor = "#ff3c2a";
// 高亮主题色
Vue.prototype.$lightColor = "#ff6b35";
// 可直接 this.$api调用
Vue.prototype.$api = { msg };

App.mpType = "app";

Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'zhCN',
    messages: {
        'enUS': enUS,
        'zhCN': zhCN,
		'Hant': Hant,
    }
});
Vue.prototype.$_i18n = i18n;

/**
 * 创建全局调用多语言的方法
 * @param {Object} context ‘.’连接多个值
 */
Vue.prototype.$language = function(context) {
	let _msg = this.$_i18n.messages,
		_loc = this.$_i18n.locale;
	let result = _msg[_loc];
	context.split('.').forEach((key) => {
		result = result[key];
	});
	return result;
}
/************************* end *************************/

const app = new Vue({
  ...App,
});
app.$mount();
