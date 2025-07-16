import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);

  const handleSubmitName = (e) => {
    e.preventDefault();

    const newPerson = [
      ...persons,
      {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      },
    ];

    persons.map((person) => {
      if (person.name === newName) {
        alert("already exist");
        setPersons(persons);
      } else {
        setPersons(newPerson);
      }
    });

    // filterNameExist(persons, newName);

    console.log("person", persons);
  };
  const handleAddName = (e) => {
    setNewName(e.target.value);
  };
  const handleAddNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterShown = (e) => {
    setFilter(e.target.value);
  };

  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(filter),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterShown={handleFilterShown} />
      <h2>Add New</h2>
      <PersonForm
        handleAddName={handleAddName}
        handleAddNumber={handleAddNumber}
        handleSubmitName={handleSubmitName}
      />
      <h2>Numbers</h2>
      {filter === "" ? (
        <Persons persons={persons} />
      ) : (
        <Persons persons={filtered} />
      )}
    </div>
  );
};

export default App;
