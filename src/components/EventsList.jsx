import { Card, Divider } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export const EventsList = ({ event }) => {
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
        {event.startTime && event.startTime.slice(11, 16)}
        <strong>
          <h3>End:</h3>
        </strong>
        {event.endTime && event.endTime.slice(11, 16)}
        <Divider orientation="horizontal" height={"10"} />
      </Card>
    </motion.li>
  )
}
