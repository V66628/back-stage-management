import ajax from  './axios'
export const reqLogin=(data)=> ajax('/login',data,'POST')
export const reqAdd=(data)=> ajax('manage/user/add',data,'POST')   