<template>
  <div class="post my-6">
    <div class="user mb-2 ml-4 flex">
      <div class="avatar mr-3">
        <a><img :src="user.photoURL" class="w-8 h-8 rounded-full" alt=""></a>
      </div>
      <div class="user-name leading-loose text-sm">
        <p class="font-bold">{{ username }}</p>
      </div>
    </div>
    <div class="post-image w-full">
      <img :src="post.image" alt="">
    </div>
    <div class="actions my-2 ml-4 flex">
      <img v-if="beLiked" src='/images/heart_active.svg' class="w-6 mr-3">
      <img v-else src='/images/heart.svg' class="w-6 mr-3">
      <p>0</p>
    </div>
    <div class="message mx-4 text-sm">
      <p>{{ post.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post'],
  data () {
    return {
      user: {
        displayName: 'rika0123',
        photoURL: '/images/post1.jpg'
      },
      beLiked: false
    }
  },
  computed: {
     currentUser () {
      return this.$store.state.user
    },
    username () {
      return this.user.displayName.charAt(0).toUpperCase() + this.user.displayName.slice(1)
    }
  }
}
</script>
