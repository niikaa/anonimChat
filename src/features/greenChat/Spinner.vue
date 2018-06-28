<template>
  <div id="wrapper">
        <div id="wheel" ref="green_wheel">
            <div id="inner-wheel">
                <div class="sec  sec_gr"></div>
                <div class="sec  sec_gr"></div>
                <div class="sec  sec_gr"></div>
                <div class="sec  sec_gr"></div>
                <div class="sec  sec_gr"></div>
                <div class="sec  sec_gr"></div>
            </div>
            <div id="spin"  @click="spin()">
                <div id="inner-spin"></div>
            </div>
            <div id="shine"></div>
        </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        clicks: 0,
        countCLicks: 0,
        chosedFriendNum: null,
      }
    },
    methods: {
      getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      },
      spin() {
        let degree = 1800
        this.clicks ++
        this.countCLicks ++
        let newDegree = degree*this.clicks
        let extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1
        let totalDegree = newDegree+extraDegree
        let secs = document.getElementsByClassName('sec_gr')
        for (var i = 0; i < secs.length; i++) {
          let t = this.$refs.green_wheel
          let noY = 0
          let c = 0
          let n = 700
          let interval = setInterval(() => {
            c++
            if (c === n) {
              clearInterval(interval)
            }
            var rect = t.getBoundingClientRect()
            let aoY = rect.top + document.body.scrollTop
            if(aoY < 23.89){
              let curEl = document.getElementById("spin")
              if (curEl.classList)
                curEl.classList.add('spin')
              else
                curEl.className += ' ' + 'spin'
              setTimeout(() => {
                let curEl = document.getElementById("spin")
                if (curEl.classList)
                  curEl.classList.remove('spin')
                else
                  curEl.className = curEl.className.replace(new RegExp('(^|\\b)' + 'spin'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
              }, 100)
            }
          }, 10)
          window.document.getElementById("inner-wheel").style.transform = 'rotate(' + totalDegree + 'deg)'
        }
        setTimeout(() => {
          this.countCLicks--
          if (this.countCLicks == 0) {
            let rand = this.getRandomInt(this.$store.state.Authentication.friends_ids.length);
            let randFriend = this.$store.state.Authentication.friends_ids[rand]
          }
        },5500)
      }
    }
  }
</script>

<style>
#wheel{
	width:250px;
	height:250px;
	border-radius:50%;
	position:relative;
	overflow:hidden;
	box-shadow:rgba(0,0,0,0.2) 0px 0px 10px, rgba(0,0,0,0.05) 0px 3px 0px;
	transform: rotate(0deg);
  transform: scale(0.7);
}
#wheel:before{
	content:'';
	position:absolute;
	width:242px;
	height:242px;
	border-radius:50%;
	z-index:1000;
}
#inner-wheel{
	width:100%;
	height:100%;
	-webkit-transition: all 6s cubic-bezier(0,.99,.44,.99);
	-moz-transition: all 6 cubic-bezier(0,.99,.44,.99);
	-o-transition: all 6s cubic-bezier(0,.99,.44,.99);
	-ms-transition: all 6s cubic-bezier(0,.99,.44,.99);
	transition: all 6s cubic-bezier(0,.99,.44,.99);
}
#wheel div.sec{
	position: absolute;
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 130px 75px 0;
	border-color: #19c transparent;
	transform-origin: 75px 129px;
	left:50px;
	top:-4px;
	opacity:1;
}
#wheel div.sec:nth-child(1){
	transform: rotate(60deg);
	-webkit-transform: rotate(60deg);
	-moz-transform: rotate(60deg);
	-o-transform: rotate(60deg);
	-ms-transform: rotate(60deg);
	border-color: #2ecc71 transparent;
}
#wheel div.sec:nth-child(2){
	transform: rotate(120deg);
	-webkit-transform: rotate(120deg);
	-moz-transform: rotate(120deg);
	-o-transform: rotate(120deg);
	-ms-transform: rotate(120deg);
	border-color: #e74c3c transparent;
}
#wheel div.sec:nth-child(3){
	transform: rotate(180deg);
	-webkit-transform: rotate(180deg);
	-moz-transform: rotate(180deg);
	-o-transform: rotate(180deg);
	-ms-transform: rotate(180deg);
	border-color: #f1c40f transparent;
}
#wheel div.sec:nth-child(4){
	transform: rotate(240deg);
	-webkit-transform: rotate(240deg);
	-moz-transform: rotate(240deg);
	-o-transform: rotate(240deg);
	-ms-transform: rotate(240deg);
	border-color: #3498db transparent;
}
#wheel div.sec:nth-child(5){
	transform: rotate(300deg);
	-webkit-transform: rotate(300deg);
	-moz-transform: rotate(300deg);
	-o-transform: rotate(300deg);
	-ms-transform: rotate(300deg);
	border-color: #9b59b6 transparent;
}
#wheel div.sec:nth-child(6){
	transform: rotate(360deg);
	-webkit-transform: rotate(360deg);
	-moz-transform: rotate(360deg);
	-o-transform: rotate(360deg);
	-ms-transform: rotate(360deg);
	border-color: #e67e22 transparent;
}
#wheel div.sec .fa{
	margin-top: -100px;
	color: rgba(0,0,0,0.2);
	position: relative;
	z-index: 10000000;
	display: block;
	text-align: center;
	font-size:36px;
	margin-left:-15px;
	text-shadow: rgba(255, 255, 255, 0.1) 0px -1px 0px, rgba(0, 0, 0, 0.2) 0px 1px 0px;
}
#spin{
	width:68px;
	height:68px;
	position:absolute;
	top:50%;
	left:50%;
	margin:-34px 0 0 -34px;
	border-radius:50%;
	box-shadow:rgba(0,0,0,0.1) 0px 3px 0px;
	z-index:1000;
	background:#fff;
	cursor:pointer;
	font-family: 'Exo 2', sans-serif;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
#spin:after{
	content:"TRY";
	text-align:center;
	line-height:68px;
	color:#CCC;
	text-shadow: 0 2px 0 #fff, 0 -2px 0 rgba(0,0,0,0.3) ;
	position: relative;
	z-index: 100000;
	width:68px;
	height:68px;
	display:block;
}
#spin:before{
	content:"";
	position:absolute;
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 0 20px 28px 20px;
	border-color: transparent transparent #ffffff transparent;
	top:-12px;
	left:14px;
}
#inner-spin{
	width:54px;
	height:54px;
	position:absolute;
	top:50%;
	left:50%;
	margin:-27px 0 0 -27px;
	border-radius:50%;
	z-index:999;
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#eaeaea',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}
#spin:active #inner-spin{
	box-shadow:rgba(0,0,0,0.4) 0px 0px 5px inset;
}
#spin:active:after{
	font-size:15px;
}
#shine{
	width:250px;
	height:250px;
	position:absolute;
	top:0;
	left:0;
	background: -moz-radial-gradient(center, ellipse cover,  rgba(255,255,255,1) 0%, rgba(255,255,255,0.99) 1%, rgba(255,255,255,0.91) 9%, rgba(255,255,255,0) 100%); /* FF3.6+ */
  background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,rgba(255,255,255,1)), color-stop(1%,rgba(255,255,255,0.99)), color-stop(9%,rgba(255,255,255,0.91)), color-stop(100%,rgba(255,255,255,0))); /* Chrome,Safari4+ */
  background: -webkit-radial-gradient(center, ellipse cover,  rgba(255,255,255,1) 0%,rgba(255,255,255,0.99) 1%,rgba(255,255,255,0.91) 9%,rgba(255,255,255,0) 100%); /* Chrome10+,Safari5.1+ */
  background: -o-radial-gradient(center, ellipse cover,  rgba(255,255,255,1) 0%,rgba(255,255,255,0.99) 1%,rgba(255,255,255,0.91) 9%,rgba(255,255,255,0) 100%); /* Opera 12+ */
  background: -ms-radial-gradient(center, ellipse cover,  rgba(255,255,255,1) 0%,rgba(255,255,255,0.99) 1%,rgba(255,255,255,0.91) 9%,rgba(255,255,255,0) 100%); /* IE10+ */
  background: radial-gradient(ellipse at center,  rgba(255,255,255,1) 0%,rgba(255,255,255,0.99) 1%,rgba(255,255,255,0.91) 9%,rgba(255,255,255,0) 100%); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#00ffffff',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  opacity:0.1;
}
@-webkit-keyframes hh {
  0%, 100%{
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  50%{
    transform: rotate(7deg);
    -webkit-transform: rotate(7deg);
  }
}
@keyframes hh {
   0%, 100%{
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  50%{
    transform: rotate(7deg);
    -webkit-transform: rotate(7deg);
  }
}
.spin {
  -webkit-animation: hh 0.1s;
    animation: hh 0.1s;
}
</style>
