#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 用于检查入口文件是否正常执行
// console.log('dd-cli working~')
const program = require('commander')
const create = require('./create')
const chalk = require('chalk')

program
  // 定义命令和参数
  .command('create <app-name>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --fore', 'overwrite target directory if it exist')
  .action((name, options) => {
    // 打印执行结果
    create(name, options)
  })

program
  // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')

// 配置 config 命令
program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>')
  .option('-d, --delete <path>', 'delete option from config')
  .action((value, options) => {
    console.log(value, options)
  })

// 配置 ui 命令
program
  .command('ui')
  .description('start add open dd-cli ui')
  .option('-p, --port <port>', 'Port used for the UI Server')
  .action((option) => {
    console.log(option)
  })

program
  // 监听 --help 执行
  .on('--help', () => {
    // 新增说明信息
    console.log(`\r\nRun ${chalk.cyan(`dd-cli <command> --help`)} for detailed usage of given command\r\n`)
  })

// 解析用户执行命令传入参数
program.parse(process.argv);