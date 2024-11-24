import { Table as Table2 } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap'
import { LocaleMessage } from './General'

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
                <div><h5>{title}</h5></div>
                <div className='subtitle'><span className='text-s'>{description}</span></div>
            </CardHeader>
            <CardBody>
                <div className='table-container'>
                    {loading ? <Table2
                        className={theme ? 'card2 bg-dark h-100' : 'h-100'}
                        rowKey={id}
                        dataSource={data}
                        columns={column}
                        locale={LocaleMessage}
                        scroll={{ x: 'max-content' }}
                    /> : <div className='w-100 mt-5 mb-5 d-flex justify-content-center align-items-center'>
                        <Spinner style={{ width: '3rem', height: '3rem' }} color='info'> </Spinner>
                    </div>}
                </div>
            </CardBody>
        </Card>
    )
}

export default Table
