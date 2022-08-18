let fs = require('fs')
const util = require('util')

const isNumber = x => typeof x === 'number' && !isNaN(x)
const xpperatm = 1
let handler = async (m, { conn, command, args }) => {
    if(!args[0]) throw `Masukkan jumlah yang ingin ditarik`
    let level = global.db.data.users[m.sender].level
    if(level < 10) throw `Maaf, Hanya User Diatas Level 10 yang Dapat Menggunakan Fitur Ini`
    let count = args[0]
    count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].atm / xpperatm) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
    count = Math.max(1, count)
    if (global.db.data.users[m.sender].atm >= xpperatm * count) {
        global.db.data.users[m.sender].atm -= xpperatm * count
        global.db.data.users[m.sender].money += count
        conn.sendButton(m.chat, `-Rp.${xpperatm * count} 💹\n+ ${count} 💳\n\n[ ! ] Succes menarik !`, wm, 'BANK', `.bank`, m)
    } else conn.reply(m.chat, `[❗] Saldo anda tidak mencukupi untuk menarik ${count} !`, m)
}
handler.help = ['narik <jumlah>']
handler.tags = ['xp']
handler.command = /^narik|tarik$/i

module.exports = handler