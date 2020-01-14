define(function(){
    class Nav{
        constructor(){

            this.ajax();
        }
        ajax(){
            $.ajax({
                url:"http://localhost:82/json/navlist.json",
                success:function(res){
                    let myres = JSON.parse(res);
                    let str1 = "";
                    let length1 = myres[0].name.length;
                    for(var i=0;i<length1;i++){
                        str1 += `<li class="li-first nutrilite-cat porduct-ncl">
                                    <i class="icon" style="background-position:-30px ${(i*(-30))}px"></i>
                                    <i class="middle"></i>
                                    <a>${myres[0].name[i]}</a>
                                </li>`
                    }
                    myres.shift();
                    let myres2 = myres;
                    let str2 = "";
                    let length2 = myres2.length;
                    // for(var i=0;i<length2;i++){
                    //     let namearr = myres2[i].name;
                    //     if(namearr[i]){
                    //         str2 += `<li class="li-second ncl">
                    //                     <a href="/ACCL-Catalogue/c/1001">${namearr[i]}</a>
                    //                     <em class="arrow-r"></em>
                    //                 </li>`;
                    //     }
                    // }
                    for(var i=0;i<length2;i++){
                        if(myres2[0].name[i]){
                            str2 += `<li class="li-second ncl">
                                        <a href="/ACCL-Catalogue/c/1001">${myres2[0].name[i]}</a>
                                        <em class="arrow-r"></em>
                                    </li>`
                        }
                    }
                    $(".accl2c-submenumd").children(".ul-first").html(str1).find(".li-first").append(`<div class="second-listbox"><ul class="ul-second"></ul></div>`).find(".ul-second").html(str2);
        
                    $(".ul-first").children(".li-first").hover(function(){
                        $(this).children(".icon").css({
                            backgroundPosition:`0 ${$(this).index()*(-30)}px`
                        }).end().children(".second-listbox").addClass("active");
                    },function(){
                        $(this).children(".icon").css({
                            backgroundPosition:`-30px ${$(this).index()*(-30)}px`
                        }).end().children(".second-listbox").removeClass("active");
                    })
                },
                global:false
            });
        }
    }
    

    return {
        nav:Nav
    }
})