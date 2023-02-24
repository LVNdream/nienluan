//console.log("sdasd");
$(document).ready(function () {
    ////////// js cho cái chọn cách giao hàng
    const typeShip1 = document.getElementById('ship--locate1');
    const typeShip2 = document.getElementById('ship--locate2');
    const inWed = document.getElementById('article__customer--address');
    const inShop = document.getElementById('article__shop--address');
    //console.log(typeShip.checked);
    typeShip1.addEventListener('click', function () {
        if (typeShip1.checked) {
            inWed.style.display = "block";
            inShop.style.display = "none";
            const select = document.getElementsByTagName('select');
            const arrSelect = Array.from(select);
            const diachi = document.getElementById('floatingAddress');
            diachi.setAttribute("required","false");
            //console.log(arrSelect);
            arrSelect.forEach(item => {
                //console.log(item);
                item.setAttribute("required","false");
            });
        }

    });
    typeShip2.addEventListener('click', function () {
        if (typeShip2.checked) {
            inShop.style.display = "block";
            inWed.style.display = "none";
            const select = document.getElementsByTagName('select');
            const arrSelect = Array.from(select);
            const diachi = document.getElementById('floatingAddress');
            diachi.removeAttribute("required");
            //console.log(arrSelect);
            arrSelect.forEach(item => {
                //console.log(item);
                item.removeAttribute("required");
            });
        };
        if (document.getElementsByClassName('input--inforProvince')) {
            const input__inforProvince = document.getElementsByClassName('input--inforProvince');
            //console.log(input__inforProvince);
            for (let i = 0; i < input__inforProvince.length; i++) {
                input__inforProvince[i].setAttribute("value", "");
            }
        };
        // const diachichitiet = document.getElementById('floatingAddress');
        // console.log(diachichitiet.value)
        // diachichitiet.setAttribute("value", "123");
        // console.log(diachichitiet.value)

    });
    //////////////////////////////////
    ////////////////////// js cho cái chọn cách thanh toán
    const payMethod1 = document.getElementById('pay--method1');
    const inforBankCard = document.getElementById('infor--bank-card');
    const payMethod2 = document.getElementById('pay--method2');
    payMethod1.addEventListener('click', function () {
        if (payMethod1.checked) {
            inforBankCard.removeAttribute("hidden");
        }
    });
    payMethod2.addEventListener('click', function () {
        if (payMethod2.checked) {
            inforBankCard.setAttribute("hidden", "true");
        }
    });
    ///thiết kế phân bên phải cho trang thanh toán
    const customerCart = JSON.parse(localStorage.getItem('cartItems'))
    if (JSON.parse(localStorage.getItem('cartItems')).length != 0) {
        let sumMoney = 0;
        let shipCharge = 0;
        const articleItem = $('.article--review-ordered');
        customerCart.forEach(item => {
            const money = item.quantity * item.price;
            sumMoney = sumMoney + money;
            articleItem.append($(`
            <div class="d-flex mb-3 article--inforItem">
                <img class="picture" src="${item.picture}">
                <div class="">
                    <p hidden>${item.id}</p>
                    <h5 class="article--inforItem--name">${item.name}</h5>
                    <p class="article--inforItem--size">${item.size}</p>
                </div>
                <p class="article--inforItem--money">${money}</p>
                <p class="article--inforItem--quantity">${item.quantity}</p>
            </div>
            `));
        });
        //  console.log(parseInt(sumMoney));
        if (parseInt(sumMoney) < parseInt(300000)) {
            shipCharge = 30000;
            //console.log('12345');
        };

        //console.log(shipCharge);
        let tongtien = parseInt(sumMoney) + parseInt(shipCharge);
        articleItem.append($(`
            <hr>
            <div class=" d-flex justify-content-between article--temporary-money">
                <p class="title--bill">Tạm tính</p>
                <p class="color--money">${sumMoney}</p>
            </div>
            <div class="d-flex justify-content-between article--ship-charge">
                <p class="title--bill">Phí vận chuyển</p>
                <p class="color--money">${shipCharge}</p>
            </div>
            <hr>
            <div class="d-flex justify-content-between">
                <p class="title--bill">Tổng tiền</p>
                <p class="color--money">${tongtien}</p>
            </div>    
        `));
        //lấy dữ liệu trên local xuống đưa vào form
        let payForm = $('#payForm');
        if (customerCart.length != 0) {
            // console.log(customerCart);
            customerCart.forEach(item => {
                // console.log(item);
                payForm.append($(`<input type="text" class="form-control input--infor" name="masp" value="${item.id}" hidden>`));
                payForm.append($(`<input type="text" class="form-control input--infor" name="soluong" value="${item.quantity}" hidden>`));
                payForm.append($(`<input type="text" class="form-control input--infor" name="size" value="${item.size}" hidden>`));
            })
            payForm.append($(`<input type="text" class="form-control input--infor" name="tongtien" value="${tongtien}" hidden>`));

        }
    }

});
