<template>
 <div>
   <div class="posts overflow-scroll mb-24">
    <post />
   </div>
 </div>
</template>

<script>
import Post from '~/components/Post.vue'

export default {
  components: {
    Post
  }
}
</script>