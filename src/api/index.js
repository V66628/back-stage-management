import ajax from  './axios'
export const reqLogin=(data)=> ajax('/login',data,'POST')
export const reqAdd=(data)=> ajax('manage/user/add',data,'POST')  
export const weather=(data)=>ajax('https://restapi.amap.com/v3/weather/weatherInfo?parameters',data) 
//获取一级/二级分类的列表
export const reqCategorys=(data)=>ajax('manage/category/list',data)
//添加分类
export const addCategorys=(data)=>ajax('manage/category/add',data,'POST')
//更新分类
export const updateCategorys=(data)=>ajax('manage/category/update',data,'POST')