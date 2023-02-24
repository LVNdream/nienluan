
$(document).ready(function () {
    // javacsript co thanh tìm kiếm
    const search = document.getElementById("search");
    const cancle = document.getElementById("cancle--search");
    const formsearch = document.getElementById("formsearch");
    search.addEventListener('click', function () {
        formsearch.classList.add("show__formsearch");
        watchcart.classList.remove("show__watchcart");
        formsearch.classList.remove("hidden__formsearch");
        if (formacc) {
            formacc.classList.remove("show__formacc");
        }
        formsearch.style.animation = "showsearch linear 1s forwards";
    });
    cancle.addEventListener('click', function () {
        // console.log('adsd');
        formsearch.classList.remove("show__formsearch");
        formsearch.classList.add("hidden__formsearch");
        formsearch.style.animation = "hiddensearch linear 1s forwards";
    });
    // javascript cho tạo tài khoản Ẩn hiên
    const account = document.getElementById("account");
    const cancle_acc = document.getElementById('cancle--acc');
    let formacc = document.getElementById("formacc");
    function showForm() {
        //const formacc = document.getElementById("formacc");
        formacc.classList.add("show__formacc");
        watchcart.classList.remove("show__watchcart");
        formacc.classList.remove("hidden__formacc");
        formsearch.classList.remove("show__formsearch");
        formacc.style.animation = "showsearch linear 1s forwards";
    };
    if (account) {
        account.addEventListener('click', showForm);
        function hiddenForm() {
            //const formacc = document.getElementById("formacc");
            formacc.classList.remove("show__formacc");
            formacc.classList.add("hidden__formacc");
            formacc.style.animation = "hiddensearch linear 1s forwards";
        };
    }
    if (cancle_acc) {
        cancle_acc.addEventListener('click', hiddenForm);
    }

    //js cho tạo cart ẨN HIỆN
    const cartitem = document.getElementById("cart-item");
    const cancle_cart = document.getElementById("cancle--cart");
    const watchcart = document.getElementById("watch-cart");
    cartitem.addEventListener('click', function () {
        watchcart.classList.add("show__watchcart");
        watchcart.classList.remove("hidden__watchcart");
        formsearch.classList.remove("show__formsearch");
        if (formacc) {
            formacc.classList.remove("show__formacc");
        }
        watchcart.style.animation = "showsearch linear 1s forwards";
    });
    cancle_cart.addEventListener('click', function () {
        watchcart.classList.remove("show__watchcart");
        watchcart.classList.add("hidden__watchcart");
        if (formacc) {
            formacc.style.animation = "hiddensearch linear 1s forwards";
        }

    });
    // thêm số sản phẩm vào trên giỏ hàng
    if (JSON.parse(localStorage.getItem('cartItems')).length != 0) {
        const numberOrderedItems = document.querySelector('.cart-items .number-items');
        let numberOfItems = 0;
        let customerCart = JSON.parse(localStorage.getItem('cartItems'));
        customerCart.forEach(item => {
            numberOfItems = numberOfItems + item.quantity;
        });
        numberOrderedItems.innerHTML = numberOfItems;
    }
    //js khi nhấn vào nút thanh toán
    const btnPay = document.getElementById('btn--pay');
    btnPay.addEventListener('click', function () {
        console.log('123144');
        if (JSON.parse(localStorage.getItem('cartItems')).length == 0) {
            window.location.href = '/cart';
        }
        else {
            window.location.href = '/pay';
        }
    });
});



