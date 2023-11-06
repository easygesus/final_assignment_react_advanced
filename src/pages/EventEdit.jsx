import { useLoaderData, useNavigate, Link, useParams } from "react-router-dom"
import { FilterBar } from "../components/FilterBar"
import { useState } from "react"
import { Card, FormControl, Input, Textarea, Heading, FormLabel, Button, Stack, HStack, Select, useToast } from "@chakra-ui/react"

export const loader = async ({ params }) => {
  const eventId = params.eventId
  const event = await fetch(`http://localhost:3000/events/${eventId}`)
  const categories = await fetch("http://localhost:3000/categories")
  const users = await fetch("http://localhost:3000/users")

  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json()
  }
}

export const EventEdit = () => {
  const { eventId } = useParams()
  const { event, users, categories } = useLoaderData()
  const toast = useToast()
  const [datum, setDatum] = useState()
  const navigate = useNavigate()

  const [chosenCategories, setChosenCategories] = useState([])
  const [eventObject, setEventObject] = useState(event)

  const onSubmit = async e => {
    e.preventDefault()
    showToast()

    const startTimeArray = eventObject.startTime.split(":") //0 index HH, 1 index mm
    let startDate = new Date(eventObject.date)
    startDate.setHours(startTimeArray[0])
    startDate.setMinutes(startTimeArray[1])
    eventObject.startTime = startDate

    const endTimeArray = eventObject.endTime.split(":") //0 index HH, 1 index mm
    let endDate = new Date(eventObject.date)
    endDate.setHours(endTimeArray[0])
    endDate.setMinutes(endTimeArray[1])
    eventObject.endTime = endDate

    // houtje touwtje ductape
    delete eventObject.date

    // voeg de chosen categories to aan event
    eventObject.categoryIds = chosenCategories

    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        body: JSON.stringify(eventObject),
        headers: { "Content-Type": "application/json" }
      })

      if (response.ok) {
        alert("Resource updated successfully")
        navigate("/")
      } else {
        alert("Failed to update resource")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const showToast = () => {
    toast({
      title: "Submit",
      description: "You successfully changed the event",
      duration: 4000,
      isClosable: true,
      status: "success",
      position: "bottom",
      colorScheme: "green",
      variant: "subtle"
    })
  }

  const { title, image, description, date, startTime, endTime, location } = eventObject

  const defaultStartTime = `${new Date(startTime).getHours()}:${new Date(startTime).getMinutes()}`
  const defaultEndTime = `${new Date(endTime).getHours()}:${new Date(endTime).getMinutes()}`
  const defaultDate = `${new Date(startTime).getUTCDate()}`

  const handleUserSelectChange = event => {
    eventObject.createdBy = event.target.value
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = function (event) {
        setImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card variant="elevated" borderRadius={10} align="center" m="10" mt={300}>
      <Heading padding="5px" fontSize="md">
        Edit your Event
      </Heading>

      <form onSubmit={onSubmit}>
        <FormControl>
          <input type="text" name="title" width="sm" placeholder="title" mt="4" value={title} onChange={e => setEventObject({ ...eventObject, title: e.target.value })} />
        </FormControl>

        <FormControl>
          <Textarea
            name="description"
            placeholder="Event description"
            rows="8"
            mt="4"
            w="sm"
            value={description}
            onChange={e =>
              setEventObject({
                ...eventObject,
                description: e.target.value
              })
            }
          />
        </FormControl>

        <FormControl>
          <Input type="file" name="image" id="fileInput" accept="image/*" onChange={handleFileChange} />
          {/* <Input type="url" name="image" pattern="https://.*" width="sm" placeholder="http://image-url" mt="4" value={image} onChange={e => setEventObject({ ...eventObject, image: e.target.value })} /> */}
        </FormControl>

        <FormControl display="flex" ml="2" mt="4">
          <HStack spacing="4">
            <FormLabel mb="0">Category</FormLabel>
            <FilterBar value={chosenCategories} activeCategories={chosenCategories} setActiveCategories={setChosenCategories} categories={categories} />
          </HStack>
        </FormControl>

        <FormControl display="flex" m="2">
          <FormLabel mb="0">Creator</FormLabel>
          <Select name="createdBy" onChange={handleUserSelectChange}>
            {users.map(user =>
              event.createdBy === user.id ? (
                <option key={user.id} value={user.id} selected>
                  {user.name}
                </option>
              ) : (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              )
            )}
          </Select>
        </FormControl>

        <FormControl display="flex" m="2">
          <FormLabel width="20">Where</FormLabel>
          <Input type="text" name="location" width="75" value={location} onChange={e => setEventObject({ ...eventObject, location: e.target.value })} />
        </FormControl>

        <FormControl display="flex" m="2">
          <FormLabel width="20">Date</FormLabel>
          <Input type="date" name="date" w="75" value={defaultDate} onChange={e => setEventObject({ ...eventObject, date: e.target.value })} />
        </FormControl>

        <FormControl display="flex" m="2">
          <FormLabel width="20">From</FormLabel>
          <Input type="time" name="startTime" w="75" value={defaultStartTime} onChange={e => setEventObject({ ...eventObject, startTime: e.target.value })} />
        </FormControl>

        <FormControl display="flex" m="2">
          <FormLabel width="20">Till</FormLabel>
          <Input type="time" name="endTime" width="75" value={defaultEndTime} onChange={e => setEventObject({ ...eventObject, endTime: e.target.value })} />
        </FormControl>

        <Stack>
          <Button colorScheme="blue" size="sm" type="submit">
            Submit
          </Button>
          <Link to={"/"}>
            <Button colorScheme="gray" size="sm" width="100%">
              Go Back
            </Button>
          </Link>
        </Stack>
      </form>
    </Card>
  )
}
