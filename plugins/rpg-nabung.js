let fs = require('fs')
const xppermoney = 1
let handler = async (m, { conn, command, args }) => {
    if(!args[0]) throw `Masukkan jumlah yang ingin ditarik`
  let count = args[0]
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].money / xppermoney) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  let level = global.db.data.users[m.sender].level
  let potongan = level - 9
  if(level < 10) throw `Maaf, Hanya User Diatas Level 10 yang Dapat Menggunakan Fitur Ini`
  if (global.db.data.users[m.sender].money >= xppermoney * count) {
    global.db.data.users[m.sender].money -= xppermoney * count
    global.db.data.users[m.sender].atm += count
    //global.db.data.users[m.sender].exp -= Math.ceil(count * potongan / 100)
    global.db.data.users[m.sender].atm -= Math.ceil(count * 10 / 100)
    conn.sendButton(m.chat, `-Rp.${xppermoney * count} 💹\n+ ${count} 💳\n\nPotongan Biaya BANK\n- ${Math.ceil(count * 10 / 100)} Saldo\n\n[ ! ] Succes menabung !`, wm, 'BANK', `.bank`, m)
  } else conn.reply(m.chat, `[❗] Uang anda tidak mencukupi untuk menabung ${count} !`, m)
}
handler.help = ['nabung <jumlah>']
handler.tags = ['xp']
handler.command = /^nabung$/i

module.exports = handler