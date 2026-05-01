import { faFeather, faGear, faGlobeAsia, faUserCircle, faX } from '@fortawesome/free-solid-svg-icons'
import { faChartBar } from '@fortawesome/free-solid-svg-icons/faChartBar'
import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
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
        const handleResize = () => {
            if (window.innerWidth > 1032) {
                dispatch(changeOpenMenu(true))
            }
        }

        handleResize()

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [dispatch])

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
                <Link to="/menu-group" className={path === "/menu-group" || path.startsWith("/menu/") ? 'item active' : "item"}>
                    <div><FontAwesomeIcon icon={faList} /></div>
                    <div className='ml-2'><span>Menü Yönetimi</span></div>
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
                <a href="https://www.google.com" target='_blank' rel='noopener noreferrer' className="item">
                    <div><FontAwesomeIcon icon={faGlobeAsia} /></div>
                    <div className='ml-2'><span>Siteye Git</span></div>
                </a>
                <a href="https://www.google.com" target='_blank' rel='noopener noreferrer' className="item">
                    <div><FontAwesomeIcon icon={faFeather} /></div>
                    <div className='ml-2'><span>North Soft</span></div>
                </a>
            </motion.div>
        </div> : null
    )
}

export default Navbar
