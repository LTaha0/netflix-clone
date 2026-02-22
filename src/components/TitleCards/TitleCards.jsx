import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom';
// import cards_data from '../../assets/cards/Cards_data'



const TitleCards = ({title,caregory}) => {
  const [apiData,setApiData]=useState([]);
  const cardsRef=useRef();
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTQyYmIzNzAwYjVmNTFmMDQ5NjQxMDkwZmIyYmNlOCIsIm5iZiI6MTc1NDIyNzQ5Ny42MDgsInN1YiI6IjY4OGY2MzI5ZTcxZDM0NGYyMGIyMmYyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2EXPCQ8MN59aa8c7zNnFMwZgww9oOxWJHX6Vi0PigeY'
  }
};


  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${caregory?caregory:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel',handleWheel)
  },[])
  

const handleWheel=(event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft+= event.deltaY;
}
  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return(
          <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>)
        })}
      </div>
    </div>
  )
}

export default TitleCards