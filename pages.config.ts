import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
    enablePullDownRefresh: true,
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#1e7aff',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/images/tabbar/tab_home.png',
        selectedIconPath: 'static/images/tabbar/tab_home_hl.png',
        pagePath: 'pages/home/index',
        text: '首页',
      },
      {
        iconPath: 'static/images/tabbar/tab_mine.png',
        selectedIconPath: 'static/images/tabbar/tab_mine_hl.png',
        pagePath: 'pages/mine/index',
        text: '我的',
      },
    ],
  },
})
