export const DropDownUser = ({ users, setSelectedUser }) => {
  const handleChange = e => {
    setSelectedUser(e.target.value)
  }

  return (
    <div className="container">
      <select onChange={handleChange} name="createdBy" className="dropdown">
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  )
}
