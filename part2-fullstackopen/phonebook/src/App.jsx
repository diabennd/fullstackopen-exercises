import { useState, useEffect } from "react";
import service from "./services/service";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [reloadData, setReloadData] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    service.getAllData().then((res) => {
      console.log(res);
      setPersons(res);
      setReloadData(false);
    });
  }, [reloadData]);

  const handleSubmitPerson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    const addPerson = (content) => {
      const data = service.addData(content).then((res) => {
        console.log(res);
        return res;
      });
      console.log("success add: ", data);
    };

    const editPersonNumber = (id, content) => {
      service.editData(id, content).then((res) => {
        console.log(res);
        return res;
      });
    };

    const duplicatePerson = persons.find((person) => person.name === newName);
    // console.log(duplicatePerson);

    if (duplicatePerson === undefined) {
      // setPersons([...persons, newPerson]);
      addPerson(newPerson);
      setReloadData(true);
    } else {
      if (
        window.confirm(
          `${duplicatePerson.name} already exist, edit with new one?`,
        )
      ) {
        editPersonNumber(duplicatePerson.id, newPerson);
        setReloadData(true);
      }
    }
    setNewName("");
    setNewNumber("");
  };

  // console.log("render", persons);

  const handleDeletePerson = (id, content) => {
    const deleteData = () => {
      if (window.confirm(`Delete ${content} ?`)) {
        service.deleteData(id).then((res) => res);
        // console.log("after delete", persons);
      } else {
        setPersons(persons);
      }
    };
    deleteData();
    setReloadData(true);
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

  const isFiltered = filter !== "" ? filtered : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterShown={handleFilterShown} />
      <h2>Add New</h2>
      <PersonForm
        nameValue={newName}
        numberValue={newNumber}
        handleAddName={handleAddName}
        handleAddNumber={handleAddNumber}
        handleSubmitPerson={handleSubmitPerson}
      />
      <h2>Numbers</h2>
      {isFiltered.map((person) => (
        <Persons
          key={person.id}
          name={person.name}
          number={person.number}
          handleDeletePerson={() => {
            handleDeletePerson(person.id, person.name);
          }}
        />
      ))}
    </div>
  );
};

export default App;
