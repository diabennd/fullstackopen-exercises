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
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(false);
  const [info, setInfo] = useState("info");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    service.getAllData().then((res) => {
      setPersons(res);
    });
  }, []);

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

    const duplicatePerson = persons.find((person) => person.name === newName);

    if (duplicatePerson === undefined) {
      service
        .addData(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
        })
        .catch((error) => {
          console.log(error);
        });
      showNotification(newPerson.name, "Added");
    } else {
      if (
        window.confirm(
          `${duplicatePerson.name} already exist, edit with new one?`,
        )
      ) {
        const changedNumber = { ...duplicatePerson, number: newNumber };
        service
          .editData(duplicatePerson.id, changedNumber)
          .then((changedNumberData) => {
            setPersons(persons.concat(changedNumberData));
          })
          .catch(() => {
            setMessage(
              `Information of ${duplicatePerson.name} has been removed from server`,
            );
            setInfo("error");
            setPersons(
              persons.filter((person) => person.id !== duplicatePerson.id),
            );
          });
        showNotification(duplicatePerson.name, "Change");
      }
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDeletePerson = (id, content) => {
    const deleteData = () => {
      const deletedData = persons.filter((person) => person.id !== id);
      if (window.confirm(`Delete ${content} ?`)) {
        service.deleteData(id).then((res) => {
          console.log(res);
          setPersons(deletedData);
        });
        showNotification(content, "Remove");
      } else {
        setPersons(persons);
      }
    };
    deleteData();
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
      <Notification message={message} info={info} />
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
