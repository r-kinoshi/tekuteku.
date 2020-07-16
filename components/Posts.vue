<template>
 <div>
   <div class="posts overflow-scroll mb-24">
     <post v-for="(post, index) in posts" :key="index" :post="post" />
   </div>
 </div>
</template>

<script>
import Post from '~/components/Post.vue'
import { db } from '~/plugins/firebase'

export default {
  components: {
    Post
  },
  data () {
    return {
      posts: []
    }
  },
  async mounted () {
    const snapshot = await db.collection('posts').get()
    snapshot.forEach((doc) => {
      this.posts.push(doc.data())
    })
  }
}
</script>