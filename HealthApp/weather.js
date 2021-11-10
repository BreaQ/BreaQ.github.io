window.addEventListener("load", () => {
  let lat;
  let long;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');
  // round to 2 decimal places (for fahrenheit)
  function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(long,lat);
      const api =
        'https://api.weatherapi.com/v1/current.json?key=b8a998bfdaa54513985190258212610&q=52.25,21&aqi=yes';
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const {temp_c, conditionText, icon} = data;
          console.log(data);
          temperatureDegree.textContent = temp_c;
          temperatureDescription.textContent = condition.Text;
          locationTimezone.textContent = tz_id.replace(/_/," ");
          let fahrenheit = (temp_c -32) *  (5/9);
          setIcons(icon, document.querySelector(".icon"));
          temperatureSection.addEventListener('click', () =>{
            if(temperatureSpan.textContent === "°C"){
              temperatureSpan.textContent = "°F";
              temperatureDegree.textContent = roundToTwo(fahrenheit);

            } else {
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = temp_c;
            }
          })
          if (temp_c >= 10 && conditions === "Clear"){
            alert("This is a great day for your running training!")
          }

        });
    });
  } 
  function setIcons (icon, iconID){
    const skycons = new Skycons({color:"white"});
    const currentIcon = icon.replace(/-/,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);

  }
});

