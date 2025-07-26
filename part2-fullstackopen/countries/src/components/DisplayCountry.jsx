import { useState } from "react";
import CountryInfo from "./CountryInfo";
import { useEffect } from "react";

const DisplayCountry = ({ countries }) => {
  const [showDetailCountry, setShowDetailCountry] = useState(false);
  const [spesificCountry, setSpesificCountry] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  const api_key = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    if (countries.length > 1 || countries.length < 1) {
      return;
    } else {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${countries[0].capital}&appid=${api_key}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData((w) => w.concat(data));
        })
        .catch((err) => console.log(err));
    }
  }, [countries]);

  const getSpecificCountry = (c, capital) => {
    fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${c}`)
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        setSpesificCountry(spesificCountry.concat(data));
      })
      .catch((err) => console.log(err));
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(weatherData.concat(data));
      })
      .catch((err) => console.log(err));
  };

  if (countries.length < 1) return <p>no country found</p>;

  return (
    <>
      <div>
        {countries.length > 1 ? (
          !showDetailCountry ? (
            <ul>
              {countries.map((c) => {
                return (
                  <li key={c?.cca2}>
                    <span>{c?.name.common} </span>
                    <button
                      onClick={() => {
                        const country = c?.name.common.toLowerCase();
                        const capital = c?.capital;
                        getSpecificCountry(country, capital);
                        setShowDetailCountry(true);
                      }}
                    >
                      {"➡️"}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <CountryInfo country={spesificCountry} weather={weatherData} />
          )
        ) : (
          <CountryInfo country={countries} weather={weatherData} />
        )}
      </div>
    </>
  );
};

export default DisplayCountry;
