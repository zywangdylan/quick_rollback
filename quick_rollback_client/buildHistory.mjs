import path from 'path';
import fs from 'fs-extra';
import crypto from 'crypto';

const buildDir = path.resolve('./build');
const historyDir = path.resolve('./history')
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
let buildDirname = '';

function generateHashcode () {
  const randomValue = Math.random().toString();
  const hash = crypto.createHash('sha256');
  hash.update(timestamp + randomValue);
  return hash.digest('hex');
}

function copyBuildFiles () {
  const hashcode = generateHashcode();
  buildDirname = `build-${hashcode}`;
  fs.copySync(buildDir, path.join(historyDir, buildDirname));
}

function createHistoryJson () {
  // 设置存储构建的history.json文件路径
  const historyPath = path.resolve('../history.json')
  // 如果json文不存在就创建一个，初始值为 { list: [] }
  if (!fs.existsSync(historyPath)) {
    fs.writeFileSync(historyPath, JSON.stringify({ list: [] }))
  }

  // 读取本次打包后的index.html内容
  // const html = fs.readFileSync(path.resolve(`./history/${buildDirname}/index.html`), 'utf-8')
  // 获取到当前histyory.json的内容
  const history = JSON.parse(fs.readFileSync(historyPath, 'utf-8'))

  // 将当前打包的信息push到history的list中，包含构建时间和index.html内容还有id
  history.list.push({
    // 模拟生成一个随机的id
    id: Math.random().toString(16).substr(2),
    time: timestamp,
    buildDirname
    // ... 分支信息，commit信息，构建时间，构建人，构建环境等字段
  })

  // 将最新的构建记录内容写入到history.json中
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2))
}

function start () {
  const historyPath = path.resolve('../history.json')

  // check whether the list of history.json do not exceed 5
  const history = JSON.parse(fs.readFileSync(historyPath, 'utf-8'))
  if (history.list.length >= 5) {
    // remove the oldest build directory by using `time`
    const oldestBuildDirname = history.list.find(item => item.time === history.list.reduce((prev, curr) => prev.time < curr.time ? prev : curr).time).buildDirname
    fs.removeSync(path.join(historyDir, oldestBuildDirname))
    history.list.shift()
    fs.writeFileSync(historyPath, JSON.stringify(history, null, 2))
  }

  copyBuildFiles();
  createHistoryJson();
}

start()
