import { CheckboxGroup, Stack, Checkbox } from "@chakra-ui/react"
import { useEffect } from "react"

export const FilterBar = ({ setFiltered, events, activeGenre, setActiveGenre }) => {
  useEffect(() => {
    if (activeGenre === 0) {
      setFiltered(events)
      return
    }
    const filtered = events.filter(event => event.categoryIds.includes(activeGenre))
    setFiltered(filtered)
  }, [activeGenre])

  return (
    <CheckboxGroup colorScheme="green">
      <Stack spacing={[1, 5]} direction={["column", "row"]}>
        <Checkbox className={activeGenre === 0 ? "active" : ""} value="All" onChange={() => setActiveGenre(0)}>
          All
        </Checkbox>
        <Checkbox className={activeGenre === 1 ? "active" : ""} value="Sports" onChange={() => setActiveGenre(1)}>
          sports
        </Checkbox>
        <Checkbox className={activeGenre === 2 ? "active" : ""} value="Games" onChange={() => setActiveGenre(2)}>
          games
        </Checkbox>
        <Checkbox className={activeGenre === 3 ? "active" : ""} value="Relaxation" onChange={() => setActiveGenre(3)}>
          relaxation
        </Checkbox>
      </Stack>
    </CheckboxGroup>
  )
}
