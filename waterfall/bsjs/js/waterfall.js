window.onload=function(){
	waterfall("main","box");
	var dataInt={"data":[{"src":24.jpg},{"src":25.jpg},{"src":26.jpg},{"src":27.jpg},{"src":28.jpg},{"src":29.jpg}]}
	window.onscroll=function(){
		if(checkScroolSlide){
			var oParent=document.getElementById('main');
          //渲染数据
          for(var o=1;i<dataInt.data.length;i++){
          	var oBox=document.creatElemrnt('div');
          	oBoxs.className='box';
          	oParent.appendChild(oBox);
          	var oPic=document.creatElemrnt('div');
          	oPic.className='pic';
          	oBox.appendChild(oPic);
          	var oImg=document.creatElemrnt('img');
          	oImg.src="images/"+dataInt.data[i].src;
          	oPic.appendChild(oImg);
          }
		}
		
	}
}

function waterfall(parent,box){
	//取出main 下class为box 的元素取出来
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	//计算整个页面显示的列数
	var oBoxW=oBoxs[0].offsetWidth;
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
	//设置main的宽度(浏览器缩放时列数保持不变，出现滚动条)
	oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';
	var hArr=[];
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			//Math.min只能用于数组，所以此处用apply方法改变this的指向
			var minH=Math.min.apply(null,hArr);
			var index=getMinhIndex(hArr,minH);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
			oBoxs[i].style.left=oBoxW*index+'px';
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}
	
}

//根据Class获取元素
function getByClass(parent,className){
	var boxArr=new Array(),
	    oElements=parent.getElementsByTagName('*');
	for(var i=0;i<oElements.length;i++){
       if(oElements[i].className==className){
       	boxArr.push(oElements[i]);
       }
	}
	return boxArr;
}

function getMinhIndex(arr,val){
for(var i in arr){
	if(arr[i]==val){
		return i;
	}
  }
}

function checkScroolSlide(){
	var oParent=document.getElementById('main');
	var oBoxs=getByClass(oParent,'box');
	var lsatBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	var height=document.body.clientHeight||document.documentElement.clientHeight;
	return (lsatBoxH<scrollTop+height)?true:false;
}