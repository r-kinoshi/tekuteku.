<template>
 <div class="user-container mb-32">
   <div class="user flex justify-between px-8 my-8">
     <div class="flex">
       <div class="user-avatar mr-4">
         <img :src="user.photoURL" class="w-20 h-20 rounded-full border rounded-full border-solid border-gray-500">
       </div>
       <div class="user-name vertical-middle">
         <p>{{ user.displayName }}</p>
       </div>
     </div>
     <div class="logout-wrapper">
      <button v-if="isCurrentUser" class="logout" @click="logout">ログアウト</button>
     </div>
   </div>
   <div class="tab flex justify-around border-b">
     <div class="post-count text-center w-1/3" :class="[ mode === modes.posts ? 'selectStyle' : 'nonStyle' ]">
       <p @click="mode = modes.posts" class="cursor-pointer mt-1">Post</p>
       <span class="text-xs">{{ posts.length }}</span>
     </div>
     <div class="text-center w-1/3" :class="[ mode === modes.followings ? 'selectStyle' : 'nonStyle' ]">
       <p @click="mode = modes.followings" class="cursor-pointer mt-1">Following</p>
       <span class="text-xs">{{ followingCount }}</span>
     </div>
     <div class="text-center w-1/3" :class="[ mode === modes.follower ? 'selectStyle' : 'nonStyle' ]">
       <p @click="mode = modes.follower" class="cursor-pointer mt-1">Follower</p>
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
.user-container {
  width: 1000px;
  margin:0 auto;
  box-sizing: border-box;
}

.post {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto 1fr;
  grid-gap: 1vw 3vw;
  justify-content: space-evenly;
  overflow: hidden;
  margin-bottom: 10%;
}

.selectStyle {
  background: #F7F6F6;
}

.nonStyle {
  background: #fff;
}

>>>.post-desk {
  outline: none;
}

>>>.post-colums {
  grid-column: span 4;
  max-height:300px;
}

>>>.post-desk__image img{
  max-height:300px;
  }


.logout-wrappre {
  margin: 10px auto;
  cursor: pointer;
}

.logout {
  display: inline-block;
  height: 2.4rem;
  line-height: 2.2rem;
  padding: 0 0.5em;
  /* vertical-align: middle; */
  color: #D9DADA;
  background-color: transparent;
  border: 1px solid currentColor;
  border-radius: 0.3rem;
  cursor: pointer;
}

.logout:hover {
  text-decoration: none;
  color: #C7C7C7;
  opacity: 0.85;
}

@media screen and (max-width: 960px) {
  .user-container {
    width:100%;
  }

  .post {
    justify-content: normal;
    grid-template-rows: auto 1fr;
  }
}

@media screen and (max-width: 800px) {
  >>>.post-desk {
    margin:0;
  }

  >>>.post-desk__image img{
    width: 250px;
  }

  >>>.post-colums {
  grid-column: span 4;
  max-width: 250px;
  }
}

@media screen and (max-width: 700px) {
  .post {
    grid-template-rows: none;
  }

>>>.post-colums {
    grid-column: span 4;
    max-height: 130px;
  }

>>>.post-desk__image img{
    width:120px;
  }

>>>.post-desk {
    max-height:300px;
  }

>>>.post-up__content {
    width: 100%;
    min-width: 100vw;
  }

  .user {
    padding-right: 1rem;
  }
}

@media screen and (max-width: 340px) {
>>>.post-desk__image img{
    width:100px;
  }
>>>.post-colums {
    max-height: 120px;
  }
  .user {
    padding-left: 1rem;
  }
}

</style>
