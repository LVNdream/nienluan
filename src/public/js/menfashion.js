
//Kiểm tra xem có sản phẩm đó trong giỏ hàng chưa
function isExistedInCart(item,arrCart) {
    let myIndex = -1;
    arrCart.forEach((itemCart, index) => {
        if (item.id == itemCart.id && item.size == itemCart.size) {
            myIndex = index;            
        }      
    });  
    return myIndex;  
}

function loadShopCart() {
    let updatedCart = [];
    const selectedItems = evt =>{
        const linkClicked = evt.target;
        let itemSize = document.getElementsByName('itemSize');
        let len = itemSize.length;
        let SizeValue = 'S';
        for (let i = 0; i < len; i++){
            if (itemSize.item(i).checked){
            SizeValue = itemSize.item(i).value;
            }
        }
        //console.log(linkClicked.parentElement.parentElement.parentElement.parentElement.previousElementSibling.children[0].children[0].attributes.src);
        //console.log(linkClicked);
        //console.log(linkClicked.parentElement.parentElement.parentElement.parentElement.children[0].textContent);
        alert("Đã thêm sản phẩm: "+linkClicked.parentElement.parentElement.parentElement.parentElement.children[0].textContent);
        if(typeof Storage !==undefined){
            let newItem = {
              id:linkClicked.parentElement.parentElement.parentElement.parentElement.children[0].textContent, 
              name:linkClicked.parentElement.parentElement.parentElement.parentElement.children[1].textContent,
              size:SizeValue,
              picture:linkClicked.parentElement.parentElement.parentElement.parentElement.previousElementSibling.children[0].children[0].attributes.src.value,
              price:linkClicked.parentElement.parentElement.parentElement.parentElement.children[2].textContent,
              quantity :1
            };
            //kiểm tra txem giỏ hàng , cartItems, đã tônf tại trong localStorage chưa, chưa tì tạo mới nó
            if (JSON.parse(localStorage.getItem('cartItems'))===null) {
                updatedCart.push(newItem);
                //console.log(updatedCart);
                localStorage.setItem('cartItems', JSON.stringify(updatedCart));
                //reset lại trang 
                window.location.reload();
                
            }
            
            else{
                const updatedCart = JSON.parse(localStorage.getItem('cartItems'));
                if((index=isExistedInCart(newItem,updatedCart))>=0){
                    //console.log(index);
                    updatedCart[index].quantity++;
                    //console.log(updatedCart);
                }
                else{
                    //console.log(newItem)
                    updatedCart.push(newItem);
                    
                    //console.log(updatedCart);
                }
            //console.log(updatedCart);
            localStorage.setItem('cartItems',JSON.stringify(updatedCart));
            //reset lại trang
            window.location.reload(); 
            }
            
        }
        else{
            alert("Local Storage is not working on your browser!!!");
        }
    }
    const acttachingEvent = evt => evt.addEventListener('click',selectedItems);
    
    const add2cartLinks = document.getElementsByClassName("cart__shopping");
    //console.log(add2cartLinks);
    
    
    let arrayCartLinks = Array.from(add2cartLinks);
    //console.log(arrayCartLinks);
    arrayCartLinks.forEach(acttachingEvent); 
}
window.onload = loadShopCart;