import { useState, useEffect } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  const [hash, setHash] = useState(window.location.hash.slice(1) * 1);

  useEffect(() => {
    async function fetchContacts() {
      const response = await fetch(
        "https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users"
      );
      const json = await response.json();
      console.log(json);
      setContacts(json);
    }
    fetchContacts();
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setHash(window.location.hash.slice(1) * 1);
    });
  }, []);

  const contact = contacts.find((contact) => hash === contact.id);

  return (
    <>
      <h1>My Contacts ({contacts.length})</h1>
      {contact ? (<h2>{contact.name}</h2>) : null}
      {contact ? (<p>Email: {contact.email}</p>) : null}
      {contact ? (<p>Phone: {contact.phone}</p>) : null}
      {contact ? (<p>Company: {contact.company.name}</p>) : null}
      <hr />
      <ul>
        {contacts.map((contact) => {
          return (
            <li
              key={contact.id}
              className={contact.id === hash ? "selected" : ""}
            >
              <a href={`#${contact.id === hash ? "" : contact.id}`}>
                {contact.name}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
