<template>
  <div>
    <header class="flex justify-center border-b border-gray-300 z-0">
     <div class="logo">
       <img src="/images/tekuteku_top.png">
     </div>
    <span v-if="!isAuthenticated" class="absolute post" @click="openModal">ログイン</span>
   </header>
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
.post {
 top: 12px;
 right: 10px;
}
</style>
