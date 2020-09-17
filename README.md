# Lemon IMUI

[中文文档](docs/APIs_zh.md).  
基于 VUE 2.0 的 IM 聊天组件

#### 特性

- 拥有丰富的自定义功能，任意搭配出不同风格的聊天界面
- 可以单独使用内部组件，比如编辑框/按钮/popover 等
- 不依赖任何第三方组件库
- 可任意扩展的聊天消息类型

#### 安装

> npm install lemon-imui -S

#### 使用

```javascript
import LemonIMUI from 'lemon-imui'
import "lemon-imui/dist/index.css";
Vue.use(LemonIMUI)
```

```html
<lemon-imui ref="IMUI" />
```

#### 示例

[lemon-imui-examples](http://june000.gitee.io/lemon-im).
