const fetch = require('node-fetch');

async function getWeatherData(lat, lon) {
  const apiResp = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&lat=${lat}&lon=${lon}`
  );
  const apiData = await apiResp.json();
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
  const apiResp = await fetch(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`);
  const apiData = await apiResp.json();
  const data = apiData.data.map((reviewObj) => {
    return {
      term: 'long',
      location: 'long',
      latitude: 'numeric',
      longitutde: 'numeric',
      url: 'x',
    };
  });
  return data;
}

module.exports = {
  getWeatherData,
  getReviewData
};