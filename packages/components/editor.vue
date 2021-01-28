<script>
import { toEmojiName,useScopedSlot } from "utils";
const exec = (val, command = "insertHTML") => {
  document.execCommand(command, false, val);
};
const selection = window.getSelection();
let lastSelectionRange;
let emojiData = [];
let isInitTool = false;
export default {
  name: "LemonEditor",
  inject: {
    IMUI: {
      from:'IMUI',
      default (){
        return this;
      }
    }
  },
  components: {},
  props: {
    tools:{
      type:Array,
      default:()=>[],
    },
    sendText:{
      type:String,
      default:'发 送'
    },
    sendKey:{
      type:Function,
      default(e){
        return e.keyCode == 13 && e.ctrlKey === true;
      }
    },
  },
  data() {
    return {
      submitDisabled: true,
      proxyTools:[],
      accept: ""
    };
  },
  created() {
    if(this.tools && this.tools.length > 0){
      this.initTools(this.tools);
    }else{
      this.initTools([{name:'emoji'},{name:'uploadFile'},{name:'uploadImage'}]);
    }
  },
  render() {
    const toolLeft = [];
    const toolRight = [];
    this.proxyTools.forEach(({name, title, render, click,isRight})=>{
      click = click ||  new Function();
      const classes = ['lemon-editor__tool-item',{'lemon-editor__tool-item--right':isRight}];
      let node;
      if(name=='emoji'){
        node = emojiData.length == 0 ? '' : <lemon-popover class="lemon-editor__emoji">
          <template slot="content">{this._renderEmojiTabs()}</template>
          <div class={classes} title={title}>
            {render()}
          </div>
        </lemon-popover>
      }else{
        node = <div class={classes} on-click={click} title={title}>{render()}</div>
      }
      if(isRight){
        toolRight.push(node);
      }else{
        toolLeft.push(node);
      }
    })
    
    return (
      <div class="lemon-editor">
        <input
          style="display:none"
          type="file"
          multiple="multiple"
          ref="fileInput"
          accept={this.accept}
          onChange={this._handleChangeFile}
        />
        <div class="lemon-editor__tool">
          <div class="lemon-editor__tool-left">{toolLeft}</div>
          <div class="lemon-editor__tool-right">{toolRight}</div>
        </div>
        <div class="lemon-editor__inner">
          <div
            class="lemon-editor__input"
            ref="textarea"
            contenteditable="true"
            on-keyup={this._handleKeyup}
            on-keydown={this._handleKeydown}
            on-paste={this._handlePaste}
            on-click={this._handleClick}
            on-input={this._handleInput}
            spellcheck="false"
          />
        </div>
        <div class="lemon-editor__footer">
          <div class="lemon-editor__tip">
            {useScopedSlot(this.IMUI.$scopedSlots['editor-footer'],"使用 ctrl + enter 快捷发送消息")}
          </div>
          <div class="lemon-editor__submit">
            <lemon-button
              disabled={this.submitDisabled}
              on-click={this._handleSend}
            >
              {this.sendText}
            </lemon-button>
          </div>
        </div>
      </div>
    );
  },
  methods: {
    /**
     * 初始化工具栏
     */
    initTools(data){
      if(!data) return;
      const defaultTools = [
        {
          name: 'emoji',
          title: "表情",
          click: null,
          render: menu => {
            return <i class="lemon-icon-emoji" />;
          },
        },
        {
          name: 'uploadFile',
          title: "文件上传",
          click: () => this.selectFile("*"),
          render: menu => {
            return <i class="lemon-icon-folder" />;
          },
        },
        {
          name: 'uploadImage',
          title: "图片上传",
          click: ()=>this.selectFile("image/*"),
          render: menu => {
            return <i class="lemon-icon-image" />;
          },
        }
      ];
      let tools = [];
      if (Array.isArray(data)) {
        const indexMap = {
          emoji: 0,
          uploadFile: 1,
          uploadImage:2,
        };
        const indexKeys = Object.keys(indexMap);
        tools = data.map(item => {
          if (indexKeys.includes(item.name)) {
            return {
              ...defaultTools[indexMap[item.name]],
              ...item,
            };
          }
          return item;
        });
      } else {
        tools = defaultTools;
      }
      this.proxyTools = tools;
    },
    _saveLastRange() {
      lastSelectionRange = selection.getRangeAt(0);
    },
    _focusLastRange() {
      this.$refs.textarea.focus();
      if (lastSelectionRange) {
        selection.removeAllRanges();
        selection.addRange(lastSelectionRange);
      }
    },
    _handleClick() {
      this._saveLastRange();
    },
    _handleInput() {
      this._checkSubmitDisabled();
    },
    _renderEmojiTabs() {
      const renderImageGrid = items => {
        return items.map(item => (
          <img
            src={item.src}
            title={item.title}
            class="lemon-editor__emoji-item"
            on-click={() => this._handleSelectEmoji(item)}
          />
        ));
      };
      if (emojiData[0].label) {
        const nodes = emojiData.map((item, index) => {
          return (
            <div slot="tab-pane" index={index} tab={item.label}>
              {renderImageGrid(item.children)}
            </div>
          );
        });
        return <lemon-tabs style="width: 412px">{nodes}</lemon-tabs>;
      } else {
        return (
          <div class="lemon-tabs-content" style="width:406px">
            {renderImageGrid(emojiData)}
          </div>
        );
      }
    },
    _handleSelectEmoji(item) {
      this._focusLastRange();
      exec(`<img emoji-name="${item.name}" src="${item.src}"></img>`);
      this._saveLastRange();
    },
    async selectFile(accept) {
      this.accept = accept;
      await this.$nextTick();
      this.$refs.fileInput.click();
    },
    _handlePaste(e) {
      e.preventDefault();
      const { clipboardData } = e;
      const text = clipboardData.getData("text");
      exec(text, "insertText");
      // Array.from(clipboardData.items).forEach(item => {
      //   console.log(item.type);
      // });
      //e.target.innerText = text;
    },
    _handleKeyup(e) {
      this._saveLastRange();
      //this._checkSubmitDisabled();
    },
    _handleKeydown(e) {
      if(this.submitDisabled == false && this.sendKey(e)){
        this._handleSend();
      }
    },
    getFormatValue() {
      return toEmojiName(
        this.$refs.textarea.innerHTML
          .replace(/<br>|<\/br>/, "")
          .replace(/<div>|<p>/g, "\r\n")
          .replace(/<\/div>|<\/p>/g, "")
      );
    },
    _checkSubmitDisabled() {
      this.submitDisabled = !this.$refs.textarea.innerHTML.trim();
    },
    _handleSend(e) {
      const text = this.getFormatValue();
      this.$emit("send", text);
      this.clear();
      this._checkSubmitDisabled();
    },
    _handleChangeFile(e) {
      const { fileInput } = this.$refs;
      Array.from(fileInput.files).forEach(file => {
        this.$emit("upload", file);
      });
      fileInput.value = "";
    },
    clear() {
      this.$refs.textarea.innerHTML = "";
    },
    initEmoji(data) {
      emojiData = data;
      this.$forceUpdate();
    }
  }
};
</script>
<style lang="stylus">
@import '~styles/utils/index'
gap = 10px;
+b(lemon-editor)
  height 200px
  flex-column()
  +e(tool)
    display flex
    height 40px
    align-items center
    justify-content space-between
    padding 0 5px
  +e(tool-left){
    display flex
  }
  +e(tool-right){
    display flex
  }
  +e(tool-item)
    cursor pointer
    padding 4px gap
    height 28px
    line-height 24px;
    color #999
    transition all ease .3s
    font-size 12px
    [class^='lemon-icon-']
      line-height 26px
      font-size 22px
    &:hover
      color #333
    +m(right){
      margin-left:auto;
    }
  +e(inner)
    flex 1
    overflow-x hidden
    overflow-y auto
    scrollbar-light()
  +e(input)
    height 100%
    box-sizing border-box
    border none
    outline none
    padding 0 gap
    scrollbar-light()
    p,div
      margin 0
    img
      height 20px
      padding 0 2px
      pointer-events none
      vertical-align middle
  +e(footer)
    display flex
    height 52px
    justify-content flex-end
    padding 0 gap
    align-items center
  +e(tip)
    margin-right 10px
    font-size 12px
    color #999
    user-select none
  +e(emoji)
    user-select none
    .lemon-popover
      background #f6f6f6
    .lemon-popover__content
      padding 0
    .lemon-popover__arrow
      background #f6f6f6
    .lemon-tabs-content
      box-sizing border-box
      padding 8px
      height 200px
      overflow-x hidden
      overflow-y auto
      scrollbar-light()
      margin-bottom 8px
  +e(emoji-item)
    cursor pointer
    width 22px
    padding 4px
    border-radius 4px
    &:hover
      background #e9e9e9
</style>
