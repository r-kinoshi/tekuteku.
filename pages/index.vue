<template>
  <div>
    <header class="flex justify-center border-b border-gray-300">
     <div class="logo">
       <img src="/images/tekuteku_top.png">
     </div>
     <img src="/images/letter.svg" @click="openModal" class="absolute w-6 post">
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
