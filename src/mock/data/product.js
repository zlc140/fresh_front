import Mock from 'mockjs'

const childClass = [] 
for(var i=0;i<5;i++){
childClass.push(Mock.mock({
    classId: Mock.mock('@id'),
    classTitle: Mock.mock('@cword(2,5)'),
    type: null,
    childClass:null,
    classPic:[Mock.mock('@image("30x30","#ccc","机构图片")')],
    keywords: Mock.mock('@cword(2,5)'),
    createTime:Mock.mock('@date()'),
    updateTime:Mock.mock('@date()'),
    del:Mock.mock('@boolean()'),
    show:true
 
}))
}
const childClass2 = [] 
for(var i=0;i<10;i++){
childClass2.push(Mock.mock({
    classId: Mock.mock('@id'),
    classTitle: Mock.mock('@cword(2,5)'),
    type: null,
    childClass:null,
    classPic:[Mock.mock('@image("30x30","#ccc","机构图片")')],
    keywords: Mock.mock('@cword(2,5)'),
    createTime:Mock.mock('@date()'),
    updateTime:Mock.mock('@date()'),
    del:Mock.mock('@boolean()'),
    show:true
 
}))
}
 const goodsClass =  [
  {
    classId: Mock.mock('@id'),
    classTitle: '蔬菜',
    type: null,
    oldClass:null,
    childClass:childClass,
    classPic:[Mock.mock('@image("30x30","#ccc","机构图片")')],
    keywords: Mock.mock('@cword(3)'),
    createTime:Mock.mock('@date()'),
    updateTime:Mock.mock('@date()'),
    del:Mock.mock('@boolean()'),
    show:true
  },
 {
    classId: Mock.mock('@id'),
    classTitle: '水果',
    type: null,
    oldClass:null,
    childClass:childClass,
    classPic:[Mock.mock('@image("30x30","#ccc","机构图片")')],
    keywords: Mock.mock('@integer(1, 9999)'),
    createTime:Mock.mock('@date()'),
    updateTime:Mock.mock('@date()'),
    del:Mock.mock('@boolean()'),
    show:true
  },
{
    classId: Mock.mock('@id'),
    classTitle: '肉禽蛋',
    type: null,
    oldClass:null,
    childClass:childClass,
    classPic:[Mock.mock('@image("30x30","#ccc","机构图片")')],
    keywords: Mock.mock('@integer(1, 9999)'),
    createTime:Mock.mock('@date()'),
    updateTime:Mock.mock('@date()'),
    del:Mock.mock('@boolean()'),
    show:true
  },
{
    classId: Mock.mock('@id'),
    classTitle: '水产海鲜',
    type: null,
    oldClass:null,
    childClass:childClass,
    classPic:[Mock.mock('@image("30x30","#ccc","机构图片")')],
    keywords: Mock.mock('@integer(1, 9999)'),
    createTime:Mock.mock('@date()'),
    updateTime:Mock.mock('@date()'),
    del:Mock.mock('@boolean()'),
    show:true
  },
{
    classId: Mock.mock('@id'),
    classTitle: '乳饮速食',
    type: null,
    oldClass:null,
    childClass:childClass,
    classPic:[Mock.mock('@image("30x30","#ccc","机构图片")')],
    keywords: Mock.mock('@integer(1, 9999)'),
    createTime:Mock.mock('@date()'),
    updateTime:Mock.mock('@date()'),
    del:Mock.mock('@boolean()'),
    show:true
  },
{
    classId: Mock.mock('@id'),
    classTitle: '粮油副食',
    type: null,
    oldClass:null,
    childClass:childClass,
    classPic:[Mock.mock('@image("30x30","#ccc","机构图片")')],
    keywords: Mock.mock('@integer(1, 9999)'),
    createTime:Mock.mock('@date()'),
    updateTime:Mock.mock('@date()'),
    del:Mock.mock('@boolean()'),
    show:true
  }
];


 const GoodsList = []
for(let n=0;n<20;n++){
GoodsList.push(Mock.mock({
    'goodsId':Mock.mock('@id'),
    'goodsTitle':Mock.mock('@cword(1,20)'),
    'goodsSubTitle':Mock.mock('@cword(0,20)'),
    price:{
      'GOODS_MARKET_PRICE':Mock.mock('@float(60, 100, 2,2)'),
      'GOODS_COST_PRICE':Mock.mock('@float(60, 100, 2,2)')
    },
    store:null,
    goodsClass:'某一个',
    goodsPic:[
          { 'path':    Mock.mock('@image("800x800","#FF6600","one")'),
            'url':     '',
            'title':   Mock.mock('@cword(8)')
          },
          { 'path':    Mock.mock('@image("800x800","#893f3c","two")'),
            'url':     '',
            'title':   Mock.mock('@cword(8)')
          },
          { 'path':    Mock.mock('@image("800x800","#asd234","three")'),
            'url':     '',
            'title':   Mock.mock('@cword(8)')
          },
          { 'path':    Mock.mock('@image("800x800","#fd3432","four")'),
            'url':     '',
            'title':   Mock.mock('@cword(8)')
          },
          { 'path':    Mock.mock('@image("800x800","#123456","five")'),
            'url':     '',
            'title':   Mock.mock('@cword(8)')
          },
           { 'path':    Mock.mock('@image("800x800","#asd234","three")'),
            'url':     '',
            'title':   Mock.mock('@cword(8)')
          }
    ],
    goodsBody:'<h1>我是商品详情</h1>',
    keywords:Mock.mock('@cword(1,20)'),
    repositoryNum: Mock.mock('@integer(1, 9999)'),
    commission:213,
    property:[],
    'createTime':   Mock.mock('@date()'),
    'updateTime':   Mock.mock('@date()'),
    'createTime': Mock.mock('@date()'),
    show:true,
    del:false,
    'soldInTime':Mock.mock('@date()'),
    'soldOutTime':Mock.mock('@date()'),
    state:2
  
})
)}

 const brandList = Mock.mock({
  'data|10':[{
      brandId:Mock.Random.id(),
      brandTitle: Mock.mock('@cword(3,10)'),
      brandPic:[
        {
          'url':'12323',
          'path':Mock.mock('@image("180x100","green","品牌图片")')
        }
      ],
      store:null,
      createTime:Mock.mock('@date()'),
      brandState:2
  }]
})

export {brandList,GoodsList,goodsClass}