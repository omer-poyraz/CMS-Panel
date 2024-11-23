import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap'
import { MenuColumns } from '../../components/Columns'

const List = () => {
    const [loading, setLoading] = useState(false)
    const getMenuById = (id) => { }
    const deleteMenu = (id) => { }

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 1000);
    }, [])

    return (
        <Card className='border-0 mt-4 rounded-l overflow-hidden shadow'>
            <CardHeader className='bg-white border-0'>
                <div><h3>Menü Listesi</h3></div>
                <div><span className='text-s'>Menü listesini görebilirsiniz.</span></div>
            </CardHeader>
            <CardBody>
                {loading ? <Table
                    rowKey='productID'
                    dataSource={[]}
                    columns={MenuColumns({ getMenuById: getMenuById, deleteMenu: deleteMenu })}
                    scroll={{ x: 'max-content' }}
                /> : <div className='w-100 mt-5 mb-5 d-flex justify-content-center align-items-center'>
                    <Spinner style={{ width: '3rem', height: '3rem' }} color='info'> </Spinner>
                </div>}

            </CardBody>
        </Card>
    )
}

export default List
