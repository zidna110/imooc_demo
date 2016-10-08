// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//indexOf兼容处理
if(!Array.prototype.indexOf){
    Array.prototype.indexOf = function(elt /*, from*/){
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;
        for (; from < len; from++){
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}
//requestAnimationFrame
if(!window.requestAnimationFrame){
    window.requestAnimationFrame=(
        window.webkitRequestAnimationFrame||
        window.mozRequestAnimationFrame||
        function(callback){
            return window.setTimeout(callback,1000/60)
        })
}
//整数类
function intNum(configs){
    var _t=this,configs=configs||{}
    _t.val=configs.val||0
    _t.step=configs.step||1
    _t.min=configs.min||null
    _t.max=configs.max||null
    _t.add=function(){
        _t.setVal(_t.val+_t.step)
        return _t
    }
    _t.sub=function(){
        _t.setVal(_t.val-_t.step)
        return _t
    }
    _t.setVal=function(val){
        if(val){
            if(_t.min===0||_t.min){
                val=val<_t.min?_t.min:val
            }
            if(_t.max===0||_t.max){
                val=val>_t.max?_t.max:val
            }
        }else{
            val=val||_t.min||0
        }
        _t.val=val
        return _t
    }
}

window.tk={
    /*
     * 浏览器css3样式支持判断
     * @STYLE String 无前缀样式名
     *
     * */
    css3Support:function(STYLE){
        var capital=STYLE[0].toUpperCase()+STYLE.slice(1),
            arr=[STYLE,"Moz"+capital,"webkit"+capital]
        for(var i=0,len=arr.length;i<len;i++){
            if(document.body.style[arr[i]]||document.body.style[arr[i]]===""){
                return true
            }
        }
        return false
    },
    /*
     * 获取cookie
     * @NAME String cookie的关键字
     *
     * */
    getCookie:function(NAME){
        var str,cookieStr="",cookieObj={},arr0,arr1=[]
        cookieStr=window.document.cookie
        arr0=cookieStr.split("; ")||[]
        for(var i=0,len=arr0.length;i<len;i++){
            arr1=arr0[i].split("=")
            cookieObj[arr1[0]]=arr1[1]
            arr1=[]
        }
        if(cookieObj[NAME]){
            str=decodeURI(cookieObj[NAME])
        }
        return str
    },
    /*
     * 设置cookie
     * @NAME String cookie的关键字
     * @VAL String cookie的值
     * @DAY Number cookie保存时间，单位天
     *
     * */
    setCookie:function(NAME,VAL,DAY){
        var exp=new Date()
        DAY=DAY||30
        exp.setTime(exp.getTime()+DAY*24*60*60*1000)
        window.document.cookie=NAME+"="+encodeURI(VAL)+";expires="+exp.toGMTString()+";path=/"
    },
    /*
     * 对象映射
     * @send Object 被映射的对象,只支持一层映射
     * @map Array 映射列表,二维数组
     *
     * */
    mapObject:function(SEND,MAP){
        var map0=MAP[0]||[],map1=MAP[1]||[],len=map0.length>map1.length?map1.length:map0.length
        for(var i=0;i<len;i++){
            SEND[map1[i]]=SEND[map0[i]]
            delete SEND[map0[i]]
        }
        return SEND
    },
    /*
     * 计算文件大小
     * @tag Object file-input框
     *
     * */
    getFileSize:function(tag){
        var size=0
        if(tag){
            if(tag.files&&tag.files[0]){
                size=tag.files[0].size
            }else if(window.ActiveXObject){
                var path=tag.value,system=new ActiveXObject("Scripting.FileSystemObject"),file=system.GetFile(path)
                size=file.Size
            }
        }
        return size
    },
    /*
     * 获取浮动坐标
     * @ele element 浮动框指向
     * @floatEle element 浮动框
     * @kind String 纵横切换
     *      V   竖向（默认）
     *      H   横向
     *
     * */
    getFloatPosition:function(ele,floatEle,kind){
        var x=0,y=0,w=ele.offsetWidth,h=ele.offsetHeight,
            floatWidth=floatEle.offsetWidth,
            floatHeight=floatEle.offsetHeight,
            winWidth=window.document.body.clientWidth,
            winHeight=window.document.body.clientHeight
        for(;;){
            if(ele){
                x+=ele.offsetLeft-ele.scrollLeft
                y+=ele.offsetTop-ele.scrollTop

                if(ele==document.body){
                    x-=document.documentElement.scrollLeft
                    y-=document.documentElement.scrollTop
                }

                ele=ele.offsetParent
            }else{
                break;
            }
        }
        if(kind=="H"){
            if(x+w+floatWidth>winWidth){
                x=x-floatWidth
            }else{
                x=x+w
            }
            if(floatHeight>=h&&y+floatHeight>winHeight){
                y=y+h-floatHeight
            }
        }else{
            if(y+h+floatHeight<=winHeight){
                y=y+h
            }else{
                y=y-floatHeight
            }
            if(w<=floatWidth&&x+floatWidth>winWidth){
                x=x-(floatWidth-w)
                x<0&&(x=0)
            }
        }

        return {"x":x,"y":y}
    },
    /*
     * 获取居中位置
     * @ele element 居中框
     *
     * */
    getCenterPosition:function(ele){
        var x,y
        x=(ele.parentNode.offsetWidth-ele.offsetWidth)/2
        y=(ele.parentNode.offsetHeight-ele.offsetHeight)/2
        if(x<0) x=0;
        if(y<0) y=0;
        return {"x":x,"y":y}
    },
    /*
     * 验证函数
     * @send 所有字段，为对象则遍历回调自身，为string则处理
     * @verify 需验证字段
     * @callback 验证回调，传入element对象，验证结果（true:成功/false:失败），错误提示
     * @all 是否全验证 默认false不全局验证
     *
     * 数据例：
     *     send:{
     *         field1:"小明",
     *         field2:20
     *     }
     *     verify:{
     *         field1:{
     *             tip:["请输入姓名，至少6个字符！"],
     *             rule:[/\S+/,/\s{1,6}/],
     *             direction:document.body
     *         },
     *         field2:{
     *             tip:["请输入年龄，不能超过99岁！"],
     *             rule:[/\s{1,6}/],
     *             direction:document
     *         }
     *     }
     * */
    verifyField:function(configs){

        var send=configs.send,
            verify=configs.verify,
            direction=configs.direction,
            callback=configs.callback,
            all=configs.global

        if(typeof send=="object"){
            var result=true,allResult=true,all=all||false
            for(var i in verify){
                result=arguments.callee({
                    send:send[i],
                    verify:verify[i],
                    direction:direction[i],
                    callback:callback
                })

                if(!result){
                    allResult=false
                    if(!all){
                        return result;
                    }
                }
            }

            return allResult;

        }else if(typeof send=="string"){
            for(var i in verify.rule){
                var result=true,tip=verify.tip[i]||verify.tip[0]

                if(!(send.match(verify.rule[i]))){
                    result=false
                }

                callback&&callback(direction,result,tip)

                if(!result){
                    return result
                }
            }

            return true;

        }

    },

    /*
     * 获取ele区域信息
     * @ele element dom元素
     *
     * 返回
     *      element元素宽、高，基于窗体可视区域左上角x、y值
     */
    getEleArea:function(ele){
        var X=0,Y=0,pX,pY,sX,sY,width=ele.offsetWidth,height=ele.offsetHeight

        for(;;){
            if(ele.offsetParent){
                pX=ele.offsetLeft,
                    pY=ele.offsetTop,
                    ele=ele.offsetParent,
                    sX=ele.scrollLeft,
                    sY=ele.scrollTop

                //body标签特殊处理
                if(ele.tagName=="BODY"){
                    sX=sX||document.documentElement.scrollLeft
                    sY=sY||document.documentElement.scrollTop
                }

                X+=pX-sX
                Y+=pY-sY

            }else{
                break;
            }
        }

        return {"width":width,"height":height,"x":X,"y":Y}
    },
    /*
     * 获取元素基于容器的居中信息
     * @ele element dom元素
     * @wrapArea object 容器信息（容器宽、高，基于窗体可视区域左上角x、y值）
     *      {"width":width,"height":height,"x":X,"y":Y}
     *
     * 返回
     *      element元素宽、高，基于窗体可视区域的居中x、y值
     *
     */
    getEleCenterArea:function(ele,wrapArea){
        var X=0,Y=0,
            width=ele.offsetWidth,height=ele.offsetHeight,
            wX=wrap.x,
            wY=wrap.y,
            wWidth=wrap.width,
            wHeight=wrap.height

        X=(wWidth-width)/2+wX
        Y=(wHeight-height)/2+wY

        return {"width":width,"height":height,"x":X,"y":Y}
    },
    /*
     * 获取hash转换为js对象
     * */
    getPageSearch:function(){
        var obj={}
        if(window.location.search){
            var arr0=window.location.search.slice(1).split("&"),arr1

            for(var i= 0,len=arr0.length;i<len;i++){
                arr1=arr0[i].split("=")
                obj[arr1[0]]=arr1[1]
            }
        }

        return obj
    },
    /*
     * 预览file input内的图片
     *
     * return base64/url
     * */
    getPreviewImg:function(options){
        var img=null,
            allow=options.allow||[],
            fileObj=options.file,
            extention=fileObj.value.substring(fileObj.value.lastIndexOf(".")+1).toLowerCase(),
            browserVersion=window.navigator.userAgent.toUpperCase(),
            fn=options.callback||function(){}

        if(allow&allow[0]&&allow.indexOf(extention)==-1){
            //console.log("第6层：",img)
            fn(img,"仅支持"+allow+"为后缀名的文件!")
            fileObj.value=""
            if (browserVersion.indexOf("MSIE") > -1) {
                fileObj.select()
                document.selection.clear()
            }
            return false
        }

        if(fileObj.files){
            if (window.FileReader){
                var reader = new FileReader()
                reader.onload=function (e) {
                    img=e.target.result
                    //console.log("第1层：",img)
                    fn(img)
                }
                reader.readAsDataURL(fileObj.files[0])
            }else if (browserVersion.indexOf("SAFARI") > -1) {
                //console.log("第2层：",img)
                fn(img,"不支持Safari6.0以下浏览器的图片预览!")
            }
        }else if(browserVersion.indexOf("MSIE") > -1) {
            if (browserVersion.indexOf("MSIE 6") > -1) {
                img=fileObj.value
                //console.log("第3层：",img)
                fn(img)
            }else {
                fileObj.select()
                if (browserVersion.indexOf("MSIE 9") > -1){
                    fileObj.blur()
                }
                img=document.selection.createRange().text
                //console.log("第4层：",img)
                fn(img)
            }
        }else{
            img=fileObj.value
            //console.log("第5层：",img)
            fn(img)
        }

    }
}
