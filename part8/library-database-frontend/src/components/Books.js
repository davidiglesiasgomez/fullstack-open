import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BookList from '../components/BookList'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const result = useQuery(ALL_BOOKS, {
    variables: ( genre !== '' ? { genre } : {} ),
    skip: !props.show
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = result.data.allGenres

  return (
    <div>
      <h2>books</h2>
      <BookList books={books} />
      {genres.map((item, i) => (
        <button key={i} onClick={() => setGenre(item)}>{item}</button>
      ))}
      <button onClick={() => setGenre('')}>All Genres</button>
    </div>
  )
}

export default Books
