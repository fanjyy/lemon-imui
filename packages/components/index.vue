<script>
import { useScopedSlot, fastDone, generateUUID } from "utils";
import { isFunction, isString, isEmpty } from "utils/validate";
import {
  DEFAULT_MENUS,
  DEFAULT_MENU_LASTMESSAGES,
  DEFAULT_MENU_CONTACTS
} from "utils/constant";
import lastContentRender from "../lastContentRender";

import MemoryCache from "utils/cache/memory";

const CacheContactContainer = new MemoryCache();
const CacheMenuContainer = new MemoryCache();
const CacheMessageLoaded = new MemoryCache();

import {
  //constraintContactMessages,
  constraintContact
  //constraintMessage
} from "utils/constraint";
const messages = {};
const emojiMap = {};
let renderDrawerContent = () => {};

export default {
  name: "LemonImui",
  provide() {
    return {
      IMUI: this
    };
  },
  props: {
    /**
     * 消息时间格式化规则
     */
    messageTimeFormat: Function,
    /**
     * 联系人最新消息时间格式化规则
     */
    contactTimeFormat: Function,
    /**
     * 初始化时是否隐藏抽屉
     */
    hideDrawer: {
      type: Boolean,
      default: true
    },
    /**
     * 初始化时是否隐藏导航按钮上的头像
     */
    hideMenuAvatar: Boolean,
    user: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      drawerVisible: !this.hideDrawer,
      currentContactId: "",
      activeSidebar: DEFAULT_MENU_LASTMESSAGES,
      contacts: [],
      menus: []
    };
  },

  render() {
    return this._renderWrapper([
      this._renderMenu(),
      this._renderSidebarMessage(),
      this._renderSidebarContact(),
      this._renderContainer(),
      this._renderDrawer()
    ]);
  },
  created() {
    this.initMenus();
  },
  async mounted() {
    await this.$nextTick();
  },
  computed: {
    currentMessages() {
      return messages[this.currentContactId] || [];
    },
    currentContact() {
      return this.contacts.find(item => item.id == this.currentContactId) || {};
    },
    currentMenu() {
      return this.menus.find(item => item.name == this.activeSidebar) || {};
    },
    currentIsDefSidebar() {
      return DEFAULT_MENUS.includes(this.activeSidebar);
    },
    lastMessages() {
      const data = this.contacts.filter(item => !isEmpty(item.lastContent));
      data.sort((a1, a2) => {
        return a2.lastSendTime - a1.lastSendTime;
      });
      return data;
    }
  },
  watch: {
    activeSidebar() {}
  },
  methods: {
    _menuIsContacts() {
      return this.activeSidebar == DEFAULT_MENU_CONTACTS;
    },
    _menuIsMessages() {
      return this.activeSidebar == DEFAULT_MENU_LASTMESSAGES;
    },
    _createMessage(message) {
      return {
        ...{
          id: generateUUID(),
          type: "text",
          status: "going",
          sendTime: new Date().getTime(),
          toContactId: this.currentContactId,
          fromUser: {
            ...this.user
          }
        },
        ...message
      };
      // const message = {
      //   id: "123",
      //   status: "succeed",
      //   type: "image",
      //   sendTime: 12312312312,
      //   content: "asdas",
      //   fromContactId: "123",
      //   fromUser: { id: "123", displayName: "123", avatar: "123",}
      // }
    },
    // _setDefMessages(id) {
    //   //this.messages[id] = this.messages[id] || [];
    //   if (!messages[id]) {
    //     this.$set(messages, id, []);
    //   }
    // },
    appendMessage(message, contactId = this.currentContactId) {
      this._addMessage(message, contactId, 1);
      this.messageViewToBottom();
    },
    _emitSend(message, next, file) {
      this.$emit(
        "send",
        message,
        (replaceMessage = { status: "succeed" }) => {
          next();
          message = Object.assign(message, replaceMessage);
          this.forceUpdateMessage(message.id);
        },
        file
      );
    },
    _handleSend(text) {
      const message = this._createMessage({ content: text });
      this.appendMessage(message);
      this._emitSend(message, () => {
        this.updateContact(message.toContactId, {
          lastContent: lastContentRender[message.type].call(this, message),
          lastSendTime: message.sendTime
        });
      });
    },
    _handleUpload(file) {
      const imageTypes = ["image/gif", "image/jpeg", "image/png"];
      let joinMessage;
      if (imageTypes.includes(file.type)) {
        joinMessage = {
          type: "image",
          content: URL.createObjectURL(file)
        };
      } else {
        joinMessage = {
          type: "file",
          fileSize: file.size,
          fileName: file.name,
          content: ""
        };
      }
      const message = this._createMessage(joinMessage);
      this.appendMessage(message);
      this._emitSend(
        message,
        () => {
          this.updateContact(message.toContactId, {
            lastContent: lastContentRender[message.type].call(this, message),
            lastSendTime: message.sendTime
          });
        },
        file
      );
    },
    _handleReachTop(next) {
      // const messages = {
      //   id: "8ad7e98e-5225-4892-8131-4b2ee7797599",
      //   type: "text",
      //   status: "succeed",
      //   sendTime: 1564926674646,
      //   fromContactId: "superadmin",
      //   fromUser: {
      //     id: "hehe",
      //     displayName: "I KNOEW",
      //     avatar:
      //       "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4085009425,1005454674&fm=26&gp=0.jpg"
      //   },
      //   content: "测试消息哦..."
      // };
      this.$emit(
        "pull-messages",
        this.currentContact,
        (messages, isEnd = false) => {
          this._addMessage(
            Array(10).fill(messages[1]),
            this.currentContactId,
            0
          );
          CacheMessageLoaded.set(this.currentContactId, isEnd);
          next(isEnd);
        }
      );
      // setTimeout(() => {
      //   CacheMessageLoaded.set(this.currentContactId, isEnd);
      // }, 2000);
    },
    clearCacheContainer(name) {
      CacheContactContainer.remove(name);
      CacheMenuContainer.remove(name);
    },
    _renderWrapper(children) {
      return (
        <div
          class={[
            "lemon-wrapper",
            this.drawerVisible && "lemon-wrapper--drawer-show"
          ]}
        >
          {children}
        </div>
      );
    },
    _renderMenu() {
      const menuItem = this._renderMenuItem();
      return (
        <div class="lemon-menu">
          {this.hideMenuAvatar == false && (
            <lemon-avatar
              on-click={e => {
                console.log("menu avatar click");
              }}
              class="lemon-menu__avatar"
              src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=400062461,2874561526&fm=26&gp=0.jpg"
            />
          )}
          {menuItem.top}
          {this.$slots.menu}
          <div class="lemon-menu__bottom">
            {this.$slots["menu-bottom"]}
            {menuItem.bottom}
          </div>
        </div>
      );
    },
    _renderMenuAvatar() {
      return;
    },
    _renderMenuItem() {
      const top = [];
      const bottom = [];
      this.menus.forEach(item => {
        const { name, title, unread, render, click } = item;
        const node = (
          <div
            class={[
              "lemon-menu__item",
              { "lemon-menu__item--active": this.activeSidebar == name }
            ]}
            on-click={() => {
              fastDone(click, () => {
                if (name) this.changeMenu(name);
              });
            }}
            title={title}
          >
            <lemon-badge count={unread}>{render(item)}</lemon-badge>
          </div>
        );
        item.isBottom === true ? bottom.push(node) : top.push(node);
      });
      return {
        top,
        bottom
      };
    },
    _renderSidebarMessage() {
      return this._renderSidebar(
        this.lastMessages.map(contact => {
          return this._renderContact(
            {
              contact,
              timeFormat: this.contactTimeFormat
            },
            () => this.changeContact(contact.id)
          );
        }),
        DEFAULT_MENU_LASTMESSAGES
      );
    },
    _renderContact(props, onClick) {
      const {
        click: customClick,
        renderContainer,
        id: contactId
      } = props.contact;
      const click = () => {
        fastDone(customClick, () => {
          onClick();
          this._customContainerReady(
            renderContainer,
            CacheContactContainer,
            contactId
          );
        });
      };
      return (
        <lemon-contact
          class={{
            "lemon-contact--active": this.currentContactId == props.contact.id
          }}
          props={props}
          on-click={click}
        />
      );
    },
    _renderSidebarContact() {
      let prevIndex;
      return this._renderSidebar(
        this.contacts.map(contact => {
          contact.index = contact.index.replace(/\[[0-9]*\]/, "");
          const node = [
            contact.index !== prevIndex && (
              <p class="lemon-sidebar__label">{contact.index}</p>
            ),
            this._renderContact(
              {
                contact: contact,
                simple: true
              },
              () => this.changeContact(contact.id)
            )
          ];
          prevIndex = contact.index;
          return node;
        }),
        DEFAULT_MENU_CONTACTS
      );
    },
    _renderSidebar(children, name) {
      return (
        <div class="lemon-sidebar" v-show={this.activeSidebar == name}>
          {children}
        </div>
      );
    },
    _renderDrawer() {
      return this._menuIsMessages() && this.currentContactId ? (
        <div class="lemon-drawer">
          {renderDrawerContent()}
          {useScopedSlot(this.$scopedSlots.drawer, "", this.currentContact)}
        </div>
      ) : (
        ""
      );
    },
    _isContactContainerCache(name) {
      return name.startsWith("contact#");
    },
    _renderContainer() {
      const nodes = [];
      const cls = "lemon-container";
      const curact = this.currentContact;
      let defIsShow = true;
      for (const name in CacheContactContainer.get()) {
        const show = curact.id == name && this.currentIsDefSidebar;
        defIsShow = !show;
        nodes.push(
          <div class={cls} v-show={show}>
            {CacheContactContainer.get(name)}
          </div>
        );
      }
      for (const name in CacheMenuContainer.get()) {
        nodes.push(
          <div
            class={cls}
            v-show={this.activeSidebar == name && !this.currentIsDefSidebar}
          >
            {CacheMenuContainer.get(name)}
          </div>
        );
      }

      nodes.push(
        <div
          class={cls}
          v-show={this._menuIsMessages() && defIsShow && curact.id}
        >
          <div class="lemon-container__title">
            <div class="lemon-container__displayname">
              {useScopedSlot(
                this.$scopedSlots["contact-title"],
                curact.displayName,
                curact
              )}
            </div>
          </div>
          <lemon-messages
            ref="messages"
            time-format={this.messageTimeFormat}
            reverse-user-id={this.user.id}
            on-reach-top={this._handleReachTop}
            messages={this.currentMessages}
          />
          <lemon-editor
            ref="editor"
            onSend={this._handleSend}
            onUpload={this._handleUpload}
          />
        </div>
      );
      nodes.push(
        <div class={cls} v-show={!curact.id}>
          {this.$slots.cover}
        </div>
      );
      nodes.push(
        <div
          class={cls}
          v-show={this._menuIsContacts() && defIsShow && curact.id}
        >
          {useScopedSlot(
            this.$scopedSlots["contact-info"],
            <div class="lemon-contact-info">
              <lemon-avatar src={curact.avatar} size={90} />
              <h4>{curact.displayName}</h4>
              <lemon-button
                on-click={() => {
                  this.changeContact(curact.id, DEFAULT_MENU_LASTMESSAGES);
                }}
              >
                {" "}
                发送消息{" "}
              </lemon-button>
            </div>,
            curact
          )}
        </div>
      );
      return nodes;
    },
    _addContact(data, t) {
      const type = {
        0: "unshift",
        1: "push"
      }[t];
      constraintContact(data);
      //this.contacts[type](cloneDeep(data));
      this.contacts[type](data);
    },
    _addMessage(data, contactId, t) {
      const type = {
        0: "unshift",
        1: "push"
      }[t];
      if (!Array.isArray(data)) data = [data];
      messages[contactId] = messages[contactId] || [];
      messages[contactId][type](...data);
      //console.log(messages[contactId]);
      this.forceUpdateMessage();
    },
    /**
     * 设置最新消息DOM
     * @param {String} messageType 消息类型
     * @param {Function} render 返回消息 vnode
     */
    setLastContentRender(messageType, render) {
      lastContentRender[messageType] = render;
    },
    /**
     * 将字符串内的 EmojiItem.name 替换为 img
     * @param {String} str 被替换的字符串
     * @return {String} 替换后的字符串
     */
    replaceEmojiName(str) {
      return str.replace(/\[!(\w+)\]/gi, (str, match) => {
        const file = match;
        return emojiMap[file]
          ? `<img src="${emojiMap[file]}" />`
          : `[!${match}]`;
      });
    },
    /**
     * 将当前聊天窗口滚动到底部
     */
    messageViewToBottom() {
      this.$refs.messages.scrollToBottom();
    },
    /**
     * 改变聊天对象
     * @param contactId 联系人 id
     */
    changeContact(contactId, menuName) {
      if (this.currentContactId == contactId) {
        this.currentContactId = undefined;
      }

      if (menuName) {
        this.changeMenu(menuName);
      }
      this.currentContactId = contactId;
      this.$emit("change-contact", this.currentContact);
      if (isFunction(this.currentContact.renderContainer)) {
        return;
      }
      if (this._menuIsMessages()) {
        if (!CacheMessageLoaded.has(contactId)) {
          this.$refs.messages.resetLoadState();
        }
        if (!messages[contactId]) {
          this.$emit(
            "pull-messages",
            this.currentContact,
            (messages, isEnd) => {
              this._addMessage(messages, contactId, 0);
              this.messageViewToBottom();
            }
          );
        } else {
          this.messageViewToBottom();
        }
      }
    },
    /**
     * 删除一条聊天消息
     * @param messageId 消息 id
     * @param contactId 联系人 id
     */
    removeMessage(messageId, contactId) {
      const index = this.findMessageIndexById(messageId, contactId);
      if (index !== -1) {
        messages[contactId].splice(index, 1);
        this.forceUpdateMessage();
      }
    },
    /**
     * 修改聊天一条聊天消息
     * @param {Message} data 根据 data.id 查找聊天消息并覆盖传入的值
     * @param contactId 联系人 id
     */
    updateMessage(messageId, contactId, data) {
      const index = this.findMessageIndexById(messageId, contactId);
      if (index !== -1) {
        messages[contactId][index] = {
          ...messages[contactId][index],
          ...data
        };
        this.forceUpdateMessage(messageId);
      }
    },
    /**
     * 手动更新对话消息
     * @param {String} messageId 消息ID，如果为空则更新当前聊天窗口的所有消息
     */
    forceUpdateMessage(messageId) {
      if (!messageId) {
        this.$refs.messages.$forceUpdate();
      } else {
        const components = this.$refs.messages.$refs.message;
        if (components) {
          const messageComponent = components.find(
            com => com.$attrs.message.id == messageId
          );
          if (messageComponent) messageComponent.$forceUpdate();
        }
      }
    },
    _customContainerReady(render, cacheDrive, key) {
      if (isFunction(render) && !cacheDrive.has(key)) {
        cacheDrive.set(key, render.call(this));
      }
    },
    /**
     * 切换左侧按钮
     * @param {String} name 按钮 name
     */
    changeMenu(name) {
      this.$emit("change-menu", name);
      this.activeSidebar = name;
      const { renderContainer } = this.currentMenu;
      this._customContainerReady(renderContainer, CacheMenuContainer, name);
    },
    /**
     * 初始化编辑框的 Emoji 表情列表，是 Lemon-editor.initEmoji 的代理方法
     * @param {Array<Emoji,EmojiItem>} data emoji 数据
     * Emoji = {label: 表情,children: [{name: wx,title: 微笑,src: url}]} 分组
     * EmojiItem = {name: wx,title: 微笑,src: url} 无分组
     */
    initEmoji(data) {
      this.$refs.editor.initEmoji(data);
      if (data[0].label) {
        data = data.flatMap(item => item.children);
      }
      data.forEach(({ name, src }) => (emojiMap[name] = src));
    },
    /**
     * 初始化左侧按钮
     * @param {Array<Menu>} data 按钮数据
     */
    initMenus(data) {
      const defaultMenus = [
        {
          name: DEFAULT_MENU_LASTMESSAGES,
          title: "聊天",
          unread: 0,
          click: null,
          render: menu => {
            return <i class="lemon-icon-message" />;
          },
          isBottom: false
        },
        {
          name: DEFAULT_MENU_CONTACTS,
          title: "通讯录",
          unread: 0,
          click: null,
          render: menu => {
            return <i class="lemon-icon-addressbook" />;
          },
          isBottom: false
        }
      ];
      let menus = [];
      if (Array.isArray(data)) {
        const indexMap = {
          lastMessages: 0,
          contacts: 1
        };
        const indexKeys = Object.keys(indexMap);
        menus = data.map(item => {
          if (indexKeys.includes(item.name)) {
            return {
              ...defaultMenus[indexMap[item.name]],
              ...item,
              ...{ renderContainer: null }
            };
          }
          return item;
        });
      } else {
        menus = defaultMenus;
      }
      this.menus = menus;
    },
    /**
     * 初始化联系人数据
     * @param {Array<Contact>} data 联系人列表
     */
    initContacts(data) {
      this.contacts.push(...data);
      this.sortContacts();
    },
    /**
     * 使用 联系人的 index 值进行排序
     */
    sortContacts() {
      this.contacts.sort((a, b) => {
        return a.index.localeCompare(b.index);
      });
    },
    /**
     * 修改联系人数据
     * @param {Contact} data 修改的数据，根据 data.id 查找联系人并覆盖传入的值
     */
    updateContact(contactId, data) {
      delete data.id;
      delete data.toContactId;

      const index = this.findContactIndexById(contactId);
      if (index !== -1) {
        const { unread } = data;
        if (isString(unread)) {
          if (unread.indexOf("+") === 0 || unread.indexOf("-") === 0) {
            data.unread =
              parseInt(unread) + parseInt(this.contacts[index].unread);
          }
        }
        this.$set(this.contacts, index, {
          ...this.contacts[index],
          ...data
        });
      }
    },
    /**
     * 根据 id 查找联系人的索引
     * @param contactId 联系人 id
     * @return {Number} 联系人索引，未找到返回 -1
     */
    findContactIndexById(contactId) {
      return this.contacts.findIndex(item => item.id == contactId);
    },
    findMessageIndexById(messageId, contactId) {
      const msg = messages[contactId];
      if (isEmpty(msg)) {
        return -1;
      }
      return msg.findIndex(item => item.id == messageId);
    },
    findMessageById(messageId, contactId) {
      const index = this.findMessageIndexById(messageId, contactId);
      if (index !== -1) return messages[contactId][index];
    },
    /**
     * 返回所有联系人
     * @return {Array<Contact>}
     */
    getContacts() {
      return this.contacts;
    },
    /**
     * 返回所有消息
     * @return {Object<Contact.id,Message>}
     */
    getMessages() {
      return messages;
    },
    // appendContact(data) {
    //   this._addContact(data, 0);
    // },
    // prependContact(data) {
    //   this._addContact(data, 1);
    // },
    // addContactMessage(data) {
    //   this._addContact(data, 0);
    // },
    // prependContactMessage(data) {
    //   this._addContact(data, 1);
    // },
    // appendMessage(data) {},
    // prependMessage(data) {},
    // removeContact(contactId) {},
    // removeContactMessage(contactId) {},
    // removeContactAll(contactId) {},
    /**
     * 将自定义的HTML显示在主窗口内
     */
    openrenderContainer(vnode) {
      //renderContainerQueue[this.activeSidebar] = vnode;
      //this.$slots._renderContainer = vnode;
    },
    changeDrawer(render) {
      this.drawerVisible = !this.drawerVisible;
      if (this.drawerVisible == true) this.openDrawer(render);
    },
    openDrawer(render) {
      renderDrawerContent = render || new Function();
      this.drawerVisible = true;
    },
    closeDrawer() {
      this.drawerVisible = false;
    }
  }
};
</script>
<style lang="stylus">
wrapper-width = 850px
drawer-width = 200px
bezier = cubic-bezier(0.645, 0.045, 0.355, 1)
@import '~styles/utils/index'

+b(lemon-wrapper)
  width wrapper-width
  height 580px
  display flex
  font-size 14px
  border-radius 5px
  //mask-image radial-gradient(circle, white 100%, black 100%)
  background #efefef
  transition all .4s bezier
  border-radius 4px
  p
    margin 0
  img
    vertical-align middle
    border-style none
+b(lemon-menu)
  flex-column()
  align-items center
  width 60px
  background #1d232a
  padding 15px 0
  position relative
  user-select none
  +e(bottom)
    flex-column()
    position absolute
    bottom 0
  +e(avatar)
    margin-bottom 20px
    cursor pointer
  +e(item)
    color #999
    cursor pointer
    padding 14px 10px
    max-width 100%
    +m(active)
      color #0fd547
    &:hover:not(.lemon-menu__item--active)
      color #eee
    word-break()
    > *
      font-size 24px
    .ant-badge-count
      display inline-block
      padding 0 4px
      height 18px
      line-height 16px
      min-width 18px
    .ant-badge-count
    .ant-badge-dot
      box-shadow 0 0 0 1px #1d232a
+b(lemon-sidebar)
  width 250px
  background #efefef
  overflow-y auto
  scrollbar-light()
  +e(label)
    padding 6px 14px 6px 14px
    color #666
    font-size 12px
    margin 0
  +b(lemon-contact--active)
    background #d9d9d9
+b(lemon-container)
  flex 1
  flex-column()
  background #f4f4f4
  word-break()
  position relative
  z-index 2
  +e(title)
    padding 15px 15px
  +e(displayname)
    font-size 16px
+b(lemon-messages)
  flex 1
  height auto
+b(lemon-drawer)
  position absolute
  top 0
  right 0
  overflow hidden
  width drawer-width
  background #f4f4f4
  transition width .4s bezier
  height 100%
  z-index 1
  //border-left 1px solid #e9e9e9
  box-sizing border-box
+b(lemon-wrapper)
  +m(drawer-show)
    +b(lemon-drawer)
      right -200px
+b(lemon-contact-info)
  flex-column()
  justify-content center
  align-items center
  height 100%
  h4
    font-size 16px
    font-weight normal
    margin 10px 0 20px 0
    user-select none
</style>
