<template>
  <div class="bottom-navigation bg-white flex fixed bottom-0 h-12 w-full border-t border-gray-300">
    <div class="nav-item w-1/5 flex justify-center">
      <nuxt-link to="/"><img src="/images/home.svg" class="h-6 my-3"></nuxt-link>
    </div>
    <div v-if="isAuthenticated" class="nav-item w-1/5 flex justify-center">
      <nuxt-link to="/users"><img src="/images/search (3).svg" class="h-6 my-3"></nuxt-link>
    </div>
    <div v-if="isAuthenticated" class="nav-item w-1/5 flex justify-center">
      <nuxt-link to="/users"><img src="/images/follow.svg" class="h-6 my-3"></nuxt-link>
    </div>
     <div v-if="isAuthenticated" class="nav-item w-1/5 flex justify-center">
      <nuxt-link to="/users"><img src="/images/heart (1).svg" class="h-6 my-3"></nuxt-link>
    </div>
    <div v-if="isAuthenticated" class="nav-item w-1/5 flex justify-center">
      <nuxt-link  :to="`/users/${currentUser.uid}`"><img src="/images/profile.svg" class="h-6 my-3"></nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser () {
      return this.$store.state.user
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>