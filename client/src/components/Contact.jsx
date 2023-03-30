import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import * as ioicons from "react-icons/io5";

const Contact = ({ contact, toUpdate, toDelete }) => {
  const onUpdate = (toUpdateContact) => {
    // console.log(toUpdateContact);
    toUpdate(toUpdateContact);
  };

  const onDelete = (toDeleteContact) => {
    toDelete(toDeleteContact);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title style={{ marginBottom: "15px" }}>
          {contact.firstname} {contact.lastname}
        </Card.Title>
        <Card.Text>Phone Number: {contact.phone}</Card.Text>
        <Card.Text>Email: {contact.email}</Card.Text>
        <Card.Text>Notes: {contact.notes}</Card.Text>
        <Button
          variant="outline-danger"
          onClick={() => {
            onDelete(contact);
          }}
          style={{ padding: "0.6em", marginRight: "0.9em" }}
        >
          <ioicons.IoTrash />
        </Button>
        <Button
          variant="outline-info"
          onClick={() => {
            onUpdate(contact);
          }}
          style={{ padding: "0.6em" }}
        >
          {" "}
          <ioicons.IoSync />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Contact;
