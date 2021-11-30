window.addEventListener("load", () => {
  let lat;
  let long;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  let conditionIcon = document.querySelector('.icon')
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
        `https://api.weatherapi.com/v1/current.json?key=b8a998bfdaa54513985190258212610&q=${roundToTwo(lat)}.${roundToTwo(long)}&aqi=yes`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const {current, location, condition} = data;
          console.log(data);
          temperatureDegree.textContent = current.temp_c;
          temperatureDescription.textContent = current.condition.text;
          locationTimezone.textContent = location.tz_id.replace("/"," - ");
          conditionIcon.src = "https:"+condition.icon;
          let fahrenheit = (current.temp_c -32) *  (5/9);
          temperatureSection.addEventListener('click', () =>{
            if(temperatureSpan.textContent === "°C"){
              temperatureSpan.textContent = "°F";
              temperatureDegree.textContent = roundToTwo(fahrenheit);

            } else {
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = temp_c;
            }
          })
          if (current.temp_c >= 10 && current.condition.text === "Clear"){
            alert("This is a great day for your running training!")
          }

        });
    });
  } 
});

