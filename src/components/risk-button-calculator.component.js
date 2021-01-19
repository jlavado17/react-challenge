import { useSelector } from 'react-redux';
import '../styles/custom-button-calculator.css';

function RiskButtonCalculator(props) {
    const selectedRisk = useSelector(state => state.selectedRisk);
    
    return (
        <div id="custom-button-calculator-container">
            Please Enter Your Current Portfolio
            <div
                id={props.text}
                className="custom-button-calculator"
                onClick={props.handler}
                style={selectedRisk.risk_level ? { opacity: 1 } : { opacity: 0.4 }}
            >
                Rebalance
            </div>

        </div>
    );

}

export default RiskButtonCalculator;