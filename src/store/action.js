import axios from 'axios'
const baseUrl = '/fresh-order'
export default {
    login({ commit } ,user) {
        let prop = {
            username:user.username,
            password:user.password,
            imageCode:user.checkWord
        }
        return axios({
            method:'post',
            url:'/user-center/login',
            params:prop
        }).then((res) => {
            console.log(res)
            if(res.data.state == 'SUCCESS'){
                commit('REMEMBER_NAME',user.username)
                 return true
            }else{
                return false
            }
        }).catch((res) => {
                return false
        })
    },
    logout({ commit }) {
            return axios({
                method:'post',
                url:'/user-center/logout'
            }).then((res) => {
                commit('LOGOUT')
                return true
            })
    },
    getShopCar({ commit }) {
        // let prop = {
        //     memberId:'M20170814170704005'
        // }
       return axios({
            method:'post',
            url:baseUrl+'/cart/findcart',
        }).then((res) => {
            console.log(res)
            if(res.data.state == 200){
                // 首次得到并保存
                commit('GET_CAR', res.data.content.content)
                return  res.data.content.content
            }else{
                return false
            }
        }).catch(error => {
            let str = error +''
            if(str.indexOf('403')>0){
                return '403'
            }
            return false
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