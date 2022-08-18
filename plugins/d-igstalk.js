const axios = require('axios')
const cheerio = require('cheerio')

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args || !args[0]) throw `❰ ❗️ ❱ *SERTAKAN USERNAME*
*Contoh :* *_${usedPrefix}${command}_* balhisyhrl
`.trim()
  let res = await igstalk(args[0])
  let json = JSON.parse(JSON.stringify(res)) 
  let iggs = `
*[ INSTAGRAM STALK ]*\n
👤 *Username  :* ${json.username}
📛 *Full Name :* ${json.fullName}
👥 *Followers :* ${json.followers}
👥 *Following :* ${json.following}
💠 *Postingan:* ${json.postsCount}
💠 *Highlight:*${json.highlight_reel_count}
💠 *Link:* https://instagram.com/${json.username}
💠 *Bio:* ${json.bio}`.trim() // add your own json.blablabla :)
  conn.sendFile(m.chat, json.profilePicHD, 'error.jpg', wm, m)
}
handler.help = ['igstalk @username']
handler.tags = ['downloader']
handler.command = /^(igstalk|igver|verig|igusuario|usuarioig|verinstagram|instagramver)$/i
handler.limit = false

module.exports = handler

async function igstalk(username) {
  try {
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
    const responseIGID = await fetch(`https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`, {
      method: 'get',
      headers: defaultHeaders
    })
    let user = await responseIGID.json()
    const results = {
      userID: user.data.user.id,
      username: user.data.user.username,
      fullName: user.data.user.full_name,
      profilePicHD: user.data.user.profile_pic_url_hd,
      bio: user.data.user.biography,
      fbid: user.data.user.fbid,
      followers: `${user.data.user.edge_followed_by.count}`.trim(),
      following: user.data.user.edge_follow.count,
      postsCount: user.data.user.edge_owner_to_timeline_media.count,
      highlight_reel_count: user.data.user.highlight_reel_count,
      //lastPost: user.data.user.edge_owner_to_timeline_media.edges[0].node.display_url,
      //lastPostInfo: user.data.user.edge_owner_to_timeline_media.edges[0].node.accessibility_caption,
      //lastPostCaption: user.data.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text,
      //lastPostLike: user.data.user.edge_owner_to_timeline_media.edges[0].node.edge_liked_by.count
    }
    return results
  } catch (e) {
    console.error(e)
    throw 'Not found ;-;'
  }
}