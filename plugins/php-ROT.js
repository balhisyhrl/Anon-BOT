/*
Made by https://github.com/balhisyhrl
*/
let cp = require('child_process')
let { promisify } = require('util')
let exec = promisify(cp.exec).bind(cp)
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let teks = m.quoted ? m.quoted.text : text
    if (!teks) throw `Encode teks apa?\n\ncontoh:\n${usedPrefix + command} ea`
	await conn.reply(m.chat, wait, m)
    let textb64 = Buffer.from(teks, 'utf-8').toString('base64')
    let o
    try {
        o = await exec(`php php/ROT.php --text ${textb64}`)
    } catch (e) {
        o = e
    } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) m.reply(stdout)
        //if (stderr.trim()) m.reply(stderr)
    }
}
handler.help = ['rot <text>']
handler.tags = ['tools','php','update']
handler.command = /^(rot)$/i

module.exports = handler
