let handler = async (m, { conn, usedPrefix }) => { 
    try { 
        let __timers = (new Date - global.db.data.users[m.sender].lastngojek)
        let _timers = (86400000 - __timers) 
        let timers = clockString(_timers)
        if (global.db.data.users[m.sender].healt > 49) {
            if (new Date - global.db.data.users[m.sender].lastngojek > 86400000) {
            let healt = pickRandom(['50', '49', '48', '47', '46', '45', '44', '43', '42', '41', '40'])
            let orderan = between(0, 100)
            let exps = (Math.floor(Math.random() * 400) + (global.db.data.users[m.sender].level * 5)) * orderan
            let exp = exps < 1000 ? 1000 : exps
            let uangs = (Math.floor(Math.random() * 400) + (global.db.data.users[m.sender].level * 10)) * orderan
            let uang = uangs < 10000 ? 10000 : uangs
            let tips = orderan > 50 ? between(10000, 50000) -  (orderan * 10) : 1000
            let tip = tips > uang ? 1000 : tips
            if(orderan == 0) throw `Kamu tidak mendapat orderan ojek sama sekali '^'`
            let str = `
${rpg.emoticon('healt')} Nyawa mu berkurang -${healt * 1} karena Kamu telah mendapat ${orderan} orderan ojek dan mendapatkan
${rpg.emoticon('exp')} *Exp:* ${exp}
${rpg.emoticon('money')} *Uang:* ${uang}
${rpg.emoticon('money')} *Tip penumpang:* ${tip}
`.trim()
            conn.send2Button(m.chat, str, wm, 'menu', usedPrefix + 'menu', 'Profile', usedPrefix + 'pp', m)
            global.db.data.users[m.sender].healt -= healt * 1
            global.db.data.users[m.sender].exp += exp * 1
            global.db.data.users[m.sender].money += uang + tip * 1
            global.db.data.users[m.sender].lastngojek = new Date * 1
            } else conn.sendButton(m.chat, `Anda sudah bekerja keras hari ini, silahkan menunggu sampai *${timers}*`, wm, 'menu', usedPrefix + 'menu', m)
        } else conn.send2Button(m.chat, 'Minimal 50 health untuk bisa narik ojek, beli obat dulu biar kuat dengan ketik *' + usedPrefix + 'shop buy potion <jumlah>*\ndan ketik *' + usedPrefix + 'use potion <jumlah>*\n\n_Untuk mendapat money dan potion gratis ketik_ *' + usedPrefix + 'claim*', wm, 'Healing', usedPrefix + `heal`, 'Beli Potion', usedPrefix + `shop buy potion`, m)
    } catch (e) {
        console.log(e)
        throw eror
    }
}
handler.help = ['ngojek']
handler.tags = ['rpg','update']
handler.command = /^(ngojek|ojek|ojol|w)$/i

handler.fail = null
handler.register = true

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }