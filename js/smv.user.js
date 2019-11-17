// ==UserScript==
// @name        smvto
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://smv.to/*
// @grant        none
// ==/UserScript==

(function () {
	'use strict';

	console.log(window.location.href);

	var eles = document.querySelectorAll("a>.thumb");
	for (var i = 0; i < eles.length; i++) {
		// console.log(eles[i].id);
		eles[i].onclick = function (e) {
			hoge(e);
			e.preventDefault();
			e.stopPropagation();
			console.log(e.srcElement.id);
			return false;
		};
	}
	function hoge(e) {
		console.log("hoge" + e);
		console.log(e);


		const base = document.body.appendChild(Object.assign(document.createElement('div'), {
			style: `
				transition: all 300ms 0s ease;
				//width:500px;
				background-color: rgba(255,244,255,0.52);
				border: 1px solid silver;
				padding: 5px; 
				position: fixed;
				left: 0px;
				right: 0px;
				top: 0px;
				//bottom: 0px;
				margin: auto;
				overflow:auto;
				width: 90%;
				height: 80%;
				
				z-index: 2147483646;
			`,
			onmousewheel: function (e) {
				e.stopPropagation();
				//e.preventDefault();
				//console.log(e);
				//return false;
			},
			onclick: function (e) {
				console.log(this);
				console.log(e.target);
				this.parentNode.removeChild(this);
			},
		}));
		// var b2 = base.appendChild(Object.assign(document.createElement('div'), {
		// 	style: `
		// 		transition: all 300ms 0s ease;
		// 		//width:500px;
		// 		background-color: rgba(0,244,255,0.5);
		// 		border: 1px solid silver;
		// 		padding: 5px; 
		// 		left: 0px;
		// 		right: 0px;
		// 		top: 0px;
		// 		//bottom: 0px;
		// 		margin: auto;
		// 		overflow:auto;
		// 		width: 50%;
		// 		height: 50%;
				
		// 	`,
		// }));
		var num = parseFloat(e.target.getAttribute("count"));
		console.log(num);
		for (var i = 1; i < num + 1; i++) {
			if(!e.target.currentSrc){break;}
			base.appendChild(Object.assign(document.createElement('img'), {
				src: e.target.currentSrc.slice(0, -9) + ("0000" + i).slice(-5) + '.jpg',
				style: "	vertical-align: bottom;",

				//http://img1.smv.to/plpiAK5qSk/animation_00005.jpg',
			}));

		}

	}


	// document.querySelector("a>.thumb").onclick=function(e){
	// 	console.log(e.srcElement.id);
	// 	e.preventDefault();
	// };
})();