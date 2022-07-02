# Anon-BOT

<a href="https://visitor-badge.glitch.me/badge?page_id=balhisyhrl/Anon-BOT"><img title="Visitor" src="https://visitor-badge.glitch.me/badge?page_id=balhisyhrl/Anon-BOT"></a>
<a href="https://github.com/balhisyhrl/Anon-BOT/network/members"><img title="Forks" src="https://img.shields.io/github/forks/balhisyhrl/Anon-BOT?label=Forks&color=blue&style=flat-square"></a>
<a href="https://github.com/balhisyhrl/Anon-BOT/watchers"><img title="Watchers" src="https://img.shields.io/github/watchers/balhisyhrl/Anon-BOT?label=Watchers&color=green&style=flat-square"></a>
<a href="https://github.com/balhisyhrl/Anon-BOT/stargazers"><img title="Stars" src="https://img.shields.io/github/stars/balhisyhrl/Anon-BOT?label=Stars&color=yellow&style=flat-square"></a>
<a href="https://github.com/balhisyhrl/Anon-BOT/graphs/contributors"><img title="Contributors" src="https://img.shields.io/github/contributors/balhisyhrl/Anon-BOT?label=Contributors&color=blue&style=flat-square"></a>
<a href="https://github.com/balhisyhrl/Anon-BOT/issues"><img title="Issues" src="https://img.shields.io/github/issues/balhisyhrl/Anon-BOT?label=Issues&color=success&style=flat-square"></a>
<a href="https://github.com/balhisyhrl/Anon-BOT/issues?q=is%3Aissue+is%3Aclosed"><img title="Issues" src="https://img.shields.io/github/issues-closed/balhisyhrl/Anon-BOT?label=Issues&color=red&style=flat-square"></a>
<a href="https://github.com/balhisyhrl/Anon-BOT/pulls"><img title="Pull Request" src="https://img.shields.io/github/issues-pr/balhisyhrl/Anon-BOT?label=PullRequest&color=success&style=flat-square"></a>
<a href="https://github.com/balhisyhrl/Anon-BOT/pulls?q=is%3Apr+is%3Aclosed"><img title="Pull Request" src="https://img.shields.io/github/issues-pr-closed/balhisyhrl/Anon-BOT?label=PullRequest&color=red&style=flat-square"></a>

## About
Anon-BOT adalah pengembangan sourcecode yang bersumber dari https://github.com/Fokusdotid/Family-MD

## Grup Anon-BOT
[![Anon-BOT GROUP](https://img.shields.io/badge/WhatsApp%20Group-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/Cd3Mz7mdPHU6RfBan7urkz)

## UNTUK PENGGUNA WINDOWS/VPS/RDP

* Unduh & Install Git [`Klik Disini`](https://git-scm.com/downloads)
* Unduh & Install NodeJS [`Klik Disini`](https://nodejs.org/en/download)
* Unduh & Install FFmpeg [`Klik Disini`](https://ffmpeg.org/download.html) (**Jangan Lupa Tambahkan FFmpeg ke variabel lingkungan PATH**)
* Unduh & Install ImageMagick [`Klik Disini`](https://imagemagick.org/script/download.php)

### Tambahan untuk beberapa Fitur Khusus
* Unduh & Install PHP [`Klik Disini`](https://www.php.net/downloads)
* Unduh & Install Python [`Klik Disini`](https://www.python.org/downloads/)

```bash
git clone https://github.com/balhisyhrl/Anon-BOT/
cd Anon-BOT
npm install
node .
```

---------

## UNTUK PENGGUNA TERMUX

* Download Termux [`Klik Disini`](https://github.com/termux/termux-app/releases/download/v0.118.0/termux-app_v0.118.0+github-debug_universal.apk)

```
$ pkg update && upgrade -y
$ apt update && upgrade -y
$ pkg install ffmpeg
$ pkg install nodejs-lts
$ pkg install git
$ pkg install python
$ pkg install php
$ git clone https://github.com/balhisyhrl/Anon-BOT.git
$ cd Anon-BOT
$ npm i
$ node .
```
---------
## UNTUK PENGGUNA HEROKU
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/balhisyhrl/Anon-BOT)
---------
## CARA SETTINGS

Untuk menambahkan atau mengedit owner ada di `settings/owner.json`
Untuk mengubah atau mengedit nama bot ada di `data.json` sekalian ubah cookies pinterest ya

## Arguments `node . [--options] [<session name>]` 

### `--session <nama file>`

menggunakan session dari nama file yang berbeda, default `session.data.json`

contoh nama file `anon.json` maka penggunaannya `node . --session 'anon'`

### `--prefix <prefix>`

* `prefixes` dipisahkan oleh masing-masing karakter
Setel awalan

### `--server`

Digunakan untuk [heroku](https://heroku.com/) atau pindai melalui situs web

### `--db <url mongodb kamu>`

Buka file package.json dan isikan url mongodb kamu di bagian `mongo: --db url mongodb`!

### `--db <json-server-url>`

menggunakan db eksternal alih-alih db lokal, **disarankan** menggunakan mongodb

contoh server dengan mongodb `mongodb+srv://<username>:<password>@name-of-your-db.thhce.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

contoh server dengan repl `https://json-server.nurutomo.repl.co/`

kode: `https://repl.it/@Nurutomo/json-server`

`node . --db 'https://json-server.nurutomo.repl.co/'`

server harus memiliki spesifikasi seperti ini

#### GET

```http
GET /
Accept: application/json
```

#### POST

```http
POST /
Content-Type: application/json

{
 data: {}
}
```

### `--big-qr`

Jika qr unicode kecil tidak mendukung

### `--img`

Aktifkan pemeriksa gambar melalui terminal

### `--test`

**Development** Testing Mode

### `--trace`

```js
conn.logger.level = 'trace'
```

### `--debug`

```js
conn.logger.level = 'debug'
```
## Thanks To 
**Allah SWT**,

**Orang Tua**,

**Seluruh penyedia module**,

**Seluruh pengguna BOT**,

**Fokusdotid yang memperbolehkan recode dan republish sourcecode ini**


#### Special Thanks to
[![Nurutomo](https://github.com/Nurutomo.png?size=100)](https://github.com/Nurutomo)
[![BochilGaming](https://github.com/BochilGaming.png?size=100)](https://github.com/BochilGaming)
[![Fokus ID](https://github.com/fokusdotid.png?size=100)](https://github.com/fokusdotid)
[![Aiinne](https://github.com/Aiinne.png?size=100)](https://github.com/Aiinne)

### Penulis Ulang
[![Bal](https://github.com/balhisyhrl.png?size=100)](https://github.com/balhisyhrl/)