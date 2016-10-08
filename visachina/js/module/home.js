$(function(){
    //切换搜索框
    $("#searchType").change(function(){
        var index=$(this).val()
        $(".H_search-item").eq(index).tabClass("active")
        $(".H_searchWrap .hot-search").eq(index).tabClass("active")
    })

    //搜索框保险切换
    var $sih=$(".H_search-isr-help")
    $sih.find(".tab-item .item").click(function(){
        var $t=$(this)
        $t.tabClass("active")
        $sih.find(".list-item").eq($t.index()).tabClass("active")
    })

    //签证国家、wifi地区
    $("body").on("input propertychange",".JS_inputRelated",function(){
        var $t=$(this),url=$t.data("url"),$help=$t.siblings(".H_search-help"),$val=$t.siblings("input:hidden")

        if(this.value||this.value===0){
            $.post(url,{keyword:this.value},function(json){
                if(json&&json.data){
                    var str=""
                    for(var i= 0,len=json.data.length;i<len;i++){
                        str+="<a class='item' data-id='"+(json.data[i].area_id||encodeURI(json.data[i].name))+"'>"+(json.data[i].title||json.data[i].name)+"</a>"
                    }
                    $help.html(str)
                }else{
                    $help.removeClass("active")
                }
            },"json").always(function(){
                $val.val($help.find(".item").eq(0).addClass(".hover").data("id")||"")
            })
            $help.addClass("active")
        }
    })
    $("body").on({
        keydown:function(e){
            var $t=$(this),
                $help=$t.siblings(".H_search-help"),
                $item=$help.find(".item"),
                $hover=$help.find(".hover"),
                index=$hover.index(),
                max=$item.length-1
            if($help.hasClass("active")){
                if(e.which==13){
                    e.preventDefault()
                    $hover.trigger("click")
                }else{
                    if(e.which==38){
                        e.preventDefault()
                        index=index-1
                        index<0?index=max:index
                    }else if(e.which==40){
                        e.preventDefault()
                        index=index+1
                        index>max?index=0:index
                    }
                    $help.scrollTop(index*35)
                    $item.eq(index).tabClass("hover")
                }
            }
        },
        click:function(e){
            e.stopPropagation()
        }
    },".JS_inputRelated")

    $(".H_search-help").on("click",".item",function(e){
        var $t=$(this),$help=$t.parent(),$val=$help.siblings("input:hidden"),$text=$help.siblings("input:text")
        $val.val($t.data("id"))
        $text.val($t.text())
    })

    $("body").on({
        mouseenter:function(e){
            var $t=$(this),
                $val=$t.find("input:hidden"),
                $text=$t.find("input:text"),
                $help=$t.find(".H_input-drop"),
                $tar=$(e.target)

            $t.data("mouseTag",true)

            if($help.html()==""&&$help.hasClass("H_accepted-help")){
                $.post("/index/index/getProvince",function(data){
                    if(data&&data.rows&&data.rows[0]){
                        var str="",arr=data.rows
                        arr.sort(function(a,b){
                            return a.name.length>b.name.length
                        })
                        for(var i= 0,len=arr;i<arr.length;i++){
                            str+="<a class='item' data-id='"+arr[i].id+"'>"+arr[i].name+"</a>"
                        }
                        $help.html(str)
                    }
                },"json").always(function(){
                    if($help.html() && $t.data("mouseTag")){
                        $help.addClass("active")
                        console.log(1)
                    }
                })
            }else{
                $help.addClass("active")
                console.log(3)
            }
        },
        mouseleave:function(e){
            var $t=$(this),
                $help=$t.find(".H_input-drop")

            $t.data("mouseTag",false)

            $help.removeClass("active")
            console.log(2)
        },
        click:function(e){
            e.stopPropagation()
        }
    },".JS_visa_sId")

    $(".JS_visa_sId").on("click",".item",function(){
        var $t=$(this),
            $help=$t.parent(),
            $val=$help.siblings("input:hidden"),
            $text=$help.siblings("input:text")

        $val.val($t.data("id"))
        $text.val($t.text())
        $t.tabClass("hover")
        $help.removeClass("active")
    })

    $("body").click(function(){
        $(".JS_inputRelated").siblings(".H_search-help").removeClass("active")
        $(".H_accepted-help").removeClass("active")
    })
})
function notice () {
    
  var contentHtml = "<p class='notice-title'>通知公告</p><p class='notice-info'>致各位亲爱的同业：中国签证网国庆节假期休假时间10月1日—10月8日，放假期间平台只支持自助下单，所有进度跟踪节后进行，感谢大家的配合！</p>;"
    index = layer.open({
    content:contentHtml,
    type:1,
    title:false,
    shadeClose:true,
    btn:false,
    closeBtn:true,
    cancel: function(){ 
        var url = "/Wifi/setTips"
        $.ajax({
            type: "GET",
            url: url
        });
    }
  } );
  layer.style(index, {
    width: '500px',
    height: '250px',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: 'auto',
    textAlign: 'center',
    lineHeight: '100px'
  });
}

function tips() {
   
    var url = "/Wifi/isTip"

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function(data){
            if (data.status == 0 ) {
                notice();
            }   
        }
    });
}
tips();
