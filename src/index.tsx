import React from "react"
import ReactDOM from "react-dom/client"
import "react-loading-skeleton/dist/skeleton.css"
import "react-tooltip/dist/react-tooltip.css"
import "react-calendar/dist/Calendar.css"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
