<template>
 <div class="mb-32">
   <div class="user flex justify-between px-8 my-8">
     <div class="flex">
       <div class="user-avatar mr-4">
         <img :src="user.photoURL" class="w-20 h-20 rounded-full border rounded-full border-solid border-gray-500">
       </div>
       <div class="user-name vertical-middle">
         <p>{{ user.displayName }}</p>
       </div>
     </div>
     <button v-if="isCurrentUser" class="text-sm" @click="logout">ログアウト</button>
   </div>
   <div class="tab flex justify-around">
     <div class="post-count text-center">
       <p @click="mode = modes.posts">Post</p>
       <span class="text-xs">{{ posts.length }}</span>
     </div>
     <div class="text-center">
       <p @click="mode = modes.followings">Following</p>
       <span class="text-xs">{{ followingCount }}</span>
     </div>
     <div class="text-center">
       <p @click="mode = modes.follower">Follower</p>
       <span class="text-xs">{{ followerCount }}</span>
     </div>
   </div>
   <div class="post" v-if="mode === modes.posts">
    <post v-for="post in posts" :key="post.id" :post="post" :mode="'profile'"/>
   </div>
   <div v-else-if="mode === modes.followings">
     <following />
   </div>
   <div v-else-if="mode === modes.follower">
     <follower :followers="followers" />
   </div>
 </div>
</template>

<script>
import { firebase,db } from '~/plugins/firebase'
import { mapActions } from 'vuex'
import Post from '~/components/Post'
import Following from '~/components/Following'
import Follower from '~/components/Follower'


export default {
  components: {
    Post,
    Following,
    Follower
  },
  data () {
    return {
      followingCount: 0,
      followerCount: 0,
      user: {
        displayName: '',
        photoURL: ''
      },
      posts: [],
      modes: {
        posts: 'posts',
        followings: 'followings',
        followers: 'followers'
      },
      mode: 'posts',
      followers: []
    }
  },
  methods: {
    ...mapActions(['setUser']),
    async fetchFollowingCount () {
      const userID = this.$route.params.id
      const snap = await db.collection('users').doc(userID).collection('followings').get()
      this.followingCount = snap.size
    },
     async fetchFollowerCount () {
      const userID = this.$route.params.id
      const snap = await db.collection('users').doc(userID).collection('followers').get()
      this.followerCount = snap.size
    },
    logout () {
      firebase.auth().signOut()
        .then(() => {
          this.setUser(null)
        })
        .catch((error) => {
          window.alert(error)
        })
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user
    },
    isCurrentUser () {
      if (this.currentUser) {
        return this.currentUser.uid == this.$route.params.id
      }
    }
  },
  async mounted () {
    const userId = this.$route.params.id
    const doc = await db.collection('users').doc(userId).get()
    this.user = doc.data()

    const snapshot = await db.collection('posts').where('userId', '==', userId).get()
    snapshot.forEach((doc) => {
      this.posts.push({ id: doc.id, ...doc.data() })
    })

    this.fetchFollowingCount()
    this.fetchFollowerCount()

    const userID = this.$route.params.id
    const snap = await db.collection('users').doc(userID).collection('followers').get()
    snap.forEach((doc) => {
      this.followers.push(doc.data())
    })

  }
}
</script>

<style scoped>
.post{
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}

/deep/.post-desk {
  box-sizing: border-box;
  margin:0;
  width: 33.333333%;
  flex: 0 1 calc(100% / 3);
  }

@media screen and (max-width: 768px) {
  .post-desk { 
    width: 33.333333%;
  }
  .post-desk__image {
    width: 33.333333%;
  }
}
@media screen and (max-width: 480px) {

}

</style>
