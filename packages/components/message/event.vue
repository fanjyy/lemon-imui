<script>
export default {
  name: "lemonMessageEvent",
  inheritAttrs: false,
  render() {
    const { content } = this.$attrs.message;
    return (
      <div class="lemon-message lemon-message-event">
        <span class="lemon-message-event__content">{content}</span>
      </div>
    );
  }
};
</script>
<style lang="stylus">
@import '~styles/utils/index'
+b(lemon-message-event)
  +e(content)
    user-select none
    display inline-block
    background #e9e9e9
    color #aaa
    font-size 12px
    margin 0 auto
    padding 5px 10px
    border-radius 4px
</style>
