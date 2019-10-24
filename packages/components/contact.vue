<script>
import { isString, isToday } from "utils/validate";
import { timeFormat } from "utils";
export default {
  name: "LemonContact",
  components: {},
  data() {
    return {};
  },
  props: {
    contact: Object,
    simple: Boolean,
    timeFormat: {
      type: Function,
      default(val) {
        return timeFormat(val, isToday(val) ? "h:i" : "y/m/d");
      }
    }
  },
  render() {
    const { contact } = this;
    return (
      <div
        class={["lemon-contact", { "lemon-contact--name-center": this.simple }]}
        on-click={e => this._handleClick(e, contact)}
      >
        <lemon-badge
          count={!this.simple ? contact.unread : 0}
          class="lemon-contact__avatar"
          native-on-click={e => this._handleBubbleClick(e, contact)}
        >
          <lemon-avatar
            size={40}
            native-on-click={e => this._handleAvatarClick(e, contact)}
            src={contact.avatar}
          />
        </lemon-badge>
        <div class="lemon-contact__inner">
          <p class="lemon-contact__label">
            <span class="lemon-contact__name">{contact.displayName}</span>
            {!this.simple && (
              <span class="lemon-contact__time">
                {this.timeFormat(contact.lastSendTime)}
              </span>
            )}
          </p>
          {!this.simple && (
            <p class="lemon-contact__content">
              {isString(contact.lastContent) ? (
                <span domProps={{ innerHTML: contact.lastContent }} />
              ) : (
                contact.lastContent
              )}
            </p>
          )}
        </div>
      </div>
    );
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    _handleClick(e, data) {
      this.$emit("click", data);
    },
    _handleAvatarClick(e, data) {
      e.stopPropagation();
      this.$emit("avatar-click", data);
    },
    _handleBubbleClick(e, data) {
      e.stopPropagation();
      this.$emit("bubble-click", data);
    }
  }
};
</script>
<style lang="stylus">
@import '~styles/utils/index'
+b(lemon-contact)
  padding 10px 14px
  cursor pointer
  user-select none
  box-sizing border-box
  overflow hidden
  background #efefef
  p
    margin 0
  +m(active)
    background #bebdbd
  &:hover:not(.lemon-contact--active)
    background #e3e3e3
    .el-badge__content
      border-color #ddd
  +e(avatar)
    float left
    margin-right 10px
    img
      display block
    .ant-badge-count
      display inline-block
      padding 0 4px
      height 18px
      line-height 18px
      min-width 18px
      top -4px
      right 7px
  +e(label)
    display flex
  +e(time)
    font-size 12px
    line-height 18px
    padding-left 6px
    color #999
    white-space nowrap
  +e(name)
    display block
    width 100%
    ellipsis()
  +e(content)
    font-size 12px
    color #999
    ellipsis()
    img
      height 14px
      display inline-block
      vertical-align middle
      margin 0 1px
  +m(name-center)
    +e(label)
      padding-bottom 0
      line-height 38px
</style>
