<template>
  <div class="user p-4 flex justify-between">
    <div v-for="(follower, index) in followers" :key="index" :follower="follower">
      <div class="user-info flex">
        <div class="avatar mr-4">
            <img :src="follower.photoURL" class="w-12 h-12 rounded-full">
        </div>
        <div class="displayName vertical-middle">
          <p>{{ follower.displayName }}</p>
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
        follower: null
      }
    },
    props: {
      followers: {}
    }
  }

</script>