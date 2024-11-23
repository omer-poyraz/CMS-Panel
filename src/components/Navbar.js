import { faFileText, faGear, faGlobe, faGlobeAsia, faImage, faSort, faStore, faUserCircle, faX } from '@fortawesome/free-solid-svg-icons'
import { faChartBar } from '@fortawesome/free-solid-svg-icons/faChartBar'
import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeOpenMenu } from '../redux/slices/openMenuSlice'
import { MobileMenuVariant } from './Animation'

const Navbar = () => {
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.theme)
    const open = useSelector((state) => state.openMenu.open)
    const path = window.location.pathname

    useEffect(() => {
        if (window.innerWidth > 1032) {
            dispatch(changeOpenMenu(true))
        }
    }, [window.innerWidth, dispatch])

    return (
        open ? <div className='north-left'>
            <div className='north-close-btn shadow' onClick={() => dispatch(changeOpenMenu(false))}><FontAwesomeIcon icon={faX} /></div>
            <motion.div {...MobileMenuVariant} className={`navbarn shadow ${theme ? 'card2' : ''}`}>
                <div><h3 className={theme ? 'text-s2' : ''}>North Soft</h3></div>
                <div className="mt-3 pl-2 mb-1"><small className={theme ? 'text-s3' : 'text-secondary'}>Menüler</small></div>
                <Link to="/" className={path === "/" ? 'item active' : "item"}>
                    <div><FontAwesomeIcon icon={faChartBar} /></div>
                    <div className='ml-2'><span>Dashboard</span></div>
                </Link>
                <Link to="/menu" className={path === "/menu" ? 'item active' : "item"}>
                    <div><FontAwesomeIcon icon={faList} /></div>
                    <div className='ml-2'><span>Menü Yönetimi</span></div>
                </Link>
                <Link to="/file" className={path === "/file" ? 'item active' : "item"}>
                    <div><FontAwesomeIcon icon={faFileText} /></div>
                    <div className='ml-2'><span>Dosya Yönetimi</span></div>
                </Link>
                <Link to="/image" className={path === "/image" ? 'item active' : "item"}>
                    <div><FontAwesomeIcon icon={faImage} /></div>
                    <div className='ml-2'><span>Resim Yönetimi</span></div>
                </Link>
                <Link to="/product" className={path === "/product" ? 'item active' : "item"}>
                    <div><FontAwesomeIcon icon={faStore} /></div>
                    <div className='ml-2'><span>Ürün Yönetimi</span></div>
                </Link>
                <Link to="/orders" className={path === "/orders" ? 'item active' : "item"}>
                    <div><FontAwesomeIcon icon={faSort} /></div>
                    <div className='ml-2'><span>Sipariş Yönetimi</span></div>
                </Link>
                <Link to="/seo" className={path === "/seo" ? 'item active' : "item"}>
                    <div><FontAwesomeIcon icon={faGlobe} /></div>
                    <div className='ml-2'><span>Seo Yönetimi</span></div>
                </Link>
                <Link to="/user" className={path === "/user" ? 'item active' : "item"}>
                    <div><FontAwesomeIcon icon={faUserCircle} /></div>
                    <div className='ml-2'><span>Kullanıcı Yönetimi</span></div>
                </Link>

                <div className="mt-4 pl-2 mb-1"><small className='text-secondary'>Ayarlar</small></div>
                <Link to="/settings" className={path === "/settings" ? 'item active' : "item"}>
                    <div><FontAwesomeIcon icon={faGear} /></div>
                    <div className='ml-2'><span>Ayarlar</span></div>
                </Link>
                <a href="https://www.google.com" target='_blank' className="item">
                    <div><FontAwesomeIcon icon={faGlobeAsia} /></div>
                    <div className='ml-2'><span>Siteye Git</span></div>
                </a>
            </motion.div>
        </div> : null
    )
}

export default Navbar
