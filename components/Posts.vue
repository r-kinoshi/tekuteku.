<template>
 <div>
  <div class="posts overflow-scroll z-0 mb-24">
    <post v-for="(post, index) in posts" :key="index" :post="post" />
  </div>
  <div v-if="!isAuthenticated　&& modalVisible" class="modal-overlay">
    <div class="modal_content p-8 md:sm:w-1/4 h-hull bg-white z-20 rounded fixed my-0">
        <div class="close-btn" @click="modalVisible = false">
          <img src="/images/x (1).svg">
        </div>
      <div class="flex justify-center m-1">
        <div>
          <ul>
            <li>メールアドレス</li>
            <li><input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-1 px-4 block w-64 appearance-none leading-normal" type="email" v-model="email"/></li>
            <li>パスワード</li>
            <li><input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-1 px-4 block w-64 appearance-none leading-normal" type="password" v-model="password"/></li>
          </ul>
        </div>
      </div>
      <div class="flex justify-center m-10">
        <button class="ustify-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 w-64 px-4 rounded-full" @click="guestsLogin">
        かんたんログイン
        </button>
      </div>
      <div class="flex justify-center m-10">
        <button class="ustify-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 w-64 px-4 rounded-full" @click="login">
        twitterログイン
        </button>
      </div>
    </div>
  </div>
 </div>
</template>

<script>
import Post from '~/components/Post.vue'
import { db, firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'
import { throttle } from 'throttle-debounce'


export default {
  components: {
    Post
  },
  data () {
    return {
      posts: [],
      email: 'guests@example.com',
      password: '7777777',
      modalVisible: false
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },
  mounted () {
    if (this.currentUser) {
      this.watchPostsChange()
    }
  },
  watch: {
    currentUser (user) {
      if (user) {
        this.watchPostsChange()
      }
    }
  },
  methods: {
    ...mapActions(['setUser']),
    login () {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          this.setUser(result.user)
        }).catch((error) => {
          return error
        })
    },
    guestsLogin () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          this.setUser(result.user)
        }).catch((error) => {
          return error
        })
    },
    openModal () {
      this.modalVisible = true
    },
    async watchPostsChange () {
      const snapshot = await db.collection('users').doc(this.currentUser.uid).collection('followings').get()
      const followings = [this.currentUser.uid]
      snapshot.forEach((doc) => {
        followings.push(doc.id)
      })

      db.collection('posts').where('userId', 'in', followings).orderBy('createdAt').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const doc = change.doc
          if (change.type === 'added') {
            this.posts.unshift({ id: doc.id, ...doc.data() })
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.cover-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
}

.list-item {
  min-width: 500px;
  width: 500px;
}

</style>
