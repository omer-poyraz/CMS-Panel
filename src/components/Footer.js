
const Footer = () => {
    return (
        <div className='footer'>
            <div>
                <small className='text-s'>© <a href={process.env.REACT_APP_NORTH_URL} target='_blank' rel='noopener noreferrer' className='text-decoration-none text-primary'>North Soft</a> tüm hakları saklıdır. ©</small>
            </div>
        </div>
    )
}

export default Footer
