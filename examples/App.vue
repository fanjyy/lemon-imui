<template>
  <div id="app">
    <lemon-imui
      :user="user"
      class="imui-center"
      ref="IMUI"
      @change-menu="handleChangeMenu"
      @change-contact="handleChangeContact"
      @pull-messages="handlePullMessages"
      @send="handleSend"
    >
      <template #cover>
        <h1 style="text-indent:20px">自定义封面内容</h1>
      </template>
      <!-- <template #contact-info="contact">
        <span style="color:blue">contact-info {{ contact }}</span>
      </template> -->
      <!--
      <template #drawer="contact">
        <h1>自定义抽屉内容</h1>
        <p>{{ contact }}</p>
      </template>
      -->
      <template #contact-title="contact">
        <span>{{ contact.displayName }}</span>
        <small class="more" @click="changeDrawer(contact)">&#8230;</small>
      </template>
    </lemon-imui>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      user: {
        id: "superadmin",
        displayName: "IMUI super",
        avatar:
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4085009425,1005454674&fm=26&gp=0.jpg"
      }
    };
  },
  mounted() {
    const contactData1 = {
      id: "1",
      displayName: "工作协作群",
      avatar:
        "https://img.ivsky.com/img/tupian/li/201903/24/richu_riluo-015.jpg",
      type: "single",
      index: "A",
      unread: 0,
      lastSendTime: 1566047865417,
      lastContent: "2"
    };
    const contactData2 = {
      id: "2",
      displayName: "马林",
      avatar: "https://img.ivsky.com/img/tupian/li/201902/27/yanjing_meinv.jpg",
      type: "single",
      index: "B",
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
      id: "3",
      displayName: "范君",
      avatar:
        "https://img.ivsky.com/img/tupian/li/201903/21/huahuan_xiaonvhai.jpg",
      type: "many",
      index: "C",
      lastSendTime: 3
    };

    const { IMUI } = this.$refs;

    setTimeout(() => {
      //IMUI.openDrawer();
      // IMUI.openDrawer(() => {
      //   return [
      //     <h1>123</h1>,
      //     <h1>123</h1>,
      //     <h1>123</h1>,
      //     <h1>123</h1>,
      //     <h1>123</h1>,
      //     <h1>123</h1>,
      //     <h1>123</h1>,
      //     <h1>123</h1>,
      //     <h1>123</h1>,
      //     <h1>123</h1>,
      //     <h1>123</h1>,
      //     <h1>123</h1>,
      //     <h1>123</h1>,
      //     <h1>123</h1>
      //   ];
      // });
      // setTimeout(() => {
      //   IMUI.openDrawer(() => {
      //     return <h1>124563</h1>;
      //   });
      // }, 2000);
    }, 2000);
    //[contactData1, contactData2, contactData3]
    let data = [
      { ...contactData1 },
      { ...contactData2 },
      { ...contactData3 }
      //...Array(100).fill(contactData1)
    ];

    IMUI.initContacts(data);
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
        label: "武器",
        children: [
          {
            name: "wx",
            src: "http://"
          }
        ]
      }
    ]);

    setTimeout(() => {
      IMUI.updateContact("3", {
        unread: 100,
        //displayName: "123",
        lastSendTime: 3,
        lastContent: "你好123"
      });
    }, 2000);
  },
  methods: {
    changeDrawer(contact) {
      this.$refs.IMUI.changeDrawer(() => {
        return [<h2>自定义抽屉</h2>, contact.displayName];
      });
    },
    handleChangeContact(contact) {
      this.$refs.IMUI.updateContact(contact.id, {
        //displayName: "123",
        unread: 0
      });
      this.$refs.IMUI.closeDrawer();
    },
    handleSend(message, next, file) {
      setTimeout(() => {
        next();
      }, 1000);
    },
    handlePullMessages(contact, next) {
      const messages = [
        {
          id: "8ad7e98e-5225-4892-8131-4b2ee7797599",
          type: "text",
          status: "succeed",
          sendTime: 1564926674646,
          fromContactId: "superadmin",
          fromUser: {
            id: "hehe",
            displayName: "I KNOEW",
            avatar:
              "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4085009425,1005454674&fm=26&gp=0.jpg"
          },
          content: "测试消息哦..."
        },
        {
          id: "8ad7e98e-5225-4892-8131-4b2ee7797599",
          type: "text",
          status: "succeed",
          sendTime: 1564926674646,
          fromContactId: "superadmin",
          fromUser: {
            id: "superadmin",
            displayName: "超级飞机",
            avatar:
              "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4085009425,1005454674&fm=26&gp=0.jpg"
          },
          content: "测试消息哦..."
        },
        {
          id: "8ad7e98e-5225-4892-8131-4b2ee7797599",
          type: "text",
          status: "succeed",
          sendTime: 1564926674646,
          fromContactId: "superadmin",
          fromUser: {
            id: "hehe",
            displayName: "I KNOEW",
            avatar:
              "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4085009425,1005454674&fm=26&gp=0.jpg"
          },
          content: "测试消息哦..."
        },
        {
          id: "8ad7e98e-5225-4892-8131-4b2ee7797599",
          type: "text",
          status: "succeed",
          sendTime: 1564926674646,
          fromContactId: "superadmin",
          fromUser: {
            id: "superadmin",
            displayName: "超级飞机",
            avatar:
              "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4085009425,1005454674&fm=26&gp=0.jpg"
          },
          content: "测试消息哦..."
        },
        {
          id: "8ad7e98e-5225-4892-8131-4b2ee7797599",
          type: "text",
          status: "succeed",
          sendTime: 1564926674646,
          fromContactId: "superadmin",
          fromUser: {
            id: "hehe",
            displayName: "I KNOEW",
            avatar:
              "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4085009425,1005454674&fm=26&gp=0.jpg"
          },
          content: "测试消息哦..."
        },
        {
          id: "8ad7e98e-5225-4892-8131-4b2ee7797599",
          type: "text",
          status: "succeed",
          sendTime: 1564926674646,
          fromContactId: "superadmin",
          fromUser: {
            id: "superadmin",
            displayName: "超级飞机",
            avatar:
              "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4085009425,1005454674&fm=26&gp=0.jpg"
          },
          content: "测试消息哦..."
        }
      ];
      next(messages);
    },
    handleChangeMenu() {},
    openCustomContainer() {}
  }
};
</script>

<style lang="stylus">
body
  background #384558 !important
.imui-center
  position absolute
  top 50%
  left 50%
  transform translate(-50%,-50%)
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
</style>
