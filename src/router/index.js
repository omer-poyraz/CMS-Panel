import React, { useEffect } from 'react'
import { AnimatePresence } from "framer-motion"
import { Route, Routes, useLocation } from 'react-router-dom'
import LoginPage from '../pages/auth/login'
import NotFoundPage from '../pages/not-found'
import DashboardPage from '../pages/dashboard'
import MenuPage from '../pages/menu'
import FilePage from '../pages/file'
import SettingsPage from '../pages/setting'
import ProductPage from '../pages/product'
import SeoPage from '../pages/seo'
import UserPage from '../pages/user'
import FormPage from '../pages/form'
import OrdersPage from '../pages/orders'

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
                <Route path='/login' element={token === null ? <LoginPage /> : <DashboardPage />} />
                <Route path='/menu' element={token !== null ? <MenuPage /> : <LoginPage />} />
                <Route path='/file' element={token !== null ? <FilePage /> : <LoginPage />} />
                <Route path='/form' element={token !== null ? <FormPage /> : <LoginPage />} />
                <Route path='/orders' element={token !== null ? <OrdersPage /> : <LoginPage />} />
                <Route path='/image' element={token !== null ? <FilePage /> : <LoginPage />} />
                <Route path='/settings' element={token !== null ? <SettingsPage /> : <LoginPage />} />
                <Route path='/product' element={token !== null ? <ProductPage /> : <LoginPage />} />
                <Route path='/seo' element={token !== null ? <SeoPage /> : <LoginPage />} />
                <Route path='/user' element={token !== null ? <UserPage /> : <LoginPage />} />

                <Route path='/*' element={<NotFoundPage />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes
