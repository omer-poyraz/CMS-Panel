import React, { useEffect } from 'react'
import North from '../../components/North'
import Upsert from './Upsert'
import Sort from './Sort'
import Table from '../../components/Table'
import { TargetColumn } from '../../utilities/TargetColumn'
import Language from '../../components/Language'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHeaders } from '../../redux/slices/headersSlice'

const MenuPage = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.headers.data)

    useEffect(() => {
        dispatch(fetchHeaders())
    }, [dispatch])

    return (
        <North>
            <Language />
            <Upsert />
            <Table
                title="Menü Listesi"
                description="Menü listesini inceleyebilirsiniz."
                id="headerID"
                column={TargetColumn(1)}
                data={data}
            />
            <Sort />
        </North>
    )
}

export default MenuPage
