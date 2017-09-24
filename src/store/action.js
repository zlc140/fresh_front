import axios from 'axios'
const baseUrl = '/fresh-order'
export default {
    login({ commit } ,user) {
        commit('REMEMBER_NAME','admin')
        return true
        // axios({
        //     method:'post',
        //     url:'/login',
        //     data:user
        //     }).then((res) => {
        //     if(res.data.msg == '请求成功'){
        //         console.log(res.data)
        //         commit('REMEMBER_NAME',res.data.user)
        //          return true
        //     }else{
        //         return false
        //     }
        //     }).catch((res) => {
        //         return false
        //     })
    },
    logout({ commit }) {
            commit('LOGOUT')
    },
    getShopCar({ commit }) {
        let prop = {
            memberId:'M20170814170704005'
        }
       return axios({
            method:'post',
            url:baseUrl+'/cart/findcart',
            params:prop
        }).then((res) => {
            console.log(res)
            if(res.data.state == 200){
                // 首次得到并保存
                console.log(res.data)
                commit('GET_CAR', res.data.content.content)
                return  res.data.content.content
            }else{
                return false
            }
        })
    },
    changShopCar ({ commit } ,shopCar) {//保存购物车 
        //if(shopCar.length >0 ){
            // 购物车添加成功与否的判断
            return commit('GET_SHOPCARLIST',shopCar)

        //}
    },
    saveCar ({ commit },prop) {
        return axios({
            method:'post',
            url:baseUrl+'/saveCar',
            data:prop
        }).then((res) => {
            commit('SAVE_CAR',prop)
            return true
        })
    },
    delCar ({ commit },prop) {
        return commit('DEL_CAR',prop)
    }

}