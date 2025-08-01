let a = document.getElementById("form");
let api_key = "45f40e0a2a6708c11064faa118afb498"
function fetcher(){
    let city = document.getElementById("city").value.trim().toLowerCase();

    // Basic input validation
    const invalidInputs = ["hi", "hello", "test", "abc"];
    const cityRegex = /^[a-zA-Z\s]{2,}$/;

    if (!cityRegex.test(city) || invalidInputs.includes(city)) {
        alert("Please enter a valid city name.");
        return;
    }
    data1 = fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    return response.json(); // parse JSON from response
  })
    .then(data => {
    if (
      !data ||
      data.length === 0 ||
      !data[0].name ||
      data[0].name.toLowerCase() !== city
    ) {
      alert("City not found. Please enter a valid city name.");
      return;
    }
    let lat = data[0].lat;
    let long = data[0].lon;
    fetcher2(lat, long);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
  
}

function fetcher2(lat,lon){
  data = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    return response.json(); 
  })
  .then(data => {
    const iconCode = data.weather[0].icon;
    displayer(data.weather[0].main,data.weather[0].description,Math.round(data.main.temp - 273.5),iconCode)
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
}

function displayer(weather,description,temp,iconCode){
 let f = document.getElementById("form");
 f.remove();
 let b = document.getElementsByClassName("button");
 b[0].remove();
 console.log(weather,description,temp)
 const img = document.createElement("img");
  img.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`; 
  img.alt = weather;
  img.style.width = "100px"; 
  document.getElementsByClassName("container")[0].appendChild(img);

  let w = document.createElement("h2");
  w.innerText = weather;
  document.getElementsByClassName("container")[0].appendChild(w);

  // Weather description
  let desc = document.createElement("p");
  desc.innerText = description;
  document.getElementsByClassName("container")[0].appendChild(desc);


  // Temperature
  let t = document.createElement("h3");
  t.innerText = `${temp}°C`;
  document.getElementsByClassName("container")[0].appendChild(t);
  
  let btn = document.createElement("button");
  btn.innerText = "OKAY";
btn.style.backgroundColor = '#02263e';
btn.style.color = 'white';
btn.style.padding = '10px 20px';
btn.style.marginTop = '20px';
btn.style.fontSize = '16px';
btn.style.border = 'none';
btn.style.borderRadius = '5px';
btn.style.cursor = 'pointer';

// 👇 Add the click event to reload the page
btn.addEventListener('click',function(){
    location.reload();
})

  document.getElementsByClassName("container")[0].appendChild(btn);
  



}
