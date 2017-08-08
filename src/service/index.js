import axios from 'axios'
 
// 获取商品分类
export const cateList = () => {
    return axios({
        method:'post',
        url:'/classList',
    }).then((res) => {
        if(res.data.code == 200){
            return res.data.goodsClass
        }else{
            return []
        }
    })
}
// 获取商品列表
export const goodsList = (para) => {
    return axios({
        method:'post',
        url:'/goodsList',
        params:para,
    }).then((res) => {
        
        if(res.status == 200){
            return res.data
        }else{
            return []
        }
    })
}
// 获取商品详情
export const goodsDetail = (para) => {
    return axios({
        method:'post',
        url:'/goodsDetail',
        params:para,
    }).then((res) => {
        if(res.data.code == 200){
            
            return res.data.GoodsLists[0]
        }else{
            return []
        }
    })
}
// 获取购物车列表
export const carList = () => {
    return axios({
        method:'post',
        url:'/carList',
       
    }).then((res) => {
        if(res.data.code == 200){
            return res.data._carList
        }else{
            return []
        }
    })
}
// 加入购物车
export const addCar = (prop) => {
    return axios({
        method:'post',
        url:'/addCar',
        params:prop,
    }).then((res) => {
        if(res.data.code == 200){
           
            return res.data._carList
        }else{
            return []
        }
    })
}

export const advOrderList = () => {
    return axios({
        method:'post',
        url:'/advOrderList',
       
    }).then((res) => {
        if(res.data.code == 200){
            return res.data._advOrderList
        }else{
            return []
        }
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
// 地址列表
export const getAddrList = () => {
    return axios({
        method:'post',
        url:'/addressList'
    }).then((res) => {
       return res.data._addressList.data
    })
}
// 编辑地址
export const editAddr = (para) => {
    return axios({
        method:'post',
        url:'/editAddr',
        data:para
    }).then((res) => {
        console.log(res)
       return true
    }).catch((res) => {
        return false
    })
}
// 新增地址
export const addAddr = (para) => {
    return axios({
        method:'post',
        url:'/addAddr',
        data:para
    }).then((res) => {
        console.log(res)
       return true
    })
}