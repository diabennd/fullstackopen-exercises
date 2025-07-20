const PersonForm = ({
  handleAddName,
  handleAddNumber,
  handleSubmitPerson,
  numberValue,
  nameValue,
}) => {
  return (
    <div>
      <form>
        <div>
          name: <input onChange={handleAddName} value={nameValue} /> <br />
          number: <input onChange={handleAddNumber} value={numberValue} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmitPerson}>
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
