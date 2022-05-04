/**
 * 根据项目目录结构，生成对应目录图
 */

const fs = require('fs')
const path = require('path')

function dfs(path: string, depth: number) {
  const dirs = fs.readdirSync(path)

  for (const dir of dirs) {
    if (dir === 'node_modules' || dir === '.git') { continue }

    const stat = fs.statSync(`${path}/${dir}`)

    let prefix: string = ''
    for (let i = depth; i > 0; i--) {
      prefix += '    '
    }
    prefix += '|——'

    if (stat.isDirectory()) {
      console.log(`${prefix}${dir}`)
      dfs(`${path}/${dir}`, depth + 1)
    }
    else {
      console.log(`${prefix}${dir}`)
    }
  }
}

function dirGraph() {
  const entry = process.argv[2] || './'
  dfs(entry, 0)
}

dirGraph()
