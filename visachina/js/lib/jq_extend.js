$.extend({
    scrollTo:function($ele,point){
        var x=0,y=0
        if(!($ele instanceof $)){
            $ele=$($ele)
        }
        if($ele.offset()){
            if(point){
                x=point.x-0
                y=point.y-0
            }
            y+=$ele.offset().top
            x+=$ele.offset().left
        }
        $('html,body').animate({"scrollTop":y+"px","scrollLeft":x+"px"})
        return $
    },
    standardPost:function(url,args){
        var form = $("<form method='post' enctype='multipart/form-data'></form>"),
            input;
        form.attr({"action":url});
        $.each(args,function(key,value){
            if(typeof(value)=="object"){
                $.each(value,function(key1,value1){
                    input = $("<input type='hidden'>");
                    input.attr({"name":"["+key+"]["+key1+"]"});
                    input.val(value1);
                    form.append(input);
                })
            } else {
                input = $("<input type='hidden'>");
                input.attr({"name":key});
                input.val(value);
                form.append(input);
            }
        });
        if($("#v_file").val()){
            form.append($("#v_file"));
        }
        $("body").append(form);
        form.submit();
    }
})

$.fn.extend({
    /*
     * 替换class
     * @OV String 旧class名
     * @NV String 新class名
     *
     * */
    replaceClass:function(OV,NV){
        var $t=$(this)
        OV=OV.replace(/\s+/g,"")
        NV=NV.replace(/\s+/g,"")

        if(OV!=NV){
            $t.removeClass(OV).addClass(NV)
        }

        return $t
    },
    /*
     * 切换class
     * @NAME String 切换的class名
     * @$ELE jqObject jq对象（为空则默认为兄弟节点的jq对象）
     *
     * */
    tabClass:function(NAME,$ELE){
        var $t=$(this)

        if(!$ELE||!$ELE[0]){
            $ELE=$t.siblings()
        }

        if(!$t.hasClass(NAME)){
            $ELE.removeClass(NAME)
            $t.addClass(NAME)
        }

        return $t
    },
    /*
     * 扩展JQ val方法--赋值同时触发change事件
     * @a String 值
     *
     * */
    _val:function(a){
        var $t=$(this)
        if(a||a===0||typeof a=="string"){
            $t.val(a).trigger("change",[a])
            return $t
        }else{
            return $t.val()
        }
    },
    /*
     * 模拟滚动条，未做完
     * */
    scrollWrap:function(step){
        var $t=$(this),$wrap=$('<div class="PB_scrollWrap"></div>')
            step=step||10

        $wrap.css({"position":"relative","top":"0px"})

        $wrap.on("wheel",function(e){
            var event=e.originalEvent,
                $ele=$(this),
                hScroll=$ele[0].offsetHeight,
                hWrap=$ele.parent()[0].offsetHeight,
                topCur=parseInt($ele.css("top")),
                topMax=hScroll-hWrap

            event.preventDefault()

            //是否滚动
            if(topMax>0){
                var deltaY=event.wheelDeltaY||-event.deltaY
                //下滚
                if(deltaY<0){
                    //是否滚动到底部
                    if(topCur>-topMax){
                        $ele.css("top",(topCur-step)+"px")
                    }else{
                        $ele.css("top",-topMax+"px")
                    }
                }
                //上滚
                else{
                    //是否滚动到顶部
                    if(topCur<0){
                        $ele.css("top",(topCur+step)+"px")
                    }else{
                        $ele.css("top","0px")
                    }
                }
            }

        })
        $t.wrapInner($wrap)
    },
    allowedClick:function(allowed){
        var $t=$(this)
        $t.data("disable",!allowed)
        if(allowed){
            $t.css("cursor","pointer")
        }else{
            $t.css("cursor","not-allowed")
        }
        return $t
    },
    dialog:function(ele){

    },
    prompt:function(){

    },
    alert:function(){

    },
    confirm:function(){

    },
    msg:function(){

    },
    follow:function(follow,ele){

    },
    tip:function(){

    },
    select:function(){

    },
    setTagVal:function(val,bol){
        var $t=$(this),tag=$t.attr("tag"),field=$t.attr("field")
        if(tag&&field){
            var $list=$("[tag='"+tag+"'][field='"+field+"']")
            switch(tag){
                case "checkBox":
                    if(val==1){
                        $t.replaceClass("off","on")
                    }else{
                        $t.replaceClass("on","off")
                    }
                    break;
                case "radio":
                    var $ele=$("[tag='"+tag+"'][field='"+field+"'][val='"+val+"']")
                    if($ele[0]){
                        $list.replaceClass("on","off")
                        $ele.replaceClass("off","on")
                    }
                    break;
                case "groupCheck":
                    var arr=(val+"").split(",")
                    $list.each(function(index,ele){
                        var $ele=$(ele),value=$ele.attr("val")
                        if(arr.indexOf(value)!=-1){
                            $ele.replaceClass("off","on")
                        }else{
                            $ele.replaceClass("on","off")
                        }
                    })
                    break;
            }

            $("input[name='"+field+"']")._val(val)
            if(bol){
                $t.eq(0).trigger("change",[val])
            }

        }
        return $t
    },
    getTagVal:function(){
        var $t=$(this),tag=$t.attr("tag"),field=$t.attr("field")
        if(tag&&field){
            return $("input[name='"+field+"']").val()
        }
        return $t
    },
    tagLoad:function(css){
        var html=$("<div class='PB_status'><i class='status-icon load-icon-1'></i></div>")
        if(css){
            html.css(css)
        }
        $(this).html(html)
    },
    tagNoData:function(){
        $(this).html("<div class='PB_status'><span class='status-icon noData-icon-1'></span></div>")
    },
    tagTip:function(tip){
        $(this).html("<div class='PB_status'><span class='status-tip'>"+tip+"</span></div>")
    },
    tagScrollFixed:function(fn){
        var _t=this,$t=$(_t)
        $(window).scroll(function(e){
            var $win=$(this),scrollTop=$win.scrollTop()
            $t.each(function(index){
                var $ele=$(this),y=parseInt($ele.attr("scroll-y"))||0
                if(scrollTop > ($ele.offset().top + y)){
                    if(!$ele.data("fixed")){
                        $ele.data("fixed",$ele.clone().addClass("PB_fixed")).data("fixed").appendTo("body")
                    }
                }else{
                    if($ele.data("fixed")&&$ele.data("fixed").remove){
                        $ele.data("fixed").remove()
                        $ele.removeData("fixed")
                    }
                }
            })

            fn&&fn.call(_t,e,scrollTop)
        })
        return $t
    },
    tagTab:function(id,fn){
        var $t=$(this),$list=$t.children(),max=$list.length-1,html=$list.html(),wWidth=$t[0].offsetWidth,lWidth=0

        var temp=0

        function test(){
            if(lWidth>wWidth){
                $t.css({"position":"relative","width":lWidth*10+"px"}).attr("id",id).append($list.clone())
                $("[tag='bnTab'][direction='"+id+"']").click(function(){
                    var $btn=$(this),operate=$btn.attr("operate"),$wrap=$("#"+id),index=$wrap.data("cur"),$list=$wrap.children()
                    if($wrap.is(":not(:animated)")){
                        switch(operate){
                            case "prev":
                                if(--index<0){
                                    index=max
                                    $wrap.css({"left":-$list.eq(max+1).position().left})
                                }
                                break;
                            case "next":
                                if(++index>max+1){
                                    index=1
                                    $wrap.css({"left":0})
                                }
                                break;
                            default:
                                index=operate>max?max:(operate<0?0:operate)
                        }

                        $wrap.animate({"left":-$list.eq(index).position().left}).data("cur",index)
                        fn&&fn(index,$t)
                    }
                })
            }
        }

        $t.data("cur",0)
        $list.each(function(index){
            var _t=this
            if(!_t.complete&&_t.tagName=="IMG"){
                temp++
                _t.onload=function(){
                    temp--
                    lWidth+=this.offsetWidth
                    $(this).width(this.offsetWidth)
                    if(temp===0){
                        test()
                    }
                }
            }else{
                lWidth+=_t.offsetWidth
                $(_t).width(_t.offsetWidth)
            }
        })

        if(temp===0){
            test()
        }

        return $t
    },
    /*
     * @return
     * */
    tagUpload:function(options){
        var $list=$(this),
            options=options||{},
            url=options.url||"#",
            size=options.size||0,
            sizeTip=options.sizeTip||"",
            allows=options.allows||[],
            allowsTip=options.allowsTip||"",
            callback=options.callback||function(){},
            name=options.name||""

        $list.each(function(index){
            var mark=parseInt(Math.random(1)*Math.pow(10,15)),
                $ele=$(this),
                $form,
                $file,
                $frame=$('<div class="upload-frame"></div>')

            if(!name){
                name="U_fileName"+mark
            }

            $form=$('<form action="'+url+'" target="U_frame'+mark+'" method="POST" enctype="multipart/form-data"><input name="field_name" type="hidden" value="'+name+'" /></form>'),
            $file=$('<input type="file" name="'+name+'"/>'),

            $form.css({"position":"static"})
            $file.css({"position":"absolute","left":0,"top":0,"z-index":9999,"width":"100%","height":"100%","opacity":0,"cursor":"pointer"})
            $frame.css({"display":"none"})

            $file.change(function(){
                var $t=$(this),val=$t.val()
                if(val!=""){
                    if(size&&tk.getFileSize(this)>size){
                        $t.val("")
                        callback({"resp":"",tip:sizeTip},"size")
                        return false
                    }
                    if(allows&&allows[0]&&allows.indexOf(val.match(/[.][^.]+$/g)[0])==-1){
                        callback({"resp":"",tip:allowsTip},"allow")
                        return false
                    }
                    $frame.html("<iframe id='U_frame"+mark+"' name='U_frame"+mark+"' width=0 height=0 frameborder=0></iframe>")
                    $frame.find("iframe").on("load",function(e){
                        var resp=window.frames["U_frame"+mark].document.body.innerHTML
                        try{
                            resp=JSON.parse(window.frames["U_frame"+mark].document.body.innerHTML)
                        }catch(e){
                            callback({"resp":resp,tip:"上传接口返回非json!"},"error",$ele[0],$file[0])
                            return false
                        }
                        callback(resp,"success",$ele[0],$file[0])
                    })
                    $form.submit()
                }
            })

            $ele.append($form.append($file,$frame))
        })

    },

    /*
     * inputRelated 输入读取相关信息
     * 使用方法：$(".xx-input").inputRelated(cfg)
     * <input class="xx-input">
     * */
    inputRelated:function(cfg){
        var _t = this,
            $t = $(this),
            ajaxType = cfg.type.toLowerCase() || "get",
            url = cfg.url || "#",
            send = cfg.send || {},
            resolve = cfg.resolve || null,
            callback = cfg.callback || null,
            key = cfg.key|| "keyword",
            resolve = cfg.resolve || null,
            point= cfg.point || {},
            offset = cfg.offset || {},
            loadFn = cfg.loadFn || null,
            width = cfg.width,
            limit = cfg.limit || null;

        send[key] = $t.val();
        point.top += (offset.top||0);
        point.left += (offset.left||0);
        if(send[key]){
            $[ajaxType](url,send,function(json){
                var str = "", $wrap=$('<ul class="PB_autofill_wrap"></ul>');
                $(".PB_autofill_wrap").remove();

                json = resolve ? resolve(json) : json;
                if(!json){
                    return;
                }
                for (var i = 0; i < json.length; i++) {
                    var d = {};
                    var $item = $('<li class="PB_autofill_item"></li>');
                    for (var j in json[i]) {
                        d[j] = json[i][j];
                        if(limit){
                            if(limit.indexOf(j) > -1) {
                                if(d[j]===null || d[j]===""){
                                    d[j] = "";
                                } else {
                                    $item.text($item.text()+( $item.text() ? "，" : "" )+d[j]);
                                }
                            }
                        } else {
                            $item.text(d["name"]);
                        }
                        
                    }
                    $item.data(d);
                    if(loadFn){
                        var $fillItem = $(this);
                        $item.click(loadFn);
                    }
                    $wrap.append($item);
                }
                $wrap.css({position:"absolute",top:point.top,left:point.left,minWidth:width})
                $("body").append($wrap);
            },"json");
        }
    },

    /*
     *    inputValidate 输入框验证
     *    使用方法：$(.xx-input).inputValidate()
     *    <input class="xx-input vld-xxx">
     *    xxx为类型
     * */
    inputValidate:function(){
        var $t = $(this),
            allClass = $t.attr("class"),
            typeReg = /\bvld-\w*\b/,
            vldType = typeReg.exec(allClass),
            inputVal = $t.prop("value"),
            reg = /^.*$/,
            tip = "",
            targetEle = $t.data("tarele")?$($t.data("tarele")):$t;

        if (vldType) {
            switch(vldType[0])
            {
                case "vld-english":
                reg = /^[a-zA-Z]*$/;
                tip = "请输入英文或拼音";
                break;
                case "vld-chinese":
                reg = /^[\u4E00-\u9FA5]*$/;
                tip = "请输入汉字";
                break;
                case "vld-code":
                if($t.parent().siblings(".user-card").find("#idtype").val()==1) {
                    reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                    tip = "身份证号码不正确请重新输入"
                } else if($t.parent().siblings(".user-card").find("#idtype").val()==2) {
                    reg = /^1[45][0-9]{7}|E[0-9]{8}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/;
                    tip = "护照号码不正确请重新输入"
                } else {
                    reg = /^.*$/;
                }
                break;
                case "vld-date":
                reg = /^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
                tip = $t.data("tip")||"请按格式填写日期：yyyy-mm-dd"
                break;
                case "vld-phone":
                reg = /^1[3|4|5|7|8]\d{9}$/;
                tip = "手机号码不正确请重新输入"
                break;
                case "vld-email":
                reg = /^([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
                tip = "邮箱格式不正确请重新输入"
                break;
                case "vld-visaapplicant":
                reg = /^([\u4e00-\u9fa5]+[;；]?)*$/;
                tip = "请输入汉字姓名，并用分号分隔"
                break;
            }
        }
        if (inputVal) {
            if (vldType&&(vldType[0]=="vld-visaapplicant")) {inputVal=inputVal.replace(/\s+/g, "");}
            if (reg.test(inputVal)) {
                targetEle.removeClass("error");
                targetEle.parents(".PB_error-tip-parent").find(".PB_error-tip").removeClass("on");
                targetEle.parents(".PB_error-tip-parent").find(".PB_default-tip").addClass("on");
            } else {
                targetEle.addClass("error");
                targetEle.parents(".PB_error-tip-parent").find(".PB_error-tip").addClass("on").text(tip);
                targetEle.parents(".PB_error-tip-parent").find(".PB_default-tip").removeClass("on");

            }
        } else {
            targetEle.addClass("error");
            targetEle.parents(".PB_error-tip-parent").find(".PB_error-tip").addClass("on").text( $t.data("errortext") ? $t.data("errortext"): ("请输入"+ ($t.data("key")||"完整信息")) );
            targetEle.parents(".PB_error-tip-parent").find(".PB_default-tip").removeClass("on");
        }

        if($t.hasClass("vld-code")){
            var newCode = $t.val(),
            oldCodeEle = $t.parent().parent().siblings().find(".vld-code");
            if(newCode.length == 18){
                code = newCode.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                //校验位
                var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++)
                {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if(parity[sum % 11] != code[17]){
                    targetEle.parents(".PB_error-tip-parent").find(".PB_error-tip").addClass("on").text("身份证号码不正确请重新输入");
                    targetEle.addClass("error");
                    return false;
                }
            }

            for(var i = 0; i < oldCodeEle.length; i++){
                if(newCode == oldCodeEle[i].value){
                    targetEle.parents(".PB_error-tip-parent").find(".PB_error-tip").addClass("on").text("被保人证件号重复");
                    targetEle.addClass("error");
                    return false;
                }
            }
        }
        if($t.hasClass("vld-gender")){
            if($t.parent().siblings(".user-card").find("select").val()==1){
                var code = $t.parent().siblings(".user-code").find("input").val(),
                    gender = $t.val(),
                    genderCode = code.slice(-2,-1);
                if((parseInt(genderCode)+parseInt(gender))%2){ // gender 0为女，1为男； genderCode 偶数为女，奇数为男
                    targetEle.parents(".PB_error-tip-parent").find(".PB_error-tip").addClass("on").text("被保人性别与证件号不符");
                    targetEle.addClass("error");
                    return false;
                }
            }
        }
    }
})
