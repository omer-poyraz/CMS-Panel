import React, { useEffect } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import img from '../images/profile.png'
import { CardModel, StartModel } from '../utilities/Models'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/slices/userSlice'

const UserCard = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.data)
    const theme = useSelector((state) => state.theme.theme)

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])

    return (
        user ? <Card className={CardModel(theme)}>
            <CardBody>
                <Row>
                    <Col md={3} className='mb-3 d-flex align-items-center'>
                        <div><img src={img} alt='' /></div>
                    </Col>
                    <Col md={9} className='mb-3'>
                        <div>
                            <div className={StartModel}><strong>İsim: </strong><span>{user.firstName} {user.lastName}</span></div>
                            <div className={StartModel}><strong>K. Adı: </strong><span>{user.userName}</span></div>
                            <div className={StartModel}><strong>Mail: </strong><span>{user.email}</span></div>
                            <div className={StartModel}><strong>Telefon: </strong><span>{user.phoneNumber}</span></div>
                            <div className={StartModel}><strong>Son: </strong><span>{new Date(user.updateAt).toLocaleDateString()}</span></div>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card> : null
    )
}

export default UserCard
