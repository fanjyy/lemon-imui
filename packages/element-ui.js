import Vue from "vue";

import {
  Button,
  Icon,
  Row,
  Col,
  Container,
  Header,
  Main,
  Aside,
  Loading
} from "element-ui";
Vue.use(Button);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
