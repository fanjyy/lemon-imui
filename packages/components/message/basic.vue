<script>
export default {
  name: "lemonMessageBasic",
  inject: ["IMUI"],
  props: {
    message: {
      type: Object,
      default: () => {
        return {};
      }
    },
    timeFormat: {
      type: Function,
      default: () => ""
    },
    reverse: Boolean,
    hiddenTitle: Boolean
  },
  data() {
    return {};
  },
  render() {
    const { fromUser, status, sendTime } = this.message;
    return (
      <div
        class={[
          "lemon-message",
          {
            "lemon-message--reverse": this.reverse,
            "lemon-message--hidden-title": this.hiddenTitle
          }
        ]}
      >
        <div class="lemon-message__avatar">
          <lemon-avatar
            size={36}
            shape="square"
            src={fromUser.avatar}
            on-click={e => {
              this._emitClick(e, "avatar");
            }}
          />
        </div>
        <div class="lemon-message__inner">
          <div class="lemon-message__title">
            <span
              on-click={e => {
                this._emitClick(e, "displayName");
              }}
            >
              {fromUser.displayName}
            </span>
            <span class="lemon-message__time">{this.timeFormat(sendTime)}</span>
          </div>
          <div
            class="lemon-message__content"
            on-click={e => {
              this._emitClick(e, "content");
            }}
          >
            {this.useScopedSlots("content", this.message)}
          </div>
          <div
            class="lemon-message__status"
            on-click={e => {
              this._emitClick(e, "status");
            }}
          >
            {this._renderStatue(status)}
          </div>
        </div>
      </div>
    );
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    _emitClick(e, key) {
      this.IMUI.$emit("message-click", e, key, this.message);
    },
    _renderStatue(status) {
      if (status == "going") {
        return <i class="lemon-icon-loading lemonani-spin" />;
      } else if (status == "failed") {
        return (
          <i
            class="lemon-icon-prompt"
            title="重发消息"
            style={{
              color: "#ff2525",
              cursor: "pointer"
            }}
          />
        );
      }
      return;
    },
    useScopedSlots(name, params, defVnode = "", context = this) {
      return context.$scopedSlots[name]
        ? context.$scopedSlots[name](params)
        : defVnode;
    }
  }
};
</script>
<style lang="stylus">
@import '~styles/utils/index'
arrow()
  content ' '
  position absolute
  top 6px
  width 0
  height 0
  border 4px solid transparent
+b(lemon-message)
  display flex
  padding 10px 0
  +e(time)
    color #bbb
    padding 0 4px
  +e(inner)
    position relative
  +e(avatar)
    padding-right 10px
    user-select none
    .lemon-avatar
      cursor pointer
  +e(title)
    display flex
    font-size 12px
    line-height 14px
    padding-bottom 6px
    user-select none
    color #999
  +e(content)
    font-size 14px
    line-height 20px
    padding 8px 10px
    background #fff
    border-radius 4px
    position relative
    margin 0 46px 0 0
    img
    video
      background #e9e9e9
      height 100px
    &:before
      arrow()
      left -4px
      border-left none
      border-right-color #fff
  +e(status)
    position absolute
    top 23px
    right 20px
    color #aaa
    font-size 20px
  +m(reverse)
    flex-direction row-reverse
    +e(title)
      flex-direction row-reverse
    +e(status)
      left 20px
      right auto
    +e(content)
      background #35d863
      margin 0 0 0 46px
      &:before
        arrow()
        left auto
        right -4px
        border-right none
        border-left-color #35d863
    +e(title)
      text-align right
    +e(avatar)
      padding-right 0
      padding-left 10px
  +m(hidden-title)
    +e(status)
      top 7px
    +e(title)
      display none
    +e(content)
      &:before
        top 14px
</style>
