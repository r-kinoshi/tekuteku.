<template>
<div class="modal"> 
  <div class="modal_content md:sm:w-1/4 h-hull bg-white z-30 rounded fixed my-0">
    <div class="actions mt-4 flex justify-between px-8 items-start">
      <div class="back-btn vertical-middle">
        <img src="/images/back.svg" class="h-4" @click="closePost">
      </div>
      <div class="post-btn" @click="post">
        シェア
      </div>
    </div>
    <div class="moda_content p-8">
      <div class="flex justify-center p-8">
        <input
          class="appearance-none border rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none"
          type="text"
          placeholder="店舗名"
          @input="handleChange"
          autocomplete="on"
          list="restaurants"
          v-model="restaurantsName"
        />
        <datalist id="restaurants"  v-if="!fetching">
          <option
            v-for="r of restaurants"
            :key="r.id"
            :value="r.name"
          >
        {{ r.name }}
          </option>
        </datalist>
      </div>
       <div class="flex justify-center">
        <img :src="imageUrl" class="uploaded-image">
      </div>
      <el-upload
        v-if="!imageUrl"
        action=""
        :show-file-list="false"
        :http-request="uploadFile"
        >
        <el-button size="small" type="primary">写真を選択</el-button>
      </el-upload>
      <div class="px-8">
      <textarea
        class="mt-8 resize-none w-full border rounded focus:outline-none p-2"
        :rows="5"
        :cols="40"
        placeholder="何か書く..."
        v-model="text"
      />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Post from '~/components/Post.vue'
import AppFooter from '~/components/Footer'
import { db, firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'
import { throttle } from 'throttle-debounce'

export default {
  props: ['modal'],
  components: {
    AppFooter
  },
  data () {
    return {
      imageUrl: null,
      text: null,
      restaurantsName: null,
      restaurantsUrl: null,
      fetching: true,
      restaurants: []
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
  methods: {
    async post () {
      const restaurant = this.getRestaurantsByName(this.restaurantsName)
      this.restaurantsUrl = restaurant.url
      let times = new Date().getTime()

      await db.collection('posts').doc(times + '').set({
        text: this.text,
        image: this.imageUrl,
        restaurantsName: this.restaurantsName,
        restaurantsUrl: this.restaurantsUrl,
        createdAt: times + '',
        userId: this.currentUser.uid
      })
      this.$emit('update:modal', false)
      this.text = null
      this.imageUrl = null
      this.restaurantsName = null
      this.restaurantsUrl = null
    },
    closePost () {
      this.$emit('update:modal', false)
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
      const restaurant = this.restaurants[r]
        if (restaurant.name == name){
          return restaurant
        }
      }
    },
    async uploadFile (data) {
      const storageRef = firebase.storage().ref()
      const time = new Date().getTime()
      const ref = storageRef.child(`posts/${time}_${data.file.name}`)
      const snapshot = await ref.put(data.file)
      const url = await snapshot.ref.getDownloadURL()
      this.imageUrl = url
    }
  }
}
</script>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.8);
  opacity: 1;
}

@media screen and (max-width: 480px) {
  .modal { 
    background: white;
    position: fixed;
    top: 0;
  }
  .moda_content {
    padding: 0;
  }
}

</style>
