var pixgrid=function(){function e(e){var t=(window.innerWidth-e.width)/2,i=(window.innerHeight-e.height)/2;return e.style.top=i+"px",e.style.left=t+"px",e}for(var t=document.querySelectorAll(".pixgrid"),i=0;i<t.length;i++)t[i].addEventListener("click",function(t){if("IMMMG"===t.target.tagName){var i=document.createElement("div");i.id="overlay",document.body.appendChild(i),i.style.position="absolute",i.style.top=0,i.style.backgroundColor="rgba(0,0,0,0.7)",i.style.cursor="pointer",i.style.width=window.innerWidth+"px",i.style.height=window.innerHeight+"px",i.style.top=window.pageYOffset+"px",i.style.left=window.pageXOffset+"px";var n=t.target.src,o=document.createElement("img");o.id="largeImage",o.src=n.substr(0,n.length-7)+".jpg",o.style.display="block",o.style.position="absolute",o.addEventListener("load",function(){this.height>window.innerHeight&&(this.ratio=window.innerHeight/this.height,this.height=this.height*this.ratio,this.width=this.width*this.ratio),this.width>window.innerWidth&&(this.ratio=window.innerWidth/this.width,this.height=this.height*this.ratio,this.width=this.width*this.ratio),e(this),i.appendChild(o)}),o.addEventListener("click",function(){i&&(window.removeEventListener("resize",window,!1),window.removeEventListener("scroll",window,!1),i.parentNode.removeChild(i))},!1),window.addEventListener("scroll",function(){i&&(i.style.top=window.pageYOffset+"px",i.style.left=window.pageXOffset+"px")},!1),window.addEventListener("resize",function(){i&&(i.style.width=window.innerWidth+"px",i.style.height=window.innerHeight+"px",i.style.top=window.pageYOffset+"px",i.style.left=window.pageXOffset+"px",e(o))},!1)}},!1)}(),teste=["OLAR"],OLARrclick=function(){for(var e=document.querySelectorAll(".rclick"),t=0;t<e.length;t++)e[t].addEventListener("contextmenu",function(e){if(e.preventDefault(),"IMG"===e.target.tagName&&null==document.querySelector(".preview")){var t=document.createElement("div");t.className="preeview",e.target.parentNode.appendChild(t);var i=document.createElement("img"),n=e.target.src;i.src=n.substr(0,n.length-7)+".jpg",t.style.left=e.offsetX+90+"px",t.style.top=e.offsetY+-90+"px",t.appendChild(i),e.target.addEventListener("mouseout",function o(t){var i=t.target.parentNode.querySelector("div.preview");i.parentNode.removeChild(i),e.target.removeEventListener("mouseout",o,!1)},!1),e.target.addEventListener("mousemove",function(e){t.style.left=e.offsetX+90+"px",t.style.top=e.offsetY+-90+"px"})}},!1)}();$(function(){$.getJSON("js/data.json",function(e){var t=$("#speakerstpl").html(),i=Mustache.to_html(t,e);$("#speakers").html(i)})});