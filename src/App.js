import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import todo from "./components/todo";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={todo} />
      </Switch>
    </Router>
  );
}

export default App;
