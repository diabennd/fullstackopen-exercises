const SearchCountry = ({ handleSearchCountries }) => {
  return (
    <>
      <div>
        <span>Find countries</span>
        <input type="text" onChange={handleSearchCountries} />
      </div>
    </>
  );
};

export default SearchCountry;
