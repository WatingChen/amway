define(function(){
    class Details{
        constructor(){
            this.userAllMsg = localStorage.getItem("userMsg") ? JSON.parse(localStorage.getItem("userMsg")) : [{pass:"",onoff:0}];
            this.ul = document.querySelector(".header_nav").children[0];
            this.product_section = document.querySelector(".product_section");
            this.product_img = this.product_section.children[0];
            this.product_msg = this.product_section.children[1];
            this.header_nav = document.querySelector(".header_nav");
            
            this.init();
            this.ajax();
            this.display();
            // this.addEvent();
        }
        addEvent(){
            var that = this;
            this.m_img = document.querySelector(".product_img .m_img");
            this.mask = document.querySelector(".product_img .mask");
            this.l_img_box = document.querySelector(".product_img .l_img");
            this.l_img = document.querySelector(".product_img #l_img");

            this.reduce = document.querySelector("#reduce");
            this.add = document.querySelector("#add");
            this.num = document.querySelector("#num");
            this.add_cart = document.querySelector("#buy .add_cart");
            this.product_goosid = document.querySelector("#buy #product_goosid");
            this.userName = document.querySelector("#userName");
            // console.log(this.userName.innerHTML)

            this.m_img.addEventListener("mouseover",function(){
                that.show();
            },false);
            this.m_img.addEventListener("mouseout",function(){
                that.hide();
            },false);
            this.m_img.addEventListener("mousemove",function(eve){
                var e = eve || window.event;
                that.move(e);
            },false);

            this.reduce.addEventListener("click",function(){
                // var num = that.num.value;
                // num = num>0 ? --num : 0;
                // that.num.value = num;
                that.num.value = that.num.value>0 ? --that.num.value : 1;
            },false)
            this.add.addEventListener("click",function(){
                that.num.value++;
            },false)

            this.add_cart.addEventListener("click",function(){
                if(that.loginOnOff){
                    clearTimeout(t);
                    that.goodsid = that.a_goodsid;
                    that.goodsNum = that.num.value;
                    // console.log(that.goodsNum);
                    // console.log(that.goodsid)
                    // console.log(that.goodsNum);
                    // that.goodsid = that.product_goosid.innerHTML;
                    that.setMGLStorage();
                    $("#details").find(".margin").append($(`<div class="addSucess">加入购物车成功</div>`).css({
                        position:"fixed",
                        left:"50%",
                        top:"50%",
                        background:"rgba(0,0,0,.3)",
                        color:"#f00",
                        width:"150px",
                        height:"100px",
                        font:"16px/100px ''",
                        textAlign:"center",
                        transform:"translate(-50%,-50%)"
                    }));
                    var t = setTimeout(()=>{
                        $("#details").find(".addSucess").remove();
                    },800)
                }else{
                    location.assign("login.html");
                }
            },false)
            $("header").find(".area-shi-ul").on("click","li",function(){
                $("header").find(".localname").text($(this).find("span").text());
            })
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
            $("nav").find("form").focusin(function(){
                $(this).on("keydown",function(eve){
                    if(eve.keyCode == 13){
                        $("nav").find(".search").trigger("click");
                    }
                })
            })
            $("header").find("form").focusin(function(){
                $(this).on("keydown",function(eve){
                    if(eve.keyCode == 13){
                        $("header").find(".search").trigger("click");
                    }
                })
            })
            // ==========进入购物车==========
            $("header").find("#cart").click(function(){
                if(that.loginOnOff){
                    $(this).attr("href","shop_cart.html");
                }else{
                    $(this).attr("href","login.html");
                }
            })
            // ==========进入购物车==========

        }
        setMGLStorage(){
            var str = "";
            str = this.userName.innerHTML + "goodsMsg";
            this.mygoods = localStorage.getItem(str) ? JSON.parse(localStorage.getItem(str)) : [{user:""}];
            [{user:""},{goodsid:"",num:""}]
            // this.mygoods = localStorage.getItem(str) ? JSON.parse(localStorage.getItem(str)) : [];
            var goodsLength = this.mygoods.length;
            var i = 0;
            var onoff = this.mygoods.some((value,index)=>{
                i = index;
                return value.id == this.goodsid;
            })
            if(onoff){
                if(this.goodsNum != 1){
                    this.mygoods[i].num = this.mygoods[i].num * 1 + this.goodsNum*1;
                }else{
                    this.mygoods[i].num++;
                }
            }else{
                if(!this.mygoods[0].user){
                    this.mygoods[0] = {
                        user:this.userName.innerHTML
                    }
                }
                this.mygoods.push({
                    id:this.goodsid,
                    num:this.goodsNum
                });
            }
            
            localStorage.setItem(str,JSON.stringify(this.mygoods));

        }
        move(e){
            var l = e.pageX - (this.product_section.offsetLeft + 10) - this.mask.offsetWidth/2;
            var t = e.pageY - (this.product_section.offsetTop + 30) - this.mask.offsetWidth/2;
            if(l<0) l=0;
            if(t<0) t=0;
            if(l > this.m_img.offsetWidth - this.mask.offsetWidth){
                l = this.m_img.offsetWidth - this.mask.offsetWidth;
            }
            if(t > this.m_img.offsetHeight - this.mask.offsetHeight){
                t = this.m_img.offsetHeight - this.mask.offsetHeight;
            }
            this.mask.style.left = l + "px";
            this.mask.style.top = t + "px";
            var imgL = l/(this.m_img.offsetWidth - this.mask.offsetWidth) * (this.l_img_box.offsetWidth - this.l_img.offsetWidth );
            var imgT = t/(this.m_img.offsetHeight - this.mask.offsetHeight) * (this.l_img_box.offsetHeight - this.l_img.offsetHeight);
            this.l_img.style.left = imgL + "px";
            this.l_img.style.top = imgT + "px";
        }
        show(){
            this.mask.style.display = "block";
            this.l_img_box.style.display = "block";
            this.mask.style.width = this.l_img_box.offsetWidth / this.l_img.offsetWidth * this.m_img.offsetWidth + "px";
            this.mask.style.height = this.l_img_box.offsetHeight / this.l_img.offsetHeight * this.m_img.offsetHeight + "px";
        }
        hide(){
            this.mask.style.display = "none";
            this.l_img_box.style.display = "none";
        }
        ajax(){
            var that = this;
            $.ajax({
                url:"http://localhost:82/json/goods.json",
                success:function(res){
                    that.res = JSON.parse(res);
                    that.a_goodsid = JSON.parse(localStorage.getItem("a_goodsid"));
                    var i = 0;
                    that.res.some((value,index)=>{
                        i = index;
                        return value.goodsid == that.a_goodsid;
                    })
                    // console.log(i);
                    var str = `<div class="m_img">
                                    <img src="${that.res[i].img}" alt="" id="m_img">
                                    <span class="mask"></span>
                                </div>
                                <div class="s_img">
                                    <img src="${that.res[i].img}" alt="" id="s_img">
                                </div>
                                <div class="l_img">
                                    <img src="${that.res[i].img}" alt="" id="l_img">
                                </div>`;
                    that.product_img.innerHTML = str;
                    var str1 = `<h2 class="product_name">${that.res[i].name}</h2>
                                <p class="product_goosid">编&nbsp;&nbsp;号<span id="product_goosid">${that.res[i].goodsid}</span></p>
                                <p class="product_netContent">净含量：${that.res[i].netContent}</p>
                                <p class="product_price">￥${that.res[i].price}.00</p>
                                <div id="promotion">
                                    <div class="tag_flag">促销</div>
                                    <div class="sop_promotion_contain">
                                        <div class="description">营养从早开始套装“买7-1”优惠活动火热进行中，签约<span class="hot">最高</span>立省<span class="hot">848元</span>！</div>
                                        <div class="go_now"><a class="hot">立即参与</a> ></div>
                                    </div>
                                </div>
                                <div id="buy_num">
                                    <div class="tex">购买数量：</div>
                                    <div class="buy_num">
                                        <button id="reduce">-</button>
                                        <input type="text" id="num" value="1">
                                        <button id="add">+</button>
                                    </div>
                                </div>
                                <div id="buy">
                                    <div class="buy_now">立即购买</div>
                                    <div class="add_cart">
                                        <i class="cart"></i>
                                        加入购物车
                                    </div>
                                    <div class="collection">
                                        <div class="heart"></div>
                                        <div class="text">收藏</div>
                                    </div>
                                </div>`;
                    that.product_msg.innerHTML = str1;
                    var str2 = `<ul>
                                    <li><a href="index.html">首页</a></li>
                                    <li>></li>
                                    <li><a href="##">${that.res[i].brand}</a></li>
                                    <li>></li>
                                    <li><a href="##">${that.res[i].keywords}</a></li>
                                    <li>></li>
                                    <li class="active">${that.res[i].name}</li>
                                </ul>`;
                    that.header_nav.innerHTML = str2;
                    that.addEvent();
                }
            })
        }
        display(){

        }
        init(){
            var that = this;
            $("header").load("http://localhost:82/html/header.html",function(){
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
                    }else if($(document).scrollTop() < 70){
                        $("header").find(".header_local").css({display:"block"}).end().find(".login").css({display:"block"}).end().find(".nav_search").css({
                            display:"none"
                        })
                    }
                    // that.addEvent();     // 不能在这执行addEvent()!!!!会导致购物车数量增加，点击一次，触发滚动次数个的点击次数
                    $("header").find("form").focusin(function(){
                        $(this).on("keydown",function(eve){
                            if(eve.keyCode == 13){
                                $("header").find(".search").trigger("click");
                            }
                        })
                    })
                }
               // ==========用户是否登录==========
                that.i = 0;
                that.loginOnOff = that.userAllMsg.some((value,index)=>{
                    that.i = index;
                    return value.onoff != 0;
                })
                if(that.loginOnOff){
                    $("header").find(".welcome").css({display:"none"}).end().find(".welcome_1").css({display:"block"}).find("span").html(that.userAllMsg[that.i].user);
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
                
                
            });

            $("nav").load("http://localhost:82/html/nav.html",function(){
                $("nav").find(".nav_list_flex").hover(function(){
                    $(this).find(".accl2c-submenumd").css({
                        display:"block"
                    })
                },function(){
                    $(this).find(".accl2c-submenumd").css({
                        display:"none"
                    })
                })
            });
            $("#footer").load("http://localhost:82/html/footer.html");
        }
    };

    return {
        details:Details
    }
})