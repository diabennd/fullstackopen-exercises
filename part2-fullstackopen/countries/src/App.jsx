import { useState } from "react";
import SearchCountry from "./components/SearchCountry";
import CountryInfo from "./components/CountryInfo";
import { useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        setCountries(data);
      });
  }, []);

  const swiss = countries.find(
    (country) => country.name.common === "Switzerland",
  );

  console.log(swiss);

  return (
    <>
      <SearchCountry />
      <CountryInfo info={swiss} />
    </>
  );
}

export default App;
