const translate = require('translate-google-api')
const defaultLang = 'id'
const tld = 'cn'
let fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let ar = ['dog', 'cat', 'panda', 'fox', 'red_panda', 'koala', 'bird', 'raccoon', 'kangaroo']
  let er = `
┌「 *Pilihan* 」
${ar.map(v => '├ ' + v).join`\n`}
└────

Contoh:
${usedPrefix}${command} panda
`.trim()

  if (!text) throw er
  if (!ar.includes(text)) throw er
  let res = await fetch(
    API('https://some-random-api.ml', '/animal/' + text)
  )
  if (!res.ok) throw `${res.status} ${res.statusText}`
  let json = await res.json()
  if (!json.image) throw json
  let lang = 'id'
  let texttrans = json.fact
  if (!text && m.quoted && m.quoted.text) text = m.quoted.text
    let result
    try {
        result = await translate(`${texttrans}`, {
            tld,
            to: lang,
        })
    } catch (e) {
        result = await translate(`${texttrans}`, {
            tld,
            to: defaultLang,
        })
        //throw err
    } finally {
        //m.reply(result[0])
        conn.sendFile(m.chat, json.image, '', `EN :  ${json.fact}\n\nID : ${result[0]}`, m)
    }
}
handler.help = ['animal'].map((v) => v + ' <opsi>')
handler.tags = ['fun']
handler.command = /^(animal|animalfact|hewan)$/i

module.exports = handler