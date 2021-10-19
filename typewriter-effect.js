// Code obtained from CSS-Tricks, then adapted and optimised
// https://css-tricks.com/snippets/css/typewriter-effect/

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.commonTxt = '';
    this.fullTxt = this.toRotate[0];
    this.isDeleting = false;
    this.tick();

};

TxtType.prototype.tick = function() {

    if (this.isDeleting) {
        this.txt = this.commonTxt + this.fullTxt.substring(this.commonTxt.length, this.txt.length - 1);
    } else {
        this.txt = this.commonTxt + this.fullTxt.substring(this.commonTxt.length, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === this.fullTxt) {
        var i = (this.loopNum+1) % this.toRotate.length;
        var futureTxt = this.toRotate[i];
        this.commonTxt='';
        for(var i=0; i<Math.min(futureTxt.length,this.fullTxt.length); i++){
            if(futureTxt[i] === this.fullTxt[i]) 
                this.commonTxt += futureTxt[i];
            else break;
        }
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt.length === this.commonTxt.length) {
        this.isDeleting = false;
        this.loopNum++;
        if(this.loopNum % this.toRotate.length === 0) this.loopNum = 0;
        delta = 500;
        var i = this.loopNum % this.toRotate.length;
        this.fullTxt = this.toRotate[i];
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-text');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
};