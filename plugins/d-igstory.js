const {
    getStories,
    getStoriesFeed,
    getMediaByCode,
    getUserHighlights,
    getUserByUsername
  } = require('instagram-stories')
const fetch = require('node-fetch')
let moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta'); // Change this to your local timezone
moment.locale('id'); // Change this to your locale
let handler = async (m, { usedPrefix, command, conn, text, args }) => {
if (!args[0]) throw `Gunakan format: ${usedPrefix}${command} balhisyhrl`
const defaultHeaders = {
    'sec-ch-ua': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
    'sec-ch-ua-mobile': '?0',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'x-ig-app-id': '936619743392459',
    'x-ig-www-claim': 'hmac.AR0A6WzcCoXWstKAUuy1gRbCQFUs8FoZCp3ap2UMk_KQNBSH',
    'User-Agent':'Instagram 76.0.0.15.395 Android (24/7.0; 640dpi; 1440x2560; samsung; SM-G930F; herolte; samsungexynos8890; en_US; 138226743',
    'cookie': `sessionid=${global.igsessionID}; ds_user_id=${global.iguserID}`
}

const { user } = await getUserByUsername({ username: args[0], sessionid: global.igsessionID })
if(user.id == undefined) throw `USER TIDAK DITEMUKAN`
let userIDIG = user.id
const response = await fetch(`https://i.instagram.com/api/v1/feed/user/${userIDIG}/story/`, {
      method: 'get',
      headers: defaultHeaders
  })
if (!response.ok) throw await m.reply('error')
let data = await response.json()
if(data.reel == null) throw `Stories Not Found / Private Account`
let itemStory = data.reel.items
let jumlahstory = itemStory.length
if (jumlahstory == 0) throw `Stories Not Found / Private Account`
let wait = `*[ INSTAGRAM STORY DOWNLOADER ]*\n
*Username  :* ${data.reel.user.username}
*Full Name :* ${data.reel.user.full_name}

Jumlah Story ${data.reel.user.username} = ${jumlahstory}
Proses Download.....
`
await conn.sendFile(m.chat, data.reel.user.profile_pic_url, '', wait, m)
for(let i = 0; i < jumlahstory; i++){
    if (itemStory[i].media_type == 1) {
        let type = 'image'
        let mimetype = 'image/jpeg'
        let url = itemStory[i].image_versions2.candidates[0].url
        let taken_at = itemStory[i].taken_at
        let id = itemStory[i].id
        let swipeup_link = itemStory[i].story_cta !== undefined ? itemStory[i].story_cta.map(x => decodeURIComponent(x.links.map(v => v.webUri))) : null
        let upload_date = moment(taken_at * 1000).format('dddd, MMMM Do YYYY, hh:mm')
        let stories = itemStory[i].image_versions2.candidates[0].url
        if(!stories) throw `ERROR`
        let text = `Story by ${data.reel.user.username}\nType : ${type}\nUpload Date : ${upload_date}`
        await delay(1500)
        await conn.sendFile(m.chat, stories, 'ig.png', text, m)
    } else {
        let type = 'video'
        let mimetype = 'video/mp4'
        let url = itemStory[i].video_versions[0].url
        let taken_at = itemStory[i].taken_at
        let id = itemStory[i].id
        let swipeup_link = itemStory[i].story_cta !== undefined ? itemStory[i].story_cta.map(x => decodeURIComponent(x.links.map(v => v.webUri))) : null
        let upload_date = moment(taken_at * 1000).format('dddd, MMMM Do YYYY, hh:mm')
        let stories = itemStory[i].video_versions[0].url
        if(!stories) throw `ERROR`
        let text = `Story by ${data.reel.user.username}\nType : ${type}\nUpload Date : ${upload_date}`
        await delay(1500)
        await conn.sendFile(m.chat, stories, 'ig.mp4', text, m)
    }
}
}
handler.help = ['igstory'].map(v => v + ' <username>')
handler.tags = ['downloader','top']

handler.command = /^(igs(tory)?)$/i

module.exports = handler

const delay = time => new Promise(res => setTimeout(res, time))