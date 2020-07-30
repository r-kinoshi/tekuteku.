<template>
  <div>
    <nuxt />
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '~/components/Footer'
import { firebase,db } from '~/plugins/firebase'
import { mapActions } from 'vuex'

export default {
  components: {
    AppFooter
  },
  methods: {
    ...mapActions(['setUser'])
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUser(user)
        if (user.displayName === null || user.photoURL === null) {
          user.displayName = 'guests'
          user.photoURL = '/images/icon(2).png'
          this.setUser(user)
        }
        db.collection('users').doc(user.uid).set({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        })
      }
    })
  },
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.vertical-middle {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.uploaded-image {
  max-height: 120px;
}

.post-btn {
  padding: 4px 12px;
  border-radius: 24px;
  background-color: black;
  color: white;
  font-size: 12px;
  cursor: pointer;
}

.el-upload {
  width: 100%;
  padding: 0 2rem;
}

.el-button {
  width: 100%;
}

.close-btn {
  position: absolute;
  z-index: 50;
  top: -40px;
  right: 0;
  opacity: 1;
  cursor: pointer;
}

.outline {
  outline: solid 1px #0000ff;
}

.marginCenter {
  margin: 0 auto;
}

</style>
