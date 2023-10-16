import React from "react"
import { Link } from "react-router-dom"
import "./Components.css"

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className="item-left">
            Homepage
          </Link>
        </li>
      </ul>
    </nav>
  )
}
