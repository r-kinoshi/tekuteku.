<template>
 <div class="mb-32">
   <div class="user flex justify-between px-8 my-8">
     <div class="flex">
       <div class="user-avatar mr-4">
         <img src="/images/post1.jpg" class="w-12 h-12 rounded-full">
       </div>
       <div class="user-name vertical-middle">
         <p>rika123</p>
       </div>
     </div>
     <button class="text-sm" @click="logout">ログアウト</button>
   </div>
   <div class="tab flex justify-around">
     <div class="post-count text-center">
       Post
       </br>
       <span class="text-xs">0</span>
     </div>
     <div class="text-center">
       Following
       </br>
       <span class="text-xs">0</span>
     </div>
     <div class="text-center">
       Follower
       </br>
       <span class="text-xs">0</span>
     </div>
   </div>
 </div>
</template>

<script>
import { firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['setUser']),
    logout () {
      firebase.auth().signOut()
        .then(() => {
          this.setUser(null)
        })
        .catch((error) => {
          window.alert(error)
        })
    }
  }
}
</script>