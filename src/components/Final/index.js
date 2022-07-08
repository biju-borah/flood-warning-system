import "./final.css";
import React, { useEffect, useState } from "react";
import assamPic from "../../assests/images/Assam.jpg";
import { useParams } from 'react-router-dom';
import Loader from "../shared/Loader";
import image99 from "../../assests/images/99.png"
import image100 from "../../assests/images/100.png"
import image101 from "../../assests/images/101.png"
import image102 from "../../assests/images/102.png"
import axios from "axios";

const image = {
  99: image99,
  100: image100,
  101: image101,
  102: image102
}

function Final() {

  const { id } = useParams();
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState(false)
  const [data, setdata] = useState(0)
  useEffect(() => {
    console.log(id.substring(0, 2))

    axios.post('https://backend-flood.herokuapp.com/waterlevel_prediction', {
      date: id.substring(0, 2), headers: { "Access-Control-Allow-Origin": "https://flood-warning-system.vercel.app/" },
    })
      .then(function (response) {
        console.log(response);
        setloading(false)
        setdata(response.data)

      })
      .catch(function (error) {
        console.log(error);
        setloading(false)
        seterror(true)
      });
  }, [])

  return (
    loading ? <Loader /> : <div style={{ height: "100vh", overflowY: "scroll" }}>
      <div className="resultPage-div">
        <div
          className="container-r-2"
          style={{ position: "relative", flexDirection: "column" }}
        >
          <h5 style={{ position: "relative", bottom: "5px" }}>Chenimari (Khowang)</h5>
          <div className="image-wrapper">
            <img className="resultMap" src={error ? assamPic : data < 100 ? image[99] : data < 101 ? image[100] : data < 102 ? image[101] : image[102]}></img>
          </div>
          <a href="#Result">
            <button className="btn-data">Detail</button>
          </a>
          <a href="/Maps">
            <button className="btn-map">Generate Map</button>
          </a>
        </div>
      </div>

      <div id="Result" className="resultPage-div-f">
        <div className="container-rr-1" style={{ width: "95%" }}>
          <div className="data-div" style={{ display: "flex", width: "100%", justifyContent: "space-evenly", marginBottom: "40px" }}>
            <h5>Water-level: {error ? "Something went wrong" : data.toFixed(2)}</h5>
            <h5>Date: {id}</h5>
            <h5>Location: Chenimari</h5>
          </div>
          <div>
            <h5>Mitigation</h5>
            <p>
              {" "}
              Short Term <br />
              Strategic Planning<br />
              The Time period could be used for planning and evacuation of the affected area <br /><br />

              Long Term<br />
              Structures to Conserve Nature<br />
              Renewal of Wetlands,Preventing Erosion and Maintaining Land Mass Elevation,Recharge and Replenish Groundwater<br /><br />

              {/* Controlled development of the Area<br />
              Building Bye-laws,Development Control Norms, Land-Use analysis based on these factors<br /><br />

              Flood- Based Farming System<br />
              Planning of Water Distribution, Field Water Management, Groundwater Use, Agronomic Practices, Multi-functional use */}

            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Final;
