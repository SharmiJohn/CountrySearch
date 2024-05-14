import { useEffect, useState } from "react";
import style from "./App.css";
import axios from "axios";
const Tile = ({ image, Alt, name }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "150px",
        padding: "10px",
        border: "1px solid rgb(87, 84, 84)",
        borderRadius: "5px",

        margin: "10px",
        height: "150px",
      }}
    >
      <img style={{ width: "100%", height: "50%" }} src={image} alt={Alt} />
      <h3>{name}</h3>
    </div>
  );
};

function App() {
  const [data, setdata] = useState([]);
  const [value, setvalue] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setdata(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);
  console.log(data);
  const filterdata = data.filter((countryname) =>
    countryname.name.common.toLowerCase().includes(value.toLowerCase())
  );
  console.log("filter", filterdata);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <input
          style={{ width: "600px", height: "20px" }}
          type="text"
          value={value}
          placeholder="Search for countries"
          onChange={(e) => {
            setvalue(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          width: "100%",
          height: "10vh",
          flexDirection: "row",
        }}
      >
        {filterdata.map((data, index) => (
          <Tile
            key={index}
            image={data.flags.png}
            Alt={data.flags.alt}
            name={data.name.common}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
