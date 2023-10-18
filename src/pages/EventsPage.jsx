import { Box, Button as CButton, Center, Heading, Input } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { EventsList } from "../components/EventsList"
import "./Pages.css"
import { FilterBar } from "../components/FilterBar"
import { motion, AnimatePresence } from "framer-motion"

export const EventsPage = () => {
  const [events, setEvents] = useState([]) //holds state of all the events
  const [filtered, setFiltered] = useState([]) //copy of events state
  const [activeGenre, setActiveGenre] = useState(0) //used to see which category box is active
  const [search, setSearch] = useState("") //search state on event names
  const [categories, setCategories] = useState([]) //category state of all categories
  const [users, setUsers] = useState([])

  useEffect(() => {
    requestEvents()
    requestCategories()
    requestUsers()
  }, [])

  const requestEvents = async () => {
    const response = await fetch("http://localhost:3000/events")
    const eventList = await response.json()
    setEvents(eventList)
    setFiltered(eventList)
    console.log("Events:", events.length)
    console.log(filtered)
  }

  const requestCategories = async () => {
    const response = await fetch("http://localhost:3000/categories")
    const categories = await response.json()
    setCategories(categories)
    console.log("Categories:", categories)
  }

  const requestUsers = async () => {
    const response = await fetch("http://localhost:3000/users")
    const users = await response.json()
    setUsers(users)
    console.log("Users:", users)
  }
  const filteredEvents = events.filter(event => {
    return search.toLowerCase() === "" || event.title.toLowerCase().includes(search)
  })
  /*
  

  const filterByName = name => {
    return categories.filter(category => category.name.toLowerCase().includes(name.toLowerCase()))
  }
  */
  /*
  const filteredEvent = events.filter(event => event.categoryIds === categories.id)
const filteredCategorie = categories.filter(category => category.id === events.categoryIds) 
*/
  /*
  const filterEvents = () => {
    return events.filter(event => {
      const titleMatch = event.title.toLowerCase().includes(search.toLowerCase())
      const categoryMatch = event.categoryIds && event.categoryIds.includes(inputValue)
      console.log("categoryMatch logt:" + categoryMatch)
      return titleMatch && categoryMatch
    })
  }
*/

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
        <FilterBar categories={categories} events={events} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre} />
      </Center>
      <Box ml={"10"} mr={"5"}>
        <motion.ul layout>
          <AnimatePresence>
            {filteredEvents.map(event => {
              return <EventsList key={event.id} event={event} />
            })}
          </AnimatePresence>
        </motion.ul>

        <Link to={"/form/new"}>
          <CButton variant={"outline"} size={"md"} style={{ backgroundColor: "#7ce604", position: "fixed", bottom: "0px", right: "0px" }}>
            Add events
          </CButton>
        </Link>
      </Box>
    </div>
  )
}
