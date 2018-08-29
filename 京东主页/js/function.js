function sameSign(a, b){                      
	return (a ^ b) >= 0                // a b符号相同
}

//定义向量，向量的定义就是终点的坐标减去起点的坐标
function vector(a, b) {
	return{
		x:b.x-a.x,
		y:b.y-a.y
	}
}

//向量的叉乘公式。v1.x：向量1的X坐标，v2.y:向量2的Y坐标
function vectorProduct(v1 , v2) {
	return v1.x * v2.y - v2.x * v1.y
}

function isPointInTrangle(p,a,b,c) {
	var pa = vector(p,a)                    //得到向量pa pb pc
	var pb = vector(p,b)
	var pc = vector(p,c)

	var t1 = vectorProduct (pa,pb)			//得到叉乘结果
	var t2 = vectorProduct (pb,pc)
	var t3 = vectorProduct (pc,pa)
 
	return sameSign(t1,t2)  && sameSign(t2,t3)
}

//是否需要延时  如果p点在三角形内 则需要
function needDelay (elem, leftCorner, currMousePos) {
	var offset = elem.offset()                         //通过Jq的offset方法获取二级菜单上下边缘的坐标

	var topLeft = {									  //二级菜单上下边缘即为三角形另外两个顶点
		x:offset.left,
		y:offset.top
	}

	var bottomLeft = {
		x:offset.left,
		y:offset.top + elem.height()
	}

	return isPointInTrangle(currMousePos,leftCorner,topLeft,bottomLeft)
}