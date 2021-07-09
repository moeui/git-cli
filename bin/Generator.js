const ora = require('ora');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk')

// 借助promisify 方法 promise 化
const util = require('util');
// 不支持 Promise
const downloadGitRepo = require('download-git-repo');
const { choices, template } = require('./constants');
const alterFile = require('./alterFile');

// 添加加载动画
async function wrapLoading(repo, targetDir) {
  // 使用 ora 初始化，传入提示信息
  const spinner = ora('clone项目模板...');
  // 开始加载动画
  spinner.start();
  try {
    // 执行clone方法 
    // 下载地址
    const requestUrl = template[repo];
    // 开始下载clone
    const res = await util.promisify(downloadGitRepo)(requestUrl, path.resolve(process.cwd(), targetDir), { clone: true });
    spinner.color = 'yellow';
	  spinner.text = '模板下载完成';
    // 状态为修改为成功
    spinner.succeed();
    return Promise.resolve('succeed');
  } catch (error) {
    // 状态为修改为失败
    spinner.fail('Request failed, refetch ...')
    return Promise.reject('error');
  } 
}

class Generator {
  constructor (name, targetDir){
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
    // 对 download-git-repo 进行 promise 化改造
  }

  // 下载远程模板
  async download(repo){
    try {
      const res = await wrapLoading(repo, this.targetDir)
      alterFile(this.name)
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject('error')
    }
  }

  // 核心创建逻辑
  async create(){
    // 选择下载的模板类型
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: choices,
      message: 'Please choose a template to create project'
    })
    try {
      const res = await this.download(repo)
      if (res === 'succeed') {
        // 模板使用提示
        console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
        console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
        console.log(`\r\n  npm install`)
        console.log(`  npm run ${repo.includes('taro') ? 'dev:weapp' : 'serve' }\r\n`)
      }
    } catch (error) {
      console.log(`\r\n${chalk.red('模板下载失败，如模板涉及内部私有仓库')}`)
      console.log(`\r\n${chalk.red('请检查本地是否建立SSH安全链接，并创建known_hosts文件')}`)
    }
  }
}

module.exports = Generator;