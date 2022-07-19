const lineByLine = require('n-readlines');
 
let fs = require('fs')
let path = require('path')
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [img, bc, menu, display] = text.split`|`
    if (!img || !bc || !menu || !display) throw `Gunakan perintah dengan benar\n\ncontoh:\n${usedPrefix + command} link gambar|pesan|!menu|menu\n\nSpesial Karakter :\n@user = Mention nama penerima`
    let [ btn1, btn2 ] = menu.split`,`
    let [ display1 , display2 ] = display.split`,`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Kirim File TXT yang berisi nomor target perbaris dengan perintah *${usedPrefix}${command}*`
    let isText = /text\/plain/.test(mime)
    if(!isText) throw `Mimetype ${mime} Tidak Di dukung`
    let media = await q.download()
    let filename = 'bcfile'+ Date.parse(new Date) +'.txt'
    await fs.writeFileSync(`./tmp/${filename}`, media)
	await conn.reply(m.chat, wait, m)
    const liner = new lineByLine(`./tmp/${filename}`)
    let line
while (line = liner.next()) {
    let Userid = line.toString('ascii')
    m.reply(`Wait mengirim ke ${Userid}`)
    const buttons = [
        { urlButton: { displayText: 'LINK', url: 'https://balhis.codes' } },
        {buttonId: btn1, buttonText: {displayText: display1}, type: 1},
        {buttonId: btn2, buttonText: {displayText: display2}, type: 1}
      ]
    await conn.delay(1500)
    let user = Userid.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    let TextBC = bc.replace('@user', await conn.getName(user))
    await conn.sendMessage(user, { 
        image: {url: img},
        caption: TextBC.trim(),
        footer: `BROADCAST`,
        buttons: buttons,
        headerType: 4
    })
}

m.reply('Selesai')

}
handler.help = ['bcbyfile']
handler.tags = ['owner']
handler.command = /^(bcbyfile)$/i

handler.owner = true

module.exports = handler