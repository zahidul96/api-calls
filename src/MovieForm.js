import React, { useState } from "react";
const MovieForm = () => {
  const [userData, setUserData] = useState({
    title: "",
    openingText: "",
    releaseDate: "",
  });
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const newMovieObject = {
      title: userData.title,
      openingText: userData.openingText,
      releaseDate: userData.releaseDate,
    };
    console.log(newMovieObject);
    setUserData({
      title: "",
      openingText: "",
      releaseDate: "",
    });
  };
  return (
    <>
      <form
        onSubmit={formSubmitHandler}
        style={{ display: "flex", flexDirection: "column", width: "200px" }}
      >
        <label htmlFor="title">Title:</label>
        <input
          onChange={(e) => {
            setUserData((prevState) => {
              return { ...prevState, title: e.target.value };
            });
          }}
          type="text"
          id="title"
          name="title"
          value={userData.title}
        />
        <label htmlFor="openingText">Opening Text:</label>
        <input
          onChange={(e) => {
            setUserData((prevState) => {
              return { ...prevState, openingText: e.target.value };
            });
          }}
          type="text"
          id="openingText"
          name="openingText"
          value={userData.openingText}
        />
        <label htmlFor="releaseDate">Release Date:</label>
        <input
          onChange={(e) => {
            setUserData((prevState) => {
              return { ...prevState, releaseDate: e.target.value };
            });
          }}
          type="text"
          id="releaseDate"
          name="releaseDate"
          value={userData.releaseDate}
        />
        <button type="submit">Add Movie</button>
      </form>
    </>
  );
};
export default MovieForm;
