import { AbsoluteCenter, Box, Button as CButton, Card, CardBody, CardFooter, CardHeader, Divider } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Pages.css"

export const FormPage = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [image, setImage] = useState("")
  const [location, setLocation] = useState("")
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

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

  const handleSubmit = e => {
    e.preventDefault()

    const addEvent = { title, description, startTime, endTime, image }

    setIsPending(true)

    fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": " application/json" },
      body: JSON.stringify(addEvent)
    }).then(() => {
      setIsPending(false)
      navigate("/")
    })
  }

  return (
    <Box>
      <AbsoluteCenter>
        <Card>
          <form>
            <CardBody>
              <div className="container-body">
                <p style={{ marginTop: "40px", marginLeft: "5px" }}>Titel:</p>
                <input type="text" name="title" onChange={e => setTitle(e.target.value)} className="input-form" />
                <p style={{ marginLeft: "5px" }}>Description:</p>
                <textarea name="description" onChange={e => setDescription(e.target.value)} className="textarea-form"></textarea>

                <input type="file" name="image" id="fileInput" accept="image/*" onChange={handleFileChange} />

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
            <CardFooter>
              {!isPending && (
                <CButton type="submit" onClick={handleSubmit}>
                  Submit
                </CButton>
              )}
              {isPending && <CButton>adding event...</CButton>}
            </CardFooter>
          </form>
        </Card>
      </AbsoluteCenter>
    </Box>
  )
}
