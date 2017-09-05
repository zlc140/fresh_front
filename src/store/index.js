import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import { setStore,getStore,removeStore } from '../config/storage'

Vue.use(Vuex)

const state = {
    username:'',
    shopCar : {
        length : 0,
        lists : [],
        islose:[]
    },
    classList:[]
    
}

const mutations = {

    REMEMBER_NAME (state,user) {
        state.username = user
        setStore('username',JSON.stringify(user))
    },
    LOGOUT (state) {
        state.username = ''
        state.shopCar.length = 0
        state.shopCar.lists = []
        removeStore('username')
    },
    SAVE_CLASS (state, lists) {
        state.classList = lists
    },
    GET_CAR (state,shopCar) {
        state.shopCar.length = shopCar.length                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        state.shopCar.lists = []
        state.shopCar.islose = []
        shopCar.forEach((res) => {
            if(!res.goodsVoList[0].islose){
                state.shopCar.lists.push(res)
            }else{
                state.shopCar.islose.push(res)
            }
        })
        state.shopCar.length = state.shopCar.lists.length

    },
    DEL_CAR (state, prop) {
        if(!prop.islose){
            state.shopCar.lists.forEach((item,index) => {
                if(item.cartId == prop.cartIds) {
                    state.shopCar.lists.splice(index,1)
                }
            })
            state.shopCar.length = state.shopCar.lists.length
        }else{
            state.shopCar.islose.forEach((item,index) => {
                if(item.cartId == prop.cartIds) {
                    state.shopCar.islose.splice(index,1)
                }
            })
        }
       
     
    }

}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})


export default store