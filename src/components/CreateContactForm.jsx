
function CreateContactForm(props) {
  // [TODO] Write form handlers here and POST requests here...


  return (
    <form onSubmit={props.handleSubmit} className="form-stack light-shadow center contact-form">
      <h1>Create Contact</h1>
      <label htmlFor="first-name-input">First Name:</label>
      <input onChange={props.handleFirstName} id="first-name-input" name="first-name-input" type="text" />
      <label htmlFor="last-name-input">Last Name:</label>
      <input onChange={props.handleLastName} id="last-name-input" name="last-name-input" type="text" />
      <label htmlFor="street-input">Street:</label>
      <input onChange={props.handleStreet} id="street-input" name="street-input" type="text" />
      <label htmlFor="city-input">City:</label>
      <input onChange={props.handleCity} id="city-input" name="city-input" type="text" />
      <label htmlFor="post-code-input">Post Code:</label>
      <input onChange={props.handlePostCode} id="post-code-input" name="post-code-input" type="text" />
      <div className="checkbox-section">
        <input onChange={props.handleBlockedContact} id="block-checkbox" name="block-checkbox" type="checkbox" />
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

export default CreateContactForm;
