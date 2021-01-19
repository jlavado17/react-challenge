import { useHistory } from 'react-router-dom';

function Header() {
    const history = useHistory();

    const handleClick = () => {
        history.push("/home");
    }
    
    return (
        <header>
            <img id="top-logo" src="home.ico" alt="logo" onClick={handleClick}></img>
            <div id="app-title">Financial Advisor</div>
        </header>
    );

}

export default Header;