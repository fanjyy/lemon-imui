import "./styles/common/index.scss";
import "./element-ui";
import Lemon from "./components/lemon";
const version = "0.1";
const components = [Lemon];
const install = (Vue, opts = {}) => {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  version,
  install
};
