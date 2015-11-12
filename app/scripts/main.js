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
	circleDiams:[],
	branchs: [],
	degs: [],
	x: [],
	y: [],
	randDeg: function(){
		this.degs = [];
		for (var i=0;i<objDepth;i++){
			this.degs.push(randG(0, 360));
		}
	},
	randDepth: function(){
		objDepth = randG(2, 5);
	},
	randDiam: function() {
		this.diams = [];
		for (var i = 0; i < objDepth; i++) {
			this.diams.push(randG(10, 80));
		}
	},
	randCircleDiams: function(){
		this.circleDiams = [];
		for (var i = 0; i < objDepth; i++) {
			this.circleDiams.push(randG(5, 20));
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
	objectDatas.randDeg();
	objectDatas.randCircleDiams();
	objectDatas.randBranchs();
	objectDatas.calcX(mouseX);
	objectDatas.calcY(mouseY);
	var nextBranchs = 1;
	var circle = s.circle(mouseX, mouseY, objectDatas.circleDiams[0]);
	circle.attr({
		fill : "rgba(0,0,0,0.5)",
		stroke : "rgba(0,0,0,0)"
	})
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
			pth.attr({
				stroke : "rgba(0,0,0,0.5)"
			})
			var circle = s.circle(endX, endY, objectDatas.circleDiams[i]);
			circle.attr({
				fill : "rgba(0,0,0,0.5)",
				stroke : "rgba(0,0,0,0)"
			})
		}
	}
})
