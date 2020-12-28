import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ChakraProvider, Heading, Flex } from '@chakra-ui/react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import 'focus-visible/dist/focus-visible';

import './App.css';
import GeographySelector from './components/GeographySelector';
import QuestionSelector from './components/QuestionSelector';
import Visualizations from './components/Visualizations';
import theme from './theme';

import { setData } from './redux/app.actions';
import { GEO_COUNTRY, GEO_REGION, ROUTES } from './utils/constants';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch data at application start
        fetch(`${process.env.PUBLIC_URL}/data/country_data.json`)
            .then(r => r.json())
            .then(data => {
                dispatch(setData({ [GEO_COUNTRY]: data }));
            });

        fetch(`${process.env.PUBLIC_URL}/data/region_data.json`)
            .then(r => r.json())
            .then(data => {
                dispatch(setData({ [GEO_REGION]: data }));
            });
    }, [dispatch]);

    return (
        <Router>
            <ChakraProvider resetCss theme={theme}>
                <div className='App'>
                    <Flex
                        as='header'
                        className='App-header'
                        bg='black'
                        py='2'
                        justify='center'
                    >
                        <Heading as='h1' fontWeight='light' color='white'>
                            Gender Equality at Home Dashboard
                        </Heading>
                    </Flex>
                    <Switch>
                        <Route exact path={ROUTES.HOME}>
                            <GeographySelector />
                        </Route>
                        <Route path={ROUTES.QUESTIONS}>
                            <QuestionSelector />
                        </Route>
                        <Route path={ROUTES.VISUALIZATIONS}>
                            <Visualizations />
                        </Route>
                    </Switch>
                </div>
            </ChakraProvider>
        </Router>
    );
}

export default App;
