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

import { MainPage } from './searchPage';
import { ItemPage } from './itemPage';

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
    return <RouterProvider router={router} />
}
