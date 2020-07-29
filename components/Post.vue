<template>
  <div class="post my-6">
    <div class="user mb-2 ml-4 flex" v-if="!isProfileMode">
      <div class="avatar mr-3">
        <nuxt-link :to="`/users/${user.id}`">
          <img :src="user.photoURL" class="w-8 h-8 rounded-full" alt="">
        </nuxt-link>
      </div>
      <div class="user-name leading-loose text-sm">
        <nuxt-link :to="`/users/${user.id}`">
          <p class="font-bold">{{ user.displayName }}</p>
       </nuxt-link>
      </div>
    </div>
    <a class="font-bold" :href="post.restaurantsUrl" target="_blank">{{ post.restaurantsName }}</a>
    <div class="post-image w-full">
      <img :src="post.image" alt="">
    </div>
    <div class="actions my-2 ml-4 flex">
      <img v-if="beLiked" src='/images/heart_active.svg' @click="unlike" class="w-6 mr-3">
      <img v-else src='/images/heart.svg' @click="like" class="w-6 mr-3">
      <p>{{ likeCount }}</p>
    </div>
    <div class="message mx-4 text-sm">
      <nuxt-link :to="`/users/${user.id}`">
        <span class="font-bold">{{ user.displayName }}</span>
      </nuxt-link>
      <span>{{ post.text }}</span>
    </div>
    <span class="message mx-4 text-sm">コメント</span>
    <div class="message mx-4 text-sm">
      <div v-for="(comment, index) in comments" :key="index" :comment="comment">
        <span class="font-bold">{{ comment.userName }}</span>
        <span>{{ comment.comment }}</span>
      </div>
    </div>
    <div class="message mx-4 text-sm flex border-t border-gray-30">
      <textarea
          class="p-3"
          :rows="1"
          :cols="40"
          placeholder="コメントを追加"
          v-model="postComment"
      />
      <button class="font-semibold text-blue-500" @click="setComment">投稿する</button>
    </div>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase'

export default {
  props: ['post', 'mode'],
  data () {
    return {
      user: {
        id: '',
        displayName: '',
        photoURL: ''
      },
      likeCount: 0,
      beLiked: false,
      comment: null,
      postComment: null,
      comments: []
    }
  },
  async mounted () {
    this.likeRef = db.collection('posts').doc(this.post.id).collection('likes')
    this.checkLikeStatus()

    this.commentRef = db.collection('posts').doc(this.post.id).collection('comments')

    this.fetchUser()

    this.likeRef.onSnapshot((snap) => {
      this.likeCount = snap.size
    })

    this.commentRef.orderBy('createdAt').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const doc = change.doc
        this.comments.push(doc.data())
      })
    })
  },
  methods: {
    async fetchUser () {
      const userId = this.post.userId
      const doc = await db.collection('users').doc(userId).get()
      this.user = { ...doc.data(), id: userId }
    },
    async like () {
      await this.likeRef.doc(this.currentUser.uid).set({ uid: this.currentUser.uid})
      this.beLiked = true
    },
    async unlike () {
      await this.likeRef.doc(this.currentUser.uid).delete()
      this.beLiked = false
    },
    async checkLikeStatus () {
      const doc = await this.likeRef.doc(this.currentUser.uid).get()
      this.beLiked = doc.exists
    },
    async setComment () {
      await this.commentRef.add({
        comment: this.postComment,
        userName: this.currentUser.displayName,
        userId: this.currentUser.uid,
        createdAt: new Date().getTime()
      })
      this.postComment = null
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user
    },
    isProfileMode () {
      return this.mode === 'profile'
    }
  }
}
</script>
