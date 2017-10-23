export const Login = r => require.ensure([],() => r(require('../components/login')),'group-index');
export const Register = r => require.ensure([],() => r(require('../components/register/step1')),'group-register');
export const StepTwo = r => require.ensure([],() => r(require('../components/register/step2')),'group-register');
export const StepThree = r => require.ensure([],() => r(require('../components/register/step3')),'group-register');

export const Index = r => require.ensure([],() => r(require('../view/index')),'group-index');
export const List = r => require.ensure([],() => r(require('../view/list')),'group-index');
export const Detail = r => require.ensure([],() => r(require('../view/detail')),'group-index');
export const addOrder = r => require.ensure([],() => r(require('../view/adv_order/add')),'group-index');
export const editOrder = r => require.ensure([],() => r(require('../view/adv_order/edit')),'group-index');
export const addWeekTel = r => require.ensure([],() => r(require('../view/week_tel/add')),'group-index');
export const editWeekTel = r => require.ensure([],() => r(require('../view/week_tel/edit')),'group-index');
export const Infor = r => require.ensure([],() => r(require('../view/infor')),'group-index');
export const shopCar = r => require.ensure([],() => r(require('../view/shop_car')),'group-index');
export const pay = r => require.ensure([],() => r(require('../view/pay')),'group-index');
// 个人中心
export const Address = r => require.ensure([],() => r(require('../view/infor/children/address')),'group-infor');
export const Bill = r => require.ensure([],() => r(require('../view/infor/children/bill')),'group-infor');
export const Coupon = r => require.ensure([],() => r(require('../view/infor/children/coupon')),'group-infor');
export const Information = r => require.ensure([],() => r(require('../view/infor/children/information')),'group-infor');
export const Order = r => require.ensure([],() => r(require('../view/infor/children/order')),'group-infor');

// 创建店铺
export const addStore = r => require.ensure([],() => r(require('../view/store/add')),'group-infor');
//密码
 
export const findback = r => require.ensure([],() => r(require('../view/findPass/find')),'group-index');
export const resetpassword = r => require.ensure([],() => r(require('../view/findPass/repeat')),'group-index');
export const passSuccess = r => require.ensure([],() => r(require('../view/findPass/success')),'group-index');
