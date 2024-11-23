import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Navbar from './Navbar'
import { motion } from 'framer-motion'
import { NorthVariant } from './Animation'
import { useSelector } from 'react-redux'

const North = ({ children }) => {
    const theme = useSelector((state) => state.theme.theme)

    return (
        <div className={`north ${theme ? 'body2' : ''}`}>
            <Navbar />
            <div className='north-right'>
                <motion.div {...NorthVariant} >
                    <Header />
                    <div className='north-content'>
                        {children}
                    </div>
                    <Footer />
                </motion.div>
            </div>
        </div>
    )
}

export default North
