import './movieList.css'
import Card from '../card/card'
import { movies } from './movies'
export default function MovieList() {

  return (
    <section id="catalog" className='cards-wrapper'>
      <div className="container">
        <h2>Catálogo</h2>
        <div className="cards">
          {movies.map((movie, index) => {
            return (
              <Card key={index} {...movie} />
            )
          })}

        </div>
      </div>
    </section>
  )
}
