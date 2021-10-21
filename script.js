
let stars = document.getElementById("stars");
let moon = document.getElementById("moon");
let back3 = document.getElementById("back3");
let back2 = document.getElementById("back2");
let text = document.getElementById("text");
let btn = document.getElementById("btn");

//animacje
window.addEventListener("scroll", function () {
  let value = window.scrollY;
  stars.style.left = -value + "px";
  moon.style.top = value + "px";
  back3.style.top = value * -0.25 + "px";
  back2.style.top = value * -0.17 + "px";
  text.style.marginTop = value * 1.5 + "px";
  text.style.marginRight = value * 1.5 + "px";
  btn.style.marginTop = value * 1.5 + "px";
});

// redirect dla mobilnych

if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
  if (document.cookie.indexOf("iphone_redirect=false") == -1) window.location = "http://graves-incorporated.com/test_sites/solera_mobile/";
};
if (screen.width <= 720) {
  window.location = "mobile/index.php";
};

