const addColor = document.getElementById('addColor');
let IDcolor = 1;
let articleColor = $('#aritcle--addcolor');
let minusColor = document.getElementById('minusColor');
addColor.addEventListener('click', function () {
    IDcolor++;
    // console.log('cộng');
    articleColor.append($(`
    <div class= "mt-3" id="color${IDcolor}">
        <label class="form-label" >Màu sắc ${IDcolor}</label>
        <input type="text" class="form-control" name="mausac">
    </div>
`));
});
minusColor.addEventListener('click', function () {

    if (IDcolor > 1) {
        // console.log('trừ');
        $(`#color${IDcolor}`).remove()
        IDcolor--;
    }
});