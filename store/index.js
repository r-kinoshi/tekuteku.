export const strict = false

export const state = () => {
  return{
    user: null
  }
}

export const getters = {
  isAuthenticated (state) { 
    return !!state.user
  }
}

export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}