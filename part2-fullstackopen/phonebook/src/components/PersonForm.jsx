const PersonForm = ({ handleAddName, handleAddNumber, handleSubmitName }) => {
  return (
    <div>
      <form onSubmit={handleSubmitName}>
        <div>
          name: <input onChange={handleAddName} /> <br />
          number: <input onChange={handleAddNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
