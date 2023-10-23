import { Card, Divider } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export const EventsList = ({ event }) => {
  const getFormattedDate = (dateStr, string) => {
    const date = new Date(dateStr)
    return date.toLocaleString()
  }

  return (
    <motion.li layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} key={event.id}>
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
        <p>{event.startTime && getFormattedDate(event.startTime).slice(0, -3)} u</p>
        <strong>
          <h3>End:</h3>
        </strong>
        <p>{event.endTime && getFormattedDate(event.endTime).slice(0, -3)} u</p>
        <Divider orientation="horizontal" height={"10"} />
      </Card>
    </motion.li>
  )
}
