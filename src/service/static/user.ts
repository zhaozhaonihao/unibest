import { http } from '@/utils/http'

interface updateFileObj {
  filesID: string
  filesURL: string
  url: string
}

/** 更新居住小区 */
function updateMyMemberPropertyID(propertyID: string) {
  return http.get('/updateMyMemberPropertyID', { propertyID })
}

/** 获取物业小区列表 */
function getPropertyList() {
  return http.get('/getPropertyList', { applicationID: APPLICATIONID })
}

/** 更新用户昵称 */
function updateMyMemberShortname(shortName: string) {
  return http.get('/updateMyMemberShortname', { shortName })
}

/** 更新用户头像 */
function updateMyMemberAvatar(avatarURL: string) {
  return http.get('/updateMyMemberAvatar.json', { avatarURL })
}

/** 上传单个文件，获取图片url */
function uploadOneFileToQiniu(fileBucketID: string) {
  return http.get('/uploadOneFileToQiniu.json', { fileBucketID })
}

export {
  getPropertyList,
  updateFileObj,
  updateMyMemberAvatar,
  updateMyMemberPropertyID,
  updateMyMemberShortname,
  uploadOneFileToQiniu,
}
