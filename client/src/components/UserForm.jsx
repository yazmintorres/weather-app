import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import WeatherCard from "./WeatherCard";

const UserForm = ({ addCity, editingCity, afterCityUpdate, onEdit }) => {
  const [weatherData, setWeatherData] = useState(false);
  console.log("editing city", editingCity);

  // create initial state for contacts list
  const [city, setCity] = useState(
    editingCity || {
      username: "",
      fav_city: "",
      state_code: "",
      isFav: false,
    }
  );

  useEffect(() => {
    console.log(city);
  }, [city]);
  //create functions that handle the event of the user typing into the form
  const handleChange = (property) => {
    return (e) => {
      const { value, type, checked } = e.target;
      console.log(value, type, checked);
      setCity({
        ...city,
        [property]: type === "checkbox" ? checked : value,
      });
    };
  };

  const clearForm = () => {
    console.log("test");
    setCity({
      username: "",
      fav_city: "",
      state_code: "",
      isFav: false,
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
        // clearForm();
      });
  };

  //A function to handle the submit in both cases - Post and Put request!
  const handleSubmit = async (e) => {
    e.preventDefault();
    const temp = { ...city };
    temp.fav_city = city.fav_city.trim();
    temp.state_code = city.state_code.toUpperCase();
    try {
      const response = await fetch(
        `http://localhost:8080/api/weather?username=${temp.username}&fav_city=${temp.fav_city}&state_code=${temp.state_code}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error.message);
    }
    if (temp.isFav) {
      if (temp.user_id) {
        putCity(temp);
      } else {
        postCity(temp);
      }
    }
  };

  // handle

  return (
    <div className="form-students">
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
          <Form.Check
            type={"checkbox"}
            id={`isFav-checkbox`}
            label={`Check if you want to add to favorites`}
            value={city.isFav}
            onChange={handleChange("isFav")}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit" variant="outline-success">
            Get Weather
          </Button>
          {city.user_id ? (
            <Button type="submit" variant="outline-success">
              Edit
            </Button>
          ) : null}
          {city.user_id ? (
            <Button type="button" variant="outline-warning" onClick={clearForm}>
              Cancel
            </Button>
          ) : null}
        </Form.Group>
      </Form>
      {weatherData ? (
        <WeatherCard weatherData={weatherData} state_code={city.state_code} />
      ) : (
        <span>Please add information</span>
      )}
    </div>
  );
};

export default UserForm;

{
  /* <Button
// onClick={onHeartClick}
style={favHeart ? { color: "palevioletred" } : null}
type="button"
variant="heart"
className="heart"
>
<span>&#10084;</span>
</Button> */
}
