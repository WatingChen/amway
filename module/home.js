define(function() {
    'use strict';
    class Home{
        constructor(options){
            this.userAllMsg = localStorage.getItem("userMsg") ? JSON.parse(localStorage.getItem("userMsg")) : [{pass:"",onoff:0}];
            this.guess_u_like = document.querySelector("#guess_u_like");

            this.brand_margin = document.querySelector("#brand .margin");

            this.rowul = document.querySelector("#row ul");
            
            this.brandDisplay();
            this.init();
        }

        init(){
            var that = this;
            $("header").load("http://localhost:82/html/header.html",function(){
                // ==========选择送货地点==========
                var localOnOff = 0;
                $(".header_local").on("click",function(){
                    if(localOnOff == 0){
                        $(".header_local").find(".local").addClass("active");
                        $(".delivery-to").css({
                            display:"block"
                        })
                        localOnOff = 1;
                    }else{
                        $(".header_local").find(".local").removeClass("active");
                        $(".delivery-to").css({
                            display:"none"
                        })
                        localOnOff = 0;
                    }
                })
                let arr = ["北京市","上海市","天津市","重庆市","安徽省","安徽省安庆市","福建省","甘肃省","广东省","广西自治区","贵州省","海南省","河北省","河南省","黑龙江省","湖北省","湖南省","吉林省","江苏省","江西省","辽宁省","宁夏自治区","青海省","山东省","山西省","陕西省","四川省","西藏自治区","新疆自治区","云南省","浙江省","内蒙古自治区（西部）","内蒙古自治区（中部）","内蒙古自治区（北部）"];
                let str = "";
                let length = arr.length;
                // console.log(length);
                for(var i=0;i<length;i++){
                    str += `<li style="height: auto;">
                                <div class="areas-v">
                                    <span>${arr[i]}</span>
                                </div>
                            </li>`;
                }
                $(".delivery-to").children(".area-shi-ul").html(str);
                // ==========选择送货地点==========

                // that.localName = document.querySelector("nav .local");
                // that.area_shi_ul = document.querySelector("nav .area-shi-ul");
                // that.addEvent();

                // ==========滚动事件搜索框变动==========
                onscroll = function(){
                    if($(document).scrollTop() > 70){
                        $("header").find(".header_local").css({display:"none"}).end().find(".login").css({display:"none"}).end().find(".delivery-to").css({display:"none"}).end().find(".local").removeClass("active");
                        localOnOff = 0;
                        // console.log($("header").find(".nav_search").length)
                        if(!$("header").find(".nav_search").length){
                            $("header").children(".margin").append(`<div class="nav_search">
                                <form>
                                    <div class="nav_search_toggle"><span>产品</span><img src="../img/arrow_down.png" alt="" class="toggle_arrow"></div>
                                    <input type="text" id="txt">
                                    <input type="text" id="form_control" style="display:none">
                                    <img src="../img/search.png" alt="" class="search">
                                </form>
                            </div>`);

                        }else{
                            $("header").find(".nav_search").css({
                                display:"block"
                            })
                        }
                        $("#row").find("#goTop").css({display:"block"});
                    }else if($(document).scrollTop() < 70){
                        $("header").find(".header_local").css({display:"block"}).end().find(".login").css({display:"block"}).end().find(".nav_search").css({
                            display:"none"
                        });
                        $("#row").find("#goTop").css({display:"none"});
                    }

                    // 头部回车搜索
                    $("header").find("form").focusin(function(){
                        $(this).on("keydown",function(eve){
                            if(eve.keyCode == 13){
                                $("header").find(".search").trigger("click");
                            }
                        })
                    })
                }
                // ==========滚动事件搜索框变动==========
// ===========================================================

                // ==========用户是否登录==========
                that.i = 0;
                that.loginOnOff = that.userAllMsg.some((value,index)=>{
                    that.i = index;
                    return value.onoff != 0;
                })
                if(that.loginOnOff){
                    $("header").find(".welcome").css({display:"none"}).end().find(".welcome_1").css({display:"block"}).find("span").html(that.userAllMsg[that.i].user);
                }else{
                    $("header").find(".welcome").css({display:"block"}).end().find(".welcome_1").css({display:"none"});
                }
                $("header").find(".exit").click(function(){
                    // console.log(that.i);
                    // console.log(that.userAllMsg);
                    that.userAllMsg[that.i].onoff = 0;
                    localStorage.setItem("userMsg",JSON.stringify(that.userAllMsg));
                    location.reload();
                })
                // ==========用户是否登录==========

                if(that.loginOnOff){
                    // ==========购物车数量==========
                    // console.log(that.userAllMsg[i].user);
                    var goodsMsg = localStorage.getItem(`${that.userAllMsg[that.i].user}goodsMsg`) ? JSON.parse(localStorage.getItem(`${that.userAllMsg[that.i].user}goodsMsg`)) : [];
                    // console.log(goodsMsg);
                    var cartNum = 0;
                    for(var i=1;i<goodsMsg.length;i++){
                        // console.log(goodsMsg[i].num);
                        cartNum += goodsMsg[i].num*1;
                    }
                    // console.log(cartNum);
                    if(cartNum>100){
                        cartNum = "99+";
                        $("header").find(".cart_num").css({
                            height: "23px",
                            width: "23px",
                            lineHeight: "23px",
                            right:"-5px",
                            top:"-5px"
                        });
                    }
                    $("header").find(".cart_num").html(cartNum);
                    // ==========购物车数量==========
                }
            });
// ===========================================================

            $("nav").load("http://localhost:82/html/nav.html",function(){
                // $("nav").find(".li-first").click(function(){
                //     console.log(1);
                //     // console.log($(this));
                //     var theName = $("nav").find("a").text;
                //     console.log(theName);
                // })
            });

            $("#guess_u_like").load("http://localhost:82/html/guess_u_like.html",function(){
                $.ajax({
                    url:"http://localhost:82/json/guess_u_like.json",
                    success:function(res){
                        let myres = JSON.parse(res);
                        let str = "";
                        let length = myres.length;
                        for(var i=0;i<length;i++){
                            str += `<a goodsId="${myres[i].goodsid}" id="a_goodsid">
                                        <div class="guess_goods_box" >
                                            <div class="guess_goods">
                                                <img src="${myres[i].img}" alt="" class="guess_goods_img">
                                            </div>
                                            <div class="guess_goods_msg"  goodsId="${myres[i].goodsid}">
                                                <p>${myres[i].name}</p>
                                                <span>￥${myres[i].price}.00</span>
                                            </div>
                                        </div>
                                    </a>`;
                        }
                        $("#guess_u_like").children(".margin").append(str);
                        that.addEvent();
                    }
                })
            });
            
            $("#footer").load("http://localhost:82/html/footer.html");
        }


        brandDisplay(){
            var that = this;
            $.ajax({
                url:"http://localhost:82/json/brandGoods.json",
                success:function(res){
                    that.res = JSON.parse(res);
                    // console.log(that.res);
                    var length = that.res.length;
                    var str = "";
                    var str1 = "";
                    var rowStr = "";
                    for(var i=0;i<4;i++){
                        str1 += `<li>
                                    <div class="left">
                                        <h2>${that.res[i].h2}</h2>
                                        <p>${that.res[i].p}</p>
                                        <div class="more">
                                            <span>了解更多&gt;&gt;</span>
                                            <i></i>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <img src="${that.res[i].img}" alt="">
                                    </div>
                                </li>`;
                    }
                    for(var i=0;i<length;i++){
                        str += `<div id="box${i+1}">
                                    <div class="cat_name">
                                        <h2 class="every_brand">
                                            ${that.res[i].brand_name}
                                            <span>
                                                更多
                                                <i>&gt;&gt;</i>
                                            </span>
                                        </h2>
                                    </div>
                                    <div class="brand_content">
                                        <div class="brand_img">
                                            <img src="${that.res[i].brand_img}" alt="">
                                        </div>
                                        <div class="brand_some">
                                            <div class="brand_classes">
                                                <ul>
                                                    <li>${that.res[i].series1}</li>
                                                    <li>${that.res[i].series2}</li>
                                                    <li>${that.res[i].series3}</li>
                                                    <li>${that.res[i].series4}</li>
                                                </ul>
                                            </div>
                                            <div class="brand_some_products">
                                                <ul>${str1}</ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                        rowStr += `<li><a href="#box${i+1}">${i+1}</a></li>`;
                    }
                    that.brand_margin.innerHTML = str;
                    that.rowul.innerHTML = rowStr;
                }
            })
        }
        addEvent(){
            this.userName = document.querySelector("#userName");
            var that = this;
            // ==========查看详情==========
            $("#guess_u_like").on("click","#a_goodsid",function(){
                localStorage.setItem("a_goodsid",$(this).attr("goodsid"));
                open("goodsdetails.html","_blank");
            })
            // ==========查看详情==========

            // ==========楼层效果==========
            $("#row").find("a").click(function(){
                $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top - 50 + "px"},500);
                return false;//不要这句会有点卡顿
            })
            // ==========楼层效果==========

            // ==========选择地址==========
            $("header").find(".area-shi-ul").on("click","li",function(){
                $("header").find(".localname").text($(this).find("span").text());
            })
            // $(document).on("click",function(){
            //     $("header").find(".local").removeClass("active");
            //     return false;
            // })
            // ==========选择地址==========

            // ==========搜索==========
            $("nav").on("click",".search",function(){
                var keywards = $("nav").find("#txt").val();
                var keywardsobj = {keywards:keywards};
                localStorage.setItem("searchkeywards",JSON.stringify(keywardsobj));
                open("search.html","_blank");
            })
            $("header").on("click",".search",function(){
                var keywards = $("header").find("#txt").val();
                var keywardsobj = {keywards:keywards};
                localStorage.setItem("searchkeywards",JSON.stringify(keywardsobj));
                open("search.html","_blank");
            })
            // 回车搜索
            $("nav").find("form").focusin(function(){
                // console.log(1);
                $(this).on("keydown",function(eve){
                    // console.log(1);
                    // console.log(eve.keyCode);
                    if(eve.keyCode == 13){
                        $("nav").find(".search").trigger("click");
                    }
                })
            })
            // $("header").find("form").focusin(function(){
            //     $(this).on("keydown",function(eve){
            //         if(eve.keyCode == 13){
            //             $("header").find(".search").trigger("click");
            //         }
            //     })
            // })
            // ==========搜索==========

            // ==========回到顶部==========
            $("#row").on("click","#goTop",function(){
                $("html, body").animate({scrollTop: 0},500);
                return false;//不要这句会有点卡顿
            })
            // ==========回到顶部==========

            // ==========进入购物车==========
            $("header").find("#cart").click(function(){
                if(that.loginOnOff){
                    $(this).attr("href","shop_cart.html");
                }else{
                    $(this).attr("href","login.html");
                }
            })
            // ==========进入购物车==========
            
            $("nav").find(".li-first").click(function(){
                // console.log(1);
                // console.log($(this).index());
                var theName = $(this).children("a").text();
                console.log(theName);
                var theLB = {
                    splbName:theName
                }
                localStorage.setItem("splbName",JSON.stringify(theLB));
                location.assign("spliebiao.html","_blank");
            })
        }

        
    }

    return {
        home:Home
    }
});