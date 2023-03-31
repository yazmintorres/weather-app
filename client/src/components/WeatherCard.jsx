const WeatherCard = ({ weatherData }) => {
  return (
    <div className="weather-card">
      <div className="result">
        <p>
          City:{" "}
          <span className="data">
            {weatherData.name}, {weatherData.sys.country}
          </span>
        </p>
        <p>
          Description:{" "}
          <span className="data">{weatherData.weather[0].description}</span>
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
          alt={"Icon from Open Weather Api"}
        />
        <p>
          Temperature:{" "}
          <span className="data">
            {weatherData.main.temp} <sup>o</sup>F
          </span>
        </p>
        <p>
          Feels Like:{" "}
          <span className="data">
            {weatherData.main.feels_like} <sup>o</sup>F
          </span>
        </p>
        <p>
          Lowest Temp:{" "}
          <span className="data">
            {weatherData.main.temp_min} <sup>o</sup>F
          </span>
        </p>
        <p>
          Highest Temp:{" "}
          <span className="data">
            {weatherData.main.temp_max} <sup>o</sup>F
          </span>
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
