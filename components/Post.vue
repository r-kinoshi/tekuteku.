<template>
<div>
    <div v-if="postUp && isProfileMode ||postUp && isAllMode">
      <post-details v-for="(postDetail, index) in postDetails" @like="like" @unlike="unlike" @likeSnap="likeSnap" @checkLikeStatus="checkLikeStatus" @closePost="closePost" :key="index" :postDetail="postDetail" />
    </div>
  <div class="post-desk">
    <div class="user my-2 ml-4 flex" v-if="!isProfileMode && !isAllMode">
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
    <a v-if="!isProfileMode && !isAllMode" class="post-desk__shop font-bold ml-4 break-all" :href="post.restaurantsUrl" target="_blank">{{ post.restaurantsName }}</a>
    <div class="post-desk__image" @click="modalPost">
      <img :src="post.image" alt="">
    </div>
    <div v-if="!isProfileMode && !isAllMode" class="message my-2 ml-4 flex">
      <img v-if="beLiked" src='/images/heart_active.svg' @click="unlike" class="w-6 mr-3">
      <img v-else src='/images/heart.svg' @click="like" class="w-6 mr-3">
      <p>{{ likeCount }}</p>
    </div>
    <div v-if="!isProfileMode && !isAllMode" class="message mx-4 text-sm">
      <nuxt-link :to="`/users/${user.id}`">
        <span class="font-bold">{{ user.displayName }}</span>
      </nuxt-link>
      <span>{{ post.text }}</span>
    </div>
    <span v-if="!isProfileMode && !isAllMode" class="message mx-4 text-sm text-gray-600">コメント</span>
    <div v-if="!isProfileMode && !isAllMode" class="message mx-4 text-sm">
      <div v-for="(comment, index) in comments" :key="index" :comment="comment">
        <span class="font-bold">{{ comment.userName }}</span>
        <span class="break-all">{{ comment.comment }}</span>
      </div>
    </div>
    <div v-if="!isProfileMode && !isAllMode" class="message mx-4 text-sm flex justify-between border-t border-gray-30 p-3">
      <textarea
          class="p-3 w-4/5 outline-none resize-none"
          :rows="1"
          :cols="40"
          placeholder="コメントを追加"
          v-model="postComment"
      />
      <button class="post-desk__post-cmt font-semibold text-blue-500 " @click="setComment">投稿する</button>
    </div>
  </div>
</div>
</template>

<script>
import { db } from '~/plugins/firebase'
import PostDetails from '~/components/PostDetails'

export default {
  props: ['post', 'mode'],
  components: {
    PostDetails
  },
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
      comments: [],
      postDetails: [],
      postUp: false
    }
  },
  async mounted () {
    this.likeRef = db.collection('posts').doc(this.post.id).collection('likes')
    this.checkLikeStatus()
    this.fetchUser()
    this.likeSnap()

    this.commentRef = db.collection('posts').doc(this.post.id).collection('comments')
    this.checkComment()
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
    likeSnap () {
      this.likeRef.onSnapshot((snap) => {
        this.likeCount = snap.size
      })
    },
    async setComment () {
      await this.commentRef.add({
        comment: this.postComment,
        userName: this.currentUser.displayName,
        userId: this.currentUser.uid,
        createdAt: new Date().getTime()
      })
      this.postComment = null
    },
    async modalPost () {
      const createdAt = this.post.createdAt
      const snap = await db.collection('posts').where('createdAt', '==', createdAt).get()
      snap.forEach((doc) => {
        this.postDetails.push(doc.data())
      })
      this.postUp = true
    },
    async checkComment () {
      await this.commentRef.orderBy('createdAt').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const doc = change.doc
        this.comments.push(doc.data())
      })
    })
    },
    closePost () {
      this.postUp = false
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user
    },
    isProfileMode () {
      return this.mode === 'profile'
    },
     isAllMode () {
      return this.mode === 'all'
    }
  }
}
</script>

<style scoped>
.post-desk {
  width: 35%;
  min-width: 320px;
  margin: 1.5rem auto;
  outline: solid 1px #CDCDCF;
  padding-top: 5px;
  box-sizing: border-box;
}

.post-desk__image img{
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  max-height:500px;
  height : auto;
}

@media screen and (max-width: 768px) {
  .post-desk__post-cmt{
    font-size:12px;
  }
}
@media screen and (max-width: 480px) {
  .post-desk { 
    width: 100vw;
    min-width: 100vw;
  }
  .post-desk__image {
    width: 100vw;
  }
  .user {
    margin: 2%;
  }
  .post-desk__shop {
    margin: 2%;
  }
  .message {
    margin: 2%;
    padding: 0;
  }
}

</style>
