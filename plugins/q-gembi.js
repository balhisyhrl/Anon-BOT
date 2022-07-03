/*
Made by https://github.com/balhisyhrl
*/
let handler = async (m, { conn, usedPrefix, command }) => {
    //await conn.reply(m.chat, `“${pickRandom(global.bucin)}”`, '', '', m)
    conn.sendFile(m.chat, await (await fetch(pickRandom(global.gembi))).buffer(), 'gembi.mp4', `cr : https://instagram.com/gema.membiru\nBy Gema Membiru`.trim(), m)
  }
  handler.help = ['gembi']
  handler.tags = ['quotes']
  handler.command = /^(gembi|gemamembiru)$/i

  module.exports = handler
  
  function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
  }