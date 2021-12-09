// ////////////Phần Javascript của trang giỏ hàng/////////////////
// Javascript dùng cho trang giỏ hàng: render ra list sản phẩm đã thêm, 
// Thành tiền (Xem như đã đăng nhập thành công rồi => k yêu cầu đăng nhập), xoá, chỉnh sửa số lượng sp
// Lưu ý :
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
                <td colspan="5"><p>Bạn chưa thêm sản phẩm nào giỏ, mua sắm ngay tại <a style="color: blue"; href="./sanpham.html">Đây</a></p></td>
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
                <!--  <td><input type="number" value="${item.quantily}" name="inputQuantily" class="table__product-quantily"></input></td> -->
                    <td><p class="table__product-quantily">${item.quantily}</p></td>
                    <td><p class="table__product-price">${item.price}</p></td>
                    <td class="table__modify"><button class="deleteBtn">Xoá</button> <button>Xác nhận sửa</button></td>
                </tr>
            `
        })
        table.innerHTML += newTableHtml
    }
}
// Tong sp 
// quantilyNumber lưu tổng sản phẩm
let quantilyNumber = getAllQuantily()
function getAllQuantily() {
    let quantilyNumber = 0;
    arrCart.map((item) => {
        quantilyNumber += item.quantily
    })
    return quantilyNumber
}

function totalMoney() {

}
deleteProduct()
function deleteProduct() {
    let deleteBtn = document.querySelectorAll('.deleteBtn')
    console.log(deleteBtn)
    deleteBtn.forEach((item)=> {
        item.onclick = function(e) {
            // Lấy id của item cần xoá
            let idDelete = e.target.parentNode.parentNode.children[0].innerText
            deleteInLocalStorage(idDelete)
        }
    })
}
function deleteInLocalStorage(idDelete) {
    console.log(arrCart)
    // console.log(idDelete)
    let arrAfterDelete = arrCart.filter((item) => {
        return item.id !== idDelete;
    })
    arrCart = arrAfterDelete;
    console.log(arrCart)
    localStorage.setItem('Cart', JSON.stringify(arrCart))
    window.location.reload()
}

