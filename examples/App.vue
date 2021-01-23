<template>
  <div id="app">
    <div class="scroll-top" @click="scrollToTop">🚀</div>
    <div class="logo">
      <div class="logo-text"><b>Lemon</b> IMUI<span class="logo-badge">{{this.packageData.version}}</span></div>
      <div class="logo-sub">{{this.packageData.description}}</div>
      <div class="link"><span>源码下载&nbsp;&nbsp;</span><a target="_blank" href="https://github.com/fanjyy/lemon-imui">Github</a><a target="_blank" href="https://gitee.com/june000/lemon-im">Gitee</a></div>
    </div>
    <div class="imui-center">
      <lemon-imui
        :user="user"
        ref="IMUI"
        :theme="theme"
        :hide-menu="hideMenu"
        :hide-menu-avatar="hideMenuAvatar"
        :hide-message-name="hideMessageName"
        :hide-message-time="hideMessageTime"
        @change-menu="handleChangeMenu"
        @change-contact="handleChangeContact"
        @pull-messages="handlePullMessages"
        @message-click="handleMessageClick"
        @menu-avatar-click="handleMenuAvatarClick"
        @send="handleSend"
      >
        <template #message-title="contact">
          <span>{{ contact.displayName }}</span>
          <small class="more" @click="changeDrawer(contact,$refs.IMUI)">{{($refs.IMUI ? $refs.IMUI.drawerVisible : false) ? '关闭' : '打开'}}抽屉</small>
        </template>
      </lemon-imui>
      <a target="_blank" style="font-size:14px" href="https://codesandbox.io/s/sweet-chaplygin-s24mb?fontsize=14&hidenavigation=1&theme=dark">在线编辑代码</a>
      <div class="action">
        <lemon-button @click="appendMessage">发送消息</lemon-button>
        <lemon-button @click="appendCustomMessage">发送一条自定义消息</lemon-button>
        <a href="#help">如何创建自定义消息？</a>
        <br/>
        <lemon-button @click="updateContact">修改联系人信息</lemon-button>
        <lemon-button @click="changeMenuVisible">切换导航显示</lemon-button>
        <lemon-button @click="changeMenuAvatarVisible"
          >切换头像显示</lemon-button
        >
        <lemon-button @click="appendMessage">发送消息</lemon-button>
        <lemon-button @click="changeMessageNameVisible">切换聊天窗口内名字显示</lemon-button>
        <lemon-button @click="changeMessageTimeVisible">切换聊天窗口内时间显示</lemon-button>
        <lemon-button @click="changeTheme">切换主题，当前主题：{{this.theme}}</lemon-button>
      </div>

    </div>

    <div style="display:flex;">
    <div>
    <div class="title">插槽演示</div>
    <div class="imui-center">
      <lemon-imui
        :user="user"
        class="lemon-slot"
        ref="SlotIMUI"
        @pull-messages="handlePullMessages"
        @message-click="handleMessageClick"
        @change-contact="handleChangeContact"
        @send="handleSend"
      >
        <template #cover>
          <div class="cover">
            <i class="lemon-icon-message"></i>
            <p><b>自定义封面 Lemon</b> IMUI</p>
          </div>
        </template>
        <template #message-title="contact">
          <span>{{ contact.displayName }}</span>
          <small class="more" @click="changeDrawer(contact,$refs.SlotIMUI)">{{($refs.SlotIMUI ? $refs.SlotIMUI.drawerVisible : false) ? '关闭' : '打开'}}抽屉</small>
        </template>
        <template #contact-info="contact">
          自定义联系人信息 {{ contact.displayName }}
        </template>
        <template #sidebar-message="contact">
          <lemon-badge :count="contact.unread" style="width:100%">
          <div>
            <p><span>{{ contact.displayName }}</span></p>
            <p class="lemon-contact__content" style="height:18px;font-size:12px;color:#aaa;">最新消息：<span v-html="contact.lastContent"></span></p>
          </div>
          </lemon-badge>
        </template>
        <template #sidebar-contact="contact">
          <span>{{ contact.displayName }}</span>
        </template>
        <template #sidebar-message-top>
          <div class="bar">自定义消息顶部</div>
        </template>
        <template #sidebar-contact-top>
          <div class="bar">自定义联系人顶部</div>
        </template>
      </lemon-imui>
    </div>
   
    </div>

    <div style="margin:0 55px;">
    <div class="title">精简模式</div>
    <div class="imui-center">
      <lemon-imui
        class="lemon-simple"
        :user="user"
        ref="SimpleIMUI"
        width="340px"
        simple
        @pull-messages="handlePullMessages"
        @message-click="handleMessageClick"
        @send="handleSend"
      ></lemon-imui>
      <a target="_blank" style="font-size:14px" href="https://codesandbox.io/s/lemon-imui-jingjianmoshi-forked-1lvoh?fontsize=14&hidenavigation=1&theme=dark">在线编辑代码</a>
    </div>
    </div>
    </div>

      <div class="title">联系人 Contact</div>
      <table class="table">
        <tr class="table-head">
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
          <th>默认值</th>
          <th>示例</th>
        </tr>
        <tr>
          <td width="150">id</td>
          <td width="350">唯一ID</td>
          <td width="150">String/Number</td>
          <td width="100">-</td>
          <td></td>
        </tr>
        <tr>
          <td>displayName</td>
          <td>名称</td>
          <td>String</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
        <tr>          
          <td>avatar</td>
          <td>头像</td>
          <td>String</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>index</td>
          <td>通讯录索引，传入字母或数字进行排序，索引可以显示自定义文字“[1]群组”</td>
          <td>String</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>unread</td>
          <td>未读消息数</td>
          <td>Number</td>
          <td>0</td>
          <td></td>
        </tr>
        <tr>
          <td>lastSendTime</td>
          <td>最近一条消息的时间戳，13位毫秒</td>
          <td>timestamp</td>
          <td>0</td>
          <td></td>
        </tr>
        <tr>
          <td>lastSendTime</td>
          <td>最近一条消息的内容</td>
          <td>String | Vnode</td>
          <td></td>
          <td></td>
        </tr>
      </table>

      <div class="title">消息体 Message</div>
      <table class="table">
        <tr class="table-head">
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
          <th>默认值</th>
          <th>示例</th>
        </tr>
        <tr>
          <td width="150">id</td>
          <td width="350">唯一ID</td>
          <td width="150">String/Number</td>
          <td width="100">-</td>
          <td></td>
        </tr>
        <tr>
          <td>status</td>
          <td>消息发送的状态：going | failed | succeed</td>
          <td>String</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
        <tr>          
          <td>type</td>
          <td>消息类型：file | image | text</td>
          <td>String</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>sendTime</td>
          <td>消息发送时间，13位毫秒</td>
          <td>timestamp</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>content</td>
          <td>消息内容，如果type=file，此属性表示文件的URL地址</td>
          <td>String</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>fileSize</td>
          <td>文件大小</td>
          <td>Number</td>
          <td>0</td>
          <td></td>
        </tr>
        <tr>
          <td>fileName</td>
          <td>文件名称</td>
          <td>String</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>toContactId</td>
          <td>接收消息的联系人ID</td>
          <td>String | Number</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>fromUser</td>
          <td>消息发送人的信息</td>
          <td>Object</td>
          <td>-</td>
          <td>{id: "1",displayName: "测试",avatar: "url"};</td>
        </tr>
      </table>

      <div class="title">组件属性</div>
      <table class="table">
        <tr class="table-head">
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
          <th>默认值</th>
          <th>示例</th>
        </tr>
        <tr>
          <td width="150">user</td>
          <td width="350">用户信息</td>
          <td width="150">Object</td>
          <td width="100">-</td>
          <td>{id: "1",displayName: "测试",avatar: "url"};</td>
        </tr>
        <tr>
          <td width="150">width</td>
          <td width="350">宽度</td>
          <td width="150">String</td>
          <td width="100">850px</td>
          <td></td>
        </tr>
        <tr>
          <td width="150">height</td>
          <td width="350">高度</td>
          <td width="150">String</td>
          <td width="100">580px</td>
          <td></td>
        </tr>
        <tr>
          <td width="150">theme</td>
          <td width="350">主题</td>
          <td width="150">default | blue</td>
          <td width="100">default</td>
          <td>主题颜色</td>
        </tr>
        <tr>
          <td width="150">simple</td>
          <td width="350">精简模式</td>
          <td width="150">Boolean</td>
          <td width="100">false</td>
          <td>精简模式下左侧的导航和联系人列表会隐藏，初始化时需要手动调用 changeContact 切换到聊天视图。</td>
        </tr>
        <tr>
          <td>messageTimeFormat</td>
          <td>消息列表时间格式化函数</td>
          <td>Function(time)=>String</td>
          <td>-</td>
          <td>
          </td>
        </tr>
        <tr>
          <td>contactTimeFormat</td>
          <td>联系人时间格式化规则</td>
          <td>Function(time)=>String</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>hideDrawer</td>
          <td>是否隐藏抽屉</td>
          <td>Boolean</td>
          <td>true</td>
          <td></td>
        </tr>
        <tr>
          <td>hideMenuAvatar</td>
          <td>是否隐藏导航头像</td>
          <td>Boolean</td>
          <td>false</td>
          <td></td>
        </tr>
        <tr>
          <td>hideMenu</td>
          <td>是否隐藏左侧导航</td>
          <td>Boolean</td>
          <td>false</td>
          <td></td>
        </tr>
        <tr>
          <td>hideMessageName</td>
          <td>是否隐藏聊天窗口内的联系人名字</td>
          <td>Boolean</td>
          <td>false</td>
          <td></td>
        </tr>
        <tr>
          <td>hideMessageTime</td>
          <td>是否隐藏聊天窗口内的消息发送时间</td>
          <td>Boolean</td>
          <td>false</td>
          <td></td>
        </tr>
      </table>

      <div class="title">组件方法</div>
      <table class="table">
        <tr class="table-head">
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
          <th>默认值</th>
          <th>示例</th>
        </tr>
        <tr>
          <td width="150">initMenus</td>
          <td width="350">初始化导航</td>
          <td width="150">Function([Object])</td>
          <td width="100">[      {
        name: "messages"
      },
      {
        name: "contacts"
      }]</td>
          <td>      {
        name: "custom2",
        title: "自定义按钮2",
        unread: 0,
        click: () => {
          alert("拦截导航点击事件");
        },
        render: menu => {
          return '...';
        },
        isBottom: true
      }</td>
        </tr>
        <tr>
          <td>initContacts</td>
          <td>初始化联系人</td>
          <td>Function([Contact])</td>
          <td>-</td>
          <td>

          </td>
        </tr>
        
        <tr>
          <td>initEditorTools</td>
          <td>初始化工具栏</td>
          <td>Function([Object])</td>
          <td>[{name:'emoji'},{name:'uploadFile'},{name:'uploadImage'}]</td>
          <td>[{
        name:"test2",
        isRight:true,
        title:'上传 Excel',
        click:()=>{
          alert('点击')
        },
        render:()=>{
          return  '...'
        }
      }]</td>
        </tr>
        <tr>
          <td>initEmoji</td>
          <td>初始化表情数据</td>
          <td>Function([Object])</td>
          <td>-</td>
          <td>
            <div>
              有分类：[{
                label: '默认表情',
                children: [
                  {
                    name: '1f62c',
                    title: '微笑',
                    src: 'https://twemoji.maxcdn.com/2/72x72/1f62c.png'
                  }
                ]
              }]
            </div>
            <div>
              无分类：[{
                name: '1f62c',
                title: '微笑',
                src: 'https://twemoji.maxcdn.com/2/72x72/1f62c.png'
              }]
            </div>
          </td>
        </tr>
        <tr>
          <td>appendMessage</td>
          <td>新增一条新消息, 如果当前焦点在该联系人的聊天窗口，设置 scrollToBottom=true 添加之后自动定位到消息窗口底部</td>
          <td>Function(Message,scrollToBottom=false)</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>removeMessage</td>
          <td>删除聊天消息</td>
          <td>Function(Message.id,Contact.id)</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>updateMessage</td>
          <td>修改一条消息</td>
          <td>Function(Message.id,Contact.id,Message)</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>updateMessage</td>
          <td>修改联系人</td>
          <td>Function(Contact.id,Contact)</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>getMessages</td>
          <td>返回所有本地消息，传入 Contact.id 则只返回与该联系人的消息</td>
          <td>Function(Contact.id)=>[Message]</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>getContacts</td>
          <td>返回所有本地联系人</td>
          <td>Function()=>[Contact]</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>openDrawer</td>
          <td>打开联系人右侧抽屉，vnode 为抽屉内容</td>
          <td>Function(vnode)</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>changeDrawer</td>
          <td>切换右侧抽屉显示/隐藏，vnode 为抽屉内容</td>
          <td>Function(vnode)</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>closeDrawer</td>
          <td>关闭抽屉</td>
          <td>Function()</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>changeMenu</td>
          <td>切换左侧导航</td>
          <td>Function(Menu.name)</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>changeContact</td>
          <td>切换聊天窗口</td>
          <td>Function(Contact.id,instance)</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>messageViewToBottom</td>
          <td>将当前聊天窗口滚动到底部</td>
          <td>Function()</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>setLastContentRender</td>
          <td>设置左侧联系人最新消息的渲染函数</td>
          <td>Function(Message.type, (Message)=>vnode)</td>
          <td>-</td>
          <td>
            setLastContentRender('image', message => {
              return <span>[最新图片]</span>
            })
          </td>
        </tr>
        <tr>
          <td>lastContentRender</td>
          <td>用来生成 Message.lastContent 需要的vnode结构。</td>
          <td>Function(Message)</td>
          <td>-</td>
          <td></td>
        </tr>
      </table>

      <div class="title">组件插槽</div>
      <table class="table">
        <tr class="table-head">
          <th>插槽名</th>
          <th>说明</th>
          <th>参数</th>
        </tr>
        <tr>
          <td width="150">cover</td>
          <td width="350">初始化时的封面</td>
          <td width="150">-</td>
        </tr>
        <tr>
          <td width="150">message-title</td>
          <td width="350">消息列表的标题</td>
          <td width="150">Contact</td>
        </tr>
        <tr>
          <td width="150">sidebar-message</td>
          <td width="350">左侧最新消息列表插槽</td>
          <td width="150">Contact</td>
        </tr>
        <tr>
          <td width="150">sidebar-contact</td>
          <td width="350">左侧联系人列表插槽</td>
          <td width="150">Contact</td>
        </tr>
        <tr>
          <td width="150">sidebar-message-top</td>
          <td width="350">左侧最新消息列表的顶部</td>
          <td width="150">-</td>
        </tr>
        <tr>
          <td width="150">sidebar-contact-top</td>
          <td width="350">左侧联系人列表的顶部</td>
          <td width="150">-</td>
        </tr>
        <tr>
          <td width="150">contact-info</td>
          <td width="350">左侧联系人详细页</td>
          <td width="150">Contact</td>
        </tr>
      </table>

      <div class="title">组件事件</div>
      <table class="table">
        <tr class="table-head">
          <th>事件名</th>
          <th>说明</th>
          <th>参数</th>
        </tr>
        <tr>
          <td width="150">change-menu</td>
          <td width="350">当左侧导航选项卡切换的时候会触发该事件</td>
          <td width="150">Menu.name</td>
        </tr>
        <tr>
          <td width="150">menu-avatar-click</td>
          <td width="350">当左侧导航内的头像被点击时回触发该事件</td>
          <td width="150">Contact</td>
        </tr>
        <tr>
          <td width="150">change-contact</td>
          <td width="350">当左侧联系人点击时会触发该事件</td>
          <td width="150">Contact</td>
        </tr>
        <tr>
          <td width="150">pull-messages</td>
          <td width="350">当切换聊天对象或者聊天窗口滚动到顶部时会触发该事件，调用next方法结束loading状态，如果设置了isEnd=true，下次聊天窗口滚动到顶部将不会再触发该事件</td>
          <td width="150">Contact,next([Message],isEnd),instance</td>
        </tr>
        <tr>
          <td width="150">message-click</td>
          <td width="350">点击聊天窗口中的消息时会触发该事件</td>
          <td width="150">event,key,Message,instance</td>
        </tr>
        <tr>
          <td width="150">send</td>
          <td width="350">当发送一条新消息时会触发该事件</td>
          <td width="150">Message,Function(Message)：调用该函数完成消息发送，可以传入Message来改变消息内容，file：上传时的文件</td>
        </tr>
      </table>

      <div class="title" id="help">如何创建自定义消息？</div>
      <div>
        <p>Lemon-IMUI 目前内置了file、image、text三种消息类型，在实际应用当中肯定是不够的哦，咋办？没事的，我们继续往下see。<br/>要创建自定义消息首先要确定新消息的 Message 结构。</p>
        <pre>
{
  //值为 voice，用于解析的组件 name 必须为 lemonMessageVoice
  type: "voice",
  content: '语音消息',
  //自定义参数
  params1:'参数1',
  params2:'参数2',
  //必传参数
  id: "message-id",
  //必传参数
  fromUser:{
    avatar: ""
    displayName: "June"
    id: "1"
  },
  //必传参数
  sendTime: 1610872045162
  //必传参数
  status: "succeed"
  //必传参数
  toContactId: "contact-id"
}
        </pre>
        <p>创建用于解析该消息的组件。</p>
        <pre>{{tip}}</pre>
        <p>IMUI初始化的时候，设置左侧联系人最新消息的渲染内容</p>
<pre>
IMUI.setLastContentRender('voice', message => {
  return &lt;span&gt;[语音]&lt;/span&gt;
})
</pre>
        <p>最后一步，注册组件，必须使用全局注册的方式。</p>
<pre>
import Vue from 'vue';
import LemonMessageVoice from './lemon-message-voice';
Vue.component(LemonMessageVoice.name,LemonMessageVoice);
</pre>
      <p>如果还有不明白的，可以到 examples/App.vue 查看示例代码</p>
      </div>

    
  </div>
</template>

<script>
import Vue from 'vue';
import LemonMessageVoice from './lemon-message-voice';
import packageData from '../package.json';
Vue.component(LemonMessageVoice.name,LemonMessageVoice);

const tip = `export default {
  //组件的name必须以lemonMessage开头，后面跟上 Message.type
  name: "lemonMessageVoice",
  inheritAttrs: false,
  //如果需要使用父组件的方法，可以使用注入。
  inject: ["IMUI"],
  render() {
    //lemon-message-basic 组件对气泡框、头像、事件等信息进行了公共的处理。
    return (
      <lemon-message-basic
        class="lemon-message-voice"
        props={{ ...this.$attrs }}
        scopedSlots={{
          content: props => {
            //返回HTML结构
            return <span>{props.content}&nbsp;🔈</span>
          }
        }}
      />
    );
  }
};
<style lang="stylus">
.lemon-message.lemon-message-voice
  user-select none
  .lemon-message__content
    border 2px solid #000
    font-size 12px
    cursor pointer
    &::before
      display none
</style>`;
const getTime = () => {
  return new Date().getTime();
};
const generateRandId = () => {
  return Math.random()
    .toString(36)
    .substr(-8);
};
const generateRandWord = () => {
  return Math.random()
    .toString(36)
    .substr(2);
};
const generateMessage = (toContactId = "", fromUser) => {
  if (!fromUser) {
    fromUser = {
      id: "system",
      displayName: "系统测试",
      avatar: "http://upload.qqbodys.com/allimg/1710/1035512943-0.jpg"
    };
  }
  return {
    id: generateRandId(),
    status: "succeed",
    type: "text",
    sendTime: getTime(),
    content: generateRandWord(),
    //fileSize: 1231,
    //fileName: "asdasd.doc",
    toContactId,
    fromUser
  };
};

export default {
  name: "app",
  data() {
    return {
      theme:'default',
      tip:tip,
      packageData,
      hideMenuAvatar: false,
      hideMenu: false,
      hideMessageName:false,
      hideMessageTime:true,
      user: {
        id: "1",
        displayName: "June",
        avatar:""
      }
    };
  },
  mounted() {

    const contactData1 = {
      id: "contact-1",
      displayName: "工作协作群",
      avatar: "http://upload.qqbodys.com/img/weixin/20170804/ji5qxg1am5ztm.jpg",
      index: "[1]群组",
      unread: 0,
      lastSendTime: 1566047865417,
      lastContent: "2"
    };
    const contactData2 = {
      id: "contact-2",
      displayName: "自定义内容",
      avatar: "http://upload.qqbodys.com/img/weixin/20170807/jibfvfd00npin.jpg",
      //index: "Z",
      click(next) {
        next();
      },
      renderContainer: () => {
        return <h1 style="text-indent:20px">自定义页面</h1>;
      },
      lastSendTime: 1345209465000,
      lastContent: "12312",
      unread: 2
    };
    const contactData3 = {
      id: "contact-3",
      displayName: "铁牛",
      avatar: "http://upload.qqbodys.com/img/weixin/20170803/jiq4nzrkrnd0e.jpg",
      index: "T",
      unread: 32,
      lastSendTime: 3,
      lastContent: "你好123"
    };
    const contactData4 = {
      id: "contact-4",
      displayName: "如花",
      avatar: "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4275424924,2201401076&fm=111&gp=0.jpg",
      index: "R",
      unread: 1,
      lastSendTime: 3,
      lastContent: "吃饭了嘛"
    };

    const { IMUI } = this.$refs;
    
    let contactList = [
      { ...contactData1 },
      { ...contactData2 },
      { ...contactData3 }
      //...Array(100).fill(contactData1)
    ];

    IMUI.initContacts(contactList);
    IMUI.initMenus([
      {
        name: "messages"
      },
      {
        name: "contacts"
      },
      {
        name: "custom1",
        title: "自定义按钮1",
        unread: 0,
        render: menu => {
          return <i class="lemon-icon-attah" />;
        },
        renderContainer: () => {
          return (
            <div class="article">
              <ul>
                <li class="article-item">
                  <h2>人民日报谈网红带货：产品真的值得买吗？</h2>
                </li>
                <li class="article-item">
                  甘肃夏河县发生5.7级地震 暂未接到人员伤亡报告
                </li>
                <li class="article-item">
                  北方多地风力仍强沙尘相伴,东北内蒙古等地迎雨雪
                </li>
                <li class="article-item">
                  英货车案：越南警方采集疑死者家属DNA作比对
                </li>
                <li class="article-item">
                  知名连锁咖啡店的蛋糕吃出活虫 曝光内幕太震惊
                </li>
              </ul>
              <lemon-contact
                props={{ contact: contactData1 }}
                style="margin:20px"
              />
              <lemon-contact
                props={{ contact: contactData3 }}
                style="margin:20px"
              />
            </div>
          );
        },
        isBottom: true
      },
      {
        name: "custom2",
        title: "自定义按钮2",
        unread: 0,
        click: () => {
          alert("拦截导航点击事件");
        },
        render: menu => {
          return <i class="lemon-icon-group" />;
        },
        isBottom: true
      }
    ]);

    IMUI.initEditorTools([
      {
        name:'emoji',
      },
      {
        name:'uploadFile',
      },
      {
        name:'uploadImage',
      },
      {
        name:"test1",
        click:()=>{
          IMUI.$refs.editor.selectFile("application/vnd.ms-excel")
        },
        render:()=>{
          return <span>Excel</span>
        }
      },
      {
        name:"test1",
        click:()=>{
          IMUI.initEditorTools([
            {name:'uploadFile'},
            {name:'emoji'}
          ]);
        },
        render:()=>{
          return <span>重制工具栏</span>
        }
      },
      {
        name:"test2",
        isRight:true,
        title:'上传 Excel',
        click:()=>{
          alert('点击了 ··· ')
        },
        render:()=>{
          return <b>···</b>
        }
      },
    ]);
    let emojiData = [
      {
        label: "表情",
        children: [
          {
            name: "1f600",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f600.png"
          },
          {
            name: "1f62c",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f62c.png"
          },
          {
            name: "1f601",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f601.png"
          },
          {
            name: "1f602",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f602.png"
          },
          {
            name: "1f923",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f923.png"
          },
          {
            name: "1f973",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f973.png"
          },
          {
            name: "1f603",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f603.png"
          },
          {
            name: "1f604",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f604.png"
          },
          {
            name: "1f605",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f605.png"
          },
          {
            name: "1f606",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f606.png"
          },
          {
            name: "1f607",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f607.png"
          },
          {
            name: "1f609",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f609.png"
          },
          {
            name: "1f60a",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f60a.png"
          },
          {
            name: "1f642",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f642.png"
          },
          {
            name: "1f643",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f643.png"
          },
          {
            name: "1263a",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/263a.png"
          },
          {
            name: "1f60b",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f60b.png"
          },
          {
            name: "1f60c",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f60c.png"
          },
          {
            name: "1f60d",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f60d.png"
          },
          {
            name: "1f970",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f970.png"
          },
          {
            name: "1f618",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f618.png"
          },
          {
            name: "1f617",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f617.png"
          },
          {
            name: "1f619",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f619.png"
          },
          {
            name: "1f61a",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f61a.png"
          },
          {
            name: "1f61c",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f61c.png"
          },
          {
            name: "1f92a",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f92a.png"
          },
          {
            name: "1f928",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f928.png"
          },
          {
            name: "1f9d0",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f9d0.png"
          },
          {
            name: "1f61d",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f61d.png"
          },
          {
            name: "1f61b",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f61b.png"
          },
          {
            name: "1f911",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f911.png"
          },
          {
            name: "1f913",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f913.png"
          },
          {
            name: "1f60e",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f60e.png"
          },
          {
            name: "1f929",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f929.png"
          },
          {
            name: "1f921",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f921.png"
          },
          {
            name: "1f920",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f920.png"
          },
          {
            name: "1f917",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f917.png"
          },
          {
            name: "1f60f",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f60f.png"
          },
          {
            name: "1f636",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f636.png"
          },
          {
            name: "1f610",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f610.png"
          },
          {
            name: "1f611",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f611.png"
          },
          {
            name: "1f612",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f612.png"
          },
          {
            name: "1f644",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f644.png"
          },
          {
            name: "1f914",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f914.png"
          },
          {
            name: "1f925",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f925.png"
          },
          {
            name: "1f92d",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f92d.png"
          },
          {
            name: "1f92b",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f92b.png"
          },
          {
            name: "1f92c",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f92c.png"
          },
          {
            name: "1f92f",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f92f.png"
          },
          {
            name: "1f633",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f633.png"
          },
          {
            name: "1f61e",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f61e.png"
          },
          {
            name: "1f61f",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f61f.png"
          },
          {
            name: "1f620",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f620.png"
          },
          {
            name: "1f621",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f621.png"
          }
        ]
      },
      {
        label: "收藏",
        children: [
          {
            name: "1f62c",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f62c.png"
          },
          {
            name: "1f621",
            title: "微笑",
            src: "https://twemoji.maxcdn.com/2/72x72/1f621.png"
          }
        ]
      }
    ];
    IMUI.initEmoji(emojiData);

    IMUI.setLastContentRender('voice', message => {
      return <span>[语音]</span>
    })



    const { SimpleIMUI } = this.$refs;
    contactData1.id = '11';
    SimpleIMUI.initContacts([contactData1]);
    SimpleIMUI.initEmoji(emojiData);
    SimpleIMUI.changeContact(contactData1.id);

    const {SlotIMUI} = this.$refs;
    contactData3.id = '333';
    SlotIMUI.initContacts([contactData4,contactData3]);
    SlotIMUI.initEmoji(emojiData);
  },
  methods: {
    changeTheme(){
      this.theme = this.theme == 'default' ? 'blue' : 'default';
    },
    scrollToTop(){
      document.body.scrollIntoView();
    },
    handleMenuAvatarClick() {
      console.log("Event:menu-avatar-click");
    },
    handleMessageClick(e, key, message,instance) {
      console.log('点击了消息',e, key, message);

      if (key == "status") {
        instance.updateMessage(message.id, message.toContactId, {
          status: "going",
          content: "正在重新发送消息..."
        });
        setTimeout(() => {
          instance.updateMessage(message.id, message.toContactId, {
            status: "succeed",
            content: "发送成功"
          });
        }, 2000);
      }
    },
    changeMenuAvatarVisible() {
      this.hideMenuAvatar = !this.hideMenuAvatar;
    },
    changeMenuVisible() {
      this.hideMenu = !this.hideMenu;
    },
    changeMessageNameVisible(){
      this.hideMessageName = !this.hideMessageName;
    },
    changeMessageTimeVisible(){
      this.hideMessageTime = !this.hideMessageTime;
    },
    appendCustomMessage(){
      const { IMUI } = this.$refs;
      const message ={
        id: generateRandId(),
        status: "succeed",
        type: "voice",
        sendTime: getTime(),
        content: '语音消息',
        params1:'1',
        params2:'2',
        toContactId:'contact-1',
        fromUser:this.user
      };
      IMUI.appendMessage(message,true);
    },
    appendMessage() {
      const { IMUI } = this.$refs;
      const contact = IMUI.currentContact;
      const message = generateMessage('contact-3');
      message.fromUser = {
        ...message.fromUser,
        ...this.user
      };
      IMUI.appendMessage(message,true);
    },
    updateContact() {
      this.$refs.IMUI.updateContact("contact-3", {
        unread: 10,
        displayName: generateRandWord(),
        lastSendTime: getTime(),
        lastContent: "修改昵称为随机字母"
      });
    },
    changeDrawer(contact,instance) {
      instance.changeDrawer(() => {
        return (
          <div class="drawer-content">
            <p>
              <b>自定义抽屉</b>
            </p>
            <p>{contact.displayName}</p>
          </div>
        );
      });
    },
    handleChangeContact(contact,instance) {
      console.log("Event:change-contact");
      instance.updateContact(contact.id, {
        //displayName: "123",
        unread: 0
      });
      instance.closeDrawer();
    },
    handleSend(message, next, file) {
      console.log(message,next,file)
      setTimeout(() => {
        next();
      }, 1000);
    },
    handlePullMessages(contact, next,instance) {
      const otheruser = {
        id: contact.id,
        displayName: contact.displayName,
        avatar:contact.avatar
      };
      setTimeout(()=>{

        const messages = [
          generateMessage(instance.currentContactId, this.user),
          generateMessage(instance.currentContactId, otheruser),
          generateMessage(instance.currentContactId, this.user),
          generateMessage(instance.currentContactId, otheruser),
          generateMessage(instance.currentContactId, this.user),
          generateMessage(instance.currentContactId, this.user),
          generateMessage(instance.currentContactId, otheruser),
          {
            ...generateMessage(instance.currentContactId, this.user),
            ...{ status: "failed" }
          }
        ];
        let isEnd = false;
        if (instance.getMessages(instance.currentContactId).length + messages.length > 11) isEnd = true;
        next(messages, isEnd);
      },500)
    },
    handleChangeMenu() {
      console.log("Event:change-menu");
    },
    openCustomContainer() {}
  }
};
</script>

<style lang="stylus">
::selection{background:#000;color:#fff;}
body
  background #f6f6f6 !important
#app
  width 90%
  margin 0 auto
  padding-bottom 100px
  .scroll-top
    cursor pointer
    position fixed
    bottom 40px
    left 50%
    border-radius 50%
    background #fff
    font-size 18px
    overflow hidden
    width 40px
    height 40px
    line-height 40px
    user-select none
    text-align center
    transform rotate(-45deg) translateX(-50%)
    box-shadow 0 0 30px rgba(0,0,0,0.1);
    &:hover
      font-size 22px
a
  color #0c5ed9
  text-decoration none
  font-size 12px
.action
  margin-top 20px
  .lemon-button
    margin-right 10px
    margin-bottom 10px
.link
  font-size 14px
  margin-top 15px
  a
    display inline-block
    margin 0 5px
    text-decoration none
    background #ffba00
    border-radius 4px
    padding 5px 10px
    color rgba(0,0,0,0.8)
.logo
  position relative
  display inline-block
  margin 60px auto
  user-select none
.logo-text
  font-size 38px
.logo-sub
  font-size 18px
  color #999
  font-weight 300
.logo-badge
  position absolute
  top -10px
  right -40px
  background #000
  border-radius 16px
  color #f9f9f9
  font-size 12px
  padding 4px 8px
.title
  font-size 24px
  line-height 26px
  border-left 1px solid #ffba00
  padding-left 15px
  margin-bottom 15px
  margin-top 30px
  user-select none
.table
  width 100%
  border-radius 10px
  background #fff
  border-collapse collapse
  tr
    cursor pointer
  tr:not(.table-head):hover
    background #ffba00 !important
  tr:nth-of-type(even)
    background #f9f9f9 
  th
    user-select none
    color #999
  td,
  th
    text-align left
    padding 10px 15px
    font-size 14px
    font-weight normal
.imui-center
  margin-bottom 60px
  .lemon-wrapper,
  .lemon-wrapper--drawer-show .lemon-drawer
    box-shadow 0 0 30px rgba(0,0,0,0.1);
.drawer-content
  padding 15px
.more
  font-size 12px
  line-height 24px
  height 24px
  position absolute
  top 14px
  right 14px
  cursor pointer
  user-select none
  color #f1f1f1
  display inline-block
  border-radius 4px
  background #111
  padding 0 8px
  &:active
    background #999
.bar
  text-align center
  line-height 30px
  background #fff
  margin 15px
  color #666
  user-select none
  font-size 12px
.cover
  text-align center
  user-select none
  position absolute
  top 50%
  left 50%
  transform translate(-50%,-50%)
  i
    font-size 84px
    color #e6e6e6
  p
    font-size 18px
    color #ddd
    line-height 50px
.article-item
  line-height 34px
  cursor pointer
  &:hover
    text-decoration underline
    color #318efd
pre
  background #fff
  border-radius 8px
  padding 15px
.lemon-simple .lemon-container{
  z-index:5
}
.lemon-simple .lemon-drawer{
  z-index:4
}
</style>
