<template>
  <div>
    <nuxt />
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '~/components/Footer.vue'
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


.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.8);
  opacity: 1;
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
}

.el-button {
 width: 85%;
}

.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.8);
  opacity: 1;
}

.close-btn {
  position: absolute;
  z-index: 50;
  top: -40px;
  right: 0;
  opacity: 1;
  cursor: pointer;
}
</style>
