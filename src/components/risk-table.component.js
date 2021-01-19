import '../styles/risk-table.css';
import React, { useEffect, useState } from "react";
import riskData from "../data/data.json";
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

function RiskTable() {
  const [toggleButton, setToggleButton] = useState(true);
  const selectedRisk = useSelector(state => state.selectedRisk);

  const gridRef = React.createRef();
  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        showZero: false,
        color: 'black',
        formatter: function(value, context) {
          if(value === 0) return '';
          return value + '%';
      }
      }
    }
  }
  const data = {
    datasets: [{
      data: [selectedRisk.bonds, selectedRisk.large_cap, selectedRisk.mid_cap, selectedRisk.foreign, selectedRisk.small_cap],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Bonds',
      'Large Cap',
      'Mid Cap',
      'Foreign',
      'Small Cap'
    ]
  };

  const handleClick = () => {
    setToggleButton(toggleButton => !toggleButton);
  };

  useEffect(() => {
    window.jQuery(gridRef.current).jsGrid({
      width: "100%",
      height: "400px",
      data: riskData,
      fields: [
        { name: "risk_level", title: "Risk", type: "number", width: 50 },
        { name: "bonds", title: "Bonds %", type: "number", width: 'auto' },
        { name: "large_cap", title: "Large Cap %", type: "number", width: 'auto' },
        { name: "mid_cap", title: "Mid Cap %", type: "number", width: 'auto' },
        { name: "foreign", title: "Foreign %", type: "number", width: 'auto' },
        { name: "small_cap", title: "Small Cap %", type: "number", width: 'auto' }
      ]
    });

    const trs = document.querySelectorAll(".jsgrid-grid-body tr");
    trs.forEach(tr => {
      let tds = tr.getElementsByTagName('td');
      if (parseInt(tds[0].innerText) === selectedRisk.risk_level) {
        Array.from(tds).forEach(td => {
          td.style.background = "yellow";
        });
      }
    });

  }, [selectedRisk]);

  useEffect(() => {
    window.jQuery(gridRef.current).jsGrid({
      width: "100%",
      height: "400px",
      data: riskData,
      fields: [
        { name: "risk_level", title: "Risk", type: "number", width: 50 },
        { name: "bonds", title: "Bonds %", type: "number", width: 'auto' },
        { name: "large_cap", title: "Large Cap %", type: "number", width: 'auto' },
        { name: "mid_cap", title: "Mid Cap %", type: "number", width: 'auto' },
        { name: "foreign", title: "Foreign %", type: "number", width: 'auto' },
        { name: "small_cap", title: "Small Cap %", type: "number", width: 'auto' }
      ]
    });

    const trs = document.querySelectorAll(".jsgrid-grid-body tr");
    trs.forEach(tr => {
      let tds = tr.getElementsByTagName('td');
      if (parseInt(tds[0].innerText) === selectedRisk.risk_level) {
        Array.from(tds).forEach(td => {
          td.style.background = "yellow";
        });
      }
    });

  }, [toggleButton]);

  return (
    <div id="risk-chart-container">
      { toggleButton ? <div id="jsGrid" ref={gridRef}></div> : <Doughnut width={280} data={data} options={options}/>}
      <img
        id="toggle-graph"
        src={toggleButton ? "donutlogo.png" : "chartlogo.jpg"}
        onClick={handleClick}
        alt="toggle_img"
      />
    </div>
  );

}

export default RiskTable;