import React, { useState } from "react";
import "../css/header.css";
export default function Header() {
  let now = new Date();
  let date = now.getDate();
  date = date.toString().length === 1 ? "0" + date : date;
  let month = now.getMonth() + 1;
  month = month.toString().length === 1 ? "0" + month : month;
  let year = now.getFullYear();
  let hours = now.getHours();
  hours = hours.toString().length === 1 ? "0" + hours : hours;
  let minutes = now.getMinutes();
  minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
  let seconds = now.getSeconds();
  seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;

  const [user, setUser] = useState({
    name: "Admin",
  });

  return (
    <div className="banner header paddingMedium marginVerticalMedium grid">
      <h1> Welcome {user.name}</h1>
      <div className="info">
        <p className="currentDate">Today is the {date}.{month}.{year}</p>
        <p className="currentTime">Access time is {hours}:{minutes}:{seconds}</p>
      </div>
    </div>
  );
}
