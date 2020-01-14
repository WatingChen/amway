define(function(){
    class Login{
        constructor(){
            this.btn = $("#banner").find("#btn");
            this.login_user = $("#banner").find("#login_user");
            this.login_pass = $("#banner").find("#login_pass");
            this.register_user = $("#banner").find("#register_user");
            this.register_pass = $("#banner").find("#register_pass");
            this.repeat_pass = $("#banner").find("#repeat_pass");
            

            this.init();
            this.addEvent();
        }

        // 添加事件
        addEvent(){
            var that = this;
            $("#banner").on("click",function(eve){
                let e = eve || window.event;
                let target = e.target || e.srcElement;
                // 登录 toggle
                if(target.className == "user_login"){
                    $("#banner").find(".user_login").addClass("login_active").end().find(".register").removeClass("login_active").end().find(".login_box").css({
                        display:"block"
                    }).end().find(".register_box").css({
                        display:"none"
                    })
                // 注册 toggle
                }else if(target.className == "register"){
                    $("#banner").find(".register").addClass("login_active").end().find(".user_login").removeClass("login_active").end().find(".register_box").css({
                        display:"block"
                    }).end().find(".login_box").css({
                        display:"none"
                    });
                // 登录按钮
                }else if(target.id == "login_btn"){
                    let useron = false;
                    let passon = false;
                    if(/^[\w]{3,10}$/.test(that.login_user.val())){
                        that.login_user.css({
                           border:""
                       })
                       useron = true;
                    }else{
                        that.login_user.css({
                           border:"2px solid #f99"
                       })
                    }
                    if(/^[\w]{3,10}$/.test(that.login_pass.val())){
                        that.login_pass.css({
                            border:""
                        })
                        passon = true;
                    }else{
                        that.login_pass.css({
                           border:"2px solid #f99"
                       })
                    }
                    if(useron && passon){
                        that.loginStorage();
                    }
                // 注册按钮
                }else if(target.id == "register_btn"){
                    let useron = false;
                    let passon = false;
                    let repeaton = false;
                    if(/^[\w]{3,10}$/.test(that.register_user.val())){
                       that.register_user.css({
                           border:""
                       })
                       useron = true;
                    }else{
                        that.register_user.css({
                           border:"2px solid #f99"
                       });
                       useron = false;
                    }
                    if(/^[\w]{3,10}$/.test(that.register_pass.val())){
                        that.register_pass.css({
                            border:""
                        })
                        passon = true;
                    }else{
                        that.register_pass.css({
                           border:"2px solid #f99"
                       });
                       passon = false;
                    }
                    if(that.repeat_pass.val() == that.register_pass.val()){
                        that.repeat_pass.css({
                            border:""
                        })
                        repeaton = true
                    }else{
                        that.repeat_pass.css({
                           border:"2px solid #f99"
                       });
                        repeaton = false;
                        alert("密码不一致");
                        that.repeat_pass.val("");
                    }
                    if(useron && passon && repeaton){
                        that.registerStorage();
                    }
                }
            })
        }
        loginStorage(){
            this.userAllMsg = localStorage.getItem("userMsg") ? JSON.parse(localStorage.getItem("userMsg")) : [];
            let userHad = this.userAllMsg.some((value)=>{
                return value.user == this.login_user.val();
            })
            if(userHad){
                this.index = 0;
                let passHad = this.userAllMsg.some((value,index)=>{
                    this.index = index;
                    return value.pass == this.login_pass.val();
                })
                if(passHad){
                    alert("登录成功,跳转到首页");
                    this.userAllMsg[this.index].onoff = 1;
                    location.assign("index.html");
                }else{
                    alert("登录失败，请重新输入密码")
                }
            }else{
               alert("登录失败，用户名不存在");
            }
            localStorage.setItem("userMsg",JSON.stringify(this.userAllMsg));
        }
        // 注册
        registerStorage(){
            this.userMsg = localStorage.getItem("userMsg") ? JSON.parse(localStorage.getItem("userMsg")) : [];
            let had = this.userMsg.some((value)=>{
                return value.user == this.register_user.val();
            })
            if(had){
                alert("用户名重复");
            }else{
                this.userMsg.push({
                    user:this.register_user.val(),
                    pass:this.register_pass.val(),
                    onoff:0
                })
                alert("注册成功,请登录");
                location.reload();
            }
            localStorage.setItem("userMsg",JSON.stringify(this.userMsg));
        }
        // 加载页脚
        init(){
            $("#footer").load("http://localhost:82/html/footer.html");
        }
    }

    return {
        login:Login
    }
})