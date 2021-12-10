// ////////////Phần Javascript của trang giỏ hàng/////////////////
// Javascript dùng cho trang giỏ hàng: render ra list sản phẩm đã thêm, 
// Thành tiền (Xem như đã đăng nhập thành công rồi => k yêu cầu đăng nhập), xoá, chỉnh sửa số lượng sp

/* Sau khi xoá 1 sản phẩm xong thì nếu có bật 1 tab trangchu.html or sanpham.html thì phải reload lại trang, 
nếu k sẽ bị lỗi
Do số lượng sản phẩm trong giỏ của 2 trang 'trangchu.html' và 'sanpham.html' chưa được cập nhật lại
*/


// render list sản phẩm đã thêm ra html và thêm vào bảng 
renderProduct()
function renderProduct() {
    let table = document.querySelector('.product__table')
    // Nếu giỏ hàng trống 
    if(arrCart.length === 0) {
        
        table.parentNode.style.height ="auto"
        table.parentNode.style.minHeight ="50vh"

        table.innerHTML += `
            <tr>
                <td colspan="6"><p>Bạn chưa có sản phẩm nào trong giỏ, mua sắm ngay tại <a style="color: blue;" href="./sanpham.html">Đây</a></p></td>
            </tr>
        `
    }
    // Ngược lại, => giỏ hàng có ít nhất 1 sản phẩm
    else {
        newTableHtml = arrCart.map((item) => {
            return `
                <tr>
                    <td hidden>${item.id}</td>
                    <td><img class="table__product-img" src="${item.src}" alt="img" ></td>
                    <td><p class="table__product-name">${item.name}</p></td>
                    <td>
                        <input type="number" value="${item.quantily}" min="1" name="inputQuantily" class="table__product-quantily" />
                        
                    </td>
                    <!-- <td><p class="table__product-quantily">${item.quantily}</p></td> -->
                    <td><p class="table__product-price">${item.price}</p></td>
                    <td></td>
                    <td colspan='1' class="table__modify"><button class="deleteBtn">Xoá mục này</button> </td>
                </tr>
            `
        })
        table.innerHTML += newTableHtml
    }
}
// quantilyNumber lưu tổng sản phẩm
var quantilyNumber = getAllQuantily()
function getAllQuantily() {
    let quantilyNumber = 0;
    arrCart.map((item) => {
        quantilyNumber += item.quantily
    })
    return quantilyNumber
}

// Hàm tính tổng tiền
function totalMoney() {

}
// Hàm xoá sản phẩm sau khi ấn nút xoá
deleteProduct()
function deleteProduct() {
    let deleteBtn = document.querySelectorAll('.deleteBtn')
    // console.log(deleteBtn)
    deleteBtn.forEach((item)=> {
        item.onclick = function(e) {
            // Lấy id của item cần xoá
            let idDelete = e.target.parentNode.parentNode.children[0].innerText
            deleteInLocalStorage(idDelete)
        }
    })
}
// Xoá sản phẩm có id là idDelete trong localStorage
function deleteInLocalStorage(idDelete) {
    let arrAfterDelete = arrCart.filter((item) => {
        return item.id !== idDelete;
    })
    arrCart = arrAfterDelete;
    // Cập nhật lại mảng các sản phầm trong giỏ vào LocalStorage
    localStorage.setItem('Cart', JSON.stringify(arrCart))
    window.location.reload()
}

// /////////////////// Làm chức năng chỉnh sửa số lượng sản phẩm trong giỏ hàng
let inputQuantily = document.querySelectorAll('.table__product-quantily') 
let btnConfirm = document.querySelector('.confirm')
// Duyet qua cac co input để thêm sự kiện onchange
inputQuantily.forEach((item) => {
    item.onchange = function(e) {
        // Lưu giá trị quatily mới
        let newValue = e.target.value
        //Biến lưu id của sản phẩm chỉnh sửa
        let idModify = e.target.parentNode.parentNode.children[0].innerText
        console.log(idModify)
         //Sửa lại quantily trong mảng chứa sp trong giỏ   
        arrCart.map((item) => {
            if(item.id === idModify) {
                item.quantily = Number(newValue)
            }
        })
        // Gọi hàm này để thêm arrCart mới vào LocalStorage
        updateQuantily()
    }
})
// Khi focus vào ô input số lượng sản phẩm thì hiện nút xác nhận
inputQuantily.forEach((item) => {
    item.onfocus = function () {
        this.nextElementSibling.style.display = 'inline-block'
    }
})

// cập nhật lại số lượng sản phẩm trong Storage
function updateQuantily() {
    btnConfirm.onclick = (e) => {
            // ẩn nút xác nhận
            // Thông báo thành công
            alert('Chỉnh sửa thành công')  
            localStorage.setItem('Cart', JSON.stringify(arrCart))
            // reload lại trang 1 cái để render lại sản phẩm
            window.location.reload()
    }
   
}

