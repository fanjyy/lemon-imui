<script>
import { hoursTimeFormat } from "utils";
import dropdown from "../directives/dropdown";
export default {
  name: "LemonMessages",
  components: {},
  props: {
    //是否隐藏消息发送人昵称
    hideName:Boolean,
    //是否隐藏显示消息时间
    hideTime:Boolean,
    reverseUserId: String,
    timeRange: {
      type: Number,
      default: 1
    },
    timeFormat: {
      type: Function,
      default(val) {
        return hoursTimeFormat(val);
      }
    },
    messages: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      _loading: false,
      _loadend: false
    };
  },
  render() {
    return (
      <div class="lemon-messages" ref="wrap" on-scroll={this._handleScroll}>
        <div
          class={[
            "lemon-messages__load",
            `lemon-messages__load--${this._loadend ? "end" : "ing"}`
          ]}
        >
          {this._loadend ? this._renderLoadEnd() : this._renderLoading()}
        </div>
        {this.messages.map((message, index) => {
          const node = [];
          const tagName = `lemon-message-${message.type}`;
          const prev = this.messages[index - 1];
          if (
            prev &&
            this.msecRange &&
            message.sendTime - prev.sendTime > this.msecRange
          ) {
            node.push(
              <lemon-message-event
                attrs={{
                  message: {
                    id: "__time__",
                    type: "event",
                    content: hoursTimeFormat(message.sendTime)
                  }
                }}
              />
            );
          }

          let attrs;
          if(message.type == 'event'){
            attrs = {message: message};
          }else{
            attrs = {
              timeFormat: this.timeFormat,
              message: message,
              reverse: this.reverseUserId == message.fromUser.id,
              hideTime:this.hideTime,
              hideName: this.hideName
            }
          }
          node.push(
            <tagName
              ref="message"
              refInFor={true}
              attrs={attrs}
            />
          );
          return node;
        })}
      </div>
    );
  },
  computed: {
    msecRange() {
      return this.timeRange * 1000 * 60;
    }
  },
  watch: {},
  methods: {
    _renderLoading() {
      return <i class="lemon-icon-loading lemonani-spin" />;
    },
    _renderLoadEnd() {
      return <span>暂无更多消息</span>;
    },
    loaded() {
      this._loadend = true;
      this.$forceUpdate();
    },
    resetLoadState() {
      this._loading = false;
      this._loadend = false;
    },
    async _handleScroll(e) {
      const { target } = e;
      dropdown.hide();
      if (
        target.scrollTop == 0 &&
        this._loading == false &&
        this._loadend == false
      ) {
        this._loading = true;
        await this.$nextTick();
        const hst = target.scrollHeight;

        this.$emit("reach-top", async isEnd => {
          await this.$nextTick();
          target.scrollTop = target.scrollHeight - hst;
          this._loading = false;
          this._loadend = !!isEnd;
        });
      }
    },
    async scrollToBottom() {
      await this.$nextTick();
      const { wrap } = this.$refs;
      if (wrap) {
        wrap.scrollTop = wrap.scrollHeight;
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="stylus">
@import '~styles/utils/index'
+b(lemon-messages)
  height 400px
  overflow-x hidden
  overflow-y auto
  scrollbar-light()
  padding 10px 15px
  +e(time)
    text-align center
    font-size 12px
  +e(load)
    user-select none
    font-size 12px
    text-align center
    color #999
    line-height 30px
    +m(ing)
      font-size 22px
</style>
