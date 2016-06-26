'use strict'

const path = require('path')
const pug = require('pug')
const Resolver = require('./resolver')

function Renderer(path) {
  this.path = path
  this.absolutePath = path.join(process.cwd(), path)
  const self = this;
  const render = (locals) => new Promise((resolve, reject) => {
    const resolvePug = new Resolver(self.path)
    resolvePug().then(() => {
      try {
        const jadeLocals = Object.assign({}, locals)
        const pageFn = pug.compileFile(`${path.join(viewPath, template)}.pug`)
        pug.render(pageFn(jadeLocals), jadeLocals, (err, html) => {
          if (err) reject(err)
          else resolvePug(html)
        })
      } catch (err) {
        reject(err)
      }
    }).catch((err) => reject(err))
  })
  render.__proto__ = this.__proto__
  return render
}

module.exports = Renderer
