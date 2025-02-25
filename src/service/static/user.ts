import { http } from '@/utils/http'

/** 更新居住小区 */
const updateMyMemberPropertyID = (propertyID: string) => {
    return http.get('/updateMyMemberPropertyID', { propertyID })
}

/** 获取物业小区列表 */
const getPropertyList = () => {
    return http.get('/getPropertyList', { applicationID: APPLICATIONID })
}

/** 更新用户昵称 */
const updateMyMemberShortname = (shortName: string) => {
    return http.get('/updateMyMemberShortname', { shortName })
}

/** 更新用户头像 */
const updateMyMemberAvatar = (avatarUR: string) => {
    return http.get('updateMyMemberAvatar.json', { avatarUR })
}

/** 上传单个文件，获取图片url */
const uploadOneFileToQiniu = (fileBucketID: string) => {
    return http.get('uploadOneFileToQiniu.json', { fileBucketID })
}

export {
    updateMyMemberPropertyID,
    getPropertyList,
    updateMyMemberShortname,
    updateMyMemberAvatar,
    uploadOneFileToQiniu,
}