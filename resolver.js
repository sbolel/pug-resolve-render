'use strict'

const fs = require('fs')

function Resolver(path) {
  this.path = path
  const self = this
  const resolvePug = () =>
    new Promise((resolve, reject) => {
      fs.access(self.path, fs.F_OK, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(self.path)
        }
      })
    })

  resolvePug.__proto__ = this.__proto__
  return resolvePug
}

module.exports = Resolver
