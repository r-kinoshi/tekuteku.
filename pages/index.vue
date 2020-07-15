<template>
  <div>
    <header class="flex justify-center border-b border-gray-300">
     <div class="logo">
       <img src="/images/logo.png" class="w-20 py-2">
     </div>
     <img src="/images/letter.svg" class="absolute w-6 post">
   </header>
   <posts />
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Posts from '~/components/Posts.vue'

export default {
  components: {
   Posts
  }
}
</script>

<style scoped>
.post {
 top: 12px;
 right: 10px;
}
</style>
