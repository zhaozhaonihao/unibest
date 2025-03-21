/** 微信小程序 开发ID */
export const APPID = import.meta.env.VITE_WX_APPID
/** 微信小程序 原始ID */
export const PUBLICNO = 'gh_110aa876fb21'
/** 后台接口地址 */
export const BASEURL = import.meta.env.VITE_SERVER_BASEURL
// 后台常量
/** 应用ID */
export const APPLICATIONID = 'ff80808194077da801941571aa6d0009'
/** 站点ID */
export const SITEID = 'ff80808194077da801941571b98a0079'
/** 公司ID */
export const COMPANYID = 'ff80808194077da8019415707dcb0005'
/** 店铺ID */
export const SHOPID = 'ff80808194077da80194174488ef008b'
/** 微信ID */
export const WEIXINID = 'ff80808194077da80194175c5e6f008d'
/** 轮播图ID */
export const FOCUSID = '9f482165b37f419ba140507040ebb4b6'
/** 搜索定义ID */
export const SEARCHDEFINEID = 'ff80808194077da801941571b14f000f'
/** 手机设备 */
export const DEVICEID = 'ec706d740178432fb24ab281028756f5'
/** 文章导航ID */
export const NAVIGATORID = 'a257e7bbc75747ef82952dd00ef6a492'
/** 文件仓库 */
export const FILEBUCKETID = '8a2f462a850617e301851e5760810d72'
/** 系统文章 */
export const OUTTOKEN = 'F5BBFA3F7B29D44D8C860F262A848697'
/** 城管人员身份 */
export const MAJOR_ID_CHENGGUAN = 'ff808081945dba2f0194644301250004'
/** 注册协议文章ID */
export const REGISTER_AGREEMENT_ID = 'ff80808194077da801941571b0ec000b'
/** 隐私协议文章ID */
export const PRIVACY_AGREEMENT_ID = 'ff80808194077da801941571b0ec000b'
/** 操作手册文章ID */
export const OPERATION_MANUAL_ID = 'ec8f9abe9b85416d96816644a0b7c764'
/** 常见问题文章ID */
export const COMMON_QUESTION_ID = '72ae734853b5421f94e9cb49ecf84f18'
/** 关于我们文章ID */
export const ABOUT_US_ID = 'ff80808194077da801941571b0ec000b'

/** 获取文章[getArticleList.json]  contentType 可能的取值 */
export enum ContentTypeEnum {
  系统文章 = 1,
  公告通知 = 2,
  文档库 = 3,
  公司简介 = 4,
  案例 = 5,
  动态 = 6,
  资料 = 7,
  知识库 = 8,
  在线帮助 = 90,
  新功能提示 = 91,
  一般文章 = 99,
}

/** 获取文章内容[getArticleSimpleDetail.json]  outToken 可能的取值 */
export enum OutTokenEnum {
  关于我们 = 'ff80808194077da80194157112e40008',
  隐私协议 = 'ff8080819445fc3901944f2272d90000',
  注册协议 = 'ff80808194077da801941571b0ec000b',
  积分规则 = 'ff8080819445fc3901944f23138c0001',
}

/** 获取附件[getObjectAttachmentList.json]  objectID 可能的取值 */
export enum ObjectDefineIDEnum {
  意见反馈 = '8a2f462a5ebc4863015ebc755ff70455',
  巡视点检查 = '8a2f462a926b2ea701926b4bb6b7003c',
  挪车全景图 = '8a2f462a9473d8b401947d736c0a0428',
}
