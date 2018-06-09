# classroomsys
教室管理系统


## 目录结构
```
┌─doc								项目文档目录
├─front								前端项目目录
│  ├─dist							构建文件目录
│  ├─node_modules					npm下载文件目录	             
│  └─src							前端项目源文件
│      ├─index.js					入口文件
│      ├─components					公共组件目录
│      ├─conf						配置文件
│      ├─constants					常量配置
│      ├─containers					内容组件
│      │  ├─back					管理页面组件
│      │  ├─common					公共组件
│      │  └─front					前台页面组件
│      └─redux						redux目录
│
├─src								后端源文件目录
│  ├─main
│  │  ├─java
│  │  │  └─com
│  │  │      └─keaper
│  │  │          └─classroom
│  │  │              ├─annotation				注解定义
│  │  │              ├─common					公共类
│  │  │              │  └─utils					工具类
│  │  │              ├─enums					枚举类
│  │  │              ├─interceptor				拦截器
│  │  │              ├─modal					Modal
│  │  │              ├─persistence				数据持久化相关类
│  │  │              │  ├─dao					dao层接口定义
│  │  │              │  └─handler				mybatis typeHandler
│  │  │              ├─service					service层
│  │  │              ├─task						定时任务
│  │  │              └─web						
│  │  │                  └─controller			controller层
│  │  │                          
│  │  ├─resources								资源文件
│  │  │  ├─mybatis								mybatis 配置文件
│  │  │  ├─spring								spring配置文件
│  │  │  └─templates							thymeleaf模板文件
│  │  └─web       								web项目目录
│  └─test										测试文件目录
├──pom.xml							maven构建配置文件
└──README.md						项目介绍文件
```