import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardBody } from 'reactstrap'

const NotFoundPage = () => {
    const navigate = useNavigate()

    return (
        <div className='not-found'>
            <Card className='shadow border-0 rounded-xl'>
                <CardBody>
                    <div><h3>Sayfaya ulaşılamıyor!</h3></div>
                    <div className='mt-3'>
                        <span className='text-secondary'>Aramış olduğunuz sayfaya ulaşılamıyor. Lütfen ilgili sayfalardan birine yönlenin!</span>
                    </div>
                    <div className='mt-3'>
                        <Button onClick={() => navigate("/")} className='primary border-0'>Ana Sayfa</Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default NotFoundPage
