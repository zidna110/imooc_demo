$(function(){
    var $toolbar=$("[tag='toolbar']"),
        fold=tk.getCookie("toolbarFold")||"on",
        $searchBox=$toolbar.find(".search-block"),
        $searchInput=$searchBox.find(".JS_input"),
        $searchResult=$toolbar.find(".search-result"),
        $listWrap=$searchResult.find(".JS_list"),
        $advice=$(".BD_advice-dialog"),adviceIndex,
        $qqservice=$toolbar.find(".qq-service-block")


    function getVisaProcess(keyWord){
        keyWord=keyWord.replace(/^\s+|\s+$/g,"")
        if(keyWord===""){
            return false
        }
        $listWrap.find(".JS_item").remove()
        $listWrap.append('<tr class="JS_item"><td colspan="6">加载中...</td></tr>')
        $searchResult.addClass("active")
        $.post("/Visa/searchOrderStatus",{"query":keyWord},function(d){
            if (d.status==-1) {
                $listWrap.find(".JS_item").remove()
                $listWrap.append('<tr class="JS_item"><td colspan="6">请先<a href="/Login" style="color:#e52c1c">登录</a>！</td></tr>')
            }
            else if (d.status==0) { //status 请求结果代码 （0：出错  1：成功 -1：未登录）
                $listWrap.find(".JS_item").remove()
                $listWrap.append('<tr class="JS_item"><td colspan="6">'+ d.error +'</td></tr>')
            } else {
                if (d.data.guests.length==0) {
                    $listWrap.find(".JS_item").remove()
                    $listWrap.append('<tr class="JS_item"><td colspan="6">'+ '没有查找到相关订单哦！' +'</td></tr>');
                } else {
                    var code = keyWord,
                        json = d.data,
                        mode = json.mode,
                        guest = json.guests,
                        gNum = json.length
                    $listWrap.find(".JS_item").remove()
                    if (mode) { //mode 列表类型（0：订单  1：申请人）
                        if($(".JS_list th.code").length>0) {
                            $(".JS_list th.code").remove();
                        }
                        var str2 = "";
                        for(var i=0,len=guest.length;i<len;i++){
                            str2 += '<tr class="JS_item" style="height:40px;">'+
                            '<td class="date"><span class="text">'+guest[i].dateTime+'</span></td>'+
                            '<td class="name"><span class="text">'+guest[i].productName+'</span></td>'+
                            '<td class="user"><span class="text">'+guest[i].guestName+'</span></td>'+
                            '<td class="state"><span class="text">'+guest[i].status+'</span></td>'+
                            '</tr>'
                        }
                        $listWrap.append(str2);
                    } else {
                        if($(".JS_list th.code").length == 0) {
                            $(".JS_list tr:first").prepend("<th class='code'>订单号</th>")
                        }

                        var str2 = "";
                        for(var i=0,len=guest.length;i<len;i++){
                            str2 += '<tr class="JS_item" style="height:40px;">'+
                            '<td class="code"><span class="text">'+code+'</span></td>'+
                            '<td class="date"><span class="text">'+guest[i].dateTime+'</span></td>'+
                            '<td class="name"><span class="text">'+guest[i].productName+'</span></td>'+
                            '<td class="user"><span class="text">'+guest[i].guestName+'</span></td>'+
                            '<td class="state"><span class="text">'+guest[i].status+'</span></td>'+
                            '</tr>'
                        }
                        $listWrap.append(str2);
                    }   
                }

            }
        },"json")
    }

    $toolbar[0].className="BD_toolbar "+fold

    $toolbar.on({
        click:function(e){
            var $t=$(e.target)

            if($t.hasClass("ICON_t_fold")){
                $toolbar.replaceClass("on","off")
                tk.setCookie("toolbarFold","off")
            }
            if($t.hasClass("ICON_t_foldCircle")){
                $toolbar.replaceClass("off","on")
                tk.setCookie("toolbarFold","on")
            }

            if($t.parent().hasClass("option-top")||$t.hasClass("ICON_t_topCircle")){
                var animation=window.requestAnimationFrame||"",top=$(document).scrollTop()
                if(animation){
                    animation(function(){
                        top=top-100
                        $(document).scrollTop(top)
                        if(top>=0) animation(arguments.callee)
                    })
                }else{
                    $(document).scrollTop(0)
                }
            }
            if($t.parent().hasClass("option-advice")||$t.hasClass("option-advice")){
                adviceIndex=layer.open({
                    title: false,
                    area: ['500px','300px'],
                    type:1,
                    content:$(".BD_advice-dialog").show(),
                    success:function(layero, index){

                    }
                })
            }
        }
    })

    $toolbar.on({
        click:function(e){
            var $t=$(e.target)
            if($t.hasClass("JS_close")){
                $searchInput.focus().val("")
                $searchResult.removeClass("active")
            }
            if($t.hasClass("JS_search")){
                getVisaProcess($searchInput.val())
            }
        },
        mouseenter:function(){
            $searchBox.addClass("active").data("show",true)
        },
        mouseleave:function(){
            $searchBox.data("show",false)
            setTimeout(function(){
                if(!$searchBox.data("show")&&!$searchBox.data("focus")){
                    $searchBox.removeClass("active")
                }
            },150)
        }
    },".option-progress")

    $toolbar.on({
        mouseenter:function(){
            $qqservice.addClass("active").data("show",true)
        },
        mouseleave:function(){
            $qqservice.data("show",false)
            setTimeout(function(){
                if(!$qqservice.data("show")&&!$qqservice.data("focus")){
                    $qqservice.removeClass("active")
                }
            },150)
        }
    },".option-qq-service")

    $searchInput.on({
        focus:function(){
            $searchBox.data("focus",true)
        },
        change:function(){
            if(this.value===""){
                $searchResult.removeClass("active")
            }
        },
        blur:function(){
            $searchBox.data("focus",false)
            if(!$searchBox.data("show")&&!$searchBox.data("focus")){
                $searchBox.removeClass("active")
            }
        },
        keyup:function(e){
            var keyCode=e.keyCode||e.which
            if(keyCode==13){
                getVisaProcess(this.value)
            }
        }
    })

    $advice.on("click",".btn-submit",function(){
        var $advice=$(this).prev(),val=$advice.val()
        if(val==""){
            $advice.addClass("error").attr("placeholder","建议不能为空")
            return false
        }
        $.post("/index/index/submitAdvise",{"content":val},function(data){
            if(data.status==1){
                layer.success("您的建议已提交成功，谢谢您对我们的支持！")
                layer.close(adviceIndex)
            }else{
                layer.error(data.error||"服务器出错了,请重新提交！")
            }
        },"json")
    })
    $advice.on("blur",".advice-input",function(){
        var $advice=$(this)
        if($advice.val()!=""){
            $advice.removeClass("error").attr("placeholder","写点什么吧")
        }
    })
    $(window).resize(function() {
    var BHeight = $(window).height();
        if(BHeight<600){
            $(".BD_toolbar .center-box").css({"top":"20px","margin-top":"0"});
            $(".center-box .option:gt(0)").css("display","none");
        }else{
            $(".BD_toolbar .center-box").css({"top":"38%","margin-top":"-210px"});
            $(".center-box .option:gt(0)").css("display","block");
        }
    })
    $("body").on({
        mousedown:(function(){
            window.location.href="/login";
        })
    },".go-login-please strong:not('.go-perfect-please')");
    $("body").on({
        mousedown:(function(){
            window.location.href="/login/addCompany";
        })
    },".go-login-please strong.go-perfect-please");
})