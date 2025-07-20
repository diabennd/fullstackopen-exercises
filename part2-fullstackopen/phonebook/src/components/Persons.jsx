const Persons = ({ name, number, handleDeletePerson }) => {
  return (
    <div>
      <p>
        {name} {number} <button onClick={handleDeletePerson}>{"🗑️"}</button>
      </p>
    </div>
  );
};

export default Persons;
