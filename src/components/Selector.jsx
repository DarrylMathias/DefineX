"use client"

import { Portal, Select, createListCollection } from "@chakra-ui/react"

function Selector(){
  return (
    <Select.Root collection={categories} size="lg">
      <Select.HiddenSelect />
      <Select.Label>Select language</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select language" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {categories.items.map((category) => (
              <Select.Item item={category.value} key={category.value}>
                {category.value}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const categories = createListCollection({
  items: [
    { value: "English", label: "en" },
    { value: "Hindi", label: "hi" },
    { value: "Spanish", label: "es" },
    { value: "French", label: "fr" },
    { value: "Japanese", label: "ja" },
    { value: "Russian", label: "ru" },
    { value: "German", label: "de" },
    { value: "Italian", label: "it" },
    { value: "Korean", label: "ko" },
    { value: "Brazilian Portuguese", label: "pt-BR" },
    { value: "Arabic", label: "ar" },
    { value: "Turkish", label: "tr" },
  ],
})

export default Selector;