import { OK } from '../util'

const state = {
  user: null,
  apiStatus: null
}

const getters = {
  check: state => !! state.user,
  username: state => state.user ? state.user.name : ''
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setApiStatus (state, status) {
    state.apiStatus = status
  }
}

const actions = {
  async register (context, data) {
    const response = await axios.post('/api/register', data)
    context.commit('setUser', response.data)
  },
  async login (context, data) {
    context.commit('setApiStatus', null)
    // API 通信が成功した場合も失敗した場合も response にレスポンスオブジェクトを代入
    const response = await axios.post('/api/login', data)
      .catch(err => err.response || err)
  
    // 成功したらtrue
    if (response.status === OK) {
      context.commit('setApiStatus', true)
      context.commit('setUser', response.data)
      return false
    }
    // 失敗したらfalse
    context.commit('setApiStatus', false)
    // 通信に失敗した場合に error モジュールの setCode ミューテーションを commit する
    // あるストアモジュールから別のモジュールのミューテーションを commit する場合は第三引数に { root: true } を追加
    context.commit('error/setCode', response.status, { root: true })
  },
  async logout (context) {
    const response = await axios.post('/api/logout')
    context.commit('setUser', null)
  },
  async currentUser (context) {
    const response = await axios.get('/api/user')
    const user = response.data || null
    context.commit('setUser', user)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
