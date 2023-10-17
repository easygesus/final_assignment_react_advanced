import { Box, Button as CButton, Card, Center, Divider, Heading, Input } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Pages.css"

export const EventsPage = () => {
  const [search, setSearch] = useState("") //search state on event names
  const [inputValue, setInputValue] = useState("")
  const [categories, setCategories] = useState([]) //category state of all categories
  const [filteredCategories, setFilteredCategories] = useState(categories)
  const [events, setEvents] = useState([]) //holds state of all the events

  useEffect(() => {
    requestEvents()
    requestCategories()
    requestUsers()
  }, [])

  const requestEvents = async () => {
    const response = await fetch("http://localhost:3000/events")
    const eventList = await response.json()
    setEvents(eventList)
    console.log(events)
  }

  const requestCategories = async () => {
    const response = await fetch("http://localhost:3000/categories")
    const categories = await response.json()
    setCategories(categories)
    console.log(categories)
  }

  const requestUsers = async () => {
    const response = await fetch("http://localhost:3000/users")
    const users = await response.json()
    console.log(users)
  }

  const handleInputChange = value => {
    setInputValue(value)

    const filtered = filterByName(value)
    setFilteredCategories(filtered)
  }

  const filterByName = name => {
    return categories.filter(category => category.name.toLowerCase().includes(name.toLowerCase()))
  }

  const filteredEvents = events.filter(event => {
    return search.toLowerCase() === "" || event.title.toLowerCase().includes(search)
  })

  const filteredEvent = events.filter(event => event.categoryIds === categories.id)

  const filteredCategorie = categories.filter(category => category.id === events.categoryIds)

  return (
    <div className="events-list">
      <Center>
        <Heading>List of events</Heading>
      </Center>
      <Center>
        <label>
          Search:
          <Input type="text" name="search-bar" placeholder="event..." onChange={e => setSearch(e.target.value)} w={200} ml={2} mt={3} mb={3} mr={300} />
        </label>
        <label>
          <Input type="text" name="cat-bar" placeholder="category..." value={inputValue} onChange={e => handleInputChange(e.target.value)} w={200} mt={3} mb={3} mr={30} />
        </label>
      </Center>

      <ul>
        {filteredCategories.map(category => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>

      <Box ml={"10"} mr={"5"}>
        <ul>
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <li key={event.id}>
                <Card>
                  <Link to={`/event/${event.id}`} className="navItem-title">
                    <span className="event-title">{event.title}</span> <span className="clickable-title">(click for details...)</span>
                  </Link>
                  <strong>
                    <h3>Description:</h3>
                  </strong>

                  {event.description}
                  <br></br>
                  <img src={event.image} />
                  <strong>
                    <h3>Start:</h3>
                  </strong>
                  {event.startTime && event.startTime.slice(11, 16)}
                  <strong>
                    <h3>End:</h3>
                  </strong>
                  {event.endTime && event.endTime.slice(11, 16)}
                  <Divider orientation="horizontal" height={"10"} />
                </Card>
              </li>
            ))
          ) : (
            <p>Search not found...</p>
          )}
        </ul>
        <Link to={"/form/new"}>
          <CButton variant={"outline"} size={"md"} style={{ backgroundColor: "#7ce604", position: "fixed", bottom: "0px", right: "0px" }}>
            Add events
          </CButton>
        </Link>
      </Box>
    </div>
  )
}

/*  chat gpt code
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Box, Card, Center, Divider, Heading, Input, Button as CButton } from "@chakra-ui/react"

export const EventsPage = () => {
  const [search, setSearch] = useState("") // Search state on event names
  const [events, setEvents] = useState([]) // Holds state of all the events
  const [inputValue, setInputValue] = useState("")
  const [categories, setCategories] = useState([]) // Holds state of categories

  useEffect(() => {
    requestEvents()
    requestCategories()
    requestUsers()
  }, [])

  const requestEvents = async () => {
    const response = await fetch("http://localhost:3000/events")
    const eventList = await response.json()
    setEvents(eventList)
  }

  const requestCategories = async () => {
    const response = await fetch("http://localhost:3000/categories")
    const categories = await response.json()
    setCategories(categories)
    console.log(categories)
  }

  const requestUsers = async () => {
    const response = await fetch("http://localhost:3000/users")
    const users = await response.json()
    console.log(users)
  }

  const filterEvents = () => {
    return events.filter(event => {
      const titleMatch = event.title.toLowerCase().includes(search.toLowerCase())
      const categoryMatch = event.categoryIds && event.categoryIds.includes(inputValue)
      return titleMatch && categoryMatch
    })
  }

  return (
    <div className="events-list">
      <Center>
        <Heading>List of events</Heading>
      </Center>
      <Center>
        <label>
          Search:
          <Input type="text" name="search-bar" placeholder="event..." onChange={e => setSearch(e.target.value)} w={200} ml={2} mt={3} mb={3} mr={300} />
        </label>
        <label>
          <Input type="text" name="cat-bar" placeholder="category..." value={inputValue} onChange={e => setInputValue(e.target.value)} w={200} mt={3} mb={3} mr={30} />
        </label>
      </Center>

      <Box ml={"10"} mr={"5"}>
        <ul>
          {filterEvents().length > 0 ? (
            filterEvents().map(event => (
              <li key={event.id}>
                <Card>
                  <Link to={`/event/${event.id}`} className="navItem-title">
                    <span className="event-title">{event.title}</span> <span className="clickable-title">(click for details...)</span>
                  </Link>
                  <strong>
                    <h3>Description:</h3>
                  </strong>
                  {event.description}
                  <br></br>
                  <img src={event.image} alt={event.title} />
                  <strong>
                    <h3>Start:</h3>
                  </strong>
                  {event.startTime && event.startTime.slice(11, 16)}
                  <strong>
                    <h3>End:</h3>
                  </strong>
                  {event.endTime && event.endTime.slice(11, 16)}
                  <Divider orientation="horizontal" height={"10"} />
                </Card>
              </li>
            ))
          ) : (
            <p>Search not found...</p>
          )}
        </ul>
        <Link to={"/form/new"}>
          <CButton variant={"outline"} size={"md"} style={{ backgroundColor: "#7ce604", position: "fixed", bottom: "0px", right: "0px" }}>
            Add events
          </CButton>
        </Link>
      </Box>
    </div>
  )
}
*/
