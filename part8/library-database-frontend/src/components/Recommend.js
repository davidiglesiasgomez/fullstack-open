import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'
import BookList from '../components/BookList'

const Recommend = (props) => {
  const { loading, data } = useQuery(ME, {
    skip: !props.show
  });
  const { loading: loadingBooks, data: dataBooks } = useQuery(ALL_BOOKS, {
    variables: { genre: (data && data.me && data.me.favoriteGenre ? data.me.favoriteGenre : null ) },
    skip: !(data && data.me && data.me.favoriteGenre )
  });

  if (!props.show) {
    return null
  }

  if (loading || loadingBooks) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre <strong>{data.me.favoriteGenre}</strong></p>
      <BookList books={dataBooks.allBooks} />
    </div>
  )
}

export default Recommend
