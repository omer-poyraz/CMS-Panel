import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { NorthVariant } from './Animation'
import Footer from './Footer'
import Header from './Header'
import Navbar from './Navbar'

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
