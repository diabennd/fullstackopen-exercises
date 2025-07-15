const Filter = ({ handleFilterShown }) => {
  return (
    <div>
      <span>filter shown</span>
      <input onChange={handleFilterShown} />
    </div>
  );
};

export default Filter;
