import Vue from "vue";
// import App from "./App.vue";
import schedule from "./schedule.vue"
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// import VCalendar from "v-calendar";
// import "v-calendar/lib/v-calendar.min.css";


Vue.config.productionTip = false;

// Vue.use(VCalendar, {
//   componentPrefix: "vc",
// });


new Vue({
  router,
  store,
  vuetify,
  render: h => h(schedule)
}).$mount("#app");
