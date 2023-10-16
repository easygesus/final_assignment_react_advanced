import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Root } from "./components/Root"
import { eventDetailsLoader, EventPage } from "./pages/EventPage"
import { EventsPage } from "./pages/EventsPage"
import { FormPage } from "./pages/FormPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />
        //loader: eventLoader
      },
      {
        path: "event/:eventId",
        element: <EventPage />,
        loader: eventDetailsLoader
      },
      {
        path: "/form/new",
        element: <FormPage />
        // action: createEvent
      }
    ]
  }
])
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
)
