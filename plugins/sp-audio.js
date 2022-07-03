const FileType = require('file-type')
const { exec } = require("child_process")
let fs = require('fs')
let path = require('path')

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let ar = ['bass', 'blown', 'deep','earrape', 'fast', 'fat', 'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'tupai','vibra']
  let er = `
┌「 *Pilihan* 」
${ar.map(v => '├ ' + v).join`\n`}
└────

Contoh:
${usedPrefix}${command} tupai
`.trim()
    let quoted = m.quoted ? m.quoted : m
    let mime = (quoted.msg || quoted).mimetype || ''
    try {
        let set
        if (/bass/.test(args[0])) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
        if (/blown/.test(args[0])) set = '-af acrusher=.1:1:64:0:log'
        if (/deep/.test(args[0])) set = '-af atempo=4/4,asetrate=44500*2/3'
        if (/earrape/.test(args[0])) set = '-af volume=12'
        if (/fast/.test(args[0])) set = '-filter:a "atempo=1.63,asetrate=44100"'
        if (/fat/.test(args[0])) set = '-filter:a "atempo=1.6,asetrate=22100"'
        if (/nightcore/.test(args[0])) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
        if (/reverse/.test(args[0])) set = '-filter_complex "areverse"'
        if (/robot/.test(args[0])) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
        if (/slow/.test(args[0])) set = '-filter:a "atempo=0.7,asetrate=44100"'
        if (/smooth/.test(args[0])) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
        if (/tupai|squirrel|chipmunk/.test(args[0])) set = '-filter:a "atempo=0.5,asetrate=65100"'
        if (/vibra/.test(args[0])) set = '-filter_complex "vibrato=f=15"'
        if (/audio/.test(mime)) {
        m.reply('Tunggu kk')
        let media = await conn.downloadAndSaveMediaMessage(quoted)
        let ran = getRandom()+'.mp3'
        exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
        fs.unlinkSync(media)
        if (err) return m.reply(er)
        let buff = fs.readFileSync(ran)
        conn.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : m })
        fs.unlinkSync(ran)
        })
        } else m.reply(`Balas audio yang ingin diubah dengan caption *${usedPrefix + command} <option>*\n${er}`)
        } catch (e) {
        m.reply(e)
        }
  }
  handler.help = ['audio <option>','voicechanger <option>']
  handler.tags = ['sptools']
  handler.command = /^(audio|ubahsuara|voicechanger)$/i
  
  module.exports = handler

  function getRandom() {
    if (Array.isArray(this) || this instanceof String) return this[Math.floor(Math.random() * this.length)]
    return Math.floor(Math.random() * this)
  }