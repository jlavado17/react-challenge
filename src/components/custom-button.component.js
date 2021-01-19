import '../styles/custom-button.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function CustomButton(props) {
    const selectedRisk = useSelector(state => state.selectedRisk);
    const history = useHistory();

    const handleClick = (e) => {
        if(selectedRisk.risk_level){
            history.push("/calculator");
        } else {
            e.preventDefault();
        }
    }

    return (
        <div
            id={props.text}
            className="custom-button"
            onClick={handleClick}
            style={selectedRisk.risk_level ? { opacity: 1 } : { opacity: 0.4 }}>
                {props.text}
        </div>
    );

}

export default CustomButton;