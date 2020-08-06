<template>
  <div class="posts-desk">
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
.posts-desk{
  width: 1000px;
  margin:0 auto;
  box-sizing: border-box;
}

.posts {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto 1fr;
  grid-gap: 1vw 3vw;
  justify-content: space-evenly;
  overflow: hidden;
  margin-bottom: 10%;
}

>>>.post-desk {
  outline: none;
}

>>>.post-colums {
  grid-column: span 4;
  max-height:300px;
}

>>>.post-desk__image img{
  max-height:300px;
  }

@media screen and (max-width: 960px) {
  .posts-desk{
    width:100%;
  }

  .posts{
    justify-content: normal;
    grid-template-rows: auto 1fr;
  }
}

@media screen and (max-width: 800px) {
  >>>.post-desk {
    margin:0;
  }

  >>>.post-desk__image img{
    width: 250px;
    max-height: 240px;
  }

  >>>.post-colums {
    grid-column: span 4;
    max-width: 250px;
  }
}

@media screen and (max-width: 700px) {
  .posts {
    grid-template-rows: none;
  }

>>>.post-colums {
    grid-column: span 4;
    max-height: 130px;
  }

>>>.post-desk__image img{
    width:120px;
    max-height:100px;
  }

>>>.post-desk {
    max-height:300px;
  }

>>>.post-up__content {
    width: 100%;
    min-width: 100vw;
  }
}

@media screen and (max-width: 340px) {
>>>.post-desk__image img{
    width:100px;
    max-height: 97px;
  }

>>>.post-colums {
    max-height: 120px;
  }

}

</style>
