<template>
<div>
  <div v-if="modal">
    <modal-post :modal="modal" @update:modal="modal=$event" />
  </div>
  <div class="bottom-navigation bg-white flex fixed bottom-0 h-12 w-full border-t border-gray-300">
    <div class="nav-item w-1/5 flex justify-center" @click="homechange">
      <nuxt-link to="/">
        <img :src="this.homeImg" class="h-6 my-3">
      </nuxt-link>
    </div>
    <div v-if="isAuthenticated" class="nav-item w-1/5 flex justify-center" @click="searchchange">
      <nuxt-link to="/allPosts">
        <img :src="this.searchImg" class="h-6 my-3">
      </nuxt-link>
    </div>
    <div v-if="isAuthenticated" class="nav-item w-1/5 flex justify-center cursor-pointer">
      <img :src="this.followImg" class="h-6 my-3" @click="postModal">
    </div>
     <div v-if="isAuthenticated" class="nav-item w-1/5 flex justify-center" @click="userchange">
      <nuxt-link to="/users">
        <img :src="this.userImg" class="h-6 my-3">
      </nuxt-link>
    </div>
    <div v-if="isAuthenticated" class="nav-item w-1/5 flex justify-center" @click="idchange">
      <nuxt-link  :to="`/users/${currentUser.uid}`">
        <img :src="this.currentUser.photoURL" class="h-8 my-2 ounded-full border rounded-full border-solid border-gray-500" :class="[ idStyle === true ? 'selectStyle' : 'nonStyle' ]">
      </nuxt-link>
    </div>
  </div>
</div>
</template>

<script>
import ModalPost from '~/components/ModalPost.vue'

export default {
  components: {
    ModalPost
  },
  data () {
    return {
      modal: false,
      userPlus: false,
      homeImg: '/images/home-pink.svg',
      searchImg: '/images/search (3).svg',
      followImg: '/images/follow.svg',
      userImg: '/images/user-plus.svg',
      idStyle: false
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
    postModal () {
      this.modal = true
    },
    homechange () {
      this.homeImg = '/images/home-pink.svg'
      this.searchImg = '/images/search (3).svg'
      this.followImg = '/images/follow.svg'
      this.userImg = '/images/user-plus.svg'
      this.idStyle = false
    },
    searchchange () {
      this.searchImg = '/images/search-pink.svg'
      this.homeImg = '/images/home.svg'
      this.followImg = '/images/follow.svg'
      this.userImg = '/images/user-plus.svg'
      this.idStyle = false
    }, 
    userchange () {
      this.userImg = '/images/user-pink.svg'
      this.homeImg = '/images/home.svg'
      this.searchImg = '/images/search (3).svg'
      this.followImg = '/images/follow.svg'
      this.idStyle = false
    },
    idchange () {
      this.idStyle = true
      this.homeImg = '/images/home.svg'
      this.searchImg = '/images/search (3).svg'
      this.followImg = '/images/follow.svg'
      this.userImg = '/images/user-plus.svg'
    }
  }
}
</script>

<style scoped>
.selectStyle{
  border: double;
  border-color: #F3BAC8;
}
</style>
