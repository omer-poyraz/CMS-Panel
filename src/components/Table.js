import { Table as Table2 } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardBody, CardHeader } from 'reactstrap'
import { clearMenuId } from '../redux/slices/menuIdSlice'
import { LocaleMessage } from './General'
import Loading from './Loading'

const Table = ({ title, description, id, column, data, modal, setModal, setIsUpdate }) => {
    const theme = useSelector((state) => state.theme.theme)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 1000);
    }, [])

    if (!loading) return <Loading />

    return (
        <Card className={`border-0 mt-4 rounded-l overflow-hidden shadow ${theme ? 'card2' : ''}`}>
            <CardHeader className='bg-transparent border-0 d-flex justify-content-between align-items-center'>
                <div>
                    <div><h5>{title}</h5></div>
                    <div className='subtitle'><span className='text-s'>{description}</span></div>
                </div>
                <div>
                    <Button
                        className='primary border-primary text-white rounded-l px-4 mr-2 py-2 btn btn-secondary'
                        onClick={async () => {
                            await dispatch(clearMenuId())
                            setIsUpdate(false)
                            setModal(true)
                        }}
                    >
                        Ekle
                    </Button>
                </div>
            </CardHeader>
            <CardBody>
                <div className='table-container'>
                    <Table2
                        bordered
                        className={theme ? 'card2 bg-dark h-100' : 'h-100'}
                        rowKey={(record) => String(record[id.replace('ID', 'id')])}
                        dataSource={data}
                        columns={column}
                        locale={LocaleMessage}
                        scroll={{ x: 'max-content' }}
                    />
                </div>
            </CardBody>
        </Card>
    )
}

export default Table
