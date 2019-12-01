import React from 'react';
import {
    Link
} from 'react-router-dom';
import routes, {MODULE} from 'app/routes/baseRoutes/routes';

const LANDING_PAGE_TITLE = 'Welcome to Movie Finder';
const DEFAULT_SEARCH_PAGE_LABEL = 'Search for Movies';

const LandingPage: React.FC = () => (
    <div className="flex justify-center fixed h-full w-full">
        <div className="m-auto flex flex-col">
            <div className="text-3xl">{LANDING_PAGE_TITLE}</div>
            <Link to={routes[MODULE.CORE].regexPath} className="w-full">
                <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 cursor-pointer mt-4 w-full">
                    <div className="text-white w-full">{DEFAULT_SEARCH_PAGE_LABEL}</div>
                </button>
            </Link>
        </div>
    </div>
);

export default LandingPage;