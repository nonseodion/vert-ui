import React from "react"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import Home from "./pages/main/Home"

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </Router>
)

export default Routes
