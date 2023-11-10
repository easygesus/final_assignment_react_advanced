import { Box, Button as CButton, Center, Heading, Input, SimpleGrid, Card } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { EventsList } from "../components/EventsList"
import { FilterBar } from "../components/FilterBar"
import "./Pages.css"

export const EventsPage = () => {
  const [events, setEvents] = useState([]) //holds state of all the events
  const [filtered, setFiltered] = useState([]) //copy of events state
  const [search, setSearch] = useState("") //search filter on event names
  const [categories, setCategories] = useState([]) //category state of all categories
  const [activeCategories, setActiveCategories] = useState([]) //array with categories to filter events
  const [users, setUsers] = useState([]) //stores all users state
  const [eventDeleted, setEventDeleted] = useState() //state handling for deleting events
  //const [isFilterActive, setIsFilterActive] = useState(false)

  useEffect(() => {
    requestEvents()
    requestCategories()
    requestUsers()
  }, [])

  useEffect(() => {
    deleteEvent(eventDeleted)
  }, [eventDeleted])

  function deleteEvent(eventId) {
    if (eventId !== undefined) {
      setEvents(events.filter(event => event.id !== eventId))
    }
  }

  const requestEvents = async () => {
    const response = await fetch("http://localhost:3000/events")
    const eventList = await response.json()
    setEvents(eventList)
    setFiltered(eventList)
  }

  const requestCategories = async () => {
    const response = await fetch("http://localhost:3000/categories")
    const categoriesResult = await response.json()
    setCategories(categoriesResult)
  }

  const requestUsers = async () => {
    const response = await fetch("http://localhost:3000/users")
    const users = await response.json()
    setUsers(users)
  }

  const filteredEvents = events.filter(event => {
    return search.toLowerCase() === "" || event.title.toLowerCase().includes(search)
  })

  const catergoryFilterOn = activeCategories.length === 0 ? false : true
  const filteredEventsOnCategory = catergoryFilterOn ? events.filter(e => e.categoryIds.some(catId => activeCategories.includes(catId))) : events

  const searchHasInput = search !== null && search.length > 0 ? true : false
  const result = searchHasInput ? filteredEventsOnCategory.filter(x => filteredEvents.includes(x)) : filteredEventsOnCategory

  return (
    <div>
      <Center>
        <Heading>List of events</Heading>
      </Center>
      <Center>
        <label>
          Search:
          <Input type="text" name="search-bar" placeholder="event..." onChange={e => setSearch(e.target.value)} w={200} ml={2} mt={3} mb={3} mr={300} />
        </label>
        <FilterBar activeCategories={activeCategories} setActiveCategories={setActiveCategories} categories={categories} />
      </Center>

      <Box ml={"5"} mr={"5"}>
        <motion.ul layout>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
            <AnimatePresence>
              {result.map(event => {
                return <EventsList key={event.id} event={event} events={events} setEventDeleted={setEventDeleted} />
              })}
            </AnimatePresence>
          </SimpleGrid>
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
