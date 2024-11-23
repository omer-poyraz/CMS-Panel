import React from 'react'
import North from '../../components/North'
import { Col, Row } from 'reactstrap'
import UserCard from '../../components/UserCard'
import UserUpdate from './UserUpdate'

const SettingsPage = () => {
    return (
        <North>
            <Row className='setting'>
                <Col md={6} className='mb-3'>
                    <UserCard />
                </Col>
                <Col md={6} className='mb-3'>
                    <UserUpdate />
                </Col>
            </Row>
        </North>
    )
}

export default SettingsPage
