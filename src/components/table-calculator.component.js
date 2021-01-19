import '../styles/table-calculator.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import RiskButtonCalculator from "./risk-button-calculator.component";

function TableCalculator() {
    const selectedRisk = useSelector(state => state.selectedRisk);
    const [bonds, setBonds] = useState(0);
    const [largeCap, setLargeCap] = useState(0);
    const [midCap, setMidCap] = useState(0);
    const [foreign, setForeign] = useState(0);
    const [smallCap, setSmallCap] = useState(0);


    const calculateRecommendations = () => {
        let auxAmounts = [bonds, largeCap, midCap, foreign, smallCap];
        let differences = [0, 0, 0, 0, 0];
        let history = [];
        
        let total = auxAmounts.reduce((a, b) => a + b, 0);
        
        const bondsShouldHave = parseFloat(parseFloat(total * (selectedRisk.bonds/100)).toFixed(2));
        const largeCapShouldHave = parseFloat(parseFloat(total * (selectedRisk.large_cap/100)).toFixed(2));
        const midCapShouldHave = parseFloat(parseFloat(total * (selectedRisk.mid_cap/100)).toFixed(2));
        const foreignShouldHave = parseFloat(parseFloat(total * (selectedRisk.foreign/100)).toFixed(2));
        const smallCapShouldHave = parseFloat(parseFloat(total * (selectedRisk.small_cap/100)).toFixed(2));
        
        let needToReceive = [];
        let needToGive = [];

        if(bonds < bondsShouldHave){
            needToReceive.push({ 
                index: 0,
                source: "Bonds",
                need: bondsShouldHave - bonds,
                current_amount: bonds
            });
        } else if(bonds > bondsShouldHave){
            needToGive.push({
                index: 0,
                source: "Bonds",
                give: bonds - bondsShouldHave,
                current_amount: bonds
            });
        }

        if(largeCap < largeCapShouldHave){
            needToReceive.push({
                index: 1,
                source: "Large Cap",
                need: largeCapShouldHave - largeCap,
                current_amount: largeCap
            });
        } else if(largeCap > largeCapShouldHave){
            needToGive.push({
                index: 1,
                source: "Large Cap",
                give: largeCap - largeCapShouldHave,
                current_amount: largeCap
            });
        }

        if(midCap < midCapShouldHave){
            needToReceive.push({
                index: 2,
                source: "Mid Cap",
                need: midCapShouldHave - midCap,
                current_amount: midCap
            });
        } else if(midCap > midCapShouldHave){
            needToGive.push({
                index: 2,
                source: "Mid Cap",
                give: midCap - midCapShouldHave,
                current_amount: midCap
            });
        }

        if(foreign < foreignShouldHave){
            needToReceive.push({
                index: 3,
                source: "Bonds",
                need: foreignShouldHave - foreign,
                current_amount: foreign
            });
        } else if(foreign > foreignShouldHave){
            needToGive.push({
                index: 3,
                source: "Foreign",
                give: foreign - foreignShouldHave,
                current_amount: foreign
            });
        }

        if(smallCap < smallCapShouldHave){
            needToReceive.push({
                index: 4,
                source: "Small Cap",
                need: smallCapShouldHave - smallCap,
                current_amount: smallCap
            });
        } else if(smallCap > smallCapShouldHave){
            needToGive.push({
                index: 4,
                source: "Small Cap",
                give: smallCap - smallCapShouldHave,
                current_amount: smallCap
            });
        }

        needToReceive.forEach(item => {
            needToGive.forEach(element => {
                if(item.need && element.give){
                    if(element.give <= item.need){
                        item.need = item.need - element.give;
                        history.push({
                            from: element.source,
                            to: item.source,
                            amount: element.give
                        });
                        differences[item.index] += element.give;
                        differences[element.index] -= element.give;
                        element.give = 0;
                    } else {
                        element.give = element.give - item.need;
                        history.push({
                            from: element.source,
                            to: item.source,
                            amount: item.need
                        });
                        differences[item.index] += item.need;
                        differences[element.index] -= item.need;
                        item.need = 0;
                        
                    }
                }
            })
        });
    
        const historyLi = history.map(item => {
            return `<li>Transfer ${item.amount.toFixed(1)} from ${item.from} to ${item.to}</li>`;
        });

        const historyUl = `<ul>${historyLi.join('')}</ul>`;

        document.querySelector('#recommendations').innerHTML = historyUl;

        document.querySelector('#bonds_new').value = bondsShouldHave;
        document.querySelector('#large_cap_new').value = largeCapShouldHave;
        document.querySelector('#mid_cap_new').value = midCapShouldHave;
        document.querySelector('#foreign_new').value = foreignShouldHave;
        document.querySelector('#small_cap_new').value = smallCapShouldHave;

        const elementsNew = document.querySelectorAll("[id$=_new]");

        elementsNew.forEach(item => item.style.color = 'blue');

        document.querySelector('#bonds_difference').value = differences[0].toFixed(1);
        document.querySelector('#large_cap_difference').value = differences[1].toFixed(1);
        document.querySelector('#mid_cap_difference').value = differences[2].toFixed(1);
        document.querySelector('#foreign_difference').value = differences[3].toFixed(1);
        document.querySelector('#small_cap_difference').value = differences[4].toFixed(1);

        const elementsDifference = document.querySelectorAll("[id$=_difference]");

        elementsDifference.forEach(item => {
            if(parseFloat(item.value) > 0 || parseFloat(item.value) === 0){
                item.style.color = 'green';
                if(parseFloat(item.value) !== 0) {
                    item.value = '+' + item.value
                }

            } else item.style.color = 'red';
        });
    }

    return (
        <div id="table-for-inputs-container">
            <RiskButtonCalculator handler={calculateRecommendations}/>
            <table id="table-for-inputs">
                <thead>
                    <tr>
                        <th>Current Amount</th>
                        <th>Difference</th>
                        <th>New Amount</th>
                        <th>Recommended Transfers</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Bonds $:
                            <input id="bonds_input" value={bonds} onChange={e => setBonds(parseFloat(e.target.value))}></input>
                        </td>
                        <td><input id="bonds_difference" disabled></input></td>
                        <td><input id="bonds_new" disabled></input></td>
                        <td rowSpan="5" id="recommendations"></td>
                    </tr>
                    <tr>
                        <td>Large Cap $:
                            <input id="large_cap_input" value={largeCap} onChange={e => setLargeCap(parseFloat(e.target.value))}></input>
                        </td>
                        <td><input id="large_cap_difference" disabled></input></td>
                        <td><input id="large_cap_new" disabled></input></td>
                    </tr>
                    <tr>
                        <td>Mid Cap $:
                            <input id="mid_cap_input" value={midCap} onChange={e => setMidCap(parseFloat(e.target.value))}></input>
                        </td>
                        <td><input id="mid_cap_difference" disabled></input></td>
                        <td><input id="mid_cap_new" disabled></input></td>
                    </tr>
                    <tr>
                        <td>Foreign $:
                            <input id="foreign_input" value={foreign} onChange={e => setForeign(parseFloat(e.target.value))}></input>
                        </td>
                        <td><input id="foreign_difference" disabled></input></td>
                        <td><input id="foreign_new" disabled></input></td>
                    </tr>
                    <tr>
                        <td>Small Cap $:
                            <input id="small_cap_input" value={smallCap} onChange={e => setSmallCap(parseFloat(e.target.value))}></input>
                        </td>
                        <td><input id="small_cap_difference" disabled></input></td>
                        <td><input id="small_cap_new" disabled></input></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

}

export default TableCalculator;