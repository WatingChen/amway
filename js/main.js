require.config({
    baslUrl:"module",
    path:{
        jq:"../libs/jquery",
        banner:"../libs/jQuery.banner.1.0",
        ajax:"../libs/ajax.js"
    }
})

require(["jq","banner","ajax","home"],function(_1,obanner,oajax,ohome){
    var home = new ohome.home({
        // list:$(".box"),
        // listArr:["第一级菜单1","第一级菜单2","第一级菜单3",],
        // display:"block"
    });
})