
<template>
  <div>
    <div class="post-desk">
    <div class="user my-2 ml-4 flex">
      <div class="avatar mr-3 border rounded-full border-solid border-black">
        <nuxt-link :to="`/users/${user.id}`">
          <img :src="user.photoURL" class="user-image w-8 h-8 rounded-full" alt="">
        </nuxt-link>
      </div>
      <div class="user-name leading-loose text-sm">
        <nuxt-link :to="`/users/${user.id}`">
          <p class="font-bold">{{ user.displayName }}</p>
       </nuxt-link>
      </div>
    </div>
    <a class="post-desk__shop font-bold ml-4 break-all" :href="postDetail.restaurantsUrl" target="_blank">{{ postDetail.restaurantsName }}</a>
    <div class="post-desk__image">
      <img :src="postDetail.image" alt="">
    </div>
    <div class="message my-2 ml-4 flex">
      <img v-if="beLiked" src='/images/heart_active.svg' @click="unlike" class="w-6 mr-3">
      <img v-else src='/images/heart.svg' @click="like"  class="w-6 mr-3">
      <p>{{ likeCount }}</p>
    </div>
    <div class="message mx-4 text-sm">
      <nuxt-link :to="`/users/${user.userID}`">
        <span class="font-bold">{{ user.displayName }}</span>
      </nuxt-link>
      <span>{{ postDetail.text }}</span>
    </div>
    </div>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase'

export default {
  props: ['postDetail'],
  data () {
    return {
       user: {
        id: '',
        displayName: '',
        photoURL: ''
      },
      likeCount: 0,
      beLiked: false
    }
  },
  async mounted () {
    const userId = this.postDetail.userId
    const doc = await db.collection('users').doc(userId).get()
    this.user = { ...doc.data(), id: userId }
  
    this.$emit('likeSnap')
  },
  methods: {
    like () {
      this.$emit('like')
      this.beLiked = true
    },
    unlike () {
      this.$emit('unlike')
      this.beLiked = false
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user
    }
  }
}
</script>