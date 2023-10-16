import { Card, Center, Heading, Text } from "@chakra-ui/react"

import React from "react"

import { useLoaderData, useParams } from "react-router-dom"

export const EventPage = () => {
  const { eventId } = useParams()
  const activity = useLoaderData()
  console.log(`EventPage eventId: ${eventId}`)

  return (
    <div>
      <Card>
        <Center>
          <Heading>Event details</Heading>
        </Center>
        <Text fontSize={"1xl"} as={"b"}>
          Description:
        </Text>
        <p>{activity.description}</p>
        <img src={activity.image} />
        <Text fontSize={"2xl"} as={"b"}>
          Start time:
          <span className="startTime">{activity.startTime && activity.startTime.slice(0, 16).replace(/^(.{10})(.)/, "$1 ")}</span>
        </Text>
        <Text fontSize={"2xl"} as={"b"}>
          End time:
          <span className="endTime">{activity.endTime && activity.endTime.slice(0, 16).replace(/^(.{10})(.)/, "$1 ")}</span>
        </Text>
        <br></br>
        <Text fontSize={"1xl"} as={"b"}>
          Catergory ids:
        </Text>
        <p>{activity.categories}</p>
        <p>{activity.createdBy}</p>
      </Card>
    </div>
  )
}

export const eventDetailsLoader = async ({ params }) => {
  const { eventId } = params

  const response = await fetch(`http://localhost:3000/events/${eventId}`)

  return response.json()
}
