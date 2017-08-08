import axios from 'axios'

export default {
    login({ commit } ,user) {
        return axios({
            method:'post',
            url:'/login',
            data:user
            }).then((res) => {
                
            if(res.data.msg == '请求成功'){
                console.log(res.data)
                commit('REMEMBER_NAME',res.data.user)
                 return true
            }else{
                return false
            }
            }).catch((res) => {
                return false
            })
    },
    logout({ commit }) {
            commit('LOGOUT')
    },
    getShopCar({ commit }) {
       return axios({
            method:'post',
            url:'/carList',
        }).then((res) => {
            if(res.data.code == 200){
                // 首次得到并保存
                commit('GET_CAR', res.data._carList)
                return true
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
    addCar ({ commit } ,prop) {//保存购物车 
        //if(shopCar.length >0 ){
              return axios({
                    method:'post',
                    url:'/addCar',
                    params:prop,
                }).then((res) => {
                    if(res.data.code == 200){
                         commit('GET_CAR', res.data._carList)
                        return true
                    }else{
                        return false
                    }
                }).catch(() => {
                    return false
                })
            

        //}
    },
    saveCar ({ commit },prop) {
        return axios({
            method:'post',
            url:'/saveCar',
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