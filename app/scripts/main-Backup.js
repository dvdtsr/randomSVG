

var pth = s.path("M 530 , 757 L 513.5 , 728.4211616751136 ");
var pth = s.path("M 530 , 757 L 513.5 , 785.5788383248864 ");
var pth = s.path("M 530 , 757 L 563 , 757 ");

var pth = s.path("M 513.5 , 728.4211616751136 L 494.5 , 695.512196331305 ");
var pth = s.path("M 513.5 , 728.4211616751136 L 494.5 , 761.3301270189222 ");
var pth = s.path("M 513.5 , 728.4211616751136 L 551.5 , 728.4211616751136 ");

var pth = s.path("M 513.5 , 785.5788383248864 L 494.5 , 752.6698729810778 ");
var pth = s.path("M 513.5 , 785.5788383248864 L 494.5 , 818.487803668695 ");
var pth = s.path("M 513.5 , 785.5788383248864 L 551.5 , 785.5788383248864 ");

var pth = s.path("M 563 , 757 L 544 , 724.0910346561914 ");
var pth = s.path("M 563 , 757 L544 , 789.9089653438086 ");
var pth = s.path("M 563 , 757 L 601 ,757 ");






// CA MARCHE 0_o

//SET SVG FRAME AND VIEWPORT SIZES EQUAL TO WINDOW
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var s = Snap("#svg_background");
s.attr({
	width: windowWidth + "px",
	height: windowHeight + "px",
	viewBox: "0 0" + " " + windowWidth + " " + windowHeight
});
//CUSTOMIZABLE RAND FUN
function randG(a, b) {
		a = typeof a !== "undefined" ? a : 1;
		b = typeof b !== "undefined" ? b : 10;
		var x = Math.floor(Math.random() * (b - a)) + a;
		return x;
	}
//SPECIFIC RAND FUN FOR BRANCHS POPULATION
function randBranchs() {
	var x = randG(3, 9);
	if (x % 2 == 0) {
		var x = x + 1;
		return x;
	} else {
		return x;
	}
};
var objDepth = 0;

var objectDatas = {
	diams: [],
	branchs: [],
	x: [],
	y: [],
	randDepth: function(){
		objDepth = randG(3, 3);
	},
	randDiam: function() {
		this.diams = [];
		for (var i = 0; i < objDepth; i++) {
			this.diams.push(randG(10, 80));
		}
	},
	randBranchs: function() {
		this.branchs = [1];
		for (var i = 0; i < objDepth; i++) {
			this.branchs.push(randBranchs());
		}
	},
	calcX: function(x) {
		this.x[0] = [x];
		var allBranchs = objectDatas.branchs[0];
		var deg = 360;
		for(var i=0;i<objDepth;i++){
			this.x[i+1] = [];
			for(var j=0;j<allBranchs;j++){
				for(var k=0;k<this.branchs[i+1];k++){
					var deg = deg - (360 / this.branchs[i+1]);
					var coo = this.x[i][j] + this.diams[i] * Math.cos(deg * Math.PI / 180);
					this.x[i + 1].push(coo);
				}
				deg = 360;
			}
			allBranchs *= this.branchs[i + 1];
		}
	},
	calcY: function(y) {
		this.y[0] = [y];
		var allBranchs = objectDatas.branchs[0];
		var deg = 360;
		for(var i=0;i<objDepth;i++){
			this.y[i+1] = [];
			for(var j=0;j<allBranchs;j++){
				for(var k=0;k<this.branchs[i+1];k++){
					var deg = deg - (360 / this.branchs[i+1]);
					var coo = this.y[i][j] + this.diams[i] * Math.sin(deg * Math.PI / 180);
					this.y[i + 1].push(coo);
				}
				deg = 360;
			}
			allBranchs *= this.branchs[i + 1];
		}
	}
}

$("#svg_background").click(function(){
	var mouseX = event.clientX;
	var mouseY = event.clientY;
	objectDatas.randDepth();
	objectDatas.randDiam();
	objectDatas.randBranchs();
	objectDatas.calcX(mouseX);
	objectDatas.calcY(mouseY);
	var nextBranchs = 1;
	for(var i=0;i<objDepth;i++){
		var ratio = objectDatas.branchs[i+1];
		var oXY = 0;
		nextBranchs *= objectDatas.branchs[i+1];
		var startX = objectDatas.x[i][oXY];
		var startY = objectDatas.y[i][oXY];
		for(var j=0;j< nextBranchs;j++){
			if(j>=ratio){
				oXY += 1;
				startX = objectDatas.x[i][oXY];
				startY = objectDatas.y[i][oXY];
				ratio += objectDatas.branchs[i+1];
			}
			var endX = objectDatas.x[i+1][j];
			var endY = objectDatas.y[i+1][j];
			var pth = s.path("M" + startX + "," + startY + " L" + endX + "," + endY);
		}
	}
})




//BELOWBACKUP, ca avance, probleme lors créa PATH (set clic)
//SET SVG FRAME AND VIEWPORT SIZES EQUAL TO WINDOW
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var s = Snap("#svg_background");
s.attr({
	width: windowWidth + "px",
	height: windowHeight + "px",
	viewBox: "0 0" + " " + windowWidth + " " + windowHeight
});
//CUSTOMIZABLE RAND FUN
function randG(a, b) {
		a = typeof a !== "undefined" ? a : 1;
		b = typeof b !== "undefined" ? b : 10;
		var x = Math.floor(Math.random() * (b - a)) + a;
		return x;
	}
//SPECIFIC RAND FUN FOR BRANCHS POPULATION
function randBranchs() {
	var x = randG(3, 9);
	if (x % 2 == 0) {
		var x = x + 1;
		return x;
	} else {
		return x;
	}
};
var objDepth = 0;

var objectDatas = {
	diams: [],
	branchs: [],
	x: [],
	y: [],
	randDepth: function(){
		objDepth = randG(3, 3);
	},
	randDiam: function() {
		this.diams = [];
		for (var i = 0; i < objDepth; i++) {
			this.diams.push(randG(10, 80));
		}
	},
	randBranchs: function() {
		this.branchs = [1];
		for (var i = 0; i < objDepth; i++) {
			this.branchs.push(/*randBranchs()*/3);
		}
	},
	calcX: function(x) {
		this.x[0] = [x];
		var allBranchs = objectDatas.branchs[0];
		var deg = 360;
		for(var i=0;i<objDepth;i++){
			this.x[i+1] = [];
			for(var j=0;j<allBranchs;j++){
				for(var k=0;k<this.branchs[i+1];k++){
					var deg = deg - (360 / this.branchs[i+1]);
					var coo = this.x[i][j] + this.diams[i] * Math.cos(deg * Math.PI / 180);
					this.x[i + 1].push(coo);
				}
				deg = 360;
			}
			allBranchs *= this.branchs[i + 1];
		}
	},
	calcY: function(y) {
		this.y[0] = [y];
		var allBranchs = objectDatas.branchs[0];
		var deg = 360;
		for(var i=0;i<objDepth;i++){
			this.y[i+1] = [];
			for(var j=0;j<allBranchs;j++){
				for(var k=0;k<this.branchs[i+1];k++){
					var deg = deg - (360 / this.branchs[i+1]);
					var coo = this.y[i][j] + this.diams[i] * Math.sin(deg * Math.PI / 180);
					this.y[i + 1].push(coo);
				}
				deg = 360;
			}
			allBranchs *= this.branchs[i + 1];
		}
	}
}

$("#svg_background").click(function(){
	var mouseX = event.clientX;
	var mouseY = event.clientY;
	objectDatas.randDepth();
	objectDatas.randDiam();
	objectDatas.randBranchs();
	objectDatas.calcX(mouseX);
	objectDatas.calcY(mouseY);
	debugger
	var allBranchs = objectDatas.branchs[1];
	for (var i = 0; i < objDepth; i++) {
		for (var j = 0; j < allBranchs; j++) {
			var endX = objectDatas.x[i + 1][j];
			var endY = objectDatas.y[i + 1][j];
			for (var k = 0; k < allBranchs / objectDatas.branchs[i]; k++) {
				var originX = objectDatas.x[i][k];
				var originY = objectDatas.y[i][k];
				var pth = s.path("M" + originX + "," + originY + " L" + endX + "," + endY);
				pth.attr({
					strokeWidth: 1
				})
			}
		}
		allBranchs *= objectDatas.branchs[i + 1];
	}
})

























// BELOW BACKUP QUI MARCHE MAIS PAS COMME PREVU


//SET SVG FRAME AND VIEWPORT SIZES EQUAL TO WINDOW
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var s = Snap("#svg_background");
s.attr({
	width: windowWidth + "px",
	height: windowHeight + "px",
	viewBox: "0 0" + " " + windowWidth + " " + windowHeight
});
//CUSTOMIZABLE RAND FUN
function randG(a, b) {
		a = typeof a !== "undefined" ? a : 1;
		b = typeof b !== "undefined" ? b : 10;
		var x = Math.floor(Math.random() * (b - a)) + a;
		return x;
	}
//SPECIFIC RAND FUN FOR BRANCHS POPULATION
function randBranchs() {
	var x = randG(3, 9);
	if (x % 2 == 0) {
		var x = x + 1;
		return x;
	} else {
		return x;
	}
};


var objDepth = randG(2,4);

var objectDatas = {
	diams : [],
	branchs : [1],
	x : [],
	y : [],
	randDiam : function(){
		this.diams = [];
		for(var i=0;i<objDepth;i++){
			this.diams.push(randG(10,80));
		}
	},
	randBranchs : function(){
		this.branchs = [];
		for(var i=0;i<objDepth;i++){
			this.branchs.push(randBranchs());
		}
	},
	calcX : function(){
		this.x[0] = [randG(0, windowWidth)];
		var i0 = 0;
		var i1 = 0;
		var iterations = 1;
		for(var i=0;i<objDepth;i++){
			iterations *= this.branchs[i+1];
			if(i<objDepth-1){
				this.x[i+1] = [];
			}
			for (var j = 0; j < iterations; j++) {
				var deg = (360 / this.branchs[i])*(j+1);
				var coo = this.x[i0][i1] + this.diams[i] * Math.cos(deg * Math.PI / 180);
				this.x[i+1].push(coo);
			}
		i1 += 1;
		i0 += 1;
		}
	},
	calcY : function(){
		this.y[0] = [randG(0, windowHeight)];
		var i0 = 0;
		var i1 = 0;
		var iterations = 1;
		for(var i=0;i<objDepth;i++){
			iterations *= this.branchs[i+1];
			if(i<objDepth-1){
				this.y[i+1] = [];
			}
			for(var j=0;j< iterations;j++){
				var deg = (360 / this.branchs[i]) * (j + 1);
				var coo = this.y[i0][i1] + this.diams[i] * Math.sin(deg * Math.PI / 180);
				this.y[i+1].push(coo);
			}
		i1 += 1;
		i0 += 1;
		}
	}
}


function testIt(){
	console.log("objectDatas.x = "+objectDatas.x+"  || objDepth = "+objDepth+"  || objectDatas.branchs = "+objectDatas.branchs);
	objectDatas.randDiam();
	objectDatas.randBranchs();
	objectDatas.calcX();
	objectDatas.calcY();
	debugger;
	var allBranchs = objectDatas.branchs[0];
	for (var i=0;i<objDepth;i++){
		if(i>objDepth-1){
			return
		}
		else{
			for (var j=0;j< allBranchs;j++){
				var endX = objectDatas.x[i+1][j];
				var endY = objectDatas.y[i+1][j];
				for(var k=0;k<allBranchs/objectDatas.branchs[i];k++){
					var originX = objectDatas.x[i][k];
					var originY = objectDatas.y[i][k];
					var pth = s.path("M" + originX + "," + originY + " L" + endX + "," + endY);
					pth.attr({
						strokeWidth:5
					})
				}
			}
			allBranchs *= objectDatas.branchs[i+1];
		}
	}
}






// BELOW , PREMIER BACKUP

//SET SVG FRAME AND VIEWPORT SIZES EQUAL TO WINDOW
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var s = Snap("#svg_background");
s.attr({
	width: windowWidth + "px",
	height: windowHeight + "px",
	viewBox: "0 0" + " " + windowWidth + " " + windowHeight
});
//CUSTOMIZABLE RAND FUN
function randG(a, b) {
		a = typeof a !== "undefined" ? a : 1;
		b = typeof b !== "undefined" ? b : 10;
		var x = Math.floor(Math.random() * (b - a)) + a;
		return x;
	}
//SPECIFIC RAND FUN FOR BRANCHS POPULATION
function randBranchs() {
	var x = randG(3, 9);
	if (x % 2 == 0) {
		var x = x + 1;
		return x;
	} else {
		return x;
	}
};
var xA = "";
var yA = "";
var diam = "";
var branchPops = "";
var nestedDatasX = [];
var nestedDatasY = [];

var branch = {
		edge: randG(2,7),
		endCircle: randG(10, 40),
		endX: function(f) {
			//nestedDatasX = []; INIT ARRAY ?
			for (var i = 0; i < branchPops; i++) {
				var deg = (360 / branchPops) * (i + 1);
				nestedDatasX.push(xA + (diam[0]+diam[1]) * Math.cos(deg * Math.PI / 180));
			}
			return nestedDatasX[f];
		},
		endY: function(f) {
			//nestedDatasY = []; INIT ARRAY ?
			for (var i = 0; i < branchPops; i++) {
				var deg = (360 / branchPops) * (i + 1);
				nestedDatasY.push(yA + (diam[0]+diam[1]) * Math.sin(deg * Math.PI / 180));
			}
			return nestedDatasY[f];
		}
	}
function createSVG() {
	branchPops = randBranchs();
	xA = randG(0, windowWidth);
	yA = randG(0, windowHeight);
	diam = [randG(10, 80), randG(50, 120)];
      var depth = randG(1, 4);
	var circle = s.circle(xA, yA, diam[0]);
	for (var i=0;i < depth;i++){
		createBranchs();
	}
}

function createBranchs(x,y,d){
	for (var i = 0; i < branchPops; i++) {
		var pathC = s.path("M" + xA + "," + yA + " L" + branch.endX(i) + "," + branch.endY(i));
		pathC.attr({
			strokeWidth:branch.edge
		});
		var circle = s.circle(branch.endX(i), branch.endY(i), branch.endCircle);
	}
}

createSVG();


/*BACKUP BELOW
//SET SVG FRAME AND VIEWPORT SIZES EQUAL TO WINDOW
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var s = Snap("#svg_background");
s.attr({
  width : windowWidth+"px",
  height : windowHeight+"px",
  viewBox : "0 0"+ " " +windowWidth+" "+windowHeight
});
//CUSTOMIZABLE RAND FUN
function randG(a,b){
  a = typeof a !== "undefined" ? a : 1;
  b = typeof b !== "undefined" ? b : 10;
  var x = Math.floor(Math.random() * (b - a)) + a;
  return x;
}
//SPECIFIC RAND FUN FOR BRANCHS POPULATION
function randBranchs(){
  var x = randG(3,9);
  if(x%2==0){
    var x = x +1;
    return x;
  }
  else{
    return x;
  }
};
function createSvgObject(xA,yA,branchs,diam){
  xA = typeof xA !== "undefined" ? xA : randG(0, windowWidth);
  yA = typeof yA !== "undefined" ? yA : randG(0, windowHeight);
  branchs = typeof branchs !== "undefined" ? branchs : randBranchs();
  diam = typeof diam !== "undefined" ? diam : randG(10,80);
  var depth = randG(1,4);
  var circle = s.circle(xA, yA, diam);//creation circle
  console.log("objet de depth : "+depth);
  console.log("nombre  branches : "+branchs);
  for(var j=0;j<depth;j++){// ITERATION DEPTH
    console.log("itération n° : "+j);
    var deg = 360/branchs;
    var outerDiam = diam+randG(10,50);
    var pathStrokeWidth = randG(5,10);
    var newDeg = deg+randG(10,90);
    var diam = diam - (randG(5,(diam-10)));
    for(var i=0;i<branchs;i++){// BRANCHS CREATION
      var newBranchs = randBranchs();
      var endX = xA + outerDiam*(Math.cos(newDeg*Math.PI/180));
      var endY = yA + outerDiam*(Math.sin(newDeg*Math.PI/180));
      var circlePath = s.path("M"+xA+","+yA +" L"+endX+","+endY);
      var circle = s.circle(endX, endY, diam);//creation circle
      newDeg = newDeg+deg;
      circlePath.attr({
        strokeWidth:pathStrokeWidth,
        strokeLinecap: "round"
      })
    }
  }
};
createSvgObject();
*/
