import axios from 'axios'
 
// 获取商品分类
export const cateList = () => {
    return axios({
        method:'post',
        url:'/gc/findShowGcList'
    }).then((res) => {
        if(res.data.state == 200){
            return res.data.content
        }else{
            return []
        }
    })
}
// 获取商品列表
export const goodsList = (para) => {
    return axios({
        method:'post',
        url:'/goods/findGoods',
        params:para,
    }).then((res) => {
        
        if(res.data.state == 200){
            console.log(res.data.content)
            return res.data.content
        }else{
            return []
        }
    })
}
// 获取商品详情
export const goodsDetail = (para) => {
    return axios({
        method:'post',
        url:'/goods/findById',
        params:para,
    }).then((res) => {
        if(res.data.state == 200){
            return res.data.content
        }else{
            return null
        }
    })
}
 
// 加入购物车
export const addCar = (prop) => {
    return axios({
        method:'post',
        url:'/cart/saveCart',
        params:prop,
    }).then((res) => {
        if(res.data.state == 200){
            return true
        }else{
            return false
        }
    })
}
// 删除购物车商品
export const delCar = (prop) => {
    return axios({
        method:'post',
        url:'/cart/deleteCartByCartId',
        params:prop,
    }).then((res) => {
        if(res.data.state == 200){
            return true
        }else{
            return false
        }
    })
}
// 修改购物车商品
export const editCar = (prop) => {
    return axios({
        method:'post',
        url:'/cart/updateCart',
        params:prop,
    }).then((res) => {
        if(res.data.state == 200){
            return true
        }else{
            return false
        }
    })
}
// 预订单列表
export const advOrderList = () => {
    let prop = {
        memberId:'M20170814170704005'
    }
    return axios({
        method:'post',
        url:'/makeOrder/findAllMakeOrders',
       params:prop
    }).then((res) => { 
        console.log(res)
        if(res.data.state == 200){
            return res.data.content.content[0].dayOrderList
        }else{
            return []
        }
    })
}
// 保存天订单
export const saveDayOrder = (para) => {
    return axios({
        methods:'post',
        url:'/dayOrder/savaDayOrder',
        // headers : {
        //     'Accept' : 'application/json',
        //     'Content-Type' : 'application/x-www-form-urlencoded'
        // },
        // transformRequest: [function (data) {
        //     // Do whatever you want to transform the data
        //     let ret = ''
        //     for (let it in data) {
        //             ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        //     }
        //     ret = ret.substring(0,ret.length-1)
        //     return ret
        // }],
        params:para,
    })
}

// 个人中心   这里的页面只有在登录以后才会获取数据
export const getSummary = () => {
    return axios({
        method:'post',
        url:'/getSummary'
    }).then((res) => {
       return res.data._summary
    })
}
/////////////////-----地址---------///////////
// 预订单地址
export const orderAddress = () => {
    let prop = {
        memberId:'M20170814170704005'
    }
    return axios({
        method:'post',
        url:'/orderDaddress/findOrderAddress'
    }).then((res) => {
        if(res.data.state == 200) {
            return res.data.content.content
        }
        return []
    }).catch(() => {
        console.log('error')
    })
}
// 选择默认地址
export const selAddress = (prop) => {
    return axios({
        methods:'post',
        url:'/orderDaddress/updateorderDaddressDef',
        params:prop
    })
}
// 新增地址
export const addOrderAddr = (prop) => {
    return axios({
        methods:'post',
        url:'/orderDaddress/saveOrderDaddress',
        params:prop
    })
}
// 编辑地址
export const editOrderAddr = (prop) => {
    return axios({
        methods:'post',
        url:'/orderDaddress/updateorderDaddress',
        params:prop
    })
}
// 删除地址
export const delAddress = (prop) => {
    return axios({
        methods:'post',
        url:'/orderDaddress/deleteOrderDaddressByorderDaddressId',
        params:prop
    })
}
