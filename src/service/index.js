import axios from 'axios'
 
// 注册
const USER_BASE = '/user-center'
const MEMBER_BASE = '/fresh-member' 
export const Register = (prop) => {
    return axios({
        method:'post',
        url:USER_BASE+'/member/register',
        params:prop
    }).then((res) => {
        console.log(res)
        if(res.data.state == 200){
            return true
        }else if(res.data.state == 400){
            return res.data.messages
        }else{
            return false
        }
    }).catch(()=>{
        return false
    })
}
export const login = (prop) => {
    return axios({
        method:'post',
        url:USER_BASE+'/login',
        params:prop
    })
}
export const userUpdate = (prop) => {
    return axios({
        method:'post',
        url:USER_BASE+'/member/updateMe',
        params:prop
    })
}

export const addMember = (prop) => {
    return axios({
        method:'post',
        url:MEMBER_BASE+'/memberInfo/saveMe',
        params:prop
    })
}

// 商品模块
const proUrl = "/fresh-goods"
// 获取商品分类
export const cateList = () => {
    return axios({
        method:'post',
        url:proUrl+'/gc/findShowGcList'
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
        url:proUrl+'/goods/findGoods',
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
        url:proUrl+'/goods/findById',
        params:para,
    }).then((res) => {
        console.log(res)
        if(res.data.state == 200){
            return res.data.content
        }else{
            return null
        }
    })
}
 
// 购物车订单模块
const orderUrl = '/fresh-order'
// 加入购物车
export const addCar = (prop) => {
    return axios({
        method:'post',
        url:orderUrl+'/cart/saveCart',
        params:prop,
    }).then((res) => {
        console.log('shopcar',res)
        if(res.data.state == 200){
            return true
        }else{
            return false
        }
    }).catch((res) => {
        return '403'
    })
}
// 删除购物车商品
export const delCar = (prop) => {
    return axios({
        method:'post',
        url:orderUrl+'/cart/deleteCartByCartId',
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
        url:orderUrl+'/cart/updateCart',
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
    
    return axios({
        method:'post',
        url:orderUrl+'/makeOrder/getMeMakeOrder',
    }).then((res) => { 
        console.log(res)
        if(res.data.state == 200){
            return res.data.content
        }else{
            return false
        }
    })
}
// 保存天订单
export const saveDayOrder = (para) => {
    return axios({
        method:'post',
        url:orderUrl+'/dayOrder/savaDayOrder',
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

// 编辑预订单
export const editadvOrder = (para) => {
    return axios({
        method:'post',
        url:orderUrl+'/makeOrder/update',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        transformRequest: [function (data) {
            // Do whatever you want to transform the data
            let ret = ''
            for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            ret = ret.substring(0,ret.length-1)
            return ret
        }],
        data:para
    })
}

// 个人中心   这里的页面只有在登录以后才会获取数据
export const getSummary = () => {
    return axios({
        method:'post',
        url:MEMBER_BASE+'/memberInfo/findMe',
    }) 
}
// 修改密码
export const checkPss = (prop) => {
    return axios({
        method:'post',
        url:USER_BASE+'/member/updatePassword',
        params:prop
    }).then((res) => {
       if(res.data.state == 200){
           return true
       }else{
           return false
       }
    }).catch(()=>{
        return false
    })
}
const voucher_BASE = '/fresh-voucher'
// 代金券
export const voucherlist = (para) => {
    return axios({
        method:'post',
        url:voucher_BASE+'/voucher/findMyVoucher'
    })
}
// 我的账单
const Bill_BASE　= '/fresh-bills'
export const billLists = (para) => {
    return axios({
        method:'post',
        url:Bill_BASE+'/bills/findMe',
        params:para
    })
}
// 获取我的订单
export const orderlist = (prop) => {
    return axios({
        method:'post',
        url:orderUrl+'/order/getMeOrders',
        params:prop
    })
}

/////////////////-----地址---------///////////
// 预订单地址
export const orderAddress = () => {
     
    return axios({
        method:'post',
        url:orderUrl+'/orderDaddress/getMeOrderDaddress'
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
        method:'post',
        url:orderUrl+'/orderDaddress/updateorderDaddressDef',
        params:prop
    })
}
// 新增地址
export const addOrderAddr = (prop) => {
    return axios({
        method:'post',
        url:orderUrl+'/orderDaddress/saveMeOrderDaddress',
        params:prop
    })
}
// 编辑地址
export const editOrderAddr = (prop) => {
    return axios({
        method:'post',
        url:orderUrl+'/orderDaddress/updateMeorderDaddress',
        params:prop
    })
}
// 删除地址
export const delAddress = (prop) => {
    return axios({
        method:'post',
        url:orderUrl+'/orderDaddress/deleteOrderDaddressByorderDaddressId',
        params:prop
    })
}
// 首页
// banner

const firstPage = '/fresh-front'
export const getBanner = () => {
    return axios({
        method:'POST',
        url:firstPage+'/adv/findAll'
    })
}
// floor
export const getFloor = () => {
    return axios({
        method:'POST',
        url:firstPage+'/floor/findAll'
    })
}


