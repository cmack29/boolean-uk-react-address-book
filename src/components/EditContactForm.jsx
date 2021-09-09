import { useEffect, useState } from "react";

export default function EditContactForm(props) {

const { contact, setContact, contactsToEdit } = props;

    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [blockContact, setBlockContact] = useState(false);
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [postCode, setPostCode] = useState("")

    useEffect(() => {
        if(contactsToEdit){
        setFirstName(contactsToEdit.firstName)
        setlastName(contactsToEdit.lastName)
        setBlockContact(contactsToEdit.blockContact)
        setStreet(contactsToEdit.address.street)
        setCity(contactsToEdit.address.city)
        setPostCode(contactsToEdit.address.postCode)
        }
    })

    console.log("edit ", contactsToEdit)

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

    

    return (
        <form className="form-stack light-shadow center contact-form">
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
              Create
            </button>
          </div>
        </form>
      );
}