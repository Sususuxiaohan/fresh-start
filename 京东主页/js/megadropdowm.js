$(document).ready(function(){
	var sub = $('#sub');

	var activeRow;
	var activeMenu;

	var timer;

	var mouseInSub = false;

	sub.on('mouseenter',function(e){                     //判断鼠标是否在二级菜单
		mouseInSub = true;
	}).on('mouseleave',function(e){
		mouseInSub = false;
	})

	var mouseTrack = [];                             //数组跟踪记录鼠标位置

	//在movehandler里面通过e，也就是事件对象，它的page x 和page y属性来获取当前鼠标相对于页面的坐标
	var moveHandler = function (e) {  
		mouseTrack.push({
			x:e.pageX,
			y:e.pageY
		})

		//计算的时候只需要当前的位置和上一次的位置，所有数组只让它保存有限的信息即可
		if(mouseTrack.length>3){
			mouseTrack.shift();
		}
	}

	$('#test')
	.on('mouseenter', function(e) {
	 	sub.removeClass('none');

	 	$(document).bind('mousemove',moveHandler);     //给document绑定mousemove事件,获得鼠标指针在页面中的位置
	})                                                 //这里不能加; 

	.on('mouseleave', function(e) { 
		sub.addClass('none');

	 	if (activeRow) {
	 		activeRow.removeClass('active');
	 		activeRow = null;
	 	}

	 	if (activeMenu) {
	 		activeMenu.addClass('none');
	 		activeMenu = null;
	 	}

	 	//鼠标离开菜单时，需要对绑定在document上的mousemove事件进行解绑，以免影响到页面其他的组件
	 	$(document).unbind('mousemove', moveHandler);
	})

	//给一级菜单每个列表项绑定事件，这里并不是选中所有列表项然后循环进行绑定，而是采用事件代理的方式，主要运用到事件冒泡的特性
	.on('mouseenter','li',function(){  　
	 	if (!activeRow) {
	 		activeRow = $(this).addClass('active');
	 		activeMenu = $('#' + activeRow.data('id'));
	 		activeMenu.removeClass('none');
	 		return
	 	}
   
	 	if (timer) {                					 //debounce去抖技术 在事件被频繁触发时，只执行最后一次处理
	 		clearTimeout(timer);
	 	}

	 	var currMousePos = mouseTrack [mouseTrack.length - 1];     //鼠标当前的坐标  即三角形内的P点

	 	var leftCorner = mouseTrack [mouseTrack.length - 2];       //鼠标上一次坐标  即三角形的一个顶点a

	 	var delay = needDelay(sub, leftCorner, currMousePos);

	 	if (delay) {                                               //如果在三角形内 就开启定时器
	 		timer = setTimeout(function(){                   
		 		if (mouseInSub) {
		 			return
		 		}

			 	activeRow.removeClass('active');
				activeMenu.addClass('none');

				activeRow = $(this);
				activeRow.addClass('active');
				activeMenu = $('#' + activeRow.data('id'));
				activeMenu.removeClass('none');

				timer = null;

			},300)
	 	} 
	 	else{                                                      //如果不在内部  就直接隐藏显示
	 		var prevActiveRow = activeRow;
	 		var prevActiveMenu = activeMenu;

	 		activeRow = $(this);
	 		activeMenu = $('#' + activeRow.data('id'));

	 		prevActiveRow.removeClass('active');
	 		prevActiveMenu.addClass('none');

	 		activeRow.addClass('active');
	 		activeMenu.removeClass('none');
	 	}
	})
})