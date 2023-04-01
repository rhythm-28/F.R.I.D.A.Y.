export const wait = (s) => {
  return new Promise((rs) => setTimeout(rs, s));
};

export const weather = async () => {
  const weatherResponse = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=London&appid=d237d9b72241f06b355320b7285cbea9"
  ).catch((err)=>{
      console.error(err);
  });

  const weather = await weatherResponse.json();
  return Math.round(weather.main.temp-273.15);
};
