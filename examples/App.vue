<template>
  <div id="app">
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
            <p><b>Lemon</b> IMUI</p>
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

      <div class="link">
        <a target="_blank" href="https://github.com/fanjyy/lemon-imui">Github</a>
        <a target="_blank" href="https://gitee.com/june000/lemon-im">Gitee</a>
      </div>
    </div>
  </div>
</template>

<script>
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
      IMUI.appendMessage(message);
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
      //console.log("Event:send");
      console.log(message,next,file)
      setTimeout(() => {
        next();
      }, 1000);
    },
    handlePullMessages(contact, next) {
      const { IMUI } = this.$refs;
      const otheruser = {
        id: "hehe",
        displayName: "I KNOEW",
        avatar:
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4085009425,1005454674&fm=26&gp=0.jpg"
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
body
  background #3d495c !important
.link
  padding 15px 0
  a
    display inline-block
    font-size 16px
    color #ccd3dc
    text-decoration none
    border-radius 5px
    margin-right 15px
    &:hover
      color #85acda
.action
  margin-top 30px
  button
    margin-right 10px
.imui-center
  position absolute
  top 50%
  left 50%
  transform translate(-50%,-50%)
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
