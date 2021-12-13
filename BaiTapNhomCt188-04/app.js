/* By Phạm Quang Thái B2012257 */
// Js dùng cho trang chủ, san pham và trang chi tiết sp

// Nút ToTop
let toTopBtn = document.querySelector('.toTop')
window.onscroll = () => {
    if (this.scrollY < 200) {
        toTopBtn.style.opacity = 0;
    } else {
        toTopBtn.style.opacity = 1;
    }
}
toTopBtn.addEventListener('click', () => {
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
    if (s < 10) {
        s = '0' + s;
    }
    if (m < 10) {
        m = '0' + m;
    }
    timeHtml.innerText = `${h}:${m}:${s}`;
    setTimeout(clock, 1000)
}
clock()

/////////////// Hàm Hiện thông báo khi thêm thành công ///////////////////////
// body là thẻ html body
let body = document.querySelector('#container')
function showSuccessMessage() {
    // Tao 1 element co class toast
    const htmlToast = document.createElement("div");
    htmlToast.classList.add('toast')
    htmlToast.innerHTML = `
            <div class="toast__icon">
                <i class="fas fa-check-circle"></i>
            </div>

            <div class="toast__body">
                <h3 class="toast__title">Success</h3>
                <p class="toast__msg">Thêm thành công vào giỏ hàng</p>
            </div>
            <div class="toast__close-icon">
            <i class="fas fa-times" title="Đóng"></i>
        </div>
           
    `
    // Thêm toast vào body
    body.append(htmlToast)
    // Remove Message sau 3 giây
    setTimeout(() => {
        body.removeChild(htmlToast)
    }, 3000)

    // Đóng toast khi click
    removeToastAfterClick(htmlToast)
}

// remove toast sau khi click nút close
function removeToastAfterClick(htmlToast) {
    let clockBtn = document.querySelectorAll('.toast__close-icon')
        clockBtn.forEach((item) => {
        item.addEventListener('click', () => {
            body.removeChild(htmlToast)
        })
    })
}



// ////////////////////chức năng thêm vào giỏ hàng dùng chung cho trang chủ, và trang chi tiết sản phẩm//////////////////////

// arrCart là mảng chứa các sản phẩm trong localStorage
let arrCart = JSON.parse(localStorage.getItem('Cart'));
// Khi tải trang sẽ hiển thị lại số tượng sản phẩm trong giỏ
window.onload = function () {
    showQuantily(arrCart)
}
// Kiểm tra có hổ trợ LocalStorage hay không
if (typeof (Storage) !== 'undefined') {
    // Khởi tạo cart trong localStorage
    setInStorage();
    // thêm sự kiện click vào tất cả nút Mua
    let buyBtns = document.querySelectorAll('.info__price-button')
    buyBtns.forEach((buyBtn) => {
        buyBtn.addEventListener('click', (e) => {
            // let idProduct = e.target.parentNode.children[3].innerText
            let idProduct = e.target.parentNode.querySelector('.id').innerText
            // let nameProduct = e.target.parentNode.children[0].innerText
            let nameProduct = e.target.parentNode.querySelector('.info__title').innerText
            // let priceProduct = e.target.parentNode.children[2].innerText
            let priceProduct = e.target.parentNode.querySelector('.price').innerText
            // let imgSrc = e.target.parentNode.previousElementSibling.attributes[0].nodeValue;
            let imgSrc = e.target.parentNode.parentNode.querySelector('.item__image').attributes[0].nodeValue

            // Đưa dữ liệu lấy được vào object
            let newProducts = {
                id: idProduct,
                name: nameProduct,
                price: priceProduct,
                src: imgSrc,
                quantily: 1,
            }
            // đưa newProducts vào LocalStorge
            addInStorage(newProducts)
        })
    })


} else {
    //Nếu không hỗ trợ
    alert('Trình duyệt của bạn không hỗ trợ Storage');
}

// kiểm tra nếu chưa có key Cart trong Store thì thêm value Cart vào
// cart là mảng chứa sản phẩm đã đc khách hàng click thêm vào giỏ 
function setInStorage() {
    let cart = new Array;
    if (localStorage.key('Cart') == 'Cart') {
        // Đã có key trong Storage
    }
    else {

        localStorage.setItem('Cart', JSON.stringify(cart))
    }
}

function addInStorage(newProducts) {
    // id gán bằng id của sản phẩm sắp đc thêm
    let id = newProducts.id;
    // Kiểm tra nếu mảng arrCart này rổng thì thêm vô luôn, ngược lại thì xét 2 trường hợp
    if (arrCart.length === 0) {
        arrCart.push(newProducts)
    }
    else {
        let isExis = isInLocalStorage(id, arrCart)
        // trường hợp 1 nếu isExis bằng -10 thì tương đương k tồn tại sp trùng => thêm vào mảng luôn
        if (isExis === -10) {
            arrCart.push(newProducts)
        }
        // trường hợp 2 isExis khắc -10 => tồn tại sp trong giỏ rồi => cho thuộc tính quatity(số lượng) của sp đó tăng lên 1
        else arrCart[isExis].quantily++
    }
    // Đưa arrCart đã xử lý vào LocalStorage
    localStorage.setItem('Cart', JSON.stringify(arrCart))
    // Thông báo thêm thành công
    addProductSuccess()
    // Hiển thị lại số sản phẩm trong giỏ hàng ngay khi thêm thành công mà k reload lại trang
    showQuantily(arrCart)
}
// hàm kiểm tra có tồn tại sản phẩm này trong Storage chưa
//  indexNew === -10 là không tồn tại trong arrCart và nếu !== -10 thì có tồn tại
function isInLocalStorage(id, arrCart) {
    let indexNew = -10;
    arrCart.forEach((item, index) => {
        if (id === item.id) indexNew = index;
    })
    return indexNew
}

// Hiện 1 thông báo khi thêm thành công
function addProductSuccess() {
    // alert("Thông báo thêm sản phẩm thành công!")
    // Thong bao thêm thành công
    showSuccessMessage()
}
// Hiển thị số sp trong giỏ
function showQuantily() {
    let quantily = 0
    let cartNumber = document.querySelector('.cart-number')
    // Duyệt qua mảng arrCart lấy từng trường quantily của 1 sản phẩm cộng vào biến quantily
    arrCart.map((item) => {
        quantily += item.quantily;
    })
    cartNumber.innerText = quantily;
}

