;(function($){
    "ues strict";
    $.fn.banner = function(options){
        var that = this;
        options = options || {};
        this._obj = {
            img:options.img || [],
            btn:options.btn === false ? false : true,
            list:options.list === false ? false : true,
            autoPlay:options.autoPlay === false ? false : true,
            moveTime:options.moveTime || 300,
            delayTime:options.delayTime || 2000,
            index:options.index || 0,
            length:options.img.length,
            iPrev:options.img.length-1,
            listIndex:0,
            // listPrev:0
        }

        this._obj.init = function(){
            let str = "";
            for(var i=0;i<this.length;i++){
                str += `<a href="##"><img src="${this.img[i]}" alt=""></a>`;
            }
            that.html(`<div class="imgbox">${str}</div>`).css({
                width:"100%",
                height:384,
                position:"relative",
                overflow:"hidden"
            }).children(".imgbox").css({
                width:"100%",
                height:"100%"
            }).children("a").css({
                width:"100%",
                height:"100%",
                display:"block",
                position:"absolute",
                left:$(".imgbox").width(),
                top:0
            }).eq(this.index).css({
                left:0
            }).end().children("img").css({
                width:"100%",
                height:384,
                display:"block"
            })
        }
        this._obj.init();


        this._obj.leftClick = function(){
            if(that._obj.index == 0){
                that._obj.index = that._obj.length - 1;
                that._obj.iPrev = 0;
            }else{
                that._obj.index--;
                that._obj.iPrev = that._obj.index + 1;
            }
            that._obj.btnMove(1);
        }
        this._obj.rightClick = function(){
            if(that._obj.index == that._obj.length-1){
                that._obj.index = 0;
                that._obj.iPrev = that._obj.length - 1;
            }else{
                that._obj.index++;
                that._obj.iPrev = that._obj.index - 1;
            }
            that._obj.btnMove(-1);
        }
        this._obj.btnMove = function(type){
            that._obj.listIndex = that._obj.index;
            that._obj.listDisplay();
            let imgs = that.children(".imgbox").children("a");
            imgs.eq(this.iPrev).css({
                left:0
            }).stop().animate({
                left:$(".imgbox").width()*type
            }).end().eq(this.index).css({
                left:-$(".imgbox").width()*type
            }).stop().animate({
                left:0
            })
        }

        if(this._obj.btn){
            $('<input type="button" id="leftBtn" value="<">').css({
                left:10
            }).appendTo(this).after($('<input type="button" id="rightBtn" value=">">').css({
                right:10
            })).parent().children("input").css({
                width:50,
                height:50,
                border:0,
                borderRadius:"50%",
                top:"50%",
                marginTop:-25,
                background:"rgba(0,0,0,.7)",
                position:"absolute",
                color:"#fff",
                font:'25px/2 ""'
            }) 
            // console.log(this._obj.index);
            this.on("click","#leftBtn",that._obj.leftClick);
            this.on("click","#rightBtn",that._obj.rightClick);
        }

        if(this._obj.list){
            let str = "";
            for(var i=0;i<this._obj.length;i++){
                str += `<li></li>`;
            }
            $('<ul class="list"></ul>').css({
                margin:0,
                padding:0,
                listStyle:"none",
                width:"100%",
                height:30,
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                position:"absolute",
                bottom:10,
                left:0
            }).appendTo(this).html(str).children("li").css({
                color:"#fff",
                margin:"0 20px",
                width:20,
                height:20,
                borderRadius:"50%",
                background:"rgba(255,255,255,.4)",
                textAlign:"center",
                // lineHeight:"30px"
            }).eq(this._obj.index).css({
                // transform:"scale(1.3)",
                background:"rgba(0,0,0,.5)"
            }).end().click(function(){
                that._obj.index = $(this).index();
                // console.log(that._obj.listIndex,that._obj.index)
                if(that._obj.listIndex<that._obj.index){
                    that._obj.iPrev = that._obj.listIndex;
                    that._obj.listMove(-1);
                }else if(that._obj.listIndex>that._obj.index){
                    that._obj.iPrev = that._obj.listIndex;
                    that._obj.listMove(1);
                }
            })
        }
        this._obj.listMove = function(type){
            that._obj.btnMove(type);
            that._obj.listIndex = that._obj.index;
            // that._obj.listDisplay();
        }
        this._obj.listDisplay = function(){
            $(".list").children("li").css({
                transform:"",
                background:"rgba(255,255,255,.4)",
            }).eq(that._obj.index).css({
                // transform:"scale(1.3)",
                background:"rgba(0,0,0,.5)"
            })
        }

        if(this._obj.autoPlay){
            this._obj.t = setInterval(()=>{
                this._obj.rightClick();
            },this._obj.delayTime);

            this.hover(function(){
                clearInterval(that._obj.t);
            },function(){
                that._obj.t = setInterval(()=>{
                    that._obj.rightClick();
                },that._obj.delayTime)
            })
        }


    }
})($);