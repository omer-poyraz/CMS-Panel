import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardBody, CardHeader } from 'reactstrap'
import { CardModel } from '../../utilities/Models'

const InfoCart = ({ isRise, title, piece, precent, direction, iconTheme, icon }) => {
    const navigation = useNavigate()
    const theme = useSelector((state) => state.theme.theme)

    return (
        <Card className={CardModel(theme)}>
            <CardHeader className='bg-transparent border-0 d-flex align-items-center justify-content-between'>
                <div><h6 className='text-s mb-0'>{title}</h6></div>
                <div className='d-flex justify-content-end align-items-center'>
                    <div>{isRise ? <ChevronUp className='text-success' /> : <ChevronDown className='text-danger' />}</div>
                    <div className='ml-2'><strong className={isRise ? 'text-success' : 'text-danger'}>{precent}</strong></div>
                </div>
            </CardHeader>
            <CardBody>
                <div><h3>{piece}</h3></div>
                <div className='d-flex justify-content-between align-items-end'>
                    <div><Link to={direction} className='underline'>Tümünü Gör</Link></div>
                    <div onClick={() => navigation(direction)} className={iconTheme}><FontAwesomeIcon icon={icon} /></div>
                </div>
            </CardBody>
        </Card>
    )
}

export default InfoCart
