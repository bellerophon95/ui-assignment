import MoviesSearchPage from 'core/components/MoviesSearchPage';
import LandingPage from 'core/components/LandingPage';

import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import routes, {MODULE} from 'app/routes/baseRoutes';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path={routes[MODULE.CORE].regexPath}>
                    <MoviesSearchPage/>
                </Route>
                <Route path={routes[MODULE.LANDING_PAGE].regexPath}>
                    <LandingPage/>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
