const https = require('https')
const fetch = require('node-fetch')

let handler = async (m, { args, usedPrefix, command }) => {
	if (!args[0]) throw `Contoh : ${usedPrefix + command} balhis.codes`
	let res = await checkWeb(args)
	m.reply(res.map(v => `*• Domain:* ${v.Domain}\n*• Status:* ${v.Status}`).join('\n\n'))
}
handler.help = ['webcek']
handler.command = /^web(check|cek)|(check|cek)web$/i
handler.tags = ['tools','update']
module.exports = handler

async function checkWeb(url) {
	let res = await (await fetch('https://trustpositif.kominfo.go.id/Rest_server/getrecordsname_home', {
		agent: new https.Agent({ rejectUnauthorized: false }),
		method: 'post',
		body: new URLSearchParams(Object.entries({ name: url.join('%0A') }))
	})).json()
	return res.values
}