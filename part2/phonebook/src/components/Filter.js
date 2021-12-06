const Filter = ({ newFilter, handleChangeFilter }) => {
  return (
    <div>
      filter shown with <input value={newFilter} onChange={handleChangeFilter} />
    </div>
  )
}

export default Filter