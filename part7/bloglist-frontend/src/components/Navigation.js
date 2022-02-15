import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { userLogout } from '../reducers/authReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.user)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(userLogout())
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="p-3">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link className="text-light p-1" to="/">home</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link className="text-light p-1" to="/blogs">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link className="text-light p-1" to="/users">users</Link>
          </Nav.Link>
          {loggedUser
            ? <>
              <Navbar.Text>{loggedUser.name} logged in</Navbar.Text>
              <Nav.Link href="#" as="span">
                <Link className="text-light p-1" onClick={handleLogout}>logout</Link>
              </Nav.Link>
            </>
            : <Nav.Link href="#" as="span"><Link to="/login">login</Link></Nav.Link>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation