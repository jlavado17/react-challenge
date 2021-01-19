import Header from "../components/header.component";
import RiskLabels from "./risk-labels.component";
import RiskDetails from "./risk-details.component";
import TableCalculator from "./table-calculator.component";

function RiskCaculator () {

    return (
        <div>
            <Header />
            <div id="risk-calculator-container">
                <RiskLabels text="Personalized Portfolio"/>
                <RiskDetails />
                <TableCalculator />
            </div>
        </div>
    );
    
}

export default RiskCaculator;