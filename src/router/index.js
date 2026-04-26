import { AnimatePresence } from "framer-motion"
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import LoginPage from '../pages/auth/login'
import DashboardPage from '../pages/dashboard'
import FilePage from '../pages/file'
import FormPage from '../pages/form'
import MenuPage from '../pages/menu'
import MenuGroupPage from "../pages/menu-group"
import NotFoundPage from '../pages/not-found'
import OrdersPage from '../pages/orders'
import ProductPage from '../pages/product'
import SettingsPage from '../pages/setting'
import UserPage from '../pages/user'

const AnimatedRoutes = () => {
    const location = useLocation()
    const token = localStorage.getItem("auth") === null ? null : JSON.parse(localStorage.getItem("auth")).accessToken

    useEffect(() => {
        if (localStorage.getItem("lang") === null || localStorage.getItem("lang") === undefined) {
            localStorage.setItem("lang", "TR")
        }
    }, [])

    return (
        <AnimatePresence>
            <Routes key={location.pathname} location={location}>
                <Route path='/' element={token !== null ? <DashboardPage /> : <LoginPage />} />
                <Route path='/dashboard' element={token !== null ? <DashboardPage /> : <LoginPage />} />
                <Route path='/login' element={token === null ? <LoginPage /> : <DashboardPage />} />
                <Route path='/menu-group' element={token !== null ? <MenuGroupPage /> : <LoginPage />} />
                <Route path='/menu/:id' element={token !== null ? <MenuPage /> : <LoginPage />} />
                <Route path='/file' element={token !== null ? <FilePage /> : <LoginPage />} />
                <Route path='/form' element={token !== null ? <FormPage /> : <LoginPage />} />
                <Route path='/orders' element={token !== null ? <OrdersPage /> : <LoginPage />} />
                <Route path='/image' element={token !== null ? <FilePage /> : <LoginPage />} />
                <Route path='/settings' element={token !== null ? <SettingsPage /> : <LoginPage />} />
                <Route path='/product' element={token !== null ? <ProductPage /> : <LoginPage />} />
                <Route path='/user' element={token !== null ? <UserPage /> : <LoginPage />} />

                <Route path='/*' element={<NotFoundPage />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes
