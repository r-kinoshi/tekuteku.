<template>
 <div>
  <div class="posts overflow-scroll mb-24">
    <post v-for="(post, index) in posts" :key="index" :post="post" />
  </div>
  <div v-if="isAuthenticated && modalVisible" class="modal">
    <div class="actions mt-4 flex justify-between px-8">
      <div class="back-btn vertical-middle" @click="modalVisible = false">
        <img src="/images/back.svg" class="h-4">
      </div>
      <div class="post-btn" @click="post">
        Post
      </div>
    </div>
    <div class="moda_content p-8">
      <div class="flex justify-center">
        <img :src="imageUrl" class="uploaded-image">
      </div>
      <el-upload
        v-if="!imageUrl"
        action=""
        :show-file-list="false"
        :http-request="uploadFile"
        >
        <el-button size="small" type="primary">Click to upload</el-button>
      </el-upload>
      <el-input
        type="textarea"
        :rows="8"
        placeholder="please input"
        class="mt-8"
        v-model="text"
      >
      </el-input>
    </div>
  </div>
  <div v-else-if="!isAuthenticated && modalVisible" class="modal">
    <div class="actions mt-4 flex justify-between px-8">
      <div class="back-btn vertical-middle" @click="modalVisible = false">
        <img src="/images/back.svg" class="h-4">
      </div>
    </div>
    <div class="modal_content p-8 w-full h-full relative">
      <div class="flex justify-center">
        <img src="/images/logo.png" class="w-32 my-32">
      </div>
      <el-button size="small" type="primary" @click="login">login</el-button>
    </div>
  </div>
 </div>
</template>

<script>
import Post from '~/components/Post.vue'
import { db, firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'

export default {
  components: {
    Post
  },
  data () {
    return {
      posts: [],
      imageUrl: null,
      text: null,
      modalVisible: false,
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
    async post () {
      await db.collection('posts').add({
        text: this.text,
        image: this.imageUrl,
        createdAt: new Date().getTime()
      })
      this.modalVisible = false
      this.text = null
      this.imageUrl = null
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
    }
  },
  mounted () {
    db.collection('posts').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const doc = change.doc
        if (change.type === 'added') {
          this.posts.unshift({ id: doc.id, ...doc.data() })
        }
      })
    })
  }
}
</script>

<style>
.post-btn {
  color: black;
  cursor: pointer;
}
</style>