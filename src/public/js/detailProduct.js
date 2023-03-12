// hàm lấy địa chỉ hình ảnh từ input
let upFile = document.getElementById('upFile');
// console.log(upFile);
let article_upfile = $('#article-upfile');

upFile.addEventListener('change', function () {
    // console.log(upFile.files.length);
    if ($('#sum_item')) {
        $('#sum_item').remove();
        article_upfile.append($(`<p id="sum_item">Đã dính kèm ${upFile.files.length} tệp</p>`));
    } else {
        article_upfile.append($(`<p id="sum_item">Đã dính kèm ${upFile.files.length} tệp</p>`));
    }

})










// console.log('dasdaasdasdasd')
const btnUp = document.getElementById('upquantity');
const btnDown = document.getElementById('downquantity');
let inputquantity = document.getElementById('inputquntity');
// inputquantity.value=parseInt(inputquantity.value) +1;
// console.log(inputquantity.max);
btnUp.addEventListener('click', function () {
    if (parseInt(inputquantity.value) < inputquantity.max) {
        inputquantity.value = parseInt(inputquantity.value) + 1;
    }
});
btnDown.addEventListener('click', function () {
    if (parseInt(inputquantity.value) > 1) {
        inputquantity.value = parseInt(inputquantity.value) - 1;
    }
});

//  xây dựng hàm thêm vào giỏ hàng


//hàm kiểm tra để thêm vào giỏ hàng
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
    const selectedItems = () => {
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
        let colorValue = itemColor.item(0).value;
        for (let i = 0; i < lenItemColor; i++) {
            if (itemColor.item(i).checked) {
                colorValue = itemColor.item(i).value;
            }
        }

        let idsp = document.getElementById('masp');
        let idname = document.getElementById('name');
        let idpicture = document.getElementById('picture');
        let idprice = document.getElementById('price');
        let idquantity = document.getElementById('inputquntity');



        alert("Đã thêm sản phẩm: " + idsp.textContent);
        if (typeof Storage !== undefined) {
            let newItem = {
                id: idsp.textContent,
                name: idname.textContent,
                size: SizeValue,
                color: colorValue,
                picture: idpicture.attributes.src.value,
                price: idprice.textContent,
                quantity: parseInt(idquantity.value),
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
                    updatedCart[index].quantity += newItem.quantity;
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
    const btnaddtocart = document.getElementById('btn-addToCart');
    btnaddtocart.addEventListener('click', selectedItems);
}
window.onload = loadShopCart;