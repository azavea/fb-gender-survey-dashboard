import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import GeographySelector from './components/GeographySelector';
import QuestionSelector from './components/QuestionSelector';
import Charts from './components/Charts';

import { setData } from './redux/app.actions';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch data at application start
        fetch(`${process.env.PUBLIC_URL}/data/data.json`)
            .then(r => r.json())
            .then(data => {
                dispatch(setData(data));
            });
    }, [dispatch]);

    return (
        <Router>
            <ChakraProvider resetCss>
                <div className='App'>
                    <header className='App-header'>
                        <h3>Gender Equality at Home</h3>
                    </header>
                    <Switch>
                        <Route exact path='/'>
                            <GeographySelector />
                        </Route>
                        <Route path='/questions'>
                            <QuestionSelector />
                        </Route>
                        <Route path='/charts'>
                            <Charts />
                        </Route>
                    </Switch>
                </div>
            </ChakraProvider>
        </Router>
    );
}

export default App;
