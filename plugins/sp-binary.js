/*
Made by https://github.com/balhisyhrl
*/
const { eBinary, dBinary } = require('../lib/binary')

let handler = async (m, { text, usedPrefix, command }) => {
if (!text) throw `Contoh :\n${usedPrefix + command} text`
        if (/ebinary|enbinary|encodebinary/.test(command)){
            let eb = await eBinary(text)
            m.reply(`Encoding Result :\n`+eb)
        }
        else if (/dbinary|debinary|decodebinary/.test(command)){
            if(/[a-zA-Z]/.test(text)) throw `TIDAK BISA DECODE TEXT`
            let db = await dBinary(text)
            m.reply(`Decoding Result :\n`+db)
        }
  }
  handler.help = ['ebinary <text>','dbinary <text>']
  handler.tags = ['sptools']
  handler.command = /^(ebinary|dbinary|enbinary|debinary|encodebinary|decodebinary)$/i
  
  module.exports = handler