<template>
  <div class="user py-2 px-4">
    <div v-for="(follower, index) in followers" :key="index" :follower="follower">
      <div class="user-info flex mt-4">
        <div class="avatar mr-4">
          <nuxt-link :to="`/users/${follower.user}`">
            <img :src="follower.photoURL" class="w-12 h-12 rounded-full">
          </nuxt-link>
        </div>
        <div class="displayName vertical-middle">
          <nuxt-link :to="`/users/${follower.user}`">
            <p>{{ follower.displayName }}</p>
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
        follower: null
      }
    },
    props: {
      followers: {}
    }
  }

</script>