let handler = async (m, { usedPrefix, command, conn, text }) => {
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let kon = `*Database saat ini ${totalreg} user*\n*Registrasi saat ini ${rtotalreg} user*`
    //await conn.sendButtonLoc(m.chat, await(await require('node-fetch')(fla + `${command}`)).buffer(), kon, wm, 'Menu', usedPrefix + 'menu', m)
    const buttons = [
        {buttonId: usedPrefix + 'menu', buttonText: {displayText: `Menu`}, type: 1}
      ]
       await conn.sendMessage(m.chat, { 
        image: {url: fla + `${command}`},
        caption: `${kon}`.trim(),
        footer: wm,
        buttons: buttons,
        headerType: 4
        })
}
handler.help = ['user']
handler.tags = ['info']
handler.command = /^(pengguna|(jumlah)?database|user)$/i

module.exports = handler
