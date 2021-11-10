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
      const api =
        'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}.&{long}/today?unitGroup=metric&key=DJ9F56F27LLYZYZH89UXMDM4Z&include=current';
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const {temp, conditions, icon} = data.currentConditions;
          // console.log(data.currentConditions); for later changes
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = conditions;
          locationTimezone.textContent = data.timezone.replace(/_/," ");
          let fahrenheit = (temp -32) *  (5/9);
          setIcons(icon, document.querySelector(".icon"));
          temperatureSection.addEventListener('click', () =>{
            if(temperatureSpan.textContent === "°C"){
              temperatureSpan.textContent = "°F";
              temperatureDegree.textContent = roundToTwo(fahrenheit);

            } else {
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = temp;
            }
          })
          if (temp >= 10 && conditions === "Clear"){
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

