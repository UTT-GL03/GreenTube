import { Outlet, useLocation } from 'react-router-dom'

import { SearchProvider } from '../context/SearchContext'
import { DataProvider } from '../context/DataContext'

import Header from '../components/header/Header'

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
