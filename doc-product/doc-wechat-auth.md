
# 微信用户授权文档

## 授权类型

__网页授权机制__

```
- 自动授权：snsapi_base 
    不弹出授权页面，直接跳转，
    只能获取用户openid

- 手动授权：snsapi_userinfo 
    弹出授权页面
    获取用户openid，并可以通过openid拿到用户基本信息（如下）
    即使在未关注的情况下，只要用户授权，也能获取此类信息
```

用户基本信息包括：

|      参数      |                                                           说明                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| subscribe      | 用户是否订阅该公众号标识，值为0时，代表此用户没有关注该公众号，拉取不到其余信息。                                        |
| openid         | 用户的标识，对当前公众号唯一                                                                                             |
| nickname       | 用户的昵称                                                                                                               |
| sex            | 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知                                                                  |
| city           | 用户所在城市                                                                                                             |
| country        | 用户所在国家                                                                                                             |
| province       | 用户所在省份                                                                                                             |
| language       | 用户的语言，简体中文为zh_CN                                                                                              |
| headimgurl     | 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空 |
| subscribe_time | 用户关注时间，为时间戳。如果用户曾多次关注，则取最后关注时间                                                             |
| unionid        | 只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。详见：[获取用户个人信息（UnionID机制）](id)                  |

[id]:https://open.weixin.qq.com/cgi-bin/frame?t=resource/res_main_tmpl&lang=zh_CN&target=res/app_wx_login

## 授权与页面

### 1元夺宝

手动授权

- 个人中心首页 user-index
- 夺宝支付页 duobao-pay

自动授权

- 其他全部页面

!!! danger "Note: 自动授权为默认授权方式，没有特殊说明的页面，采用本方法授权。"





## 授权常见问题

- 多次反复授权
- …

## 参考文档
- [微信公众平台开发者文档](http://mp.weixin.qq.com/wiki/index.php?title=%E9%A6%96%E9%A1%B5)
- [微信公众平台开发者问答系统](http://mp.weixin.qq.com/qa/index.php?qa=questions) 
- [微信开放平台](https://open.weixin.qq.com/cgi-bin/index?t=home/index&lang=zh_CN)


















