// Nút ToTop
let toTopBtn = document.querySelector('.toTop')
console.log(toTopBtn)
window.onscroll = () => {
    if(this.scrollY < 140) {
        toTopBtn.style.opacity = 0;
    } else {
        toTopBtn.style.opacity = 1;
    } 
}
toTopBtn.addEventListener('click', () => {
    // document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0
})
