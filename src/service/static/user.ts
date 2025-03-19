import { http } from '@/utils/http'

export interface IPerson {
  peopleID: string
  name: string
  approveStatus: number
  approveDescription: string
  approveTime: string
  faceImage: string
  backImage: string
  agreementStatus: boolean
  idNumber: string
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

/** 实名认证 */
function queryMemberRealNameStatus(loginSession: ILoginSession) {
  return http.get<IPerson>('/queryMemberRealNameStatus.json', loginSession)
}

/** 上传实名验证 */
function applyRealNameVerify(iPerson: IPerson) {
  return http.get('/applyRealNameVerify.json', { ...iPerson, isChinese: '1' })
}

export {
  applyRealNameVerify,
  getPropertyList,
  queryMemberRealNameStatus,
  updateMyMemberAvatar,
  updateMyMemberPropertyID,
  updateMyMemberShortname,
  uploadOneFileToQiniu,
}
