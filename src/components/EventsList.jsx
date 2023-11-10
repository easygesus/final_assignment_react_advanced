import { Button as CButton, Card, Divider, useToast } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export const EventsList = ({ event, setEventDeleted }) => {
  const getFormattedDate = (dateStr, string) => {
    const date = new Date(dateStr)
    return date.toLocaleString()
  }

  const toast = useToast()

  const showToast = message => {
    toast({
      description: message,
      duration: 2500,
      position: "bottom",
      colorScheme: "green",
      isClosable: true
    })
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, { method: "DELETE" })
      let message = ""
      if (response.ok === true) {
        setEventDeleted(event.id)
        message = "Deleted successfully!"
      } else {
        message = "Delete action failed!"
      }
      showToast(message)
    } catch (error) {
      console.error("Error deleting event: ", error)
      showToast("Error deleting event") //
    }
  }

  const showToastOnReload = () => {
    const toastMessage = localStorage.getItem("toastMessage")
    if (toastMessage) {
      showToast(toastMessage)
      localStorage.removeItem("toastMessage")
    }
  }

  useEffect(() => {
    showToastOnReload()
  }, [])

  return (
    <motion.li layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} key={event.id}>
      <Card width={350}>
        <Link to={`/event/${event.id}`} className="navItem-title">
          <span className="event-title">{event.title}</span> <span className="clickable-title">(click for details...)</span>
        </Link>

        <strong>
          <h3>Description:</h3>
        </strong>
        {event.description}
        <br></br>
        <img src={event.image} style={{ height: "15em", width: "17em" }} />

        <strong>
          <h3>Start:</h3> <span className="cat-box"></span>
        </strong>
        <p>{event.startTime && getFormattedDate(event.startTime).slice(0, -3)} u</p>
        <strong>
          <h3>End:</h3>
        </strong>
        <p>{event.endTime && getFormattedDate(event.endTime).slice(0, -3)} u</p>
        <Link to={`event/${event.id}/edit`}>
          <div className="edit-container">
            <CButton className="edit-button" colorScheme="yellow">
              Edit
            </CButton>
          </div>
        </Link>
        <div className="delete-container">
          <CButton className="delete-button" colorScheme="red" onClick={handleDelete}>
            Delete
          </CButton>
        </div>
        <Divider orientation="horizontal" height={"10"} />
      </Card>
    </motion.li>
  )
}
