const cheerio = require('cheerio')
const fetch = require('node-fetch')
const axios = require("axios")
const qs = require("qs")

function quotes(input) {
    return new Promise((resolve, reject) => {
        fetch('https://jagokata.com/kata-bijak/kata-' + input.replace(/\s/g, '_') + '.html?page=1')
            .then(res => res.text())
            .then(res => {
                const $ = cheerio.load(res)
                data = []
                $('div[id="main"]').find('ul[id="citatenrijen"] > li').each(function (index, element) {
                    x = $(this).find('div[class="citatenlijst-auteur"] > a').text().trim()
                    y = $(this).find('span[class="auteur-beschrijving"]').text().trim()
                    z = $(element).find('q[class="fbquote"]').text().trim()
                    data.push({ author: x, bio: y, quote: z })
                })
                data.splice(2, 1)
                if (data.length == 0) return resolve({ creator: 'stikerin', status: false })
                resolve({ creator: 'stikerin', status: true, data })
            }).catch(reject)
    })
}

function mangatoons(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://mangatoon.mobi/en/search?word=${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                 $('#page-content > div.search-page > div > div.comics-result > div.recommended-wrap > div > div ').each(function(a, b) {
                    result = {
                    status: 200,
                    author: author,
                    judul: $(b).find('> div.recommend-comics-title > span').text(),
                    genre: $(b).find('> div.comics-type > span').text().trim(),
                    link: 'https://mangatoon.mobi' + $(b).find('> a').attr('href'),
                    thumbnail: $(b).find('> a > div > img').attr('src')
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}

function webtoons(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.webtoons.com/id/search?keyword=${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                 $('#content > div.card_wrap.search._searchResult > ul > li ').each(function(a, b) {
                    result = {
                    status: 200,
                    author: author,
                    judul: $(b).find('> a > div > p.subj').text(),
                    like: $(b).find('> a > div > p.grade_area > em').text(),
                    creator: $(b).find('> a > div > p.author').text(),
                    genre: $(b).find('> a > span').text(),
                    thumbnail: $(b).find('> a > img').attr('src'),
                    url: 'https://www.webtoons.com' + $(b).find('> a').attr('href')
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}

function joox(query) {
    return new Promise((resolve, reject) => {
        const time = Math.floor(new Date() / 1000)
        axios.get('http://api.joox.com/web-fcgi-bin//web_search?lang=id&country=id&type=0&search_input=' + query + '&pn=1&sin=0&ein=29&_=' + time)
            .then(({ data }) => {
                let result = []
                let hasil = []
                let promoses = []
                let ids = []
                data.itemlist.forEach(result => {
                    ids.push(result.songid)
                });
                for (let i = 0; i < data.itemlist.length; i++) {
                    const get = 'http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=' + ids[i]
                    promoses.push(
                        axios.get(get, {
                            headers: {
                                Cookie: 'wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;'
                            }
                        })
                            .then(({ data }) => {
                                const res = JSON.parse(data.replace('MusicInfoCallback(', '').replace('\n)', ''))
                                hasil.push({
                                    lagu: res.msong,
                                    album: res.malbum,
                                    penyanyi: res.msinger,
                                    publish: res.public_time,
                                    img: res.imgSrc,
                                    mp3: res.mp3Url
                                })
                                Promise.all(promoses).then(() => resolve({
                                    creator: "ariffb",
                                    status: true,
                                    data: hasil,
                                }))
                            }).catch(reject)
                    )
                }
            }).catch(reject)
    })
}

/* function otakudesu(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://otakudesu.watch/?s=${query}&post_type=anime`).then(({data}) => {
                const hasil = []
                const $ = cheerio.load(data)
                $('#venkonten > div > div.venser > div > div > ul > li').each(function (a, b) {
                        result = {
                            status: 200,
                            author: author,
                            judul: $(b).find('> h2 > a').text(),
                            thumbnail: $(b).find('> img').attr('src'),
                            link: $(b).find('> h2 > a').attr('href')
                        };
                        hasil.push(result);
                    });
                resolve(hasil)
            }).catch(reject)
    })
} */

function otakudesu(judul){
	return new Promise(async(resolve, reject) => {
	axios.get('https://otakudesu.moe/?s=' + judul + '&post_type=anime', {
        headers: "Accept-Language: en-US,en;q=0.9"
      })
	.then(({ data }) => {
	const $ = cheerio.load(data)
	const result = {};
	let limk = $('#venkonten > div > div.venser > div > div > ul > li:nth-child(1) > h2 > a').attr('href')
	axios.get(limk).then(({ data }) => {
	const $$ = cheerio.load(data)
	result.message = 'By Hexagon'
	result.img = $$('#venkonten > div.venser > div.fotoanime').find('img').attr('src')
	$$('#venkonten > div.venser > div.fotoanime > div.infozin > div').each(function(a, b) {
		result.judul = $$(b).find('p:nth-child(1)').text().replace('Judul: ','')
		result.jepang = $$(b).find('p:nth-child(2)').text().replace('Japanese: ','')
		result.rate = $$(b).find('p:nth-child(3)').text().replace('Skor: ','')
		result.produser = $$(b).find('p:nth-child(4)').text().replace('Produser: ','')
		result.tipe = $$(b).find('p:nth-child(5)').text().replace('Tipe: ','')
		result.status = $$(b).find('p:nth-child(6)').text().replace('Status: ','')
		result.episode = $$(b).find('p:nth-child(7)').text().replace('Total Episode: ','')
		result.durasi = $$(b).find('p:nth-child(8)').text().replace('Durasi: ','')
		result.rilis = $$(b).find('p:nth-child(9)').text().replace('Tanggal Rilis: ','')
		result.studio = $$(b).find('p:nth-child(10)').text().replace('Studio: ','')
		result.genre = $$(b).find('p:nth-child(11)').text().replace('Genre: ','')
		result.desc = $$('#venkonten > div.venser > div.fotoanime > div.sinopc').text().replace('.','\n') + $$(b).find('div.sinopc > p:nth-child(2)').text()
		result.batch = $$('#venkonten > div.venser > div:nth-child(10) > ul > li > span:nth-child(1) > a').attr('href')
	})
	const lim = $$('#venkonten > div.venser > div:nth-child(10) > ul > li > span:nth-child(1) > a').attr('href')
	axios.get(lim).then(({ data }) => {
	const $$$ = cheerio.load(data)
		result.batchSD = $$$('#venkonten > div:nth-child(6) > ul > li:nth-child(1) > a:nth-child(3)').attr('href')
		result.batchHD = $$$('#venkonten > div:nth-child(6) > ul > li:nth-child(3) > a:nth-child(3)').attr('href')
		resolve(result)
				})
			})
		})
	.catch(reject)
	})
}

function wattpad(judul){
	return new Promise((resolve, reject) => {
		axios.get('https://www.wattpad.com/search/' + judul)
		.then(({data}) => {
			const $ = cheerio.load(data)
			const result = [];
			const jdl = [];
			const img = [];
			const des = [];
			const lnk = [];
			const red = [];
			const vt = [];
			const limk = 'https://www.wattpad.com/'
			$('div.cover.cover-xs.pull-left').each(function(a,b){
				img.push($(b).find('img').attr('src')) 
			})
			$('div.content > h5').each(function(a,b) {
				jdl.push($(b).text().trim())
			})	
			$('div.content > p').each(function(a,b){
				des.push($(b).text().trim())
			})	
			$('#results-stories > div > ul > li').each(function(a,b){
				lnk.push(limk + $(b).find('a.on-result').attr('data-id'))
			})
			$('div.content > div > small.reads').each(function(a,b){
				red.push($(b).text())
			})
			$('div.content > div > small.votes').each(function(a, b) {
				vt.push($(b).text())
			})
		for (let i = 0; i < lnk.length; i++){
			result.push({
					judul: jdl[i],
					desc: des[i],
					vote: vt[i],
					reads: red[i],
					image: img[i],
					link: lnk[i]
			})
			resolve(result)
		}
		})
	.catch({message: 'err'})
	})
}

function tiktok(url) {
    return new Promise(async (resolve, reject) => {
        axios.get('https://ttdownloader.com/', {
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
            }
        })
            .then(({ data }) => {
                const $ = cheerio.load(data)
                let token = $('#token').attr('value')
                let config = {
                    'url': url,
                    'format': '',
                    'token': token
                }
                axios('https://ttdownloader.com/req/', {
                    method: 'POST',
                    data: new URLSearchParams(Object.entries(config)),
                    headers: {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                        "cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
                    }
                })
                    .then(({ data }) => {
                        const $ = cheerio.load(data)
                        resolve({
                            nowm: $('div:nth-child(2) > div.download > a').attr('href'),
                            wm: $('div:nth-child(3) > div.download > a').attr('href'),
                            audio: $('div:nth-child(4) > div.download > a').attr('href')
                        })
                    })
            })
            .catch(reject)
    })
}

function twitter(url) {
    return new Promise((resolve, reject) => {
        let params = new URLSearchParams()
        params.append('URL', url)
        fetch('https://twdown.net/download.php', { method: 'POST', body: params })
            .then(res => res.text())
            .then(res => {
                const $ = cheerio.load(res);
                data = []
                $('div.container').find('tbody > tr > td').each(function (index, element) {
                    x = $(this).find('a').attr('href')
                    if (x !== '#') {
                        if (typeof x !== 'undefined') {
                            data.push({ url: x })
                        }
                    }
                })
                if (data.length == 0) return resolve({ status: false })
                resolve({ status: true, data })
            }).catch(reject)
    })
}

function igdl(url) {
    return new Promise(async (resolve, reject) => {
        axios.request({
            url: 'https://www.instagramsave.com/download-instagram-videos.php',
            method: 'GET',
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
            }
        })
            .then(({ data }) => {
                const $ = cheerio.load(data)
                const token = $('#token').attr('value')
                let config = {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
                        "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    },
                    data: {
                        'url': url,
                        'action': 'post',
                        'token': token
                    }
                }
                axios.post('https://www.instagramsave.com/system/action.php', qs.stringify(config.data), { headers: config.headers })
                    .then(({ data }) => {
                        resolve(data.medias)
                    })
            })
            .catch(reject)
    })
}

function igstory(username) {
    return new Promise(async (resolve, reject) => {
        axios.request({
            url: 'https://www.instagramsave.com/instagram-story-downloader.php',
            method: 'GET',
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
            }
        })
            .then(({ data }) => {
                const $ = cheerio.load(data)
                const token = $('#token').attr('value')
                let config = {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
                        "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    },
                    data: {
                        'url': 'https://www.instagram.com/' + username,
                        'action': 'story',
                        'token': token
                    }
                }
                axios.post('https://www.instagramsave.com/system/action.php', qs.stringify(config.data), { headers: config.headers })
                    .then(({ data }) => {
                        resolve(data.medias)
                    })
            })
            .catch(reject)
    })
}

function pin(url) {
    return new Promise((resolve, reject) => {
        function rand() {
            return `${Math.floor(Math.random() * 1000000)}`
        }
        let params = new URLSearchParams()
        params.append('url', url)
        fetch('https://www.expertsphp.com/facebook-video-downloader.php', { method: 'POST', body: params })
            .then(res => res.text())
            .then(res => {
                const $ = cheerio.load(res)
                y = 'pinterest_' + rand() + '.mp4'
                x = $('video').find('source').attr('src')
                data = { file: y, url: x }
                if (typeof x == 'undefined') return resolve({ status: false })
                resolve({ status: true, data })
            }).catch(reject)
    })
}

let is = {
    headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    }
}

function _token(host) {
    return new Promise(async (resolve, reject) => {
        axios.request({
            url: host, method: 'GET', headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
            }
        }).then(({ data }) => {
            let $ = cheerio.load(data)
            let token = $('#token').attr('value')
            resolve(token)
        })
    })
}

function facebook(url) {
    return new Promise(async (resolve, reject) => {
        let host = 'https://aiovideodl.ml/'
        let form = { data: { 'url': url, 'token': (await _token(host)) } }
        axios.post(host + '/system/action.php', qs.stringify(form.data), { headers: is.headers })
            .then(({ data }) => {
                if (data.links.lenght == 0) return resolve({ creator: '', status: false })
                resolve({ creator: '', status: true, data: data.links })
            })
    })
}

function ttdownloader(url){
	return new Promise(async(resolve, reject) => {
		axios.get('https://ttdownloader.com/',{
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
			}
		})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			let token = $('#token').attr('value')
			let config = {
				'url': url,
				'format': '',
				'token': token
			}
		axios('https://ttdownloader.com/req/',{
			method: 'POST',
			data : new URLSearchParams(Object.entries(config)),
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
			}
			})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			resolve({
				message: 'By Hexagon',
				nowm: $('div:nth-child(2) > div.download > a').attr('href'),
				wm: $('div:nth-child(3) > div.download > a').attr('href'),
				audio: $('div:nth-child(4) > div.download > a').attr('href')
				})
			})
		})
	.catch(reject)
	})
}

function fbdown(link){
	return new Promise((resolve,reject) => {
	let config = {
		'url': link
		}
	axios('https://www.getfvid.com/downloader',{
			method: 'POST',
			data: new URLSearchParams(Object.entries(config)),
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"user-agent":  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.1310699039.1624884412; _pbjs_userid_consent_data=3524755945110770; cto_bidid=rQH5Tl9NNm5IWFZsem00SVVuZGpEd21sWnp0WmhUeTZpRXdkWlRUOSUyQkYlMkJQQnJRSHVPZ3Fhb1R2UUFiTWJuVGlhVkN1TGM2anhDT1M1Qk0ydHlBb21LJTJGNkdCOWtZalRtZFlxJTJGa3FVTG1TaHlzdDRvJTNE; cto_bundle=g1Ka319NaThuSmh6UklyWm5vV2pkb3NYaUZMeWlHVUtDbVBmeldhNm5qVGVwWnJzSUElMkJXVDdORmU5VElvV2pXUTJhQ3owVWI5enE1WjJ4ZHR5NDZqd1hCZnVHVGZmOEd0eURzcSUyQkNDcHZsR0xJcTZaRFZEMDkzUk1xSmhYMlY0TTdUY0hpZm9NTk5GYXVxWjBJZTR0dE9rQmZ3JTNEJTNE; _gid=GA1.2.908874955.1625126838; __gads=ID=5be9d413ff899546-22e04a9e18ca0046:T=1625126836:RT=1625126836:S=ALNI_Ma0axY94aSdwMIg95hxZVZ-JGNT2w; cookieconsent_status=dismiss"
			}
		})
	.then(async({ data }) => {
		const $ = cheerio.load(data);	
		resolve({
			Normal_video: $('div.col-md-4.btns-download > p:nth-child(2) > a').attr('href'),
			HD: $('div.col-md-4.btns-download > p:nth-child(1) > a').attr('href'),
			audio: $('div.col-md-4.btns-download > p:nth-child(3) > a').attr('href')
			})
		})
	.catch(reject)
	})
}

module.exports = { mangatoons, webtoons, otakudesu, wattpad, facebook, quotes, igdl, igstory, tiktok, twitter, joox, pin, fbdown, ttdownloader }