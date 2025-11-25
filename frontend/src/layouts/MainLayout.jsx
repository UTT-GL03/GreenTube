import { Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/header/Header'
import { SearchProvider } from '../context/SearchContext'

export default function MainLayout() {
    const location = useLocation()
    const hideHeader = ['/login', '/register'].includes(location.pathname)

    return (
        <SearchProvider>
            {!hideHeader && <Header />}
            <Outlet />
        </SearchProvider>
    )
}
