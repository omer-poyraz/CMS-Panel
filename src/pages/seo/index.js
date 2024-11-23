import React from 'react'
import North from '../../components/North'
import Upsert from './Upsert'
import Table from '../../components/Table'
import { TargetColumn } from '../../utilities/TargetColumn'
import { TargetData } from '../../utilities/TargetData'
import Language from '../../components/Language'

const SeoPage = () => {
    return (
        <North>
            <Language />
            <Upsert />
            <Table
                title="Seo Listesi"
                description="Sayfalarınız için eklenen seoları inceleyebilirsiniz."
                id="seoID"
                column={TargetColumn(2)}
                data={TargetData(2)}
            />
        </North>
    )
}

export default SeoPage
