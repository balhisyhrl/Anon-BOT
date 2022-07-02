const { truth } = require('@bochilteam/scraper')

let handler = async (m, { conn, usedPrefix }) => conn.send2Button(m.chat, await truth(), wm, 'Dare', `${usedPrefix}dare`, 'Truth', `${usedPrefix}truth`, m)

handler.help = ['truth']
handler.tags = ['fun']
handler.command = /^(truth)$/i

module.exports = handler