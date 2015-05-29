fis3-deploy-tar
==========================


用来在 fis3 deploy 阶段用 tar 的方式打包资源。

## 安装插件

全局安装

```bash
npm install -g fis3-deploy-tar
```

或者本地安装到项目所在目录。

```bash
npm install fis3-deploy-tar
```

## 配置

```javascript
fis.match('**', {
  deploy: [
    fis.plugin('tar'),

    fis.plugin('local-deliver', {
      to: './output'
    })
  ]
})

// 或者
fis.match('*.tpl', {
  deploy: [
    fis.plugin('tar', {
      filename: 'templates.tar.gz'
    }),

    fis.plugin('local-deliver', {
      to: './output'
    })
  ]
})
```

## 配置说明

* `filename` 默认为 `all.tar.gz` 用来配置打包的文件名
* `keep` 默认为 `false` 是否保留零碎文件。
* `modified`: 默认为 `false` 是否只打包上次修改过的文件。默认是所有文件都打包。
