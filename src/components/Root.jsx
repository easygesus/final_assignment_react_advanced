import { Box } from "@chakra-ui/react"
import React from "react"
import { Outlet } from "react-router-dom"
import { Navigation } from "./Navigation"

export const Root = () => {
  return (
    <Box>
      <Navigation />

      <Outlet />
    </Box>
  )
}
