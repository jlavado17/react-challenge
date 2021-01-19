import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import '../styles/risk-details.css';

function RiskDetails() {
    const selectedRisk = useSelector(state => state.selectedRisk);
    const tableRef = React.createRef();
    
    useEffect(() => {
        window.jQuery(tableRef.current).jsGrid({
            width: "100%",
            height: "76px",
            data: [selectedRisk],
            fields: [
                { name: "bonds", title: "Bonds %", type: "number", width: 'auto' },
                { name: "large_cap", title: "Large Cap %", type: "number", width: 'auto' },
                { name: "mid_cap", title: "Mid Cap %", type: "number", width: 'auto' },
                { name: "foreign", title: "Foreign %", type: "number", width: 'auto' },
                { name: "small_cap", title: "Small Cap %", type: "number", width: 'auto' }
            ]
        });

    }, [selectedRisk]);

    return (
        <div id="risk-details-container">
            <div>Risk Level {selectedRisk.risk_level ? selectedRisk.risk_level : 0}</div>
            {selectedRisk.risk_level && <div id="selectedRiskTable" ref={tableRef}></div>}
        </div>
    );

}

export default RiskDetails;