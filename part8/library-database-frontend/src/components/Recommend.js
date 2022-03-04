import { useQuery } from '@apollo/client'
import { RECOMMENDATIONS } from '../queries'

const Recommend = (props) => {
  const result = useQuery(RECOMMENDATIONS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  console.log(result.data)

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre <strong>{result.data.me.favoriteGenre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.filter(item => item.genres.includes(result.data.me.favoriteGenre)).map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.author.name}</td>
              <td>{item.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Recommend
