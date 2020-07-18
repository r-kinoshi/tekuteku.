<template>
 <div class="mb-32">
   <div class="user flex justify-between px-8 my-8">
     <div class="flex">
       <div class="user-avatar mr-4">
         <img :src="user.photoURL" class="w-12 h-12 rounded-full">
       </div>
       <div class="user-name vertical-middle">
         <p>{{ user.displayName }}</p>
       </div>
     </div>
     <button v-if="isCurrentUser" class="text-sm" @click="logout">ログアウト</button>
   </div>
   <div class="tab flex justify-around">
     <div class="post-count text-center">
       Post
       </br>
       <span class="text-xs">0</span>
     </div>
     <div class="text-center">
       Following
       </br>
       <span class="text-xs">0</span>
     </div>
     <div class="text-center">
       Follower
       </br>
       <span class="text-xs">0</span>
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
      user: {
        displayName: '',
        photoURL: ''
      },
      posts: []
    }
  },
  methods: {
    ...mapActions(['setUser']),
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
  }
}
</script>