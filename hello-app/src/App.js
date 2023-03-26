import axios from "axios";
import React, { useState } from "react";
import "./App.css";

function App() {
  const hostname = `${window.location.hostname}`;
  console.log(hostname);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [images, setImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [data, setData] = useState(null);
  const handleChange = (event) => {
    let input = document.getElementById("input");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = (e) => {
      console.log(e.target.result);
      setImage(e.target.result);
    };
  };
  const submitPost = async () => {
    let listNumbers = numbers.split(" ");
    console.log("check");
    console.log(`${hostname}:8088/process-image`);
    try {
      console.log("submit");
      console.log(images);
      console.log(name);
      console.log(surname);
      const result = await axios.post(
        `http://${hostname}:8088/process-image`,
        { image: images, name: name, surname: surname, numbers: listNumbers },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setData(result.data);
      setShowImage(result.data.processed_image);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-12 col-md-6 offset-md-3">
          <h2 className="my-4 text-center">Software Devtool</h2>

          
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group" style={{ marginLeft: 10 }}>
                <label htmlFor="surname">Your Surname</label>
                <input
                  onChange={(e) => setSurname(e.target.value)}
                  type="text"
                  className="form-control"
                  id="surname"
                  placeholder="Enter your surname"
                />
              </div>
              <div className="form-group" style={{ marginLeft: 10 }}>
                <label htmlFor="number">Your Susent ID</label>
                <input
                  onChange={(e) => setNumbers(e.target.value)}
                  type="text"
                  className="form-control"
                  id="number"
                  placeholder="Enter your student id"
                />
              </div>
            </div>
            <div className="form-group">
              <input id="input" type="file" onChange={() => handleChange()} />
            </div>
          <button type="submit" className="btn btn-primary" onClick={() => submitPost()}>Submit</button>
          
        </div>

        {images && (
          <div
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <img
              id="images"
              width={500}
              height={350}
              src={images}
              alt="img1"
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
        <div
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {showImage && (
            <img
              id="image2"
              width={500}
              height={350}
              src={showImage}
              alt="imgoutput"
              style={{ objectFit: "contain" }}
            />
          )}
        </div>
        {data && (
          <div>
            <div>{data.name + " " + data.surname}</div>
            <ul>
              {data.numbers.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
