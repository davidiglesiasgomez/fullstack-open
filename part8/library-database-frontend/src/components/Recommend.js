import { useQuery } from '@apollo/client'
import { RECOMMENDATIONS } from '../queries'
import BookList from '../components/BookList'

const Recommend = (props) => {
  const result = useQuery(RECOMMENDATIONS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre <strong>{result.data.me.favoriteGenre}</strong></p>
      <BookList books={result.data.allBooks.filter(item => item.genres.includes(result.data.me.favoriteGenre))} />
    </div>
  )
}

export default Recommend
