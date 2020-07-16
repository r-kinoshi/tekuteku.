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