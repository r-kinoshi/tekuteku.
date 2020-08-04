<template>
  <div class="mb-12">
    <div class="posts">
      <post v-for="(post, index) in posts" :key="index" :post="post" :mode="'all'" />
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
.posts　{
  display: grid;
  justify-content: space-evenly;
  grid-template-columns:repeat(3, 33.333333%);
  }

>>>.post-desk {
    margin: 7% auto;
    box-sizing: border-box;
    padding:0;
    outline: none;
  }

>>>.post-desk__image img　{
    max-height:300px;
  }

@media screen and (max-width: 900px) {
  .posts {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-content: normal;
  }

>>>.post-desk {
    width: 100%;
    margin: 3% 0;
    min-width: 100vw;
  }

>>>.post-desk__image {
    width: 300px;
    margin:0 auto;
  }

>>>.post-up__content {
    width: 100%;
    min-width: 100vw;
  }
}
</style>
