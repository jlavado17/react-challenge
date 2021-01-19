import './App.css';
import RiskSelector from "./components/risk-selector.component";
import RiskCaculator from "./components/risk-calculator.component";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Route exact path={['/', '/home']} component={RiskSelector} />
        <Route path='/calculator' component={RiskCaculator} />
    </BrowserRouter>
  );
}

export default App;
