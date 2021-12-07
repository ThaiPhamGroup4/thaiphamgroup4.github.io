// Nút ToTop
let toTopBtn = document.querySelector('.toTop')
window.onscroll = () => {
    if(this.scrollY < 200) {
        toTopBtn.style.opacity = 0;
    } else {
        toTopBtn.style.opacity = 1;
    } 
}
toTopBtn.addEventListener('click', () => {
    // document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0
})


// Đồng hồ 
function clock() {
    const time = new Date;
    const h = time.getHours();
    let m = time.getMinutes();
    let timeHtml = document.querySelector('body .clock');
    let s = time.getSeconds();
    // validate time
    if(s < 10) { 
        s = '0' + s}
    else if(m < 10) {
        m = '0' + m;
    }
    timeHtml.innerText = `${h}:${m}:${s}`;
    setTimeout(clock, 1000)
}
clock()