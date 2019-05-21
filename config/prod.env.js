'use strict'
module.exports = {
  // NODE_ENV: '"production"'
  NODE_ENV: process.env.NODE_ENV ? `"${process.env.NODE_ENV}"` : '"production"',
  CORS: JSON.stringify(process.env.CORS)
}
