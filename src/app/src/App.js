import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [countries, setCountries] = useState({});

    useEffect(() => {
        // Temporary fetching of fake data
        fetch(`${process.env.PUBLIC_URL}/data/country.json`)
            .then(r => r.json())
            .then(data => {
                setCountries(data);
            });
    }, []);

    return (
        <div className='App'>
            <header className='App-header'>
                <h3>Gender Equality at Home</h3>
            </header>
            <ul>
                {countries.Label &&
                    Object.entries(countries.Label).map(([id, label]) => {
                        return <li key={id}>{label}</li>;
                    })}
            </ul>
        </div>
    );
}

export default App;
