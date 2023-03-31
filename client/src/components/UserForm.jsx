import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const UserForm = ({ addCity, editingCity, afterCityUpdate, onEdit }) => {
  // create initial state for contacts list

  const [city, setCity] = useState(
    editingCity || {
      username: "",
      fav_city: "",
      state_code: "",
    }
  );

  //create functions that handle the event of the user typing into the form
  const handleChange = (property) => {
    return (e) => {
      setCity({ ...city, [property]: e.target.value });
    };
  };

  const clearForm = () => {
    setCity({
      username: "",
      fav_city: "",
      state_code: "",
    });
    // also want to reset state of editing city to null bc we are no longer editing a city after we submit and clear the form
    onEdit(null);
  };

  //A function to handle the post request
  const postCity = (city) => {
    return fetch("http://localhost:8080/api/user/fav", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(city),
    })
      .then((response) => {
        return response.json();
      })
      .then((newCity) => {
        addCity(newCity);
        //this line just for cleaning the form
        clearForm();
      });
  };

  //A function to handle the put (update) request
  const putCity = (cityToEdit) => {
    console.log("test");
    return fetch(`http://localhost:8080/api/user/${cityToEdit.user_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cityToEdit),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        afterCityUpdate();
        //this line just for cleaning the form
        clearForm();
      });
  };

  //A function to handle the submit in both cases - Post and Put request!
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.user_id) {
      putCity(city);
    } else {
      postCity(city);
    }
  };

  return (
    <Form className="form-students" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="add-user-name">Username</Form.Label>
        <input
          type="text"
          id="add-user-name"
          placeholder="Username"
          required
          value={city.username}
          onChange={handleChange("username")}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="add-city">City:</Form.Label>
        <input
          type="text"
          id="add-city"
          placeholder="City"
          required
          value={city.fav_city}
          onChange={handleChange("fav_city")}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="add-state">State</Form.Label>
        <input
          type="text"
          id="add-state"
          placeholder="State"
          required
          value={city.state_code}
          onChange={handleChange("state_code")}
        />
      </Form.Group>
      <Form.Group>
        <Button type="submit" variant="outline-success">
          {city.user_id ? "Edit Contact" : "Add Contact"}
        </Button>
        {city.user_id ? (
          <Button type="button" variant="outline-warning" onClick={clearForm}>
            Cancel
          </Button>
        ) : null}
      </Form.Group>
    </Form>
  );
};

export default UserForm;
