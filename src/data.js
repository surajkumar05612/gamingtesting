import React, { useEffect, useState } from "react";
import "./data.css";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import mainimg from "./assets/main.png";

function Data () {
    const [apiData, setData] = useState([]);
    const [text, setText] = useState(' ');
    const [gameName, setName] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    // DOM elements
    const inputValue = text;

    const fetchData = () =>{
        fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json")
        .then((response)=> {
            return response.json();
        }).then((data)=> {
            data.shift();
            setData(data);
            setName(data);
            // console.log(data);
        })
    }

    useEffect(()=> {
        fetchData();
    }, [])

    // popular games sorting and display
    const popular = [];
    
    apiData.map(function(object){
        if(object.score >= 9.2){
            popular.push(object);
        }
    });
    popular.shift();

    // sorting games on score ascending and descending
    function compareScoreAscending(a, b){
        return a.score - b.score;
    }

    function compareScoreDesending(a, b){
        return b.score - a.score;
    }

    // functions for sorting data
    const dataAscend =() => {
        apiData.sort(compareScoreAscending)
        setData([...apiData]);
    }

    const dataDescend = () => {
        apiData.sort(compareScoreDesending);
        setData([...apiData]);
    }

    const dataAlphabet = () => {
        apiData.sort(compareName);
        setData([...apiData]);
    }

    // sorting games on alphabetical order
    function compareName(a, b){
        const name1 = a.title.toUpperCase();
        const name2 = b.title.toUpperCase();

        let comparison = 0;

        if(name1 > name2){
            comparison = 1;
        } else if(name1 < name2){
            comparison = -1;
        }
        return comparison;
    }

    //displaying popular games data 
    const popularCard = popular.map(function(object, i){
        return <div className="card" key={i}>
            <div className="card-title">
                {object.title}
            </div>
            <div className="card-platform">
                Developed For : {object.platform}
            </div>
            <div className="card-score">
                Score : {object.score}
            </div>
            <div className="card-genre">
                Genre : {object.genre}
            </div>
        </div>
    })

    // displaying all games on webp page
    const gameCard = apiData.map(function(object, i){
        return <div className="gamecard" key={i}>
            <div className="title">
                {object.title}
            </div>
            <div className="platform">
                Developed For : <span>{object.platform}</span>
            </div>
            <div className="points">
                Score : <span>{object.score}</span>
            </div>
            <div className="genre">
                Genre : <span>{object.genre}</span>
            </div>
            <div className="editorschoice">
                Editors Choice : <span>{object.editors_choice}</span>
            </div>
        </div>
    })

    // autocomplete feature during search
    const onChangeHandler = (text) => {
        let matches = [];
        if(text.length > 0){
            matches = gameName.filter(name => {
                const regex = new RegExp(`${text}`, `gi`);
                return name.title.match(regex)
            })
        }
        setSuggestions(matches);
        setText(text)
    }

    const onSuggestHandler = (text) => {
        setText(text);
        setSuggestions([]);
    }

    // searching via name
    const searchedData = [];
    const onSearchHandler = () => {
        apiData.map(function(object){
            if(object.title === inputValue){
                searchedData.push(object);
            }
        });
        console.log(searchedData);
    }
 
    return(
        <>
            <div className="header">
                <div>
                    <input type="text" placeholder="Search"
                     onChange={e => onChangeHandler(e.target.value)}
                     value={text}/>
                     <div className="suggestion-parent">
                     {suggestions && suggestions.map((suggestions, i) => 
                        <div className="suggestion" key={i}
                        onClick={()=>onSuggestHandler(suggestions.title)}>
                            {suggestions.title}
                        </div>
                     )}
                     </div>
                     <button type="submit" onClick={()=> onSearchHandler()}>Search</button>
                </div>
                <div className="socials">
                    <a href="https://www.instagram.com/surajkumarjena.005612/" target="blank"><FaInstagram /></a>
                    <a href="https://www.facebook.com/suraj.jena.771" target="blank"><FaFacebook /></a>
                    <a href="https://www.linkedin.com/in/surajkumarjena/" target="blank"><FaLinkedin /></a>
                    <a href="https://devsuraj-portfolio.netlify.app/" target="blank"><FaUser /></a>
                </div>
            </div>
            <div className="section1" id="section1">
                <div className="section-parent">
                    <div className="left">
                        <div className="text">
                            <h2>Welcome To Gaming Buddy !</h2>
                            <a href="#section2"><button type="submit">Explore Games</button></a>
                        </div>
                        <div className="image">
                            <img src={mainimg} alt="main-img"></img>
                        </div>
                    </div>
                    <div className="right">
                        <h2>Most Popular Games</h2>
                        <div className="card-parent">
                            {popularCard}
                        </div>
                    </div>
                </div>
            </div>
            <div className="section2" id="section2">
                <div className="top">
                    <h2>Explore The Game Of Your Choice !</h2>
                    <div className="dropdown">
                        <ul>
                            <li onClick={() => dataAlphabet()}>Sort By Alphabet</li>
                            <li onClick={() => dataAscend()}>Sort By Ascending Score</li>
                            <li onClick={() => dataDescend()}>Sort By Descending Score</li>
                        </ul>
                    </div>
                </div>
                <div className="gamelist-parent">
                    {gameCard}
                </div>
            </div>
        </>
    )
}

export default Data;