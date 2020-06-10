import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import axios from 'axios'
import router from '@/router'
import localidades from './localidades'
import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],

    state:{
        api,
        miniVariant:true,
        localidades,
        user: false,
        beneficiarios:[],
    },

    mutations:{
        'LOGIN'(state, user){
            Vue.set(state, 'user', user)
            Vue.set(state,'beneficiarios', [])
            Vue.set(state,'total',0)
        },
        'LOGOUT'(state){
            window.localStorage.clear()
            Vue.set(state,'user', false)
            Vue.set(state,'beneficiarios', [])
            Vue.set(state,'total',0)
        },
        'UPDATE_BENEFS'(state, payload){
            //state.beneficiarios = beneficiarios
            Vue.set(state,'beneficiarios',payload.beneficiarios)
            Vue.set(state,'total',payload.total)
        },
        'SET_MINIVARIANT'(state, bool){
            Vue.set(state,'miniVariant',bool)
        }
    },
    getters:{  },

    actions:{

        setUser({commit}, user){
            commit('LOGIN', user)
        },

        logOut({commit}){
            commit('LOGOUT')
        },

        loadBenef({commit},payload){
            Vue.set(this.state,'beneficiarios',[])
            axios({
                baseURL:this.state.api.baseURL,
                url:'beneficiarios',
                method:'post',
                data:payload                
            }).then(resp=>{
                commit('UPDATE_BENEFS', resp.data)
            })
        },

        setMiniVariant({commit}){
            commit('SET_MINIVARIANT',!this.state.miniVariant)
        }

    }
})