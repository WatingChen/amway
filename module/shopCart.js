define(function(){
    class Shop{
        constructor(){
            this.userAllMsg = localStorage.getItem("userMsg") ? JSON.parse(localStorage.getItem("userMsg")) : [{pass:"",onoff:0}];
            this.shop_cart = document.querySelector("#shop_cart");

            this.tbody = document.querySelector("tbody");
            this.url = "http://localhost:82/json/goods.json";
            this.priceAll = document.querySelector("#priceAll");
            this.numAll = document.querySelector("#numAll");
            this.isAllParent = document.querySelector("#isAllParent");
            this.isAll = this.isAllParent.children[0];
            this.deleteAll = document.querySelector("#deleteAll");

            this.tip = document.querySelector("#tip");
            this.cart = document.querySelector("#cart");

            this.isAllOnOff = 1;

            this.init();
            // this.display();
            this.addEvent();
        }

        // 渲染购物车
        display(){
            console.log(1);
            var that = this;
            this.getStorage();
            var carlength = this.goodsMsg.length;
            $.ajax({
                url:this.url,
                success:function(res){
                    // console.log(res);
                    that.res = JSON.parse(res);
                    var resLength = that.res.length
                    // console.log(that.res);
                    var str = "";
                    var strPrice = 0;
                    var strNum = 0;
                    for(var i=0;i<carlength;i++){
                        for(var j=0;j<resLength;j++){
                            if(that.goodsMsg[i].id == that.res[j].goodsid){
                                // console.log(i);
                                // console.log(that.goodsMsg[i].id)
                                str += `<tr myindex="${i}">
                                            <td><input type="checkbox" class="isU" ${that.goodsMsg[i].checked}="checked">选中</td>
                                            <td><img src="${that.res[j].img}"></td>
                                            <td>${that.res[j].name}</td>
                                            <td>${that.res[j].price * that.goodsMsg[i].num}</td>
                                            <td>
                                                <div class="num" myindex="${i}">
                                                    <input type="button" value="-" id="reduce">
                                                    <input type="text" value="${that.goodsMsg[i].num}" class="iptNum">
                                                    <input type="button" value="+" id="add">
                                                </div>
                                            </td>
                                            <td><input type="button" value="删除" id="delete"></td>
                                        </tr>`;
                                if(that.goodsMsg[i].checked === "checked"){
                                    strPrice += that.res[j].price * that.goodsMsg[i].num;
                                    strNum += Number(that.goodsMsg[i].num);
                                }
                            }
                        }
                    }
                    that.tbody.innerHTML = str;
                    var myGoods = that.goodsMsg[0] ? that.goodsMsg[0] : [];
                    if(myGoods.isAllOnOff === 1){
                        that.isAllParent.innerHTML = `<input type="checkbox" id="isAll" checked="checked">全选`;
                    }else{
                        that.isAllParent.innerHTML = `<input type="checkbox" id="isAll">全选`;
                    }
                    that.isUs = document.querySelectorAll(".isU");

                    that.priceAll.innerHTML = `总计：${strPrice}`;
                    that.numAll.innerHTML = `总数：${strNum}`;
                }
            });
        }

        // getStorage(){
        //     this.str = this.userAllMsg[this.i].user + "goodsMsg";
        //     this.userName = this.userAllMsg[this.i].user;
        //     console.log(this.userName);
        //     console.log(this.str);
        //     this.goodsMsg = JSON.parse(localStorage.getItem(this.str));
        //     console.log(this.goodsMsg);
        //     // var myCookie = localStorage.getItem("goodsMsg") ? JSON.parse(localStorage.getItem("goodsMsg")) : [];
        //     // this.myGoods = myCookie;
        // }

        addEvent(){
            var that = this;
            this.tbody.onclick = function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                that.ipts = document.querySelectorAll(".iptNum");
                // console.log(that.ipts[1]);
                if(target.id === "delete"){
                    that.indexId = target.parentNode.parentNode.getAttribute("myindex");
                    that.tr = target.parentNode.parentNode;
                    that.delete();
                }else if(target.id === "reduce" || target.id === "add"){
                    if(target.id === "reduce"){
                        if(target.nextElementSibling.value<=1){
                            target.nextElementSibling.value = 1;
                        }else{
                            target.nextElementSibling.value--;
                        }
                    }else if(target.id === "add"){
                        target.previousElementSibling.value++;
                    }
                    that.indexId = target.parentNode.getAttribute("myindex");
                    // console.log(that.indexId);
                    // console.log(that.ipts[that.indexId-1])
                    that.goodsMsg[that.indexId].num = that.ipts[that.indexId-1].value;
                    localStorage.setItem(that.str,JSON.stringify(that.goodsMsg));
                    that.display();
                }else if(target.className === "isU"){
                    that.indexId = target.parentNode.parentNode.getAttribute("myindex");
                    if(target.getAttribute("checked")){
                        // console.log(that.indexId);
                        that.goodsMsg[that.indexId].checked = "abc";
                        that.goodsMsg[0].isAllOnOff = 0;
                    }else{
                        that.goodsMsg[that.indexId].checked = "checked";
                    }
                    localStorage.setItem(that.str,JSON.stringify(that.goodsMsg));
                    that.display();
                }
            }
            this.tbody.onchange = function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.className === "iptNum"){
                    that.indexId = target.parentNode.getAttribute("myindex");
                    that.goodsMsg[that.indexId].num = that.ipts[that.indexId-1].value;
                    localStorage.setItem(that.str,JSON.stringify(that.goodsMsg));
                    that.display();
                }
            }
            this.isAllParent.onclick = function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.id == "isAll"){
                    that.choseAll();
                    that.display();
                }
            }
            this.deleteAll.onclick = function(){
                localStorage.removeItem(that.str);
                that.display();
            }

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
        }

        delete(){
            this.goodsMsg.splice(this.indexId,1);
            if(this.goodsMsg.length == 0){
            localStorage.removeItem(this.str);
            }else{
            localStorage.setItem(this.str,JSON.stringify(this.goodsMsg));
            }
            this.tr.remove();
            this.display();
        }

        choseAll(){
            if(this.goodsMsg[0].isAllOnOff == 1){
                for(var i=0;i<this.goodsMsg.length;i++){
                    this.goodsMsg[i].checked = "abc";
                }
                this.goodsMsg[0].isAllOnOff = 0;
            }else{
                for(var i=0;i<this.goodsMsg.length;i++){
                    this.goodsMsg[i].checked = "checked";
                }
                this.goodsMsg[0].isAllOnOff = 1;
            }
            localStorage.setItem(this.str,JSON.stringify(this.goodsMsg));
        }

        // 加载页头页脚
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
                $("header").find("#cart").css({display:"none"});
                
                that.i = 0;
                var loginOnOff = that.userAllMsg.some((value,index)=>{
                    that.i = index;
                    return value.onoff != 0;
                })
                if(loginOnOff){
                    $("header").find(".welcome").css({display:"none"}).end().find(".welcome_1").css({display:"block"}).find("span").html(that.userAllMsg[that.i].user);
                    
                }else{
                    $("header").find(".welcome").css({display:"block"}).end().find(".welcome_1").css({display:"none"});
                }
                $("header").find(".exit").click(function(){
                    that.userAllMsg[that.i].onoff = 0;
                    localStorage.setItem("userMsg",JSON.stringify(that.userAllMsg));
                    location.reload();
                })
                that.display();
                that.addEvent();
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
            // $("#guess_u_like").load("http://localhost:82/html/guess_u_like.html");
            $("#footer").load("http://localhost:82/html/footer.html");


            // this.getStorage();
            // var that = this;
            // ajaxGet(this.url,function(res){
            //     // console.log(res);
            //     that.goods = JSON.parse(res);
            //     var myGoods = that.myGoods ? that.myGoods : [];
            //     var myGoodsLength =  myGoods.length;
            //     var goodsLength = that.goods.length;
            //     var str = "";
            //     var strPrice = 0;
            //     var strNum = 0;
            //     for(var i=0;i<myGoodsLength;i++){
            //         for(var j=0;j<goodsLength;j++){
            //             if(that.myGoods[i].id === that.goods[j].goodsId){
            //                 str += `<tr myindex="${i}">
            //                             <td><input type="checkbox" class="isU" ${that.myGoods[i].checked}="checked">选中</td>
            //                             <td><img src="${that.goods[j].img}"></td>
            //                             <td>${that.goods[j].name}</td>
            //                             <td>${that.goods[j].price * that.myGoods[i].num}</td>
            //                             <td>
            //                                 <div class="num" myindex="${i}">
            //                                     <input type="button" value="-" id="reduce">
            //                                     <input type="text" value="${that.myGoods[i].num}" id="ipt">
            //                                     <input type="button" value="+" id="add">
            //                                 </div>
            //                             </td>
            //                             <td><input type="button" value="删除" id="delete"></td>
            //                         </tr>`;
            //                 if(that.myGoods[i].checked === "checked"){
            //                     strPrice += that.goods[j].price * that.myGoods[i].num;
            //                     strNum += Number(that.myGoods[i].num);
            //                 }
            //             }
            //         }
            //     }
            //     that.tbody.innerHTML = str;
            //     var myGoods = that.myGoods[0] ? that.myGoods[0] : [];
            //     if(myGoods.isAllOnOff === 1){
            //         that.isAllParent.innerHTML = `<input type="checkbox" id="isAll" checked="checked">全选`;
            //     }else{
            //         that.isAllParent.innerHTML = `<input type="checkbox" id="isAll">全选`;
            //     }
            //     that.isUs = document.querySelectorAll(".isU");

            //     that.priceAll.innerHTML = `总计：${strPrice}`;
            //     that.numAll.innerHTML = `总数：${strNum}`;


            //     if(myGoodsLength == 0){
            //         that.tip.style.display = "block";
            //         that.cart.style.display = "none";
            //     }else{
            //         that.tip.style.display = "none";
            //         that.cart.style.display = "table";
            //     }
            // });
        }
        getStorage(){
            this.str = this.userAllMsg[this.i].user + "goodsMsg";
            this.userName = this.userAllMsg[this.i].user;
            // console.log(this.userName);
            // console.log(this.str);
            this.goodsMsg = localStorage.getItem(this.str) ? JSON.parse(localStorage.getItem(this.str)) : [];
            // console.log(this.goodsMsg);
            // var myCookie = localStorage.getItem("goodsMsg") ? JSON.parse(localStorage.getItem("goodsMsg")) : [];
            // this.myGoods = myCookie;
        }
    }

    return {
        shopCart:Shop
    }
})