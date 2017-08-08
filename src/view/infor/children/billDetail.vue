<template>
    <div>
        <div class="dialog-wrap">
            <div class="dialog-cover" v-if="isShow" @click="closeMyself"></div>
            <transition name="drop">
                <div class="dialog-content" v-if="isShow">
                    <p class="dialog-close" @click="closeMyself">x</p>
                    <div class="table">
                        <el-table :data="tableData" style="width: 100%;" height="320">
                            <el-table-column prop="date" label="日期" width="180">
                            </el-table-column>
                            <el-table-column prop="consume" label="消费金额" width="180">
                            </el-table-column>
                            <el-table-column prop="discount" label="折扣金额">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                consume: '￥397.50',
                discount: '￥279.50'
            }, {
                date: '2016-05-04',
                consume: '￥397.50',
                discount: '￥279.50'
            }, {
                date: '2016-05-01',
                consume: '￥397.50',
                discount: '￥279.50'
            }, {
                     date: '2016-05-04',
                consume: '￥397.50',
                discount: '￥279.50'
            }, {
                date: '2016-05-01',
                consume: '￥397.50',
                discount: '￥279.50'
            }, {
                     date: '2016-05-04',
                consume: '￥397.50',
                discount: '￥279.50'
            }, {
                date: '2016-05-01',
                consume: '￥397.50',
                discount: '￥279.50'
            }, {
                     date: '2016-05-04',
                consume: '￥397.50',
                discount: '￥279.50'
            }, {
                date: '2016-05-01',
                consume: '￥397.50',
                discount: '￥279.50'
            }, {
                     date: '2016-05-04',
                consume: '￥397.50',
                discount: '￥279.50'
            }, {
                date: '2016-05-01',
                consume: '￥397.50',
                discount: '￥279.50'
            }, {
                     date: '2016-05-04',
                consume: '￥397.50',
                discount: '￥279.50'
            }, {
                date: '2016-05-01',
                consume: '￥397.50',
                discount: '￥279.50'
            }, {
                date: '2016-05-03',
                consume: '￥397.50',
                discount: '￥279.50'
            }]
        }
    },
    methods: {
        closeMyself() {
            this.$emit('on-close')
        }
    },
}
</script>

<style >
.drop-enter-active {
    transition: all .5s ease;
}

.drop-leave-active {
    transition: all .3s ease;
}

.drop-enter {
    transform: translateY(-500px);
}

.drop-leave-active {
    transform: translateY(-500px);
}

.dialog-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
}

.dialog-cover {
    background: #000;
    opacity: .3;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.dialog-content {
    width: 960px;
    min-height: 200px;
    position: fixed;
    max-height: 50%;
    background: #fff;
    top: 20%;
    left: 50%;
    margin-left: -25%;
    z-index: 10;
    box-sizing: border-box;
    line-height: 1.6;
}

.dialog-close {
    position: absolute;
    z-index:998;
    right:-10px;
    top: -15px;
    width: 25px;
    height: 25px;
    background-color: #fff;
    border-radius: 50%;
    color: #ccc;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    line-height: 25px;
}
.dialog-close:hover{
    color: rgb(108, 169, 110);
}
.table .el-table th {
    background-color: rgb(108, 169, 110);
}

.table .el-table__header-wrapper thead div {
    background-color: rgb(108, 169, 110);
}

.dialog-wrap table thead th {
    text-align: center;
    font-weight: 400;
    font-size: 14px;
    color: #fff;
}

.el-table th>.cell {
    color: #fff;
}
</style>
