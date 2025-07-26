import Weather from "./Weather";

const CountryInfo = ({ country, weather }) => {
  const c = country[0];

  let languages = [];
  for (let prop in c?.languages) {
    languages.push(c.languages[prop]);
  }

  return (
    <>
      <div>
        <h1>{c?.name.common}</h1>
        <p>Capital : {c?.capital}</p>
        <p>Area : {c?.area}</p>
      </div>
      <div>
        <h2>Languages</h2>
        <ul>
          {languages.map((lang) => {
            return <li key={crypto.randomUUID()}>{lang}</li>;
          })}
        </ul>
      </div>
      <div>
        <img style={{ border: "1px solid black" }} src={c?.flags.png} alt="" />
      </div>

      {weather === undefined ? (
        <p>Weather is loading</p>
      ) : (
        <Weather weatherData={weather[0]} />
      )}
    </>
  );
};

export default CountryInfo;
