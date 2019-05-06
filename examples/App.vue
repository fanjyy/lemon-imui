<template>
  <div id="app">
    <lemon-im v-bind="IMData"
              @pull-friends-message="pullFriendsMessage"></lemon-im>
  </div>
</template>

<script>
export default {
  name: "app",
  data () {
    this.friendData = {
      "id": 1,
      "diaplayName": "贤心",
      "avatarPath": "a.jpg",
      "sign": "这些都是测试数据，实际使用请严格按照该格式返回"
    }
    return {
      IMData: {
        friends: [],
        groups: [],
      }
    };
  },
  mounted: function () {
    setInterval(() => {
      this.IMData.friends.push({ ...this.friendData })
      this.friendData.id++
    }, 1000)
  },
  methods: {
    pullFriendsMessage (data, resolve, reject) {
      resolve([{ ...this.friendData }])
      //resolve([...this.friendData.id])
      this.friendData.id++
    },
    pullGroups () {

    }
  }
};
</script>

<style lang="sass"></style>
