/* Growing Tree
 * Planted by Hongru, http://elseif.me
 * Trimmed by c9h10n2o in 2012.5, http://sometime.me
 */
 
define(function() {

	//var randColor = 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';
	var randColor = 'rgba(0,0,0,.02)';
    // node structor
    var Node = function (cvs) {
        this.getParams(cvs);
        
        this.x = 0;
        this.y = this.cvsH;
        this.r = 10;
        this.speed = this.cvsW/300;
        this.fillStyle = randColor;
        this.shadowColor = randColor;   
        this.shadowBlur = 2;
        this.life = 0;
        this.gen = 0;
        this.ag = Math.PI/2;
        this.dis = 0;
        this.totalDis = 0;
    }
    Node.prototype = {
        getParams: function (cvs) {
            this.cvs = cvs;
            this.ctx = cvs.getContext('2d');
            this.cvsW = cvs.width || cvs.offsetWidth;
            this.cvsH = cvs.height || cvs.offsetHeight;
            //console.log(this.cvsH)
        },
        next: function () {
            this.draw();
            this.loop();
            this.split();
            this.stop();
        },
        draw: function () {
            var ctx = this.ctx;
            ctx.save();
            ctx.fillStyle = this.fillStyle;
            ctx.shadowColor = this.shadowColor;
            ctx.shadowBlur = this.shadowBlur;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, true);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
        loop: function () {
            var ox = this.x, oy = this.y;d = Math.sqrt(Math.abs(ox-this.x)+Math.abs(oy-this.y));
            this.x += this.speed * Math.cos(this.ag)*1.5;
            this.y -= this.speed * Math.sin(this.ag);
            var d = Math.sqrt(Math.abs(ox-this.x)+Math.abs(oy-this.y));
            this.r *= (.99 - this.gen/200);
            this.totalDis += d;
            this.dis += d;
            //console.log(d);
            if (this.speed > this.r*2) this.speed = this.r*2;
            this.ag += Math.random()/5 - .1;
        },
        split: function () {
            var s = 0;
            if (this.gen == 0) s = (this.dis-this.cvsH/5)/100;
            else if (this.gen < 3) s = (this.dis-this.cvsH/10)/100;
            
            if (Math.random() < s) {
                var n = 2+Math.round(Math.random()*2);
                for (var i=0; i<n; i++) {
                    var node = new Node(this.cvs);
                    node.x = this.x;
                    node.y = this.y;
                    node.ag = this.ag;
                    node.speed = this.speed;
                    node.r = this.r*.9;
                    node.gen = this.gen + .5;
                    node.fillStyle = this.fillStyle;
                    node.shadowColor = this.shadowColor;
                    node.shadowBlur = this.shadowBlur;
                    node.totalDis = this.totalDis;
                    this.list.add(node);
                }
                this.list.remove(this);
            }
        },
        stop: function () {
            if (this.r < .2) this.list.remove(this);
        }
    }
    
    // node list structor
    var NodeList = function () {
        this.nodes = [];
        this.next = function () {
            for (var i=0; i<this.nodes.length; i++) {
                var node = this.nodes[i];
                this.nodes[i] && this.nodes[i].next();
            }
        };
        this.add = function (node) {
            this.nodes.push(node);
            node.list = this;
        };
        this.remove = function (node) {
            for (var i=0; i<this.nodes.length; i++) {
                if (this.nodes[i] == node) this.nodes.splice(i, 1);
            }
        };
    }
    
    var createCanvas = function () {
    	var c = document.createElement('canvas');
    	if (typeof G_vmlCanvasManager != 'undefined') G_vmlCanvasManager.initElement(c);
    	return c;
    }
    
    // main function
    var canvas = createCanvas();
    if (canvas.getContext) {
    	canvas.className = 'tree';
        document.body.appendChild(canvas);

        ctx = canvas.getContext('2d');
        canvas.width = 600;
        canvas.height= 400;
        
        var num = 2+Math.round(Math.random()*3),
            initR = canvas.width/20,
            tree = new NodeList();
        for (var i=0; i<num; i++) {
            var node = new Node(canvas);
            node.x = canvas.width + 40;
            node.r = initR;
            tree.add(node);
        }
        var timer = setInterval(function () {
            tree.next();
    if (tree.nodes.length == 0) clearInterval(timer);
        }, 10);
    }
    
});
