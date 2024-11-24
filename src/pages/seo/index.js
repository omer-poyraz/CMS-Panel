import React, { useEffect } from 'react'
import North from '../../components/North'
import Upsert from './Upsert'
import Table from '../../components/Table'
import { TargetColumn } from '../../utilities/TargetColumn'
import Language from '../../components/Language'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSeos } from '../../redux/slices/seosSlice'

const SeoPage = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.seos.data)

    useEffect(() => {
        dispatch(fetchSeos())
    }, [dispatch])

    return (
        <North>
            <Language />
            <Upsert />
            <Table
                title="Seo Listesi"
                description="Sayfalarınız için eklenen seoları inceleyebilirsiniz."
                id="seoID"
                column={TargetColumn(2)}
                data={data}
            />
        </North>
    )
}

export default SeoPage
