import '../styles/risk-buttons.css';
import riskData from "../data/data.json";
import { useDispatch, useSelector } from 'react-redux';
import { setRisk } from '../redux/actions';

function RiskButtons () {

    const liItems = [];
    const selectedRisk = useSelector(state => state.selectedRisk);
    
    const dispatch = useDispatch();

    riskData.forEach(item => {
        liItems.push(
            <li
                key={item.risk_level}
                onClick={() => dispatch(setRisk(item))}
                style={
                    item.risk_level === selectedRisk.risk_level ? 
                    {background: "yellow"} :
                    {}
                }
            >
                {item.risk_level}
            </li>
        );
    });

    return (
        <div id="risk-selector">
            <ul className="risk-selector-ul">
                {liItems}
            </ul>
        </div>
    );
    
}

export default RiskButtons;