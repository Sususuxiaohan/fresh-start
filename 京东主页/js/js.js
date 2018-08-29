//焦点图
//通过class获取元素
function getByClass(oParent,sClass) 
{
	var aEle=document.getElementsByTagName('*');
	var aResult=[];

	for (var i = 0; i < aEle.length; i++) 
	{
		if (aEle[i].className===sClass)
		{
			aResult.push(aEle[i]);
		}
	}

	return aResult;
}

var oDiv=document.getElementById('picBox');

var oDivImg=getByClass(oDiv,'pic')[0];
var oUl=oDivImg.getElementsByTagName('ul')[0];
var aLi=oDivImg.getElementsByTagName('li');
var oPrev=getByClass(oDiv,'prev')[0];
var oNext=getByClass(oDiv,'next')[0];

var aBtn=getByClass(oDiv,'slider_indicators_btn');    

//getByclass函数  无法选取简写的class 即class="slider_indicators_btn slider_indicators_btn_active" 

var now=0;

aBtn[0].className='slider_indicators_btn'+' '+'slider_indicators_btn_active';

function tab()
{   
	for (var i = 0; i < aLi.length; i++) 
	{
		startMove(aLi[i],'opacity',0); 

		aBtn[i].className='slider_indicators_btn';
	}

	startMove(aLi[now],'opacity',100); 

	//下面的圆点跟随图片自动切换
	aBtn[now].className='slider_indicators_btn'+' '+'slider_indicators_btn_active';
}

//prev next按钮移入移出 淡入淡出
oPrev.onmouseover=function()
{
	startMove(oPrev,'opacity',100);
}
oNext.onmouseover=function()
{
	startMove(oNext,'opacity',100);
}

oPrev.onmouseout=function()
{
	startMove(oPrev,'opacity',60);
}
oNext.onmouseout=function()
{
	startMove(oNext,'opacity',60);
}

//点击prev next切换图片
oPrev.onclick=function()
{
	now--;
	
	if (now==-1) 
	{
		now=aLi.length-1;                 
	}
				
	tab();
}
oNext.onclick=function()
{
	now++;
	
	if (now==aLi.length) 
	{
		now=0;                   
	}

	for (var i = 0; i < aLi.length; i++) 
	{
		startMove(aLi[i],'opacity',0);
	}
	
	tab();
}

//开启定时器 自动播放
var timer=setInterval(oNext.onclick,3000) ;      //顺序很重要 调用的函数要存在 所以必须放在调用函数的后面

//整个div移入移出 开关定时器
oDiv.onmouseover=function()                          
{
	clearInterval(timer);
}
oDiv.onmouseout=function()
{
	timer=setInterval(oNext.onclick,3000);
}

//鼠标移入btn  图片跟随变化
for (var i = 0; i < aBtn.length; i++) 
{
	aBtn[i].index=i;

	aBtn[i].onmouseover=function()
	{
		if (this.index==now) 
		{
			return;
		}
		else
		{
			now=this.index;
		}

		aBtn[this.index].className='slider_indicators_btn'+' '+'slider_indicators_btn_active';

		tab();
	}
}








//移动焦点图

// function getByClass(oParent,sClass) 
// {
// 	var aEle=document.getElementsByTagName('*');
// 	var aResult=[];

// 	for (var i = 0; i < aEle.length; i++) 
// 	{
// 		if (aEle[i].className===sClass)
// 		{
// 			aResult.push(aEle[i]);
// 		}
// 	}

// 	return aResult;
// }

// var oDiv=document.getElementById('picBox');

// var oDivImg=getByClass(oDiv,'pic')[0];
// var oUl=oDivImg.getElementsByTagName('ul')[0];
// var aLi=oDivImg.getElementsByTagName('li');

// var now=1;

// function tab()                                              
// 		{        
// 			for (var i = 0; i < aLi.length; i++)        
// 			{
// 				aLi[i].style.opacity=0;
// 			}   

// 			startMove(aLi[now],'opacity',100); 

// 			if (now==0)                                                        //第0个图片时不动
// 			{
// 				startMove(oUl,'left',0);
// 			} 
// 			else if (now==aLi.length-1)				                           //最后一个图片时的位置
// 			{
// 				startMove(oUl,'left',-(now)*aLi[0].offsetWidth);
// 			}
// 			else
// 			{
// 				startMove(oUl,'left',-(now)*aLi[0].offsetWidth);   
// 			}

// 			now++;  
// 		}

// var timer=setInterval(function(){
		
// 		if (now==aLi.length) 
// 		{
// 			now=0;
// 		}

// 	tab();

// },3000)

//移动焦点图结束


//主体-4
var oNews=document.getElementById('news');
var oNewsFirst=getByClass(oNews,'mod_tab_head_item')[0];
var oNewsLast=getByClass(oNews,'mod_tab_head_item')[1];

// 主体-4 下方移动短红线
var oNewsLine=getByClass(oNews,'news_tab_active')[0];

// 显示隐藏促销公告内容
var oNewsContentFirst=getByClass(oNews,'mod_tab_content_item')[0];
var oNewsContentLast=getByClass(oNews,'mod_tab_content_item')[1];

oNewsLast.onmouseover=function ()
{
	oNewsLine.style.transform='translateX(54px)';
	oNewsContentLast.style.display='block';
	oNewsContentFirst.style.display='none';
}
oNewsFirst.onmouseover=function ()
{
	oNewsLine.style.transform='translateX(0)';
	oNewsContentFirst.style.display='block';
	oNewsContentLast.style.display='none';
}

