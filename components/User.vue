<template>
 <div class="user p-4 flex justify-between">
   <div class="user-info flex">
     <div class="avatar mr-4">
       <nuxt-link :to="`/users/${user.uid}`">
        <img :src="user.photoURL" class="w-12 h-12 rounded-full">
       </nuxt-link>
     </div>
     <div class="displayName vertical-middle">
       <nuxt-link :to="`/users/${user.uid}`">
        <p>{{ user.displayName }}</p>
       </nuxt-link>
     </div>
   </div>
   <div class="follow-btn vertical-middle" v-if="!isCurrentUser">
     <el-button v-if="!followed" @click="follow">Follow</el-button>
     <el-button v-else @click="unfollow">Unfollow</el-button>
   </div>
 </div>
</template>

<script>
import { db } from '~/plugins/firebase'

  export default {
    data () {
      return {
        followed: false
      }
    },
    props: ['user'],
    computed: {
      currentUser () {
        return this.$store.state.user
      },
      isCurrentUser () {
        return this.currentUser.uid === this.user.id
      }
    },
    async mounted () {
      this.followingRef = db.collection('users').doc(this.currentUser.uid).collection('followings').doc(this.user.id)
      this.followerRef = db.collection('users').doc(this.user.id).collection('followers').doc(this.currentUser.uid)
      const doc = await this.followingRef.get()
      this.followed = doc.exists
    },
    methods: {
      async follow () {
        await this.followingRef.set({
          user: this.user.id,
          photoURL: this.user.photoURL,
          displayName: this.user.displayName
          })
        await this.followerRef.set({ 
          user: this.currentUser.uid,
          photoURL: this.currentUser.photoURL,
          displayName: this.currentUser.displayName
          })
        this.followed = true
      },
      async unfollow () {
        await this.followingRef.delete()
        await  this.followerRef.delete()
        this.followed = false
      }
    }
  }
</script>