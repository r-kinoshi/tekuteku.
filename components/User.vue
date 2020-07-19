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
    methods: {
      async follow () {
        await db.collection('users').doc(this.currentUser.uid).collection('followings').doc(this.user.id).set({user: this.user.id})
        await db.collection('users').doc(this.user.id).collection('followers').doc(this.currentUser.uid).set({ user: this.currentUser.uid})
        this.followed = true
     },
      async unfollow () {
        await db.collection('users').doc(this.currentUser.uid).collection('followings').doc(this.user.id).delete()
        await db.collection('users').doc(this.user.id).collection('followers').doc(this.currentUser.uid).delete()
        this.followed = false
      }
    }
  }
</script>