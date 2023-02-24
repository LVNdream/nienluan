// css cho cái about bên trái
function leaveintruduceleft() {
    // console.log('âfwafwaffyt');
    const intruduce__animation1=document.getElementById('intruduce__animation--left1');
    const intruduce__animation2=document.getElementById('intruduce__animation--left2');
    const intruduce__left= document.querySelector('.intruduce__left');
    intruduce__animation1.style.display="block";
    intruduce__animation1.style.animation="hieuungmouseleave linear 1s forwards";
    intruduce__animation2.style.display="block";
    intruduce__animation2.style.animation="hieuungmouseleave linear 1s forwards";
    intruduce__left.style.animation="background--zoomout ease-out 1.5s forwards";
    
    
}
function enterintruduceleft() {
    // console.log('âfwafwaffyt');
    const intruduce__animation1=document.getElementById('intruduce__animation--left1');
    const intruduce__animation2=document.getElementById('intruduce__animation--left2');
    const intruduce__left= document.querySelector('.intruduce__left');
    intruduce__animation1.style.display="block";
    intruduce__animation1.style.animation="hieuungchiadoi linear .5s forwards";
    intruduce__animation2.style.display="block";
    intruduce__animation2.style.animation="hieuungchiadoi linear .5s forwards";
    intruduce__left.style.animation="background--zoomin ease-out 1.5s forwards"
    intruduce__left.style.cursor= 'pointer';
}


// css cho cái bên intruduce bên phải
function leaveintruduceright() {
    // console.log('âfwafwaffyt');
    const intruduce__animation1=document.getElementById('intruduce__animation--right1');
    const intruduce__animation2=document.getElementById('intruduce__animation--right2');
    const intruduce__right= document.querySelector('.intruduce__right');
    intruduce__animation1.style.display="block";
    intruduce__animation1.style.animation="hieuungmouseleave linear 1s forwards";
    intruduce__animation2.style.display="block";
    intruduce__animation2.style.animation="hieuungmouseleave linear 1s forwards";
    intruduce__right.style.animation="background--zoomout ease-out 1.5s forwards"

    
}

function enterintruduceright() {
    // console.log('âfwafwaffyt');
    const intruduce__animation1=document.getElementById('intruduce__animation--right1');
    const intruduce__animation2=document.getElementById('intruduce__animation--right2');
    const intruduce__right= document.querySelector('.intruduce__right');
    intruduce__animation1.style.display="block";
    intruduce__animation1.style.animation="hieuungchiadoi linear .5s forwards";
    intruduce__animation2.style.display="block";
    intruduce__animation2.style.animation="hieuungchiadoi linear .5s forwards";
    intruduce__right.style.animation="background--zoomin ease-out 1.5s forwards"
    intruduce__right.style.cursor= 'pointer';
}
// css cho avata
//Hiệu ứng chia đôi cho nam
function leaveAvataMan() {
    // console.log('âfwafwaffyt');
    const AvataMan__animation1=document.getElementById('AvataMan__animation--left1');
    const AvataMan__animation2=document.getElementById('AvataMan__animation--left2');
    const AvataMan__left= document.querySelector('.AvataMan__left');
    AvataMan__animation1.style.display="block";
    AvataMan__animation1.style.animation="hieuungmouseleave linear 1s forwards";
    AvataMan__animation2.style.display="block";
    AvataMan__animation2.style.animation="hieuungmouseleave linear 1s forwards";
    AvataMan__left.style.animation="background--zoomout ease-out 1.5s forwards";
    
    
}
function enterAvataMan() {
    // console.log('âfwafwaffyt');
    const AvataMan__animation1=document.getElementById('AvataMan__animation--left1');
    const AvataMan__animation2=document.getElementById('AvataMan__animation--left2');
    const AvataMan__left= document.querySelector('.AvataMan__left');
    AvataMan__animation1.style.display="block";
    AvataMan__animation1.style.animation="hieuungchiadoi linear .5s forwards";
    AvataMan__animation2.style.display="block";
    AvataMan__animation2.style.animation="hieuungchiadoi linear .5s forwards";
    AvataMan__left.style.animation="background--zoomin ease-out 1.5s forwards"
    AvataMan__left.style.cursor= 'pointer';
}
// hiệu ứng chia đôi cho nữ
function leaveAvataWoman() {
    // console.log('âfwafwaffyt');
    const AvataWoman__animation1=document.getElementById('AvataWoman__animation--left1');
    const AvataWoman__animation2=document.getElementById('AvataWoman__animation--left2');
    const AvataWoman__left= document.querySelector('.AvataWoman__left');
    AvataWoman__animation1.style.display="block";
    AvataWoman__animation1.style.animation="hieuungmouseleave linear 1s forwards";
    AvataWoman__animation2.style.display="block";
    AvataWoman__animation2.style.animation="hieuungmouseleave linear 1s forwards";
    AvataWoman__left.style.animation="background--zoomout ease-out 1.5s forwards";
    
    
}
function enterAvataWoman() {
    // console.log('âfwafwaffyt');
    const AvataWoman__animation1=document.getElementById('AvataWoman__animation--left1');
    const AvataWoman__animation2=document.getElementById('AvataWoman__animation--left2');
    const AvataWoman__left= document.querySelector('.AvataWoman__left');
    AvataWoman__animation1.style.display="block";
    AvataWoman__animation1.style.animation="hieuungchiadoi linear .5s forwards";
    AvataWoman__animation2.style.display="block";
    AvataWoman__animation2.style.animation="hieuungchiadoi linear .5s forwards";
    AvataWoman__left.style.animation="background--zoomin ease-out 1.5s forwards"
    AvataWoman__left.style.cursor= 'pointer';
}
