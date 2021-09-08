import { useState, useEffect } from "react";
import ContactsList from "./components/ContactsList";
import CreateContactForm from "./components/CreateContactForm";
import "./styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [hideForm, setHideForm] = useState(true);
  const [contactInputs, setContactInputs] = useState({
    firstName: "",
    lastName: "",
    blockContact: false,
  })
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("")
  
  console.log("CreateContactForm State: ", { contactInputs })

  const handleContactInputs = event => {
    console.log(
      "Inside handleContactInputs: ",
      event.target.name,
      event.target.value
    )
  
    const inputType = event.target.type
  
    const inputName = event.target.name


    if (inputType === "checkbox") {
      setContactInputs({
        ...contactInputs,
        [inputName]: event.target.checked,
      })
    } else {
      setContactInputs({
        ...contactInputs,
        [inputName]: event.target.value,
      })
    }
  }

    // [TODO] Write a useEffect to fetch contacts here...
useEffect(() => {

  fetch(`http://localhost:3030/contacts`)
  .then((res) => res.json())
  .then((newContact) => {
    console.log("inside fetch: ", newContact)

  setContacts(newContact)
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
        console.log("addresses POST request: ", newAddress)

        const contactToCreate = {
          contactInputs,
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
      console.log("New contact: ", newContact)
    })
        // console.log("contact to create: ", contactToCreate)

        // Ready to write our next post request in here...
      })


  }
  



  return (
    <>
      <ContactsList
        contacts={contacts}
        hideForm={hideForm}
        setHideForm={setHideForm}
      />
      <main>{!hideForm && <CreateContactForm handleContactInputs={handleContactInputs} handleSubmit={handleSubmit}/>}</main>
    </>
  );
}
