<template>
  <div>
    <div class="posts overflow-scroll z-0">
      <post v-for="(post, index) in posts" :key="index" :post="post" />
    </div>
  </div>
</template>

<script>
import Post from '~/components/Post.vue'
import { db, firebase } from '~/plugins/firebase'

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
    db.collection('posts').orderBy('createdAt').onSnapshot((snapshot) => {
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

<style scoped>
.posts{
  display: grid;
  grid-template-columns:repeat(3, 1fr);
  grid-gap: 1em;
}

>>>.post-desk {
    margin:0;
    width: 100%;
    box-sizing: border-box;
  }

@media screen and (max-width: 480px) {
  .post-desk{
    margin:0;
    min-width: 100px;
  }
}

</style>
