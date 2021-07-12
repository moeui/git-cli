# git-cli
通过node执行命令行git clone的脚手架

## Install
``` js
yarn add @moeui/git-cli -g  

// or 

npm i @moeui/git-cli -g
```

## use
``` js
git-cli create [project name]
```


## directory structure
    /
    ├── bin
    |   ├── alterFile             // 修改模板的项目名
    |   ├── cli                   // 可执行文件
    |   ├── constants.js          // 常量
    |   ├── create.js             // 创建文件咨询
    |   └── Generator.js          // 模板选项及下载
    ├── package.json
    └── README.md

## attention

1. 私有库需要本地配置ssh私钥

