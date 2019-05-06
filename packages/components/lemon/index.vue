<template>
  <el-container class="lemon-container lemon-container--center"
                ref="container">
    <el-aside class="lemon-sidebar"
              width="240px">
      <ul class="lemon-tab">
        <li v-for="item in tabList"
            :key="item.name"
            :tab-name="item.name"
            :class="['lemon-tab__item', item.name == currentTab && 'lemon-tab__item--active']"
            @click="tabChange(item.name)">
          <span :class="item.icon"></span>
        </li>
      </ul>
      <div class="lemon-tabview">
        <div class="lemon-tabview__item"
             v-for="item in tabList"
             v-show="item.name == currentTab"
             :key="item.name"
             :tabview-name="item.name">
          <component :is="item.componentName"
                     @changeMessageView="_changeMessageView"></component>
        </div>
      </div>
    </el-aside>
    <el-container class="lemon-main">
      <el-header class="lemon-header"
                 height="48px">
        宜宾劲越二手车市场（上江北） (500)
      </el-header>
      <el-main>
        <lemon-message-view></lemon-message-view>
      </el-main>
      <el-main>工具欄</el-main>
    </el-container>
  </el-container>
</template>

<script>
import LemonContactList from '../contact-list'
import LemonGroupList from '../group-list'
import LemonMessageList from '../message-list'
import LemonMessageView from '../message-view'
const components = {
  LemonContactList,
  LemonGroupList,
  LemonMessageList,
  LemonMessageView
}

export default {
  name: 'LemonIm',
  components,
  provide () {
    return {
      control: this
    }
  },
  props: {
    friends: {
      type: Array,
      default: () => []
    },
    groups: {
      type: Array,
      default: () => []
    }
  },
  data () {
    this.tabList = [{
      name: 'message',
      icon: 'el-icon-s-comment',
      componentName: 'lemon-message-list',
    }, {
      name: 'contact',
      icon: 'el-icon-user-solid',
      componentName: 'lemon-contact-list',
    }, {
      name: 'group',
      icon: 'el-icon-message-solid',
      componentName: 'lemon-group-list',
    }]
    return {
      //当前会话对象的ID 根据 currentTab
      currentTab: 'contact',
      //当前聊天用户ID 根据聊天类型不一样  代表用户ID 群组ID 讨论组ID
      currentMessageId: null,
      //聊天视图是否加载中
      messageViewloading: true,
      //群聊天记录 groupId => [message]
      groupMessageData: {

      },
      //好友聊天记录 friendId => [message]
      friendMessageData: {

      }
    };
  },
  created () {
  },
  mounted () {
    this._initialize()
  },
  computed: {
    //聊天窗口中的数据
    messageViewData () {
      return this.friendMessageData[this.currentMessageId]
    }
  },
  watch: {},
  methods: {
    //左侧选项卡切换
    tabChange (name) {
      this.currentTab = name;
      this.findNode(`.lemon-tabview`).scrollTop = '0px'
    },
    //打开一个群组聊天窗口
    openGroupMessageView (group) {
      this._changeMessageViewComplete(group.id)
    },
    //打开普通聊天窗口
    openFriendMessageView (friend) {
      if (!this.friendMessageData[friend.id]) {
        this.$emit('pull-friends-message', friend, (newData) => {
          this._changeMessageViewComplete(friend.id)
          this.friendMessageData[friend.id] = [...newData]
        })
      } else {
        this._changeMessageViewComplete(friend.id)
      }
    },
    _changeMessageViewComplete (id) {
      this.messageViewloading = false
      this.currentMessageId = id
    },
    _changeMessageView (item) {
      this.openFriendMessageView(item)
      /**
      const resolve = (newData) => {
        this.messageViewloading = false
        this.
      }
      const reject = () => {
        this.messageViewloading = false
      }
      this.$emit('pullFriendsMessage', item, {
        resolve,
        reject
      })
       */
    },
    _openMessageView () {

    },
    findNode (query) {
      return this.$refs.container.$el.querySelector(query)
    },
    _initialize () {

    },
    //将左侧的滚动条重置到顶部
    _tabviewScrollToTop () {

    },
  }
}
</script>
<style lang='scss'>
@import '~styles/utils/index';
body {
  background: #8d9198;
}

@include b(container) {
  width: 900px;
  height: 700px;
  @include m(center) {
    @include position-center(fixed);
  }
}
@include b(sidebar) {
  background: #1f252d;
  display: flex;
  flex-direction: column;
  color: #fff;
  overflow: hidden;
  .el-tabs--card {
    .el-tabs__nav,
    .el-tabs__item,
    .el-tabs__header {
      border: none;
    }
  }
}
@include b(tab) {
  display: flex;
  width: 100%;
  @include e(item) {
    cursor: pointer;
    line-height: 56px;
    text-align: center;
    flex: 1;
    transition: all ease-in-out 0.3s;
    font-size: 22px;
    color: #6d6d6d;
    @include m(active) {
      color: #11d207;
    }
  }
}
@include b(tabview) {
  flex: 1;
  overflow-y: auto;
  @include scrollbar-dark();

  @include e(item) {
  }
}
@include b(main) {
  background: #eceef1;
}
@include b(header) {
  line-height: 48px;
}
</style>