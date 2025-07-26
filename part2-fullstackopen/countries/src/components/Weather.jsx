const Weather = ({ weatherData }) => {
  const name = weatherData?.name;
  const icon = weatherData?.weather[0].icon;
  const wind = weatherData?.wind.speed;
  const temperature = (weatherData?.main.temp - 273.15).toFixed(2);

  return (
    <>
      {weatherData === undefined ? (
        <p>loading</p>
      ) : (
        <div>
          <h2>Weather in {name}</h2>
          <p>Temperature {temperature}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt=""
          />
          <p>Wind {wind} m/s</p>
        </div>
      )}
    </>
  );
};

export default Weather;
