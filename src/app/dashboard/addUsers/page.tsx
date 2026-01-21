"use client";
import { useState, FormEvent } from "react";

export default function AddUsers() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const sendForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age }),
    });
    setName("");
    setAge("");
  };

  return (
    <form onSubmit={sendForm}>
      <label htmlFor="name">Podaj imię</label>
      <input
        id="name"
        type="text"
        placeholder="Podaj imię.."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label htmlFor="age">Podaj wiek</label>
      <input
        id="age"
        type="text"
        placeholder="Podaj wiek.."
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <input type="submit" value="Wyślij" />
    </form>
  );
}
