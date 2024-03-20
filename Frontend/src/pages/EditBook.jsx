import React, { useState, useEffect } from "react";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setauthor] = useState("");
  const [publishedYear, setpublishedYear] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setloading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setauthor(res.data.author);
        setpublishedYear(res.data.publishedYear);
        setTitle(res.data.title);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        alert("An error occurred");
        console.log(err);
      });
  },[]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishedYear,
    };
    setloading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setloading(false);
        navigate("/");
      })
      .catch((err) => {
        setloading(false);
        alert("An error happened");
        console.log(err, "kjhgf");
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 mx-auto w-[600px]">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setauthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Published Year</label>
          <input
            type="text"
            value={publishedYear}
            onChange={(e) => setpublishedYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
