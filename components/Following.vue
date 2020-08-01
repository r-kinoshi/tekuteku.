<template>
  <div class="user p-4 flex justify-between">
    <div v-for="(followingUser, index) in followingUsers" :key="index" :followingUser="followingUser">
      <div class="user-info flex">
        <div class="avatar mr-4">
            <img :src="followingUser.photoURL" class="w-12 h-12 rounded-full">
        </div>
        <div class="displayName vertical-middle">
          <p>{{ followingUser.displayName }}</p>
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