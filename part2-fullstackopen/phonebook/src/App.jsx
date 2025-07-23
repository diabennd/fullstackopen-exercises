import { useState, useEffect } from "react";
import service from "./services/service";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [reloadData, setReloadData] = useState(false);
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    service.getAllData().then((res) => {
      console.log(res);
      setPersons(res);
      setReloadData(false);
    });
  }, [reloadData]);

  const showNotification = (content, info) => {
    setNotification(true);
    setMessage(`${info} ${content}`);
    setTimeout(() => {
      setNotification(false);
      setMessage(null);
    }, 2000);
  };

  const handleSubmitPerson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    const addPerson = (content) => {
      service.addData(content).then((res) => {
        console.log(res);
        return res;
      });
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
      addPerson(newPerson);
      setReloadData(true);
      showNotification(newPerson.name, "Added");
    } else {
      if (
        window.confirm(
          `${duplicatePerson.name} already exist, edit with new one?`,
        )
      ) {
        editPersonNumber(duplicatePerson.id, newPerson);
        setReloadData(true);
        showNotification(duplicatePerson.name, "Change");
      }
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDeletePerson = (id, content) => {
    const deleteData = () => {
      if (window.confirm(`Delete ${content} ?`)) {
        service.deleteData(id).then((res) => res);
        showNotification(content, "Removed");
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
      {notification ? <Notification message={message} /> : null}
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
