const fetch = require('node-fetch');

async function getWeatherData(lat, lon) {
  const fetchAPI = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&lat=${lat}&lon=${lon}`
  );
  const apiData = await fetchAPI.json();
  const data = apiData.data.map((weatherObj) => {
    return {
      forecast: weatherObj.weather.description,
      time: new Date(weatherObj.ts * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
  });
  return data;
}

async function getReviewData(lat, lon) {
  console.log('lat', lat);
  console.log('lon', lon);
  let API = (`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`);
  const bearer = 'Bearer ' + `${process.env.YELP_KEY}`;
  const fetchApi = await fetch(
    `${API}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json'
      }
    }
  );
  const apiData = await fetchApi.json();
  console.log(apiData);
  const data = apiData.businesses.map((obj) => {
    return {
      name: obj.name,
      image_url: obj.image_url,
      price: obj.price,
      rating: obj.rating,
      url: obj.url
    };
  });
  return data;
}
  

module.exports = {
  getWeatherData,
  getReviewData
};