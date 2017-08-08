import Mock from 'mockjs'

export  const bannerList = Mock.mock({
    'data|2':[{
        'brandId':     Mock.Random.id(),
        'adbPic': [{
            'path':    Mock.mock('@image("1200x350","#ccc","机构图片")'),
            'url':     '',
            'title':   Mock.mock('@cword(8)')
            }],
        'onlyShow':    true,
        'startTime':   Mock.mock('@date()'),
        'endTime':     Mock.mock('@date()'),
         'createTime': Mock.mock('@date()')
    }]
})

export const floorList =[
    {
        floorId:Mock.Randow.id(),
        floorType:1,
        floorStyle:1,
        advPic:[

        ],
        sort:1,
        onlyShow:true,
        del:false
    }
    
]