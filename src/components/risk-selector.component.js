import '../styles/risk-selector.css';
import RiskButtons from "./risk-buttons.component";
import RiskTable from "./risk-table.component";
import CustomButton from "./custom-button.component";
import RiskLabels from "./risk-labels.component";
import Header from "../components/header.component";

function RiskSelector() {

    return (
        <div>
            <Header />
            <div id="risk-selector-container">
                <RiskLabels text="Please Select A Risk Level For Your Investment Portfolio" levels={true}/>
                <div id="risk-button-container">
                    <RiskButtons />
                    <CustomButton text="Continue" />
                </div>
                <RiskTable />
            </div>
        </div>
    );

}

export default RiskSelector;