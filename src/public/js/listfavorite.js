
var masp;
var inputValue = document.getElementById('valueInput-masp');
var deleteFavoriteForm = document.forms['delete-favorite-form'];
var btnDeleteFavorite = document.getElementById('btn-delete-favorite');
//Lấy id của khóa học khi nhấn đồng ý
var deleteFavorite = document.getElementById('delete-confirm');
deleteFavorite.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    masp = button.getAttribute('data-bs-id');
    console.log(masp);
});

// xoa khi an nut dong y
// Khi bấm click vào nút Đồng ý   
btnDeleteFavorite.onclick = function () {
    // alert(idKhoahoc);
    inputValue.setAttribute("value",masp);
    deleteFavoriteForm.action = '/account/favorite/deleteId';
    deleteFavoriteForm.submit()
  }


// let itemColor = document.getElementsByName('itemColor');
// console.log(itemColor);
// const axios = require('axios');

// const { response } = require("express");

// Hàm gửi yêu cầu lên server


// const fnaddFavorite = (evt) => {
//     axios.post('http://localhost:3001/fashion/menfashion/addFavorite', {
//         masp: evt.target.parentElement.parentElement.parentElement.parentElement.children[0].textContent,
//     }).then(function (response) {
//         // console.log(response.data);
//         if(response.data!=null){
//         let lognin = response.data;
//         window.location = lognin;
//         return}
//     })
//     .catch(function (error) {
//         console.log(error);
//     })
// }

// // Hàm thêm yêu thích
// const iconFavorite = document.getElementsByClassName('article--iconFavorite');
// function addFavorite(evt) {
//     // console.log(evt.target);
//     const favorite = evt.target;
//     fnaddFavorite(evt);
//     favorite.style.color = 'red';
// }
// const addListFavorite = evt => evt.addEventListener('click', addFavorite);
// let arrayIconFavorite = Array.from(iconFavorite);
// //console.log(arrayCartLinks);
// arrayIconFavorite.forEach(addListFavorite);


//Kiểm tra xem có sản phẩm đó trong giỏ hàng chưa
function isExistedInCart(item, arrCart) {
    let myIndex = -1;
    arrCart.forEach((itemCart, index) => {
        if (item.id == itemCart.id && item.size == itemCart.size && item.color == itemCart.color) {
            myIndex = index;
        }
    });
    return myIndex;
}

function loadShopCart() {
    let updatedCart = [];
    const selectedItems = evt => {
        const linkClicked = evt.target;
        let itemSize = document.getElementsByName('itemSize');
        let lenItemSize = itemSize.length;
        let SizeValue = 'S';
        for (let i = 0; i < lenItemSize; i++) {
            if (itemSize.item(i).checked) {
                SizeValue = itemSize.item(i).value;
            }
        }

        let itemColor = document.getElementsByName('itemColor');
        let lenItemColor = itemColor.length;
        let colorValue = linkClicked.parentElement.parentElement.parentElement.previousElementSibling.children[0].children[0].children[0].attributes.value.value;
        for (let i = 0; i < lenItemColor; i++) {
            if (itemColor.item(i).checked) {
                colorValue = itemColor.item(i).value;
            }
        }



        // console.log(linkClicked.parentElement.parentElement.parentElement.previousElementSibling.children[0].children[0].children[0].attributes.value.value);
        //console.log(linkClicked);
        //console.log(linkClicked.parentElement.parentElement.parentElement.parentElement.children[0].textContent);
        alert("Đã thêm sản phẩm: " + linkClicked.parentElement.parentElement.parentElement.parentElement.children[0].textContent);
        if (typeof Storage !== undefined) {
            let newItem = {
                id: linkClicked.parentElement.parentElement.parentElement.parentElement.children[0].textContent,
                name: linkClicked.parentElement.parentElement.parentElement.parentElement.children[1].textContent,
                size: SizeValue,
                color: colorValue,
                picture: linkClicked.parentElement.parentElement.parentElement.parentElement.previousElementSibling.children[0].children[0].attributes.src.value,
                price: linkClicked.parentElement.parentElement.parentElement.parentElement.children[2].textContent,
                quantity: 1
            };
            //kiểm tra txem giỏ hàng , cartItems, đã tônf tại trong localStorage chưa, chưa tì tạo mới nó
            if (JSON.parse(localStorage.getItem('cartItems')) === null) {
                updatedCart.push(newItem);
                //console.log(updatedCart);
                localStorage.setItem('cartItems', JSON.stringify(updatedCart));
                //reset lại trang 
                window.location.reload();

            }

            else {
                const updatedCart = JSON.parse(localStorage.getItem('cartItems'));
                if ((index = isExistedInCart(newItem, updatedCart)) >= 0) {
                    //console.log(index);
                    updatedCart[index].quantity++;
                    //console.log(updatedCart);
                }
                else {
                    //console.log(newItem)
                    updatedCart.push(newItem);

                    //console.log(updatedCart);
                }
                //console.log(updatedCart);
                localStorage.setItem('cartItems', JSON.stringify(updatedCart));
                //reset lại trang
                window.location.reload();
            }

        }
        else {
            alert("Local Storage is not working on your browser!!!");
        }
    }
    const acttachingEvent = evt => evt.addEventListener('click', selectedItems);

    const add2cartLinks = document.getElementsByClassName("cart__shopping");
    //console.log(add2cartLinks);


    let arrayCartLinks = Array.from(add2cartLinks);
    //console.log(arrayCartLinks);
    arrayCartLinks.forEach(acttachingEvent);
}
window.onload = loadShopCart;