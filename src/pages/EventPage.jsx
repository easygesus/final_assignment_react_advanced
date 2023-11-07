import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Flex, Image, List, ListItem, Spacer, Tag, TagLabel, Text } from "@chakra-ui/react"
import React from "react"
import { Link, useLoaderData, useNavigate } from "react-router-dom"

export const eventDetailsLoader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`)
  const categories = await fetch("http://localhost:3000/categories")
  const users = await fetch("http://localhost:3000/users")

  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json()
  }
}

export const EventPage = () => {
  const { event, categories, users } = useLoaderData()

  const categoryIds = Array.isArray(event.categoryIds) ? event.categoryIds : []
  const categoryNames = categoryIds.map(id => categories.find(category => category.id === id)?.name || "Unknown")
  const navigate = useNavigate()

  const reverseString = date => {
    const splitDate = date.split("-")
    const reverseArray = splitDate.reverse()
    const joinArray = reverseArray.join("-")
    return joinArray
  }

  const user = users.find(user => user.id === event.createdBy) || {}
  const finalEvent = {
    ...event,
    date: reverseString((event.startTime || "").slice(0, 10).toString() || ""),
    startTime: event.startTime ? event.startTime.split("T")[1]?.slice(0, 5).toString() : "",
    endTime: event.endTime ? event.endTime.split("T")[1]?.slice(0, 5).toString() : "",
    categoryNames: categoryNames,
    userName: user.name || "Unknown",
    userImage: user.image || "DefaultImageURL"
  }

  const text = (label, content) => (
    <Flex>
      <Text fontStyle="italic" fontWeight="bold">
        {label}
        {":"}
      </Text>

      <Text style={{ marginLeft: "30px" }}>{content}</Text>
    </Flex>
  )

  const listItems = items => (
    <List>
      {items.map((item, index) => (
        <ListItem key={index}>{item}</ListItem>
      ))}
    </List>
  )

  return (
    <Center display="flex" flexDir="column">
      <Card minW={450} h="full" mt={300}>
        <CardHeader fontWeight="bold">
          <h1>{finalEvent.title}</h1>
          <CardHeader m={0} p={0}>
            <Flex flexDir="column" color="white">
              <Image src={finalEvent.image} w="75%" h="30em" />
            </Flex>
          </CardHeader>
        </CardHeader>

        <CardBody align="center">
          {text("Activity", finalEvent.description)}
          {text("Date", finalEvent.date)}

          {text("Time", `${finalEvent.startTime} - ${finalEvent.endTime}h`)}
          {text("Location", finalEvent.location)}
        </CardBody>
        <hr />

        <CardFooter pl={-5} pr={0}>
          <Flex w="100%">
            <Box w="50%">
              <Tag size="lg" borderRadius="full" bgColor="white">
                <Avatar src={finalEvent.userImage} size="md" name={finalEvent.userName} ml={3} mr={3} />
                <TagLabel font={9}> {finalEvent.userName}</TagLabel>
              </Tag>
            </Box>
            <Spacer />

            <Box w="16.5%"></Box>
            <Spacer />

            <Spacer />
            <Box w="16.5%">
              <Link to={"/"}>
                <Button colorScheme="purple" size="l" padding={4}>
                  back
                </Button>
              </Link>
            </Box>
          </Flex>
        </CardFooter>
      </Card>
    </Center>
  )
}
