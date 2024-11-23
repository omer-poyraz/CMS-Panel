import { Table as Table2 } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap'

const Table = ({ title, description, id, column, data }) => {
    const theme = useSelector((state) => state.theme.theme)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 1000);
    }, [])

    return (
        <Card className={`border-0 mt-4 rounded-l overflow-hidden shadow ${theme ? 'card2' : ''}`}>
            <CardHeader className='bg-transparent border-0'>
                <div><h3>{title}</h3></div>
                <div><span className='text-s'>{description}</span></div>
            </CardHeader>
            <CardBody>
                {loading ? <Table2
                    className={theme ? 'card2 bg-dark' : ''}
                    rowKey={id}
                    dataSource={data}
                    columns={column}
                    scroll={{ x: 'max-content' }}
                /> : <div className='w-100 mt-5 mb-5 d-flex justify-content-center align-items-center'>
                    <Spinner style={{ width: '3rem', height: '3rem' }} color='info'> </Spinner>
                </div>}

            </CardBody>
        </Card>
    )
}

export default Table
