import { Outlet, useLocation } from 'react-router-dom'

import { SearchProvider } from '../contexts/SearchContext'

import Header from '../components/header/Header'

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
