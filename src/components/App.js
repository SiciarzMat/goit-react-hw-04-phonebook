import { React, useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import { ContactForm } from "./ContactForm";
import { Section } from "./Section";
import { Filter } from "./Filter";
import { ContactList } from "./ContactList";


export const App = () => {

  const [contacts, setContact] = useState([
    { name: 'Rosie Simpson', number: '459-12-56', id: nanoid(), },
    { name: 'Hermione Kline', number: '443-89-12', id: nanoid(), },
    { name: 'Eden Clements', number: '645-17-79', id: nanoid(), },
    { name: 'Annie Copeland', number: '227-91-26', id: nanoid(), },
  ])
  const [filter, setFilter] = useState("");
  const isMounted = useRef(false);

  const addNewContact = (newContact) => {
    const isNameOnList = checkName(newContact);
    const isNumberOnList = checkNumber(newContact);

    if (isNameOnList) {
      alert(`${newContact.name} is already in contacts`)
    } else if (isNumberOnList) {
      alert(`This number ${newContact.number} is already in contacts`)
    } else {
      setContact(prevState => [...prevState, newContact])
    }
  }

  const checkName = (newContact) => {
    const isNameOnList = contacts.some(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())
    return isNameOnList;
  }

  const checkNumber = (newContact) => {
    const isNumberOnList = contacts.some(contact => contact.number === newContact.number)
    return isNumberOnList;
  }

  const addFilterValue = (e) => {
    setFilter(e.target.value)
  }

  const deleteContact = (e) => {
    const newContacts = contacts.filter(contact => contact.id !== e.target.id)
    setContact(newContacts)
  }

  useEffect(() => {
    const list = window.localStorage.getItem('phonebook-contact')
    if (!list) return

    try {
      setContact(JSON.parse(list))
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    const phonebookContactStringified = JSON.stringify(contacts)
    if (isMounted.current) {
      window.localStorage.setItem('phonebook-contact', phonebookContactStringified)
    } else {
      isMounted.current = true;
    }
  }, [contacts])

  return (
    <>
      <Section title="Phonebook">
        <ContactForm handleSubmit={addNewContact} />
      </Section>

      <Section title="Contacts" >
        <Filter addFilterValue={addFilterValue} />
        <ContactList
          contacts={contacts}
          filterValue={filter}
          deleteContact={deleteContact}
        />
      </Section>
    </>
  );
};
