<template>
 <div>
   <div class="posts overflow-scroll mb-24">
    
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
    db.collection('posts').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this,posts.push(doc.data())
          console.log(doc.data())
        })
      }) 
  }
}
</script>