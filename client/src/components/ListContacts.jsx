import React, { useState, useEffect } from "react";
import * as ioicons from "react-icons/io5";
import Contact from "./Contact";
import UserForm from "./UserForm";

const ListContacts = () => {
  // this is my original state with an array of contacts
  const [contacts, setContacts] = useState([]);

  //   needed to do update request
  const [editingContact, setEditingContact] = useState(null);

  // A function to fetch the list of contacts that will be load anytime that list change
  const loadContacts = () => {
    fetch("http://localhost:8080/api/contacts")
      .then((response) => response.json())
      .then((contacts) => {
        setContacts(contacts);
      });
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const onSaveContact = (newContact) => {
    //console.log(newStudent, "From the parent - List of Students");
    setContacts((contacts) => [...contacts, newContact]);
  };

  //A function to control the update in the parent (student component)
  const updateContact = (savedContact) => {
    loadContacts();
  };

  //A function to handle the Delete funtionality
  const onDelete = (contact) => {
    return fetch(`http://localhost:8080/api/contact/${contact.contact_id}`, {
      method: "DELETE",
    }).then((response) => {
      console.log(response);
      //console.log(response);
      if (response.ok) {
        loadContacts();
      }
    });
  };

  //A function to handle the Update functionality
  const onUpdate = (toUpdateContact) => {
    setEditingContact(toUpdateContact);
  };

  return (
    <div className="mybody">
      <div className="list-students">
        <h2>My Contacts </h2>
        <ul>
          {contacts.map((contact) => {
            return (
              <li key={contact.contact_id}>
                <Contact
                  contact={contact}
                  toDelete={onDelete}
                  toUpdate={onUpdate}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <UserForm
        //   I AM CONFUSED ON WHY THIS KEY IS NECESSARY --> ?
        key={editingContact ? editingContact.id : null}
        onSaveContact={onSaveContact}
        editingContact={editingContact}
        onUpdateContact={updateContact}
      />
    </div>
  );
};

export default ListContacts;
