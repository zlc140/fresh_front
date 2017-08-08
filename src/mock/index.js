import axios from 'axios'
import mockAdapter from 'axios-mock-adapter'
import Mock from 'mockjs'
// 收货地址列表，用户列表
import {addressList,userList} from './data/user'

import {carProList,advOrderList} from './data/car'

// 商品分类列表，商品列表，品牌列表
import {goodsClass,GoodsList,brandList} from './data/product'

let _addressList = addressList
let _GoodsLists = GoodsList
let _carList = carProList

let _advOrderList = advOrderList

let _summary = {
    nickname:userList[0].nickname,
    photo:null,
    couponNum:4,
    noPay:3,
    couponAll:1000,
}

export default {
    bootstrap() {
        let mock = new mockAdapter(axios)

        mock.onGet('/success').reply(200, {
            msg:'success'
        })
         mock.onGet('/error').reply(500, {
            msg: 'error'
        })

        // 登录
        mock.onPost('/login').reply(config => {
            let {username,password} = JSON.parse(config.data)
            return new Promise((resolve,reject) => {
                let user = null
                setTimeout(() => {
                    let hasUser = username=='admin'?true:false
                    user = username
                    if(hasUser) {
                        resolve([200,{code:200,msg:'请求成功',user}])
                    }else{
                        resolve([200,{code:200,msg:'密码或账号错误'}])
                    }
            },1000)
        })
     })
        // 得到用户概况
        mock.onPost('/getSummary').reply(config => {
            //let { username } = JSON.parse(config.data)
            return new Promise((resolve,reject) => {
                //let user = null
                setTimeout(() => {
                    //let hasUser = username=='admin'?true:false
                    //user = username
                    //if(hasUser) {
                        resolve([200,{code:200,msg:'请求成功',_summary}])
                    //}else{
                       // resolve([200,{code:200,msg:'密码或账号错误'}])
                    //}
            },1000)
        })
     })
     mock.onPost('/classList').reply(config => {
             
            return new Promise((resolve,reject) => {
                let user = null
                setTimeout(() => {
                    let hasUser = goodsClass?goodsClass:[]
                    
                        resolve([200,{code:200,msg:'请求成功',goodsClass}])
                    
                    
            },1000)
        })
     })
    // 商品列表
     mock.onPost('/goodsList').reply(config => {
                let {page,pageSize} = config.params
            //  console.log('p',pageSize*page,pageSize*(page-1))
             let total = _GoodsLists.length
             let GoodsLists = _GoodsLists.filter((u, index) =>  index< pageSize*page && index>= pageSize*(page-1) )
             
            return new Promise((resolve,reject) => {
                
                setTimeout(() => {
                    
                        resolve([200,{
                            total:total,
                            list:GoodsLists,
                            page:page
                        }])
                    
            },100)
        })
     })
    // 商品详情
    mock.onPost('/goodsDetail').reply(config => {
             let {id} = config.params
             
             let GoodsLists = _GoodsLists.filter((u, index) =>  id == u.goodsId )
             
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                     
                        resolve([200,{code:200,msg:'成功',GoodsLists}])
                    
            },100)
        })
     })
     // 购物车列表
    mock.onPost('/carList').reply(config => {
             
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                        console.log(_carList)
                        resolve([200,{code:200,msg:'成功',_carList}])
                    
            },1000)
        })
     })
    // 购物车列表
    mock.onPost('/saveCar').reply(config => {
            // let {ids,nums} = JSON.parse(config.data)
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                        resolve([200,{code:200,msg:'成功'}])
                    
            },1000)
        })
     })
    // 加入购物车
      mock.onPost('/addCar').reply(config => {
             let {id,num} = config.params
             let has = false
             console.log(id,_carList)
             _carList.forEach((ele) => {
                 if(ele.goodsId == id){
                     has = true
                     ele.num += num
                 }
             })
                if(has == false){
                    _GoodsLists.forEach((item) => {
                        if(item.goodsId == id){
                            let good ={
                                goodsId:item.goodsId,
                                goodsTitle:item.goodsTitle,
                                price:item.price,
                                goodsPic:item.goodsPic[2].path,
                                num:num
                            }
                            _carList.push(good)
                        }
                    })
                }
                // console.log(has)
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                        resolve([200,{code:200,msg:'成功',_carList}])
                    
            },1000)
        })
     })
    // 预订单商品
    mock.onPost('/advOrderList').reply(config => {
             
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                     
                        resolve([200,{code:200,msg:'成功',_advOrderList}])
                    
            },100)
        })
     })

// 个人中心的各种信息
    mock.onPost('/orderList').reply(config => {
             
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                     
                        resolve([200,{code:200,msg:'成功',_carList}])
                    
            },100)
        })
     })
// 个人地址列表
    mock.onPost('/addressList').reply(config => {
             
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                        resolve([200,{code:200,msg:'成功',_addressList}])
                    
            },100)
        })
     })
    // 新增地址
    mock.onPost('/addAddr').reply(config => {
            let {name,addrDetail,city,phone,tel,county} = JSON.parse(config.data)
            _addressList.data.push({
                id:Mock.mock('@id()'),
                name:name,
                addrDetail:addrDetail,
                city:city,
                phone:phone,
                county:county
            })
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                        resolve([200,{code:200,msg:'新增成功',_addressList}])
                    
            },100)
        })
     })
    // 编辑地址
    mock.onPost('/editAddr').reply(config => {
             let {id,name,addrDetail,city,phone,tel,county} = JSON.parse(config.data)
             let lists = _addressList.data
             _addressList.data.some((item,index) =>{
                    if(item.id === id){
                        lists[index].name = name;
                        lists[index].addrDetail = addrDetail;
                        lists[index].city = city;
                        lists[index].phone = phone;
                        lists[index].tel = tel ;
                        lists[index].county = county;
                        return true
                    }
             });
              
             
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                   
                        resolve([200,{code:200,msg:'编辑成功',_addressList}])
                    
            },100)
        })
     })












































    }
}