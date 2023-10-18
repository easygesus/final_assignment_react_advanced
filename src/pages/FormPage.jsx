import { AbsoluteCenter, Box, Button as CButton, Card, CardBody, CardFooter, CardHeader, Divider } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Pages.css"

export const FormPage = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    const addEvent = { title, description }

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
      <AbsoluteCenter w={450}>
        <Card>
          <form>
            <CardHeader h={40}>
              <p style={{ marginTop: "40px", marginLeft: "5px" }}>Name event:</p>
              <input type="text" name="title" onChange={e => setTitle(e.target.value)} className="input-form" />
            </CardHeader>
            <CardBody>
              <p style={{ marginLeft: "5px" }}>Details:</p>
              <textarea name="description" onChange={e => setDescription(e.target.value)} className="textarea-form"></textarea>
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
