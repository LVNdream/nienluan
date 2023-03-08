// Hàm định dạng tiền tệ
const formatCurrency = (amount, locale = "vi-VN") => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
};
//hàm hiển thị các sản phẩm trong giỏ hàng
function showCart() {
    if (JSON.parse(localStorage.getItem('cartItems')).length != 0) {

        //payButton.removeAttribute("disabled");

        const localCart = JSON.parse(localStorage.getItem('cartItems'));
        const costHTML = $('.ordered--cost');
        const cartHTML = $('.itemCount');
        let numberCost = 0;
        let itemCount = 0;
        localCart.forEach(item => {
            numberCost = numberCost + parseInt(item.price) * item.quantity;
            itemCount = itemCount + item.quantity
            //console.log(item.price);
        });
        costHTML.html('');
        costHTML.html(`${numberCost}`);
        cartHTML.html('');
        cartHTML.append($(`<h8 class="noItemInCart">Giỏ hàng của bạn có <b>${itemCount} sản phẩm</b> trong giỏ hàng </h8>`));
        // danh sách các mặt hàng
        const articleProductInCart = $('.article-productInCart');
        localCart.forEach(item => {
            const money = item.quantity * item.price;
            articleProductInCart.append($(
                `<div class="article--borderCart">
                    <div class="productIncart d-flex">
                        <img class="productInCart--picture" src="${item.picture}">
                        <div class="row">

                            <div class="col-10">
                            <p hidden>${item.id}</p>
                            <h5 class="productInCart--name">${item.name}</h5>
                            <div class="d-flex itemStyle">
                                <p class="productInCart--size">${item.size}</p>
                                <p class="productInCart--color">${item.color}</p>
                            </div>
                                <div class="productInCart--quantity d-flex">
                                    <button class="buttonquantityDown" name="down">-</button>
                                    <input class="input--quantity" type="number" name="quantity" value="${item.quantity}" disabled>
                                    <button class="buttonquantityUp" name="up" >+</button>
                                </div>
                            </div>
                            <div class="delete--product col-2">
                                <i class="fa-solid fa-trash iconDelete" data-bs-toggle="modal" data-bs-target="#delete-item-modal" ></i>
                            </div>

                        </div>
                    </div>
                    <div class="mb-3 d-flex justify-content-between">
                        <h6>Thành tiền:</h6>
                        <p class="fw-bold text-danger">${money}</p>
                    </div>
                </div>
               `
            ))
        });
    }
}

$(document).ready(function () {
    showCart();
    /// tăng gaimr số lượng
    function uppdateQuantityUp(id, quantity, size,color) {
        const localCart = JSON.parse(localStorage.getItem('cartItems'));
        localCart.forEach(item => {
            if (item.id == id && item.size == size && item.color==color) {
                item.quantity = quantity;
            }
        });
        localStorage.setItem('cartItems', JSON.stringify(localCart));
    }
    const upQuantity = evt => {
        //console.log('123');
        const clicked = evt.target;
        //console.log(clicked)

        const quantity = parseInt(clicked.parentElement.children[1].value) + 1;
        //console.log(quantity);

        //console.log(clicked.parentElement.children[1])
        const id = clicked.parentElement.parentElement.children[0].textContent;
        //  console.log(clicked.parentElement.parentElement.children[2].children[0].textContent);
        
        const size = clicked.parentElement.parentElement.children[2].children[0].textContent;
        const color = clicked.parentElement.parentElement.children[2].children[1].textContent;
        uppdateQuantityUp(id, quantity, size,color);
        window.location.reload();
        //showCart();
    }

    const clickUpdateUp = document.querySelectorAll('.buttonquantityUp');
    //console.log(clickUpdateUp);  
    const UparrayCartLinks = Array.from(clickUpdateUp);
    //console.log(arrayCartLinks);
    clickUpdateUp.forEach(update => {
        //console.log(update);
        update.addEventListener('click', upQuantity);
    });
    //////////////////////////////////////////////////
    //////////////////////////////////////////////////
    // giảm số lượng
    function uppdateQuantityDown(id, quantity, size,color) {
        const localCart = JSON.parse(localStorage.getItem('cartItems'));
        localCart.forEach(item => {
            if (item.id == id && item.size == size && color==item.color) {
                item.quantity = quantity;
            }
        });
        localStorage.setItem('cartItems', JSON.stringify(localCart));
    }
    const DownQuantity = evt => {
        //console.log('123');
        const clicked = evt.target;
        //console.log(clicked)

        const quantity = parseInt(clicked.parentElement.children[1].value) - 1;
        // console.log(quantity);

        //console.log(clicked.parentElement.children[1])
        const id = clicked.parentElement.parentElement.children[0].textContent;
        const size = clicked.parentElement.parentElement.children[2].children[0].textContent;
        const color = clicked.parentElement.parentElement.children[2].children[1].textContent;
        uppdateQuantityDown(id, quantity, size,color);
        window.location.reload();
        //showCart();
    }

    const clickUpdateDown = document.querySelectorAll('.buttonquantityDown');
    //console.log(clickUpdateDown);  
    const DownarrayCartLinks = Array.from(clickUpdateDown);
    //console.log(arrayCartLinks);
    clickUpdateDown.forEach(update => {
        //console.log(update);
        update.addEventListener('click', DownQuantity);
    });
    // Xóa sản phẩm trong giỏ hàng
    let idDelete
    let sizeDelete
    let colorDelete
    function deleteCart(evt) {

        const clickDelete = evt.target;
        const id = clickDelete.parentElement.previousElementSibling.children[0].textContent;
        // console.log(clickDelete.parentElement.previousElementSibling.children[2].children[0].textContent)
        const size = clickDelete.parentElement.previousElementSibling.children[2].children[0].textContent;
        const color = clickDelete.parentElement.previousElementSibling.children[2].children[1].textContent;
        idDelete = id;
        sizeDelete = size;
        colorDelete = color;
        // console.log(id);
        // console.log(size);
        // console.log(color);
        // let updatedCart = [];
        // let custommerCart = JSON.parse(localStorage.getItem('cartItems'));
        // console.log(custommerCart);
        // custommerCart.forEach(item => {
        //     console.log(item);
        //     console.log(item.size + size);
        // if(item.id == id && item.size == size){
        // }
        // else{
        //     updatedCart.push(item);
        // }
        // });
        // console.log(updatedCart);
        // localStorage.setItem('cartItems',JSON.stringify(updatedCart));
        // window.location.reload();
    };
    // click để xóa sản phẩm
    const clickDelete = document.querySelectorAll('.iconDelete');
    //console.log(clickDelete);  
    const arrayDelete = Array.from(clickDelete);
    //console.log(arrayDelete);
    clickDelete.forEach(itemDelete => {
        itemDelete.addEventListener('click', deleteCart);
    });

    const clickedDongy = document.getElementById('btn-delete-item');
    clickedDongy.onclick = function () {
        let updatedCart = [];
        let custommerCart = JSON.parse(localStorage.getItem('cartItems'));
        //console.log(custommerCart);
        custommerCart.forEach(item => {
            //console.log(item);
            //console.log(item.size + size);
            if (item.id == idDelete && item.size == sizeDelete && item.color == colorDelete) {
            }
            else {
                updatedCart.push(item);
            }
        });
        //console.log(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        window.location.reload();
    }
});
// ẩn nút thanh toán
if (JSON.parse(localStorage.getItem('cartItems')).length == 0) {
    //console.log('123');
    //console.log(localStorage.cartItems);
    const payLink = document.getElementById('pay--link');
    const payButton = document.getElementById('pay--button');
    payLink.removeAttribute("href");
    payButton.setAttribute("disabled", "true")
}

