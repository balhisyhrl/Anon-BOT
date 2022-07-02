const { dare } = require('@bochilteam/scraper')

let handler = async (m, { conn, usedPrefix }) => conn.send2Button(m.chat, await dare(), wm, 'Dare', `${usedPrefix}dare`, 'Truth', `${usedPrefix}truth`, m)

handler.help = ['dare']
handler.tags = ['fun']
handler.command = /^(dare)$/i

module.exports = handler