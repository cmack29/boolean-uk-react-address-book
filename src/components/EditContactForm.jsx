import { useEffect, useState } from "react";

export default function EditContactForm(props) {

const { contacts, setContacts, contactsToEdit } = props;

// console.log("contacts to edit: ", contactsToEdit)

    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [blockContact, setBlockContact] = useState(false);
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [postCode, setPostCode] = useState("")
    // const [contacts, setContacts] = useState("");

    useEffect(() => {
        if(contactsToEdit){
        const { firstName, lastName, blockContact, address } = contactsToEdit;

        const { street, city, postCode } = address;
        setFirstName(contactsToEdit.firstName)
        setlastName(contactsToEdit.lastName)
        setBlockContact(contactsToEdit.blockContact)
        setStreet(contactsToEdit.address.street)
        setCity(contactsToEdit.address.city)
        setPostCode(contactsToEdit.address.postCode)
        }
    }, [contactsToEdit])

    // console.log("street: ", contactsToEdit.address.street)

    // console.log("edit ", contactsToEdit)

    const handleFirstName = event => {
        event.preventDefault()
    
        setFirstName(event.target.value)
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

console.log("contact: ", contactsToEdit)

     const handleEditSubmit = event => {
         event.preventDefault()

         const addressToEditId = contactsToEdit.address.id;

         const updateAddress = {
            street,
            city,
            postCode
         }
         const fetchOptions = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(updateAddress)
          };

          fetch(`http://localhost:3030/addresses/${addressToEditId}`, fetchOptions)
          .then(res => res.json())
          .then(newAddress => {
            console.log("addresses PUT request: ", newAddress)

         const updateContact = {
             firstName,
             lastName,
             addressId: newAddress.id,
             blockContact
         }

         const fetchTools = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(updateContact)
          };
          fetch(`http://localhost:3030/contacts/${contactsToEdit.id}`, fetchTools)
          .then((res) => res.json())
          .then((newContact) => {
            console.log("New contact: ", newContact)
      
            const contactToAdd = contacts.map((contact) => {
                if (contact.addressId === newContact.id) {
                    return {
                        ...newContact
                    }
                } else {
                    return contact
                }
            })

            const updatedContact = {
                ...contactToAdd,
                address: updateContact
            }

            console.log("contact to add: ", updatedContact)
            setContacts([...contacts, contactToAdd])
        
        }, [])
     })

    }

    return (
        <form onSubmit={handleEditSubmit} className="form-stack light-shadow center contact-form">
          <h1>Edit Contact</h1>
          <label htmlFor="first-name-input">First Name:</label>
          <input onChange={handleFirstName} value={firstName} id="first-name-input" name="first-name-input" type="text" />
          <label htmlFor="last-name-input">Last Name:</label>
          <input onChange={handleLastName} value={lastName} id="last-name-input" name="last-name-input" type="text" />
          <label htmlFor="street-input">Street:</label>
          <input onChange={handleStreet} value={street} id="street-input" name="street-input" type="text" />
          <label htmlFor="city-input">City:</label>
          <input onChange={handleCity} value={city} id="city-input" name="city-input" type="text" />
          <label htmlFor="post-code-input">Post Code:</label>
          <input onChange={handlePostCode} value={postCode} id="post-code-input" name="post-code-input" type="text" />
          <div className="checkbox-section">
            <input onChange={handleBlockedContact} value={blockContact} id="block-checkbox" name="block-checkbox" type="checkbox" />
            <label htmlFor="block-checkbox">Block</label>
          </div>
          <div className="actions-section">
            <button className="button blue" type="submit">
              Edit
            </button>
          </div>
        </form>
      );
}