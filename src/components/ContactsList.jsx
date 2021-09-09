function ContactsList(props) {
  const { contacts, hideForm, hideEditForm, setHideForm, setHideEditForm, setContactsToEdit } = props;

  return (
    <aside className="contacts-section light-shadow">
      <header>
        <h2>Contacts</h2>
        <button
          onClick={() => setHideForm(!hideForm)}
          className="button new-contact-btn"
        >
          {hideForm ? "Create" : "Cancel"}
        </button>
      </header>
      <ul>
        {contacts.map((contact, index) => {
          const { firstName, lastName, address } = contact;
          console.log("contact: ", contact)

          return (
            <li key={index}>
              <h3>
                {firstName} {lastName}
              </h3>
              <p>
                {address.street}, {address.postCode}
              </p>
              <button
              onClick={() => {setHideEditForm(!hideEditForm)
              setContactsToEdit(contact)}}
              className="button new-contact-btn">
        
              {hideEditForm ? "Edit" : "Cancel"}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default ContactsList;
