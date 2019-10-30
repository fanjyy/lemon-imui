# Lemon-IMUI

### Contents

- contact
  ```javascript
  {
    //用户唯一ID
    id: "",
    //昵称
    displayName: "工作协作群",
    //头像URL
    avatar: "http://upload.qqbodys.com/img/weixin/20170804/ji5qxg1am5ztm.jpg",
    //会话类型 single | many
    type: "single",
    //通讯录索引，默认根据字母排序，也可以手动排序“[1]最近联系人”
    index: "A",
    //未读消息
    unread: 0,
    //最近消息时间
    lastSendTime: 1566047865417,
    //最近消息内容
    lastContent: "2"
  }
  ```
- message
  ```javascript
  {
    //消息唯一ID
    id: "",
    status: "succeed",
    //消息类型 voice | file | video | image | text
    type: "text",
    //消息发送时间
    sendTime: 1572415923000,
    //消息内容 | URL
    content: generateRandWord(),
    //文件大小
    fileSize: 1231,
    //文件名称
    fileName: "asdasd.doc",
    //当前会话ID
    toContactId:"",
    //发送消息的用户
    fromUser:{
      id: "system",
      displayName: "系统测试",
      avatar: "http://upload.qqbodys.com/allimg/1710/1035512943-0.jpg"
    };
  }
  ```
- menu
  ```javascript
  {
    //导航名称， 保留字段 lastMessages 和 contacts
    name: "custom1",
    //鼠标停留时显示文字
    title: "自定义按钮1",
    //未读角标
    unread: 0,
    //外观
    render: menu => {
      return <i class="lemon-icon-attah" />;
    },
    //打开内容
    renderContainer: () => {
      return <div>自定义</div>;
    },
    //强制显示在底部
    isBottom: true
  }
  ```

### Props

- user
  ```javascript
  {
    id:'',
    avatar:'',
    displayName:'',
  }
  ```
  个人信息
- currentContactId
  当前会话联系人 ID
- currentContact
  当前会话联系人信息
- messageTimeFormat
  消息列表时间格式化函数
- contactTimeFormat
  联系人时间格式化规则
- hideDrawer
  是否隐藏抽屉
- hideMenuAvatar
  是否隐藏导航头像
- hideMenuAvatar
  是否隐藏导航

### Methods

- initMenus([menu]);  
  初始化导航
- initContacts([contact]);  
  初始化联系人
- initEmoji()
  初始化表情
  ```javascript
  IMUI.initEmoji([
    {
      label: '表情',
      children: [
        {
          name: '1f600',
          title: '微笑',
          src: 'https://twemoji.maxcdn.com/2/72x72/1f600.png'
        },
        {
          name: '1f62c',
          title: '微笑',
          src: 'https://twemoji.maxcdn.com/2/72x72/1f62c.png'
        }
      ]
    },
    {
      label: '收藏',
      children: [
        {
          name: '1f62c',
          title: '微笑',
          src: 'https://twemoji.maxcdn.com/2/72x72/1f62c.png'
        }
      ]
    }
  ])
  ```
- appendMessage(message)  
  在当前聊天窗口插入新消息

- removeMessage(messageId, contactId)  
  删除聊天消息

- updateMessage(messageId, contactId, message)  
  修改聊天聊天消息

- updateContact(contactId,contact)  
  修改联系人

- getMessages(contactId)  
  返回所有本地消息，传入 contactId 只返回与该联系人的消息

- getContacts()  
  获取所有联系人

- openDrawer(vnode)  
  打开抽屉

- closeDrawer()  
  关闭抽屉

- changeDrawer(vnode)  
  切换抽屉显示

- changeMenu(menuName)  
  切换导航

- changeContact(contactId)  
  切换聊天对象

- messageViewToBottom()  
  将当前聊天窗口滚动到底部

- setLastContentRender(messageType, render)  
  配置联系人列表最新消息的渲染函数

  ```javascript
  IMUI.setLastContentRender('image', message => {
    return <span>[最新图片]</span>
  })
  ```

- lastContentRender(message)
  根据 message 渲染联系人列表最新消息 DOM
  ```javascript
  IMUI.updateContact(contact.id, {
    lastContent: IMUI.lastContentRender(message)
  })
  ```

### Scoped Slot

- cover  
  自定义聊天封面

- contact-title 参数{ contact }  
  自定义联系人标题

- message-sidebar  
  插入到最新消息列顶部

- contact-sidebar  
  插入到联系人列顶部

- contact-info 参数{ contact }  
  自定义联系人信息

### Events

- change-menu(menuName)  
  切换导航

- change-contact(contact)  
  切换导航会话

- pull-messages(contact,next)  
  拉取新消息

  - next([message],isEnd) [isEnd 是否无更多数据]

- message-click(event, key, message)

  - event 事件
  - key 触发目标
  - message 消息内容

- menu-avatar-click()  
  点击导航头像

- send(message, next, file)
  - message 当前消息体
  - next(message) 调用该函数完成消息发送
  - file 上传的文件
