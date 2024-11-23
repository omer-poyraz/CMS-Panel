import React, { useEffect, useState } from 'react'
import img from '../images/profile.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchMenu } from '../utilities/Menus'
import { useDispatch, useSelector } from 'react-redux'
import { changeOpenMenu } from '../redux/slices/openMenuSlice'
import { changeTheme } from '../redux/slices/themeSlice'
import { Moon, Sun } from 'react-feather'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const name = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")).name : "North Soft"
    const theme = useSelector((state) => state.theme.theme)
    const [header, setHeader] = useState("")
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const logout = () => {
        localStorage.clear()
        toast.success("Çıkış yapıldı.")
        setTimeout(() => {
            navigate("/login")
        }, 1000);
    }

    useEffect(() => {
        setHeader(fetchMenu(location.pathname))
    }, [location.pathname])

    return (
        <div className={`header shadow ${theme ? 'dark' : ''}`}>
            <div className='d-flex align-items-center text-s'><h4 className='mb-0'>{header}</h4></div>
            <div className='d-flex justify-content-end align-items-center'>
                <div className='theme-btn' onClick={() => dispatch(changeTheme())}>
                    {theme ? <Sun size={20} color='#9f9f9f' /> : <Moon size={20} color='#9f9f9f' />}
                </div>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle className={`bg-transparent text-dark border-0 shadow-none`}>
                        <div className='profile'>
                            <div><img src={img} alt='' /></div>
                            <div className='ml-2 text-s'>
                                <div><strong>{name}</strong></div>
                                <div className='text-left'><small>Admin</small></div>
                            </div>
                        </div>
                    </DropdownToggle>
                    <DropdownMenu className='shadow rounded-xl border-0' style={{ borderRadius: 15 }}>
                        <DropdownItem><div onClick={logout} className={"w-100"}><FontAwesomeIcon className='mr-2' icon={faArrowRightFromBracket} /> Çıkış Yap</div></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <div className='mobil-menu-btn' onClick={() => dispatch(changeOpenMenu(true))}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>
        </div>
    )
}

export default Header
