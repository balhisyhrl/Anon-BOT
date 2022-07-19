let handler = async (m, { conn, usedPrefix, isPrems, text }) => {
  m.reply('...')
}
handler.help = ['infocommand']
handler.tags = ['main']
handler.command = /^(infocommand)$/i

module.exports = handler