import { useState, useEffect } from "react";
import DisplayCountry from "./components/DisplayCountry";
import SearchCountry from "./components/SearchCountry";

function App() {
  const [countryData, setCountryData] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");

  useEffect(() => {
    const getAllCountries = () => {
      fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((response) => {
          const data = response.json();
          return data;
        })
        .then((data) => {
          setCountryData(data);
        })
        .catch((err) => console.log(err));
    };
    getAllCountries();
  }, []);

  const filteredSearchCountries = countryData.filter((c) => {
    return c.name.common.toLowerCase().includes(searchCountries.toLowerCase());
  });

  console.log(filteredSearchCountries);

  const handleSearchCountries = (e) => {
    setSearchCountries(e.target.value);
  };

  return (
    <>
      <SearchCountry handleSearchCountries={handleSearchCountries} />
      {searchCountries === "" ? (
        <p>Please type to search the country</p>
      ) : filteredSearchCountries.length > 10 ? (
        <p>Too many mathces, try to specifies the filter</p>
      ) : (
        <DisplayCountry countries={filteredSearchCountries} />
      )}
    </>
  );
}

export default App;
