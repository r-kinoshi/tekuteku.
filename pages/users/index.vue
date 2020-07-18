<template>
<div>
  <div v-for="user in users" :key="user.id" class="users">
    <user :user="user" />
  </div>
 </div>
</template>

<script>
import User from '~/components/User.vue'
import { db } from '~/plugins/firebase'

export default {
  data () {
    return {
      users: []
    }
  },
 components: {
   User
 },
 async mounted () {
   const snapshot = await db.collection('users').get()
   snapshot.forEach((doc) => {
     this.users.push({ id: doc.id, ...doc.data() })
   })
 }
}
</script>