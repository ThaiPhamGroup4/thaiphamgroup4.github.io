const closeBtnPlaylist = document.querySelector('.close-playlist');
const openPLayList = document.querySelector('.open-playlist');
const InfoSong = document.querySelector('.player__song__info')
const thumnaiHtml = document.querySelector('.thumnail-song')
const audio = document.querySelector('#audio');
closeBtnPlaylist.onclick = () => {
    document.querySelector('.player__playlist').classList.toggle('active');
}
openPLayList.onclick = () => {
    document.querySelector('.player__playlist').classList.toggle('active');
}

let listSong = [
    {
        id: 'ZUOZWCUC',
        name: 'Rồi Tới Luôn',
        thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/a/9/e/e/a9ee81fdd1c2b569c1c9631e969ea0aa.jpg',
        duration: '4:31',
    },
    {
        id: 'ZOAFBWB0',
        name: 'Hạ Còn Vương Nắng',
        thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/d/8/0/1/d801670cd8ecdb89750bdbe8de198021.jpg',
        duration: '4:31',
    },
    {
        id: 'ZOBBB9A6',
        name: 'Thở',
        thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/3/f/0/c/3f0cc91969e09d143585071bf626fcf8.jpg',
        duration: '4:31',
    },
    {
        id: 'ZOF9EUFB',
        name: 'The Playah (Special Performance)',
        thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/b/4/2/9/b4292439fdc63154c04a50f56d7da985.jpg',
        duration: '4:31',
    },
    {
        id: 'ZOO79FZ9',
        name: 'Tháng Năm',
        thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/5/c/b/2/5cb27fd4c536a2274d267a53ac417b01.jpg',
        duration: '4:31',
    },
    {
        id: 'ZOEIUW0E',
        name: 'Khi Em Lớn',
        thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/c/4/3/a/c43a3f7cc98ee9c62401edb8fb999b74.jpg',
        duration: '4:31',
    },
    {
        id: 'ZWBIEWBI',
        name: 'Đường Tôi Chở Em Về',
        thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/4/0/2/5/402582e1cf3523e44b73ea617ddf24b8.jpg',
        duration: '4:31',
    },
    {
        id: 'ZWZF08AW',
        name: 'Chiru (Saisei no Uta)',
        thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/b/2/c/1/b2c1db696d69aca2e032966a52cb17ef.jpg',
        duration: '4:31',
    },
    {
        id: 'ZW78DU0A',
        name: 'Đi Về Đâu',
        thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/covers/3/b/3b2ea7cf55a387e30dcd16e0f6bb06fd_1483503486.jpg',
        duration: '4:31',
    },
    {
        id: 'ZWBWZI7Z',
        name: 'Nandemonaiya (remix)',
        thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/6/e/5/e/6e5e3d490e24d7f7901319825c4613d8.jpg',
        duration: '4:31',
    },
    {
        id: 'ZW9C87EF',
        name: 'Kimi no Na wa',
        thumbnail: 'https://photo-zmp3.zadn.vn/audio_default.png',
        duration: '4:31',
    },
    {
        id: 'ZW6CEAUU',
        name: 'unravel ',
        thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/c/3/a/3/c3a3e44e2cfedfcc7b280a2c2395c213.jpg',
        duration: '4:31',
    },
    {
        id: 'ZWADA8UZ',
        name: 'Safari ',
        thumbnail: ' https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/1/b/a/2/1ba2a8b45c1211442ad320461029f297.jpg',
        duration: '4:31',
    },
    {
        id: 'ZW7O9D8U',
        name: 'Booty Music',
        thumbnail: 'https://photo-zmp3.zadn.vn/audio_default.png',
        duration: '4:31',
    },
    {
        id: 'ZWAEWFCU',
        name: 'Tháng Năm Không Quên (EDM Version)',
        thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/5/b/f/3/5bf38f2d19a72f598ccf4f1fa98adb26.jpg',
        duration: '4:31',
    },
    {
        id: 'ZWADDI6A',
        name: 'Tháng Năm Không Quên',
        thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/1/0/4/9104122454f6c8710d078b86a59cd61a.jpg',
        duration: '4:31',
    }

];

const firstSong = {
    name: listSong[0].name,
    id: listSong[0].id,
    thumbnail: listSong[0].thumbnail
}
function rederFirstSong() {
    InfoSong.children[1].innerText = firstSong.name; 
    thumnaiHtml.attributes[0].value = firstSong.thumbnail;
    audio.attributes[1].value = `http://api.mp3.zing.vn/api/streaming/audio/${firstSong.id}/320`
}
rederFirstSong()
const html = document.querySelector('.playlist__list-song');
listSong.forEach((item, index) => {
    html.innerHTML +=  `
    <div class="playlist__list-song__item">
        <span class="song__item__order">${index+1}</span>
        <a class="song__item__name" href="#!">${item.name}</a>
        <span class="song__item__time">${item.duration}</span>
        <span hidden>${item.thumbnail}</span>
    </div>
   `
})
