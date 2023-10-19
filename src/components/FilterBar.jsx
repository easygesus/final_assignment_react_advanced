import { CheckboxGroup, Stack, Checkbox } from "@chakra-ui/react"

export const FilterBar = ({ setFiltered, events, activeGenre, setActiveGenre, setIsFilteredActive }) => {
  const handleGenreChange = genre => {
    setActiveGenre(genre)
    if (activeGenre === 0) {
      setFiltered(events)

      return
    }

    const filtersActive = setIsFilteredActive(filtersActive)

    const filtered = events.filter(event => event.categoryIds.includes(activeGenre))
    setFiltered(filtered)
  }

  return (
    <CheckboxGroup colorScheme="green">
      <Stack spacing={[1, 5]} direction={["column", "row"]}>
        <Checkbox className={activeGenre === 0 ? "active" : ""} value="All" onChange={() => handleGenreChange(0)}>
          All
        </Checkbox>
        <Checkbox className={activeGenre === 1 ? "active" : ""} value="Sports" onChange={() => handleGenreChange(1)}>
          sports
        </Checkbox>
        <Checkbox className={activeGenre === 2 ? "active" : ""} value="Games" onChange={() => handleGenreChange(2)}>
          games
        </Checkbox>
        <Checkbox className={activeGenre === 3 ? "active" : ""} value="Relaxation" onChange={() => handleGenreChange(3)}>
          relaxation
        </Checkbox>
      </Stack>
    </CheckboxGroup>

    /*
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
    */
  )
}
