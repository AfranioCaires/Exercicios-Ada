import React from 'react'
import './app.css'
import Header from '../header/header'
import Hero from '../hero/hero'
import MovieList from '../movieList/movieList'
import Footer from '../footer/footer'

function App() {
  return (
    <>
      <Header />
      <Hero title={"Encontre novos filmes"}
        textContent={"Veja nosso catálogo e descubra histórias incríveis. Explore uma vasta seleção de filmes de diferentes gêneros e épocas. Desde clássicos do cinema até as últimas produções, temos opções para todos os gostos."}
        imgSrc={"/src/assets/movies.jpg"}
        imgAlt={"catálogo de filmes"} />
      <MovieList />
      <Footer />
    </>
  )
}

export default App