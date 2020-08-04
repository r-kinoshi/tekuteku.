<template>
  <div>
    <header class="top-navigation bg-white top-0 h-12 w-full border-b border-gray-400 z-50">
      <div class="header-logo">
        <nuxt-link to="/">tekuteku.</nuxt-link>
      </div>
      <div class="header-login">
        <span v-if="!isAuthenticated" class="header-login__btn" @click="openModal">ログイン</span>
      </div>
    </header>
    <div class="flex justify-center border-b border-gray-300 z-0">
     <div class="logo">
       <img src="/images/tekuteku_top.png">
     </div>
   </div>
   <posts ref="posts"/>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Posts from '~/components/Posts.vue'

export default {
  components: {
   Posts
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    openModal () {
      this.$refs.posts.openModal()
    }
  }
}
</script>

<style scoped>
.top-navigation { 
  display: grid;
  grid-template: 
    "left center right"
    /150px 1fr 150px;
}

.header-logo{
  grid-area: left;
  margin: 5px auto;
}

.header-logo a{
  font-weight: 500;
  font-size: 25px;
}

.header-login{
  grid-area: right;
  margin: 10px auto;
  cursor: pointer;
}

.header-login__btn {
  height: auto;
  font-weight: 700;
  line-height: 1.8;
  color: #fff;
  background-color: #45A2C8;
  border-radius: 4px;
  padding: 9px 12px;
  transition: all .3s;
}

.header-login__btn:hover {
  text-decoration: none;
  opacity: 0.85;
}
</style>
