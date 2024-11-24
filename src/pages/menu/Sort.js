import React from 'react'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardHeader } from 'reactstrap'

const Sort = () => {
    const theme = useSelector((state) => state.theme.theme)

    return (
        <Card className={`border-0 mt-4 rounded-l overflow-hidden shadow ${theme ? 'card2' : ''}`}>
            <CardHeader className='bg-transparent border-0'>
                <div><h5>Menü Sıralama</h5></div>
                <div className='subtitle'><span className='text-s'>Menü elemanlarınızı sıralayabilirsiniz.</span></div>
            </CardHeader>
            <CardBody>
                
            </CardBody>
        </Card>
    )
}

export default Sort
