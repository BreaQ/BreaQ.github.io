
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
  back3.style.top = value * -0.3 + "px";
  back2.style.top = value * -0.2 + "px";
  text.style.marginTop = value * 1.4 + "px";
  text.style.marginRight = value * 1.4 + "px";
  btn.style.marginTop = value * 1.4 + "px";
});

// alert dla mobilnych

function mobile() {
  if (navigator.userAgent.match(/iPhone/i)){
    alert ("Strona przeznaczona do przeglądania na większym ekranie");
  } else if (screen.width <=699) {
    alert ("Strona przeznaczona do przeglądania na większym ekranie");
  }
};
mobile();



