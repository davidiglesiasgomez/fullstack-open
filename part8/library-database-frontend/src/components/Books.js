import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')

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

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.filter(item => ( genre === '' ? true : item.genres.includes(genre) )).map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.author.name}</td>
              <td>{item.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((item, i) => (
        <button key={i} onClick={() => setGenre(item)}>{item}</button>
      ))}
      <button onClick={() => setGenre('')}>All Genres</button>
    </div>
  )
}

export default Books
