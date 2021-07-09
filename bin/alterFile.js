const fs = require('fs')

const alterFile = (name) => {
  try {
    const sourcePath = `${process.cwd()}/${name}/package.json`
    fs.readFile(sourcePath, (err, data) => {
      if (err) throw err;
      let json = data.toString()
      /* 替换模版名称 */
      json = json.replace(/projectName/g, name.trim())
      /* 写入文件 */
      fs.writeFile(sourcePath, Buffer.from(json), ()=>{})
    })
  } catch (error) {
    console.log('修改文件失败')
  }
}

module.exports = alterFile;
