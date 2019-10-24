export default {
  voice(message) {
    return "[语音]";
  },
  file(message) {
    return "[文件]";
  },
  video(message) {
    return "[视频]";
  },
  image(message) {
    return "[图片]";
  },
  text(message) {
    return this.replaceEmojiName(message.content);
  }
};
