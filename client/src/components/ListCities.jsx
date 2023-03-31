import React, { useState, useEffect } from "react";
import * as ioicons from "react-icons/io5";
import City from "./City";
import UserForm from "./UserForm";

const ListCities = () => {
  // this is my original state with an array of contacts
  const [cities, setCities] = useState([]);

  //   needed to do update request
  const [editingCity, setEditingCity] = useState(null);

  // A function to fetch the list of contacts that will be load anytime that list change
  const loadCities = () => {
    fetch("http://localhost:8080/api/cities")
      .then((response) => response.json())
      .then((cities) => {
        setCities(cities);
      });
  };

  useEffect(() => {
    loadCities();
  }, [setCities]);

  const addCity = (newCity) => {
    setCities([...cities, newCity]);
  };

  // reload cities after a city is updated
  const afterCityUpdate = () => {
    loadCities();
  };

  //A function to handle the Delete funtionality
  const handleDelete = (user_id) => {
    return fetch(`http://localhost:8080/api/user/${user_id}`, {
      method: "DELETE",
    }).then((response) => {
      console.log(response);
      setCities(cities.filter((city) => city.user_id !== user_id));
      // if (response.ok) {
      //   loadContacts();
      // }
    });
  };

  //when user clicks edit button update the state of editingCity
  const handleEdit = (city) => {
    setEditingCity(city);
  };

  return (
    <div className="mybody">
      <div className="list-students">
        <h2>My Favorite Cities</h2>
        <ul>
          {cities.map((city) => {
            return (
              <li key={city.user_id}>
                <City city={city} onEdit={handleEdit} onDelete={handleDelete} />
              </li>
            );
          })}
        </ul>
      </div>
      <UserForm
        key={editingCity ? editingCity.user_id : null}
        addCity={addCity}
        editingCity={editingCity}
        afterCityUpdate={afterCityUpdate}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default ListCities;
