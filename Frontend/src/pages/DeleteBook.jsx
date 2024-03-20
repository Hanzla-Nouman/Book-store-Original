import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";
import BackButton from "../Components/BackButton";

const DeleteBook = () => {
  const { id } = useParams();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const handleDeleteBook = () => {
    setloading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setloading(false);
        navigate("/");
      })
      .catch((err) => {
        setloading(false);
        alert("An error occured");
        console.log(err);
      });
  };

  return (
    <div className="p-4">
    <BackButton />
    <h1 className="text-3xl my-4">Delete Book</h1>
    {loading && <Spinner />}
    <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl p-8 mx-auto w-[600px]">
      <h3 className="text-2xl">Are you sure you want to delete it?</h3>
      <button
        className="p-4 bg-red-600 text-white m-8 w-full"
        onClick={handleDeleteBook}
        style={{ alignSelf: 'center' }} // Align button to center horizontally
      >
        Yes, delete it!
      </button>
    </div>
  </div>
  );
};

export default DeleteBook;
