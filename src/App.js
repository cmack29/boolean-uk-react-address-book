import { useState, useEffect } from "react";
import ContactsList from "./components/ContactsList";
import CreateContactForm from "./components/CreateContactForm";
import EditContactForm from "./components/EditContactForm";
import "./styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [contactsToEdit, setContactsToEdit] = useState(null);
  const [hideForm, setHideForm] = useState(true);
  const [hideEditForm, setHideEditForm] = useState(true)
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [blockContact, setBlockContact] = useState(false);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("")


  
  const handleFirstName = event => {
    event.preventDefault()

    setfirstName(event.target.value)
  }

  const handleLastName = event => {
    event.preventDefault()

    setlastName(event.target.value)
  }

  const handleBlockedContact = event => {
    event.preventDefault()

    setBlockContact(event.target.checked)
  }

const handleStreet = event => {
  event.preventDefault()

  setStreet(event.target.value)
}

const handleCity = event => {
  event.preventDefault()

  setCity(event.target.value)
}
 const handlePostCode = event => {
  event.preventDefault()

  setPostCode(event.target.value)
 }


useEffect(() => {

  fetch(`http://localhost:3030/contacts`)
  .then((res) => res.json())
  .then((contacts) => {
    console.log("inside fetch: ", contacts)

  fetch(`http://localhost:3030/addresses`)
  .then((res) => res.json())
  .then((addresses) => {

    const updatedContacts = contacts.map(cons => {
      const foundAddress = addresses.find(addr => cons.addressId === addr.id)
      return {
        ...cons,
        address: foundAddress
      }
    })
    setContacts(updatedContacts)

  })
  })
}, [])


  const handleSubmit = event => {
    event.preventDefault()

    const addressToCreate = {
      street,
      city,
      postCode,
    }

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressToCreate),
    }

    fetch("http://localhost:3030/addresses", fetchOptions)
      .then(res => res.json())
      .then(newAddress => {
        // console.log("addresses POST request: ", newAddress)

        const contactToCreate = {
          firstName,
          lastName,
          blockContact,
          addressId: newAddress.id,
        }
        const fetchTools = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactToCreate)
        }
      
    fetch(`http://localhost:3030/contacts`, fetchTools)
    .then((res) => res.json())
    .then((newContact) => {
      // console.log("New contact: ", newContact)

      const contactToAdd = {
        ...newContact,
        address: newAddress,
      }

      // console.log("contact to add: ", contactToAdd)

      setContacts([...contacts, contactToAdd])
    })
      }), []
  }
  
  return (
    <>
      <ContactsList
        contacts={contacts}
        hideForm={hideForm}
        hideEditForm={hideEditForm}
        setHideForm={setHideForm}
        setHideEditForm={setHideEditForm}
        setContactsToEdit={setContactsToEdit}
      />

      
      <main>{!hideForm && <CreateContactForm 
      handleFirstName={handleFirstName} 
      handleLastName={handleLastName} 
      handleBlockedContact={handleBlockedContact}
      handleSubmit={handleSubmit}
      handlePostCode={handlePostCode} 
      handleCity={handleCity} 
      handleStreet={handleStreet}/>}
      <EditContactForm contactsToEdit={contactsToEdit} setContacts={setContacts} contacts={contacts}/>
      </main>
    </>
  );
}
