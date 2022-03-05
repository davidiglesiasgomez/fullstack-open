const BookList = (props) => {
  return (
    <table>
    <tbody>
        <tr>
        <th></th>
        <th>author</th>
        <th>published</th>
        </tr>
        {props.books.map((item) => (
        <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.author.name}</td>
            <td>{item.published}</td>
        </tr>
        ))}
    </tbody>
    </table>
  )
}

export default BookList
