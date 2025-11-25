import { Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/header/Header'
import { SearchProvider } from '../context/SearchContext'
import { DataProvider } from '../context/DataContext'

export default function MainLayout() {
    const location = useLocation()
    const hideHeader = ['/login', '/register'].includes(location.pathname)

    return (
        <DataProvider>
            <SearchProvider>
                {!hideHeader && <Header />}
                <Outlet />
            </SearchProvider>
        </DataProvider>
    )
}
