import { IoIosArrowUp, IoIosArrowBack } from "react-icons/io";

export default function Filter() {
  return (
    <div className="filter">
      <div className="filter__head">
        <span>Filter</span>
        <button className="filter__hide">
          <IoIosArrowBack />
        </button>
      </div>

      <div className="filter__param">
        <label className="filter__param-section">
          <span className="filter__param-type">
            <IoIosArrowUp />
          </span>
          <input type="checkbox" className="filter__param-hide" />
          <div className="filter__param-body"></div>
        </label>
      </div>

      <div className="filter__confirm">
        <button className="filter__clear-all">clear all</button>
        <button className="filter__done">done</button>
      </div>
    </div>
  );

const colorsHex: { [color: string]: string } = {
  Black: "#000",
  White: "#fff",
  "Twist W Panda": "linear-gradient(to right, #000 50%, #fff 50%)",
  "Dark Mocha": "#3e2f35",
  Brown: "#563d2d",
  "University Blue": "#99badd",
  "University Blue Black": "linear-gradient(to right, #99badd 50%, #000 50%)",
  Denim: "#acc5da",
  Blue: "#316fb4",
  "Court Purple": "#6a0dad",
  "Midnight Navy": "#333356",
  Chicago: "#d22030",
  Bred: "linear-gradient(to right, #000 50%, #ce2029 50%)",
  "Varsity Red": "#b01317",
  "Fire Red": "#eb3a1e",
  "Pink Glaze": "#f7c4d6",
  Pinksicle: "#f8b0bc",
  "Lucky Green": "#0c9e5a",
  "Clay Green": "#778a5f",
  "Yellow Toe":
    "linear-gradient(to right, #000 33%, #fff 33%, #fff 66%, #ffcc00 66%)",
  Shadow: "linear-gradient(to right, #949494 50%, #000 50%)",
  "Wolf Grey": "#919494",
  Grey: "#ccc",
  "Multi Color":
    "radial-gradient(circle, #003049 25%, #d62828 30%, #d62828 50%, #fcbf49 55%)",
};
