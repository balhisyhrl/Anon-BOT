const free = 50
const prem = 100
let handler = async (m, { conn, usedPrefix, isPrems, text }) => {
  if(!text) throw 'Masukkan kode Cheat'
  let user = db.data.users[m.sender]
  if (user.level < 1) return await conn.send3Button(m.chat, 'naikan level kamu', wm, 'Level Up', usedPrefix + 'levelup', 'Weekly', usedPrefix + 'weekly', 'Monthly', usedPrefix + 'monthly', m)
  let time = (2592000000 - (new Date - user.cheatlastclaim))
  if (new Date - user.cheatlastclaim < 2592000000) return await conn.send2Button(m.chat, `Kamu sudah mengklaim kode cheat hari ini\ntunggu selama *🕒${clockString(time)}* lagi`, wm, 'menu', usedPrefix + 'menu', 'Profile', usedPrefix + 'pp', m)
  if(text == '1234') {
    user.exp += isPrems ? prem * user.level * 99 : free * user.level * 50
    user.money += isPrems ? prem * user.level * 66 : free * user.level * 33
    user.limit += isPrems ? prem * user.level * 2 : free * user.level * 1
    user.diamond += isPrems ? prem * user.level * 5 : free * user.level * 2
    let teks = `+${isPrems ? prem * user.level * 99 : free * user.level * 50} XP
+${isPrems ? prem * user.level * 66 : free * user.level * 33} Money
+${isPrems ? prem * user.level * 5 : free * user.level * 2} Diamond
+${isPrems ? prem * user.level * 2 : free * user.level * 1} Limit
    
semakin tinggi level, semakin tinggi juga XP yang didapat`
    conn.send2Button(m.chat, teks, wm, 'menu', usedPrefix + 'menu', 'Profile', usedPrefix + 'pp', m)
    user.cheatlastclaim = new Date * 1
  } else {
    m.reply('Kode cheat salah')
  }
}
handler.help = ['cheat <kode>']
handler.tags = ['xp']
handler.command = /^(cheat|topup)$/i

module.exports = handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    console.log({ms,h,m,s})
    return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
  }