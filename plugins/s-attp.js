const {sticker5, sticker} = require('../lib/sticker')
let handler = async (m, {conn, text}) => {
  if (!text) throw ('mana teksnya')
  api = await conn.getBuffer(`https://xteam.xyz/attp?file&text=${text.toLowerCase().replace(listkatakotor, '(*BADWORD*)')}`)
  if(!api) throw `ERROR atau API DOWN`
  conn.sendMessage(m.chat, {sticker:api},{quoted:m}) 
}

handler.help = ['attp'].map(v => v + ' <teks>')
handler.tags = ['sticker']
handler.command = /^(attp)$/i

module.exports = handler