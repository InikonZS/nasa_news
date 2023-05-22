import React, { useEffect, useState } from 'react';
import {getById, search} from './api';
import {
    createBrowserRouter,
    Link,
    RouterProvider,
    useNavigation,
    useParams,
} from "react-router-dom";
import "./style.css";

import { MainPage } from './pages/searchPage/searchPage';
import { ItemPage } from './pages/itemPage/itemPage';
import { Provider } from 'react-redux';
import { store } from './store';

export function App(){
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainPage />,
        },
        {
            path: "/item/:id",
            element: <ItemPage />
        }
    ]);
    return <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
    
}
