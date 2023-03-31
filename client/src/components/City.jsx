import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import * as ioicons from "react-icons/io5";

const City = ({ city, onEdit, onDelete }) => {
  const handleEditClick = (city) => {
    onEdit(city);
  };

  const handleDeleteClick = (city) => {
    onDelete(city.user_id);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title style={{ marginBottom: "15px" }}>
          {city.username}
        </Card.Title>
        <Card.Text>City: {city.fav_city}</Card.Text>
        <Card.Text>State: {city.state_code}</Card.Text>
        <Button
          variant="outline-danger"
          onClick={() => {
            handleDeleteClick(city);
          }}
          style={{ padding: "0.6em", marginRight: "0.9em" }}
        >
          <ioicons.IoTrash />
        </Button>
        <Button
          variant="outline-info"
          onClick={() => {
            handleEditClick(city);
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

export default City;
