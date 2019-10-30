<script>
import { toEmojiName } from "utils";
const exec = (val, command = "insertHTML") => {
  document.execCommand(command, false, val);
};
const selection = window.getSelection();
let lastSelectionRange;
let emojiData = [];
export default {
  name: "LemonEditor",
  components: {},
  props: {},
  data() {
    return {
      submitDisabled: true,
      accept: ""
    };
  },
  created() {},
  mounted() {
    //this.$refs.fileInput.addEventListener("change", this._handleChangeFile);
  },
  computed: {},
  watch: {},
  render() {
    //<a-popover trigger="click" overlay-class-name="lemon-editor__emoji">
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
          {emojiData.length > 0 && (
            <lemon-popover class="lemon-editor__emoji">
              <template slot="content">{this._renderEmojiTabs()}</template>
              <div class="lemon-editor__tool-item">
                <i class="lemon-icon-emoji" />
              </div>
            </lemon-popover>
          )}
          <div
            class="lemon-editor__tool-item"
            on-click={() => this._handleSelectFile("*")}
          >
            <i class="lemon-icon-folder" />
          </div>
          <div
            class="lemon-editor__tool-item"
            on-click={() => this._handleSelectFile("image/*")}
          >
            <i class="lemon-icon-image" />
          </div>
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
          <div class="lemon-editor__tip">使用 ctrl + enter 快捷发送消息</div>
          <div class="lemon-editor__submit">
            <lemon-button
              disabled={this.submitDisabled}
              on-click={this._handleSend}
            >
              发 送
            </lemon-button>
          </div>
        </div>
      </div>
    );
  },
  methods: {
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
    async _handleSelectFile(accept) {
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
      const { keyCode } = e;
      if (keyCode == 13) {
        // e.preventDefault();
        // document.execCommand("defaultParagraphSeparator", false, false);
        // exec("<br>");
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
    padding-left 5px
  +e(tool-item)
    cursor pointer
    padding 4px gap
    height 28px
    color #999
    transition all ease .3s
    [class^='lemon-icon-']
      line-height 26px
      font-size 22px
    &:hover
      color #333
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
