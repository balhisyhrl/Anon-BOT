const fetch = require('node-fetch')
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let handler = async (m, { args, usedPrefix, command }) => {
    if (!args[0]) throw `Example user ${usedPrefix}${command} https://github.com/adiwajshing/Baileys`
    if (!regex.test(args[0])) throw 'link salah!'
    let [_, user, repo] = args[0].match(regex) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`
    m.reply(`*Mohon tunggu, sedang mengirim repository..*`)
    conn.sendFile(m.chat, url, `${user} - ${repo}.zip`, null, m)
}
handler.help = ['gitclone <url>']
handler.tags = ['downloader']
handler.command = /gitclone/i

handler.limit = false

module.exports = handler