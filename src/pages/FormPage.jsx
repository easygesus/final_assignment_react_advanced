import { AbsoluteCenter, Box, Button as CButton, Card, CardBody, CardFooter, Divider, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"
import { FilterBar } from "../components/FilterBar"
import "./Pages.css"

export const loader = async ({ params }) => {
  const categories = await fetch("http://localhost:3000/categories")
  const users = await fetch("http://localhost:3000/users")
  const event = await fetch("http://localhost:3000/events")

  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json()
  }
}

export const FormPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedUser, setSelectedUser] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [image, setImage] = useState("")
  const [location, setLocation] = useState("")
  const [isPending, setIsPending] = useState(false)

  const navigate = useNavigate()
  const toast = useToast()

  const { categories, event, users } = useLoaderData()

  const showToast = () => {
    toast({
      title: "Submit",
      description: "new event succesfully added",
      duration: 3000,
      isClosable: true,
      status: "success",
      position: "top"
    })
  }

  //Converting image files for uploading.
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

  const handleChange = e => {
    setSelectedUser(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const addEvent = {
      title: title,
      createdBy: [],
      description: description,
      location: location,
      startTime: startTime,
      endTime: endTime,
      image: image,
      categoryIds: []
    }

    addEvent.createdBy = selectedUser
    addEvent.categoryIds = selectedCategories

    setIsPending(true)

    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addEvent)
      })

      setIsPending(false)
      showToast()

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

  return (
    <Box>
      <AbsoluteCenter>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardBody>
              <div className="container-body">
                <p style={{ marginTop: "40px", marginLeft: "5px" }}>Titel:</p>
                <input type="text" name="title" onChange={e => setTitle(e.target.value)} className="input-form" />
                <p style={{ marginLeft: "5px" }}>Description:</p>
                <textarea name="description" onChange={e => setDescription(e.target.value)} className="textarea-form"></textarea>
                <FilterBar activeCategories={selectedCategories} setActiveCategories={setSelectedCategories} categories={categories} />

                <input type="file" name="image" id="fileInput" accept="image/*" onChange={handleFileChange} />

                <div>
                  <select onChange={handleChange} id="createdBy" value={selectedUser} required className="dropdown">
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <textarea style={{ border: "solid", height: "65px", resize: "none" }} placeholder="Location..." onChange={e => setLocation(e.target.value)}></textarea>
                </div>
                <div className="container-date">
                  <div className="date-start">
                    <span>Start time:</span>
                    <input className="input-date" type="datetime-local" onChange={e => setStartTime(e.target.value)} /> <br></br>
                  </div>

                  <div>
                    <span>End time:</span>
                    <input className="input-date" type="datetime-local" onChange={e => setEndTime(e.target.value)} />
                  </div>
                </div>
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="footer-form">
              {!isPending && <CButton type="submit">Submit</CButton>}
              {isPending && <CButton>adding event...</CButton>}
            </CardFooter>
          </form>
        </Card>
      </AbsoluteCenter>
    </Box>
  )
}
