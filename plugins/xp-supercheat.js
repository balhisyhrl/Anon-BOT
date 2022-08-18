let handler = async (m, { conn, usedPrefix, isPrems, text }) => {
  if(!text) throw 'Masukkan kode Cheat'
  let user = db.data.users[m.sender]
  if (user.level < 1) return await conn.send3Button(m.chat, 'naikan level kamu', wm, 'Level Up', usedPrefix + 'levelup', 'Weekly', usedPrefix + 'weekly', 'Monthly', usedPrefix + 'monthly', m)
  let time = (2592000000 - (new Date - user.supercheatlastclaim))
  if (new Date - user.supercheatlastclaim < 2592000000) return await conn.send2Button(m.chat, `Kamu sudah mengklaim kode cheat hari ini\ntunggu selama *🕒${clockString(time)}* lagi`, wm, 'menu', usedPrefix + 'menu', 'Profile', usedPrefix + 'pp', m)
  if(text == '10234') {
    user.exp += 99999999
    user.money += 99999999
    user.limit += 99999999
    user.diamond += 99999999
    user.atm += 99999999
    user.potion += 99999999
    user.kayu += 99999999
    user.batu += 99999999
    user.string += 99999999
    user.iron += 99999999
    user.common += 99999999
    user.uncommon += 99999999
    user.mythic += 99999999
    user.legendary += 99999999
    user.sampah += 99999999
    let teks = `+${99999999} XP
+${99999999} Money
+${99999999} Diamond
+${99999999} Limit
+${99999999} ATM
+${99999999} potion
+${99999999} kayu
+${99999999} batu
+${99999999} string
+${99999999} iron
+${99999999} common
+${99999999} uncommon
+${99999999} mythic
+${99999999} legendary
+${99999999} sampah
    
SUPER CHEAT SUCCESS!`
    conn.send2Button(m.chat, teks, wm, 'menu', usedPrefix + 'menu', 'Profile', usedPrefix + 'pp', m)
    user.cheatlastclaim = new Date * 1
  } else {
    m.reply('Kode cheat salah')
  }
}
handler.help = ['supercheat <kode>']
handler.tags = ['xp']
handler.command = /^(supercheat)$/i

handler.owner = true

module.exports = handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " jam " + minutes + " menit"
}
function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    console.log({ms,h,m,s})
    return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
  }