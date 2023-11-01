import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react"

export const FilterBar = ({ activeCategories, setActiveCategories, categories }) => {
  const onCheckboxChanged = (cat, checked) => {
    // if checked add to setACtiveCategories
    if (checked) {
      setActiveCategories([...activeCategories, cat.id])
    } else {
      // remove from list
      setActiveCategories(activeCategories.filter(c => c !== cat.id))
    }
  }

  return (
    <CheckboxGroup colorScheme="green">
      <Stack spacing={[1, 5]} direction={["column", "row"]}>
        {categories.map(cat => {
          return (
            <Checkbox key={cat.id} onChange={e => onCheckboxChanged(cat, e.target.checked)}>
              {cat.name}
            </Checkbox>
          )
        })}
      </Stack>
    </CheckboxGroup>
  )
}
