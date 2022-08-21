const state = {
  code: null
}

const mutations = {
  setCode (state, code) {
    state.code = code
  }
}

export default {
  // 名前空間の有効化
  namespaced: true,
  state,
  mutations
}