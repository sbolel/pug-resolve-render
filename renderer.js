'use strict'

const path = require('path')
const pug = require('pug')
const Resolver = require('./resolver')

function Renderer (templatePath) {
  const self = this
  this.path = path.join(process.cwd(), templatePath)
  const render = (locals) => new Promise((resolve, reject) => {
    const resolvePug = new Resolver(self.path)
    resolvePug().then(() => {
      try {
        const jadeLocals = Object.assign({}, locals)
        const pageFn = pug.compileFile(`${path.join(self.absolutePath)}.pug`)
        pug.render(pageFn(jadeLocals), jadeLocals, (err, html) => {
          if (err) reject(err)
          else resolvePug(html)
        })
      } catch (err) {
        reject(err)
      }
    }).catch((err) => reject(err))
  })
  render.prototype = this.prototype
  return render
}

module.exports = Renderer
