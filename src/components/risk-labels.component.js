import '../styles/risk-labels.css';
import { Component } from "react";

class RiskLabels extends Component {
    render() {
        return (
            <div id="risk-selector-labels">
                <div className="risk-label-select">
                    {this.props.text}
                </div>
                {this.props.levels ? <div className="risk-label-levels">
                    <div className="risk-label">Low</div>
                    <div className="risk-label">High</div>
                </div> : ''}
                
            </div>
        );
    }
}

export default RiskLabels;