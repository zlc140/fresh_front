import Mock from 'mockjs'

// 用户地址
// const addressList = Mock.mock({
//     'data|4':[{
//         'id':       Mock.Random.guid(),
//         'name':    '@cname()',
//         'province': Mock.Random.province(),
//         'city':     Mock.Random.city(),
//         'county':   Mock.Random.county(),
         
//     }]
// })
 const addressList = Mock.mock({
    'data|4':[{
        'id':       '@id()',
        'name':    '@cname(2,4)',
        'city':     'sh',
        'county':   '@county()',
        'addrDetail': '@cword(8,20)',
        'tel|13000000000-18999999999': 1,
        'phone|13000000000-18999999999': 1,
    }]
})

// 用户信息
const userList = [
  {
    memberId: Mock.mock('@id'),
    username: 'admin',
    password: '123456',
    nickname: '张某某',
    'phone':Mock.mock(/^[1][358][0-9]{9}$/),
    eMail:Mock.mock('@email()'),
    'iDCardNo': Mock.mock('@integer(1, 9999)'),
    iDCardPic:Mock.mock('@image("300x300","#ccc","机构图片")'),
    state:'123',
    del:Mock.mock('@boolean()')
  }
];

// 我的订单

let orderList = []
for(let m=0;m<10;m++){
  orderList.push(
    
  )
}



export {userList,addressList}