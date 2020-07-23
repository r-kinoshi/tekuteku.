<template>
 <div class="mb-32">
   <div class="user flex justify-between px-8 my-8">
     <div class="flex">
       <div class="user-avatar mr-4">
         <img :src="user.photoURL" v-if="nullIcon" class="w-12 h-12 rounded-full">
       </div>
       <div class="user-name vertical-middle" v-if="nullName">
         <p>{{ user.displayName }}</p>
       </div>
     </div>
     <button v-if="isCurrentUser" class="text-sm" @click="logout">ログアウト</button>
   </div>
   <div class="tab flex justify-around">
     <div class="post-count text-center">
       Post
       </br>
       <span class="text-xs">{{ posts.length }}</span>
     </div>
     <div class="text-center">
       Following
       </br>
       <span class="text-xs">{{ followingCount }}</span>
     </div>
     <div class="text-center">
       Follower
       </br>
       <span class="text-xs">{{ followerCount }}</span>
     </div>
   </div>
   <post v-for="post in posts" :key="post.id" :post="post" :mode="'profile'"/>
 </div>
</template>

<script>
import { firebase,db } from '~/plugins/firebase'
import { mapActions } from 'vuex'
import Post from '~/components/Post'

export default {
  components: {
    Post
  },
  data () {
    return {
      followingCount: 0,
      followerCount: 0,
      user: {
        displayName: '',
        photoURL: ''
      },
      posts: []
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
    },
    nullIcon () {
      if (this.user.photoURL == null) {
        return this.user.photoURL = '/images/icon(2).png'
      }
    },
    nullName () {
      if (this.user.displayName == null) {
        return this.user.displayName = 'guests'
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

  }
}
</script>