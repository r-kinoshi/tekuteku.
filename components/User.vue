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
     <el-button>Follow</el-button>
   </div>
 </div>
</template>

<script>
  export default {
    props: ['user'],
    computed: {
      currentUser () {
        return this.$store.state.user
      },
      isCurrentUser () {
        return this.currentUser.uid === this.user.id
      }
    }
  }
</script>