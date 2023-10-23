import { Card, Center, Heading, Text, Button as CButton, Divider } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import React from "react"
import { useLoaderData, useParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

export const EventPage = () => {
  const { eventId } = useParams()
  const activity = useLoaderData()

  return (
    <motion.div layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
      <AnimatePresence>
        <Card>
          <Center>
            <Heading>Event details</Heading>
          </Center>
          <Divider />
          <Text fontWeight={"extrabold"} fontSize={"2xl"} className="event-title">
            {activity.title}
          </Text>
          <Text fontSize={"1xl"} as={"b"}>
            Description:
          </Text>
          <p>{activity.description}</p>
          <img src={activity.image} />
          <Text fontSize={"2xl"} as={"b"}>
            Start time:
            <span className="startTime"> {activity.startTime && activity.startTime.slice(0, 16).replace(/^(.{10})(.)/, "$1 ")}</span>
          </Text>
          <Text fontSize={"2xl"} as={"b"}>
            End time:
            <span className="endTime"> {activity.endTime && activity.endTime.slice(0, 16).replace(/^(.{10})(.)/, "$1 ")}</span>
          </Text>
          <br></br>
          <Text fontSize={"1xl"} as={"b"}>
            Catergory ids:
          </Text>
          <p>{activity.categories}</p>
          <p>{activity.createdBy}</p>
        </Card>
      </AnimatePresence>
      <Link to={"/form/new"}>
        <CButton variant={"outline"} size={"md"} style={{ backgroundColor: "#7ce604", position: "fixed", bottom: "0px", right: "0px" }}>
          Add events
        </CButton>
      </Link>
    </motion.div>
  )
}

export const eventDetailsLoader = async ({ params }) => {
  const { eventId } = params

  const response = await fetch(`http://localhost:3000/events/${eventId}`)

  return response.json()
}
