<template>
  <div class="user py-2 px-4">
    <div v-for="(followingUser, index) in followingUsers" :key="index" :followingUser="followingUser">
      <div class="user-info flex mt-4">
        <div class="avatar mr-4">
          <nuxt-link :to="`/users/${followingUser.user}`">
            <img :src="followingUser.photoURL" class="w-12 h-12 rounded-full">
          </nuxt-link>
        </div>
        <div class="displayName vertical-middle">
          <nuxt-link :to="`/users/${followingUser.user}`">
            <p>{{ followingUser.displayName }}</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase'

  export default {
    data () {
      return {
        followingUser: null,
        followingUsers: []
      }
    },
    computed: {
      currentUser () {
        return this.$store.state.user
      }
    },
    async mounted () {
      const snapshot = await db.collection('users').doc(this.currentUser.uid).collection('followings').get()
      snapshot.forEach((doc) => {
        this.followingUsers.push(doc.data())
      })
    }
  }

</script>