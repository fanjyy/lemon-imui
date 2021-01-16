<template>
  <div id="app">
    <div class="logo">
      <div class="logo-text"><b>Lemon</b> IMUI<span class="logo-badge">{{this.packageData.version}}</span></div>
      <div class="logo-sub">{{this.packageData.description}}</div>
      <div class="link"><span>源码下载&nbsp;&nbsp;</span><a target="_blank" href="https://github.com/fanjyy/lemon-imui">Github</a><a target="_blank" href="https://gitee.com/june000/lemon-im">Gitee</a></div>
    </div>


    <div class="imui-center">
      <lemon-imui
        :user="user"
        ref="IMUI"
        :hide-menu="hideMenu"
        :hide-menu-avatar="hideMenuAvatar"
        @change-menu="handleChangeMenu"
        @change-contact="handleChangeContact"
        @pull-messages="handlePullMessages"
        @message-click="handleMessageClick"
        @menu-avatar-click="handleMenuAvatarClick"
        @send="handleSend"
      >
        <template #cover>
          <div class="cover">
            <i class="lemon-icon-message"></i>
            <p><b>自定义封面 Lemon</b> IMUI</p>
          </div>
        </template>
        <!-- <template #contact-info="contact">
        <span style="color:blue">contact-info {{ contact }}</span>
      </template> -->
        <template #contact-title="contact">
          <span>{{ contact.displayName }}</span>
          <small class="more" @click="changeDrawer(contact)">&#8230;</small>
        </template>
        <!-- <template #contact-info="contact">
          自定义联系人信息 {{ contact.displayName }}
        </template> -->
        <template #message-sidebar>
          <div class="bar">自定义消息顶部</div>
        </template>
        <template #contact-sidebar>
          <div class="bar">自定义联系人顶部</div>
        </template>
      </lemon-imui>



      <div class="action">
        <lemon-button @click="appendMessage">发送消息</lemon-button>
        <lemon-button @click="updateContact">修改联系人信息</lemon-button>
        <lemon-button @click="changeMenuVisible">切换导航显示</lemon-button>
        <lemon-button @click="changeMenuAvatarVisible"
          >切换头像显示</lemon-button
        >
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
          <td>type</td>
          <td>会话类型：单聊：single | 群聊：many</td>
          <td>String</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>index</td>
          <td>通讯录索引，传入字母或数字进行排序，索引可以显示自定义文字“[A]最近联系人”</td>
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
          <td>最近一条消息的时间戳</td>
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
          <td>消息类型：voice | file | video | image | text</td>
          <td>String</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>sendTime</td>
          <td>消息发送时间</td>
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
          <td width="100">-</td>
          <td></td>
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
          <td>在当前聊天窗口插入一条新消息, scrollToBottom=true 添加之后滚动到消息窗口底部</td>
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
          <td>Function(Contact.id)</td>
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
          <td width="150">contact-title</td>
          <td width="350">联系人标题</td>
          <td width="150">Contact</td>
        </tr>
        <tr>
          <td width="150">message-sidebar</td>
          <td width="350">左侧消息列表的顶部</td>
          <td width="150">-</td>
        </tr>
        <tr>
          <td width="150">contact-sidebar</td>
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
          <td width="150">Contact,next([Message],isEnd)</td>
        </tr>
        <tr>
          <td width="150">message-click</td>
          <td width="350">点击聊天窗口中的消息时会触发该事件</td>
          <td width="150">event,key,Message</td>
        </tr>
        <tr>
          <td width="150">send</td>
          <td width="350">当发送一条新消息时会触发该事件</td>
          <td width="150">Message,Function(Message)：调用该函数完成消息发送，可以传入Message来改变消息内容，file：上传时的文件</td>
        </tr>
      </table>

  </div>
</template>

<script>
import packageData from '../package.json';
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
      packageData,
      hideMenuAvatar: false,
      hideMenu: false,
      user: {
        id: "superadmin",
        displayName: "June",
        avatar:
          "https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=69e1a1a4b78f8c54e3d3c22902124ac8/060828381f30e9247e29fb7b4f086e061c95f7ef.jpg"
      }
    };
  },
  mounted() {

    const contactData1 = {
      id: "contact-1",
      displayName: "工作协作群",
      avatar: "http://upload.qqbodys.com/img/weixin/20170804/ji5qxg1am5ztm.jpg",
      type: "single",
      index: "A",
      unread: 0,
      lastSendTime: 1566047865417,
      lastContent: "2"
    };
    const contactData2 = {
      id: "contact-2",
      displayName: "自定义内容",
      avatar: "http://upload.qqbodys.com/img/weixin/20170807/jibfvfd00npin.jpg",
      type: "single",
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
      type: "many",
      index: "C",
      unread: 32,
      lastSendTime: 3,
      lastContent: "你好123"
    };

    const { IMUI } = this.$refs;

    
    let data = [
      { ...contactData1 },
      { ...contactData2 },
      { ...contactData3 }
      //...Array(100).fill(contactData1)
    ];

    IMUI.initContacts(data);
    IMUI.initMenus([
      {
        name: "lastMessages"
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

    IMUI.initEmoji([
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
    ]);
  },
  methods: {
    handleMenuAvatarClick() {
      console.log("Event:menu-avatar-click");
    },
    handleMessageClick(e, key, message) {
      const { IMUI } = this.$refs;

      if (key == "status") {
        IMUI.updateMessage(message.id, message.toContactId, {
          status: "going",
          content: "正在重新发送消息..."
        });
        setTimeout(() => {
          IMUI.updateMessage(message.id, message.toContactId, {
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
    appendMessage() {
      const { IMUI } = this.$refs;
      const contact = IMUI.currentContact;
      const message = generateMessage();
      message.fromUser = {
        ...message.fromUser,
        ...this.user
      };
      IMUI.appendMessage(message,true);
      IMUI.updateContact(contact.id, {
        unread: "+1",
        lastSendTime: getTime(),
        lastContent: IMUI.lastContentRender(message)
      });
    },
    updateContact() {
      this.$refs.IMUI.updateContact("contact-3", {
        unread: 10,
        displayName: generateRandWord(),
        lastSendTime: getTime(),
        lastContent: "修改昵称为随机字母"
      });
    },
    changeDrawer(contact) {
      this.$refs.IMUI.changeDrawer(() => {
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
    handleChangeContact(contact) {
      console.log("Event:change-contact");
      this.$refs.IMUI.updateContact(contact.id, {
        //displayName: "123",
        unread: 0
      });
      this.$refs.IMUI.closeDrawer();
    },
    handleSend(message, next, file) {
      console.log(message,next,file)
      setTimeout(() => {
        next();
      }, 1000);
    },
    handlePullMessages(contact, next) {
      const { IMUI } = this.$refs;
      const otheruser = {
        id: contact.id,
        displayName: contact.displayName,
        avatar:contact.avatar
      };
      console.log("Event:pull-messages");
      const messages = [
        generateMessage(IMUI.currentContactId, this.user),
        generateMessage(IMUI.currentContactId, otheruser),
        generateMessage(IMUI.currentContactId, this.user),
        generateMessage(IMUI.currentContactId, otheruser),
        generateMessage(IMUI.currentContactId, this.user),
        generateMessage(IMUI.currentContactId, this.user),
        generateMessage(IMUI.currentContactId, otheruser),
        {
          ...generateMessage(IMUI.currentContactId, this.user),
          ...{ status: "failed" }
        }
      ];

      console.log(messages);
      let isEnd = false;
      if (IMUI.getMessages(IMUI.currentContactId).length > 20) isEnd = true;

      next(messages, isEnd);
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
.action
  margin-top 20px
  .lemon-button
    margin-right 10px
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
  font-size 32px
  line-height 18px
  height 32px
  position absolute
  top 6px
  right 14px
  cursor pointer
  user-select none
  color #999
  &:active
    color #000
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
</style>
