<template>
 <div>
  <div class="posts overflow-scroll z-0 mb-24">
    <post v-for="(post, index) in posts" :key="index" :post="post" />
  </div>
  <div v-if="isAuthenticated && modalVisible" class="modal">
    <div class="modal_content p-8 md:sm:w-1/4 h-hull bg-white z-20 rounded fixed my-0">
      <div class="actions mt-4 flex justify-between px-8">
        <div class="back-btn vertical-middle">
          <img src="/images/back.svg" class="h-4" @click="modalVisible = false">
        </div>
        <div class="post-btn" @click="post">
          Post
        </div>
      </div>
      <div class="moda_content p-8">
        <input
          class="shadow appearance-none border rounded py-2 px-3 w-64 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="店舗名"
          @input="handleChange"
          autocomplete="on"
          list="restaurants"
          v-model="restaurantsName"
        />
        <div class="mt-2" />
        <datalist id="restaurants"  v-if="!fetching">
          <option
            v-for="r of restaurants"
            :key="r.id"
            :value="r.name"
          >
        {{ r.name }}
          </option>
        </datalist>
        <el-upload
          v-if="!imageUrl"
          action=""
          :show-file-list="false"
          :http-request="uploadFile"
          >
          <el-button size="small" type="primary">Click to upload</el-button>
        </el-upload>
        <div class="flex justify-center">
          <img :src="imageUrl" class="uploaded-image">
        </div>
        <textarea
          class="mt-8"
          :rows="5"
          :cols="50"
          placeholder="please input"
          v-model="text"
        />
      </div>
    </div>
  </div>
  <div v-else-if="!isAuthenticated　&& modalVisible" class="modal-overlay">
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
      imageUrl: null,
      text: null,
      restaurantsName: null,
      restaurantsUrl: null,
      email: 'guests@example.com',
      password: '7777777',
      fetching: true,
      restaurants: [],
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
          window.alert(error)
        })
    },
    guestsLogin () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          this.setUser(result.user)
        }).catch((error) => {
          window.alert(error)
        })
    },
     handleChange: throttle(1000, async function (e) {
      this.fetching = true
      const name = e.data
      const urlParams = new URLSearchParams()
      urlParams.append('keyid' ,process.env.GNAVI_API_KEY)
      urlParams.append('name', name)
      const res = await fetch(
        `https://api.gnavi.co.jp/RestSearchAPI/v3/?${urlParams.toString()}`
      )
      this.fetching = false
      if (res.ok) {
        const { rest } = await res.json()
        this.restaurants = rest
      }
    }),
    getRestaurantsByName (name) {
      for(let r in this.restaurants) {
      console.log(this.restaurants[r])
      const restaurant = this.restaurants[r]
      console.log(restaurant.name)
        if (restaurant.name == name){
          console.log('一致しました')
          return restaurant
        }
      }
    },
    async post () {
      const restaurant = this.getRestaurantsByName(this.restaurantsName)
      console.log(restaurant.url)
      this.restaurantsUrl = restaurant.url
      console.log( this.restaurantsUrl)

      await db.collection('posts').add({
        text: this.text,
        image: this.imageUrl,
        restaurantsName: this.restaurantsName,
        restaurantsUrl: this.restaurantsUrl,
        createdAt: new Date().getTime(),
        userId: this.currentUser.uid
      })
      this.modalVisible = false
      this.text = null
      this.imageUrl = null
      this.restaurantsName = null
      this.restaurantsUrl = null
      window.alert('保存されたよ')
    },
    openModal () {
      this.modalVisible = true
    },
    async uploadFile (data) {
      const storageRef = firebase.storage().ref()
      const time = new Date().getTime()
      const ref = storageRef.child(`posts/${time}_${data.file.name}`)
      const snapshot = await ref.put(data.file)
      const url = await snapshot.ref.getDownloadURL()
      this.imageUrl = url
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
