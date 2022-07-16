import React, { useEffect, useState } from "react";
import "./data.css";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

function Data () {
    const [apiData, setData] = useState([]);

    const fetchData = () =>{
        fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json")
        .then((response)=> {
            return response.json();
        }).then((data)=> {
            data.shift();
            setData(data);
            console.log(data);
        })
    }

    
    // popular games sorting
    const popular = [];

    apiData.map(function(object, i){
        if(object.score >= 9.2){
            popular.push(object);
        }
    });

    popular.shift();
    console.log(popular);

    // 
    useEffect(()=> {
        fetchData();
    }, [])

    return(
        <>
            <div className="header">
                <div>
                    <input type="text" placeholder="Search"></input>
                </div>
                <div className="socials">
                    <a href="#home" target="blank"><FaInstagram /></a>
                    <a href="#home" target="blank"><FaFacebook /></a>
                    <a href="#home" target="blank"><FaLinkedin /></a>
                    <a href="#home" target="blank"><FaUser /></a>
                </div>
            </div>
            {/* <div>
               {apiData.map(function(object, i){
                return <div key={i}> 
                    {[
                        <p key={i}>{object.title}</p>
                    ]}
                </div>
               })}
            </div> */}
        </>
    )
}

export default Data;