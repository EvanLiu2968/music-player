# music-player

产品需求：
- 可加载本地音乐文件，自动解析格式并可播放（歌词自动云加载等功能待定）
- 可创建歌单，遴选喜欢的歌曲分类，另自动生成以下列表
  - 评分筛选列表，评分一星到五星，由用户手动打分
  - 播放次数列表，由高到低
- 自定义用户设置，支持自定义UI
- 可将用户数据、设置导出为JSON，方便在新客户端还原设置

注：所有数据均存储在本地，所有API由Node API Server以web api的形式供应用内部使用

## 代码未动，架构先行

我把整个应用分为三个大模块：Electron Shell、Node API Server、React web APP。
三个大模块都有独立的package、运行方式，由此这三个模块可以单独开发、迭代，设计的架构图如下：
<img src="https://raw.githubusercontent.com/EvanLiu2968/clover/master/cdn/app/music-player/framework.jpg" style="display: block;margin:0 auto;">

## 主要技术栈

- web：typescript + react + redux + antd-ui
- server: typescript + koa
- shell: electron + electron-builder
