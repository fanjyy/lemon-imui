Data
  # 联系人数据
  contact:{
    // 联系人唯一ID
    id: "1",
    // 名字
    displayName: "范佳奕",
    // 头像
    avatar:
      "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259300811,497831842&fm=26&gp=0.jpg",
    // 类型 single | many 
    type: "single",
    // 联系人索引， 默认按照 localeCompare 排序， 指定顺序 '[1]群组'
    index: "B",
    // 最近一条消息
    message: {
      // 未读数量 , true 显示红点
      unread: 0,
      // 发送时间
      sendTime: 1,
      // 内容
      content: "2",
      // 类型 voice | file | video | image | text
      type: "image"
    }
  }
  # 消息数据
  message:{
    // 消息唯一ID
    id: "123",
    // 消息状态  going | succeed | failed
    status: "succeed",
    // 消息类型 voice | file | video | image | text
    type: "image",
    // 发送时间
    sendTime: 12312312312,
    // 消息内容 | 消息链接
    content: "asdas",
    // 接收方 ID  单人聊天(联系人ID) | 多人聊天(群ID)
    toContactId: "123",
    // type = file 文件大小
    fileSize: 1231,
    // type = file 文件名称
    fileName: 'asdasd.doc'
    // 发送消息的联系人
    fromUser: { id: "123", displayName: "123", avatar: "123", type: "single" }
  }
  # 左侧按钮配置
  menu:[{
    # 指定 menu 唯一名称，保留字段 contacts(通讯录) lastMessages(最近消息)
    name: "123",
    # 鼠标停留显示文字
    title: "通讯录",
    # 标记未读数, 数字显示具体值， true 显示红点
    unread: 0,
    # 按钮的DOM元素
    render: menu => {
      return <span>T</span>;
    },
    # 点击按钮打开的页面，如果 name 为保留字段，该属性失效
    renderContainer: () => {
      return <lemon-contact contact={this.lastMessages[0]} />;
    },
    # 按钮点击事件，会阻止默认的行为，调用 next() 进入下一步
    click: next => {
      next();
    },
    # 是否为底部按钮
    isBottom: false
  }]
  emoji:[{
    label: "表情",
    children: [
      {
        name: "1f600",
        title: "微笑",
        src: "https://twemoji.maxcdn.com/2/72x72/1f600.png"
      },
    ]
  }]

Methods
  # 初始化左侧 menu 数据
  initMenus(data:[menu])
  # 初始化联系人数据
  initContacts(data:[contact])
  # 修改联系人数据
  updateContact(contactId:联系人ID,data:联系人数据，会与现有的数据合并)
  # 切换 menu 
  changeMenu(menuName)
  # 打开一个聊天窗口 传入 contactId 或 contact(如果当前不存在这个联系人，根据此数据新建一个)
  openMessage(contactId | contact)