$(function(){
    window.tk=window.tk||{}
    /*
     * checkbox
     * 变化：on off
     * 例：
     *   标签：
     *   <div class="PB_checkBox off" tag="checkBox" field="checkTest">
     *       <i class="PB_checkIcon"></i>
     *       <div class="PB_checkLabel">这是label</div>
     *   </div>
     *   关联表单：
     *   <input name="checkTest"/>
     *
     * */
    $("body").on({
        click:function(){
            var $t=$(this),name=$t.attr("field"),$input,val
            if($t.hasClass("on")){
                $t.replaceClass("on","off")
                val=0
            }else{
                $t.replaceClass("off","on")
                val=1
            }
            //set val
            if(name!=""){
                $input=$("input[name='"+name+"']")
                if($input[0]){
                    $input._val(val)
                }
            }
            $t.triggerHandler("change",[val])
        }
    },"[tag='checkBox']")

    /*
     * radio
     * 变化：on off
     * 例：
     *   标签：
     *   <div class="PB_radio-white off" tag="radio" field="radioTest" val="1">
     *       <i class="PB_radioIcon"></i>
     *       <div class="PB_radioLabel">这是radio1</div>
     *   </div>
     *   <div class="PB_radio-white on" tag="radio" field="radioTest" val="2">
     *       <i class="PB_radioIcon"></i>
     *       <div class="PB_radioLabel">这是radio2</div>
     *   </div>
     *   <div class="PB_radio-white off" tag="radio" field="radioTest" val="3">
     *       <i class="PB_radioIcon"></i>
     *       <div class="PB_radioLabel">这是radio3</div>
     *   </div>
     *   关联表单：
     *   <input name="radioTest"/>
     *
     * */
    $("body").on({
        click:function(){
            var $t=$(this),name=$t.attr("field"),val=$t.attr("val"),$input
            if($t.hasClass("off")){
                $("[tag='radio'][field='"+name+"']").replaceClass("on","off")
                $t.replaceClass("off","on")

                //set val
                if(name!=""){
                    $input=$("input[name='"+name+"']")
                    if($input[0]){
                        $input._val(val)
                    }
                }
                $t.triggerHandler("change",[val])
            }
        }
    },"[tag='radio']")

    /*
     * groupCheck
     * 变化：on off
     * 例：
     *   标签：
     *   <div class="PB_checkBox off" tag="groupCheck" field="groupCheckTest">
     *       <i class="PB_checkIcon"></i>
     *       <div class="PB_checkLabel">这是label</div>
     *   </div>
     *   关联表单：
     *   <input name="groupCheckTest"/>
     *
     * */
    $("body").on({
        click:function(){
            var $t=$(this),name=$t.attr("field"),$input=$("input[name='"+name+"']"),val=""
            if($t.hasClass("on")){
                $t.replaceClass("on","off")
            }else{
                $t.replaceClass("off","on")
            }
            if(name!=""){
                var $list=$("[tag='groupCheck'][field='"+name+"']")
                $list.each(function(index,ele){
                    var $ele=$(ele)
                    if($ele.hasClass("on")){
                        val+=$ele.attr("val")+","
                    }
                })
                if((val+"").match(/,$/g)){
                    val=val.slice(0,-1)
                }
                if($input[0]){
                    $input._val(val)
                }
            }
            $t.triggerHandler("change",[val])
        }
    },"[tag='groupCheck']")

    /*
     * single
     * 变化：cur显隐
     * 例：
     *   标签：
     *   <a tag="single" field="singleTest" val="81">单选项</a>
     *   关联表单：
     *   <input name="singleTest"/>
     *
     * */
    $("body").on({
        click:function(){
            var $t=$(this),name=$t.attr("field"),val=$t.attr("val"),$input
            if(!$t.hasClass("cur")){
                $t.tabClass("cur",$("[tag='single'][field='"+name+"']"))
                //set val
                if(name!=""){
                    $input=$("input[name='"+name+"']")
                    if($input[0]) $input._val(val)
                }
                $t.triggerHandler("change",[val])
            }
        }
    },"[tag='single']")

    /*
     * multiple
     * 变化：cur显隐
     * 例：
     *   标签：
     *   <a tag="multiple" field="multipleTest" val="81">单选项</a>
     *   关联表单：
     *   <input name="multipleTest"/>
     *
     * */
    $("body").on({
        click:function(){
            var $t=$(this),name=$t.attr("field"),val=$t.attr("val"),$input

            $t.toggleClass("cur")

            //set val
            if(name!=""){
                $input=$("input[name='"+name+"']")
                if($input[0]){
                    var str=$input.val(),arr
                    if(str===""){
                        $input.val(val)
                    }else{
                        arr=str.split(",")
                        if(arr.indexOf(val)==-1){
                            $input.val(str+","+val)
                        }else{
                            $input.val(str.replace(new RegExp("(,)"+val+"|"+val+"(,|\\b)","g"),""))
                        }
                    }
                }
            }
            $t.triggerHandler("change",[val])
        }
    },"[tag='multiple']")

    $("body").on({
        click:function(e){
            var $t=$(e.target)

            if($t[0].tagName=="I"){
                var $p=$t.parent(),
                    $input=$t.siblings("input"),
                    val=$input.val()-0,
                    max=$p.attr("max")-0,
                    min=$p.attr("min")-0,
                    step=$p.attr("step")-0||1

                if(!$p.data("num")){
                    $p.data("num",new intNum({
                        "val":val,
                        "step":step,
                        "min":min,
                        "max":max
                    }))
                }

                if($t.hasClass("PB_num-del")){
                    $p.data("num").sub()
                }else{
                    $p.data("num").add()
                }

                $input._val($p.data("num").val)
            }
        },
        keydown:function(e){
            var which=e.which||e.keyCode
            if(!((which>=48&&which<=57)||(which>=96&&which<=105)||which==8||which==38||which==39)){
                e.preventDefault()
            }
        },
        keyup:function(e){
            var which=e.which,
                $input=$(e.target),
                $p=$input.parent(),
                val=$input.val()-0,
                max=$p.attr("max")-0,
                min=$p.attr("min")- 0,
                step=$p.attr("step")-0||1

            if(!$p.data("num")){
                $p.data("num",new intNum({
                    "val":val,
                    "step":step,
                    "min":min,
                    "max":max
                }))
            }

            if(!(which>=37&&which<=40)){
                $p.data("num").setVal(val)
            }else{
                if(which==38){
                    $p.data("num").add()
                }else if(which==40){
                    $p.data("num").sub()
                }
            }
            $input._val($p.data("num").val)
        }
    },"[tag='PB_numInput']")

    /*
     * select
     * 例：
     *   <div class="PB_select" tag="select" field="selectTest">
     *       <input class="PB_selectText" type="text" placeholder="select test" readonly/>
     *       <i class="ICON_down-black"></i>
     *       <div class="PB_options">
     *           <a class="PB-option" val="0">广州领区</a>
     *           <a class="PB-option" val="1">上海领区</a>
     *           <a class="PB-option" val="2">北京领区</a>
     *       </div>
     *   </div>
     *   关联表单：
     *   <input name="selectTest"/>
     *
     * */
    $("body").on({
        mouseenter:function(){
            var $t=$(this)

            if($t.hasClass("PB_select")){
                var point={x:0,y:0}

                if(!$t.data("options")){
                    var $options=$t.find(".PB_options")
                    $options.scrollWrap(39)
                    $t.data("options",$options)
                    $options.data("text",$t.find(".PB_selectText")).attr({"tag":"options","field":$t.attr("field")}).appendTo("body")
                }

                point=tk.getFloatPosition(this,$t.data("options")[0])

                $t.data("options").css({"visibility":"visible","minWidth":$t[0].offsetWidth,"position":"fixed","left":point.x+"px","top":point.y+"px"})
            }
            if($t.hasClass("PB_options")){
                $t.data("show",true)
            }
        },
        mouseleave:function(e){
            var $t=$(this)

            if($t.hasClass("PB_select")){
                setTimeout(function(){
                    if(!$t.data("options").data("show")){
                        $t.data("options").css({"visibility":"hidden"})
                    }
                },150)
            }

            if($t.hasClass("PB_options")){
                $t.css({"visibility":"hidden"}).data("show",false)
            }

        },
        click:function(e){
            var $t=$(e.target),$p=$t.parents(".PB_options"),name=$p.attr("field"),val=$t.attr("val"),text=$t.text(),$input

            if($t.hasClass("PB_option")){
                $p.css({"visibility":"hidden"}).data("text").val(text)

                //set val
                if(name!=""){
                    $input=$("input[name='"+name+"']")
                    if($input[0]) $input._val(val)
                }
                $t.triggerHandler("change",[val,text])
            }

        },
        wheel:function(e){
            var $t=$(this)
            if($t.data("options")){
                $t.data("options").css({"visibility":"hidden"})
            }
        }
    },"[tag='select'],[tag='options']")

    /*
     * 地址选择框
     * 国家ID：data-area=40（中国）
     * 例：
     *   标签：
     *   <div class="PB_addressInput" tag="addressInput">
     *       <div class="PB_address-input" data-area="40" field="provinceTest">
     *           <span class="PB_address-text"></span>
     *           <i class="PB_address-unit">省</i>
     *       </div>
     *       <div class="PB_address-input" field="cityTest">
     *           <span class="PB_address-text"></span>
     *           <i class="PB_address-unit">市</i>
     *       </div>
     *       <div class="PB_address-input" field="areaTest">
     *           <span class="PB_address-text"></span>
     *           <i class="PB_address-unit">区/县</i>
     *       </div>
     *   </div>
     *   关联表单：
     *   <input name="provinceTest"/>
     *   <input name="cityTest"/>
     *   <input name="areaTest"/>
     *
     * */
    $("body").on({
        mouseenter:function(e){
            var $t=$(e.target)
            if($t.hasClass("PB_address-input")){
                var areaData=tk.cityData||[],callee=arguments.callee,$addressInput=$t.parent()

                //reset cur index
                $addressInput.find(".PB_address-input").each(function(index,val){
                    if(val==e.target){
                        $addressInput[0].index=index
                    }
                })

                if(!areaData[0]){
                    $.get("/Visa/area",function(json){
                        if(json.status==1){
                            var arr0=json.data

                            arr0.sort(function(a,b){
                                return a.name.length>b.name.length
                            })

                            areaData=tk.cityData=arr0
                        }else{
                            areaData=tk.cityData=[]
                        }
                        callee(e)
                    },"json")
                }else{
                    var areaId=$t.data("area"),field=$t.data("field")
                    if(!!areaId){
                        var $addressBox=$addressInput.find(".PB_address-box")
                        if(!$addressBox[0]){
                            $addressBox=$('<div class="PB_address-box"><div class="PB_address-tab"><span class="tab cur">省</span><span class="tab">市</span><span class="tab">区/县</span></div><div class="PB_address-list"></div></div>')
                            $addressInput[0].index=0
                            $addressInput[0].setList=function(id){
                                var str=""
                                for(var i= 0,len=areaData.length;i<len;i++){
                                    if(areaData[i].parent_id==id){
                                        str+='<a class="option" direction="'+areaData[i].area_id+'">'+areaData[i].name+'</a>'
                                    }
                                }
                                $addressBox.find(".PB_address-list").html(str)

                                $addressBox.find(".tab").eq($addressInput[0].index).addClass("cur").siblings().removeClass("cur")
                            }

                            $addressBox.on("click",".option",function(){
                                var $option=$(this),text=$option.text(),val=$option.attr("direction"),
                                    $input=$addressBox.parent(),field=$input.attr("field"),$field=$("input[name='"+field+"']"),
                                    $text=$input.find(".PB_address-text"),
                                    $nextAll=$input.nextAll(),$next=$input.next()

                                //set input Text
                                $text.text(text)

                                //set input Val
                                if(field&&$field[0]){
                                    $field._val(val)
                                }

                                //clearNextAllText,clearNextAllVal,clearNextAllAreaId
                                $nextAll.each(function(index,ele){
                                    var $ele=$(ele),field=$ele.attr("field"),$field=$("input[name='"+field+"']")
                                    $ele.find(".PB_address-text").text("")
                                    if(field&&$field[0]){
                                        $field._val("")
                                    }
                                    $ele.data("area","")
                                })

                                //set Next AreaId , addressBox appendTo next , set cur index
                                if($next[0]){
                                    $addressInput[0].index++
                                    $next.data("area",val)
                                    $addressBox.appendTo($next)
                                }else{
                                    $addressBox.hide()
                                }

                                //set addressBox AreaList
                                $addressInput[0].setList(val)

                                $addressInput.triggerHandler("change",[val,text])
                            })
                        }
                        $addressInput[0].setList(areaId)
                        $addressBox.appendTo($t).show()
                    }
                }
            }

        },
        mouseleave:function(e){
            $(this).find(".PB_address-box").hide()
        }
    },"[tag='addressInput'] .PB_address-input")

    /*
     * page
     * */
    $("[tag='page']").attr({"unselectable":"on","style":"-moz-user-select:none","onselectstart":"return false"})
    $("body").on({
        click:function(e){
            var $t=$(e.target)

            if($t.hasClass("pages")){
                var val=$t.data("val"),num=parseInt(val),$p=$t.parent(),$direction,$list=$p.find(".pages"),min=$list.eq(1).data("val"),max=$list.eq(-2).data("val")
                if(!$p.data("cur")){
                    $p.data("cur",num||1)
                }
                if(!num){
                    if(val=="next"){
                        num=$p.data("cur")+1
                    }else{
                        num=$p.data("cur")-1<1?1:$p.data("cur")-1;
                    }
                }
                $p.data("cur",num)

                $direction=$p.find("[data-val='"+num+"']")
                if(num>=max-3){
                    $list.eq(-2).after('<a class="pages" data-val="'+(max+1)+'">'+(max+1)+'</a>')
                    $list.eq(1).remove()
                }else if(num<=min+3){
                    if(min!=1){
                        $list.eq(-2).remove()
                        $list.eq(0).after('<a class="pages" data-val="'+(min-1)+'">'+(min-1)+'</a>')
                    }
                }
                $direction.tabClass("cur")
                $p.triggerHandler("change",[num])
            }
        }
    },"[tag='page']")

    $("body").on({
        click:function(e){
            e.preventDefault()
            var $t=$(this),href=$t.attr("href"),x=$t.attr("x")||0,y=$t.attr("y")||0
            $.scrollTo($(href),{"x":x,"y":y})
            return false
        }
    },"[tag='anchor']")

})

$(".BD_menu [href='"+window.location.pathname.match(/\/[^/]*/g)[0]+"']").tabClass("cur")

