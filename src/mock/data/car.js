import Mock from 'mockjs'
 

const carProList = []
for(let i=0;i<3;i++){
    carProList.push(Mock.mock({
        'goodsId':Mock.mock('@id'),
        'goodsTitle':Mock.mock('@cword(1,20)'),
        'goodsSubTitle':Mock.mock('@cword(0,20)'),
         price:{
        'GOODS_MARKET_PRICE':Mock.mock('@float(60, 100, 2,2)'),
        'GOODS_COST_PRICE':Mock.mock('@float(60, 100, 2,2)')
        },
        store:null,
        goodsClass:'某一个',
        goodsPic:  Mock.mock('@image("800x800","#FF6600","one")'),
        num:Mock.mock('@integer(1, 10)')
    }))
}

// 预订单的编辑页面的对应的商品
const advOrderList = [
    {
        start: '1500912000000',//七月25
        end: '',
        products:[
           {
                'goodsId':Mock.mock('@id'),
                'goodsTitle':Mock.mock('@cword(1,20)'),
                'goodsSubTitle':Mock.mock('@cword(0,20)'),
                price:{
                'GOODS_MARKET_PRICE':Mock.mock('@float(60, 100, 2,2)'),
                'GOODS_COST_PRICE':Mock.mock('@float(60, 100, 2,2)')
                },
                store:null,
                goodsClass:'某一个',
                goodsPic:  Mock.mock('@image("800x800","#FF6600","one")'),
                num:Mock.mock('@integer(1, 10)')
           },
             {
                'goodsId':Mock.mock('@id'),
                'goodsTitle':Mock.mock('@cword(1,20)'),
                'goodsSubTitle':Mock.mock('@cword(0,20)'),
                price:{
                'GOODS_MARKET_PRICE':Mock.mock('@float(60, 100, 2,2)'),
                'GOODS_COST_PRICE':Mock.mock('@float(60, 100, 2,2)')
                },
                store:null,
                goodsClass:'某一个',
                goodsPic:  Mock.mock('@image("800x800","#FF6600","one")'),
                num:Mock.mock('@integer(1, 10)')
           }
        ]
    },
    {
        start: '1501430400000',//7.31
        end: '',
        products:[
           {
                'goodsId':Mock.mock('@id'),
                'goodsTitle':Mock.mock('@cword(1,20)'),
                'goodsSubTitle':Mock.mock('@cword(0,20)'),
                price:{
                'GOODS_MARKET_PRICE':Mock.mock('@float(60, 100, 2,2)'),
                'GOODS_COST_PRICE':Mock.mock('@float(60, 100, 2,2)')
                },
                store:null,
                goodsClass:'某一个',
                goodsPic:  Mock.mock('@image("800x800","#FF6600","one")'),
                num:Mock.mock('@integer(1, 10)')
           },
             {
                'goodsId':Mock.mock('@id'),
                'goodsTitle':Mock.mock('@cword(1,20)'),
                'goodsSubTitle':Mock.mock('@cword(0,20)'),
                price:{
                'GOODS_MARKET_PRICE':Mock.mock('@float(60, 100, 2,2)'),
                'GOODS_COST_PRICE':Mock.mock('@float(60, 100, 2,2)')
                },
                store:null,
                goodsClass:'某一个',
                goodsPic:  Mock.mock('@image("800x800","#FF6600","one")'),
                num:Mock.mock('@integer(1, 10)')
           }
            , {
                'goodsId':Mock.mock('@id'),
                'goodsTitle':Mock.mock('@cword(1,20)'),
                'goodsSubTitle':Mock.mock('@cword(0,20)'),
                price:{
                'GOODS_MARKET_PRICE':Mock.mock('@float(60, 100, 2,2)'),
                'GOODS_COST_PRICE':Mock.mock('@float(60, 100, 2,2)')
                },
                store:null,
                goodsClass:'某一个',
                goodsPic:  Mock.mock('@image("800x800","#FF6600","one")'),
                num:Mock.mock('@integer(1, 10)')
           }
        ]
    },
    {
        start: '1501516800000',//8.1
        end: '',
        products:[
           {
                'goodsId':Mock.mock('@id'),
                'goodsTitle':Mock.mock('@cword(1,20)'),
                'goodsSubTitle':Mock.mock('@cword(0,20)'),
                price:{
                'GOODS_MARKET_PRICE':Mock.mock('@float(60, 100, 2,2)'),
                'GOODS_COST_PRICE':Mock.mock('@float(60, 100, 2,2)')
                },
                store:null,
                goodsClass:'某一个',
                goodsPic:  Mock.mock('@image("800x800","#FF6600","one")'),
                num:Mock.mock('@integer(1, 10)')
           }
        ]
    },
]
export {carProList,advOrderList}