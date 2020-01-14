// console.log(1);
require.config({
    baseUrl:"module",
    paths:{
        jq:"../libs/jquery",
        banner:"../libs/jQuery.banner.1.0",
        ajax:"../libs/ajax.js",
        home:"home",
        GDLS:"goodsdetails.js",
        cart:"shopCart"
    }
})

require(["jq","banner","ajax","home","nav","GDLS","login","search","cart","spList"],function(_,obanner,oajax,ohome,onav,oGDLS,ologin,osearch,ocart,ospList){
    // console.log(ohome)
    var myhome = new ohome.home({
        // list:$(".box"),
        // listArr:["第一级菜单1","第一级菜单2","第一级菜单3",],
        // display:"block"
    });
    var mynav = new onav.nav();

    var myGDLS = new oGDLS.details();

    var mylogin = new ologin.login();
    
    var mysearch = new osearch.search();
    
    var mycart = new ocart.shopCart();
    
    var myspList = new ospList.spList();


    $("#banner").banner({
        img:["/img/banner.jpg","/img/banner1.jpg","/img/banner2.jpg","/img/banner3.jpg","/img/banner4.jpg","/img/banner5.jpg"],
        btn:false,
        list:true,
        autoPlay:true,
        moveTime:200,
        delayTime:3000,
        index:0
    });
})