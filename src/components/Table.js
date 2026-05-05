import { Table as Table2 } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardBody, CardHeader } from 'reactstrap'
import { clearMenuId } from '../redux/slices/menuIdSlice'
import { LocaleMessage } from './General'
import Loading from './Loading'

const Table = ({ title, description, id, column, data, modal, setModal, setIsUpdate }) => {
    const theme = useSelector((state) => state.theme.theme)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const generatedRowKeysRef = useRef(new WeakMap())
    const generatedRowKeyCounterRef = useRef(0)

    const getGeneratedRowKey = (record) => {
        if (record && typeof record === 'object') {
            const existingKey = generatedRowKeysRef.current.get(record)

            if (existingKey) {
                return existingKey
            }

            generatedRowKeyCounterRef.current += 1
            const newKey = `generated-row-${generatedRowKeyCounterRef.current}`
            generatedRowKeysRef.current.set(record, newKey)

            return newKey
        }

        generatedRowKeyCounterRef.current += 1
        return `generated-row-primitive-${generatedRowKeyCounterRef.current}`
    }

    const resolveRowKey = (record) => {
        const primaryKey = typeof id === 'string' ? id : 'id'
        const normalizedKey = primaryKey.replace(/ID$/, 'Id')
        const lowercaseFirstKey = normalizedKey.charAt(0).toLowerCase() + normalizedKey.slice(1)
        const candidates = [primaryKey, normalizedKey, lowercaseFirstKey, 'id', 'ID']

        for (const candidate of candidates) {
            const value = record?.[candidate]

            if (value !== undefined && value !== null && value !== '') {
                return String(value)
            }
        }

        return getGeneratedRowKey(record)
    }

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
                        rowKey={resolveRowKey}
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
