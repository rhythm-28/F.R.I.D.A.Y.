export const wait = (s) => {
  return new Promise((rs) => setTimeout(rs, s));
};

export const weather = async () => {
  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.API_KEY}`
  ).catch((err) => {
    console.error(err);
  });

  const weather = await weatherResponse.json();
  return Math.round(weather.main.temp-273.15);
};
