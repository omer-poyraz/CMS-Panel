import React from 'react'
import North from '../../components/North'
import Upsert from './Upsert'
import Sort from './Sort'
import Table from '../../components/Table'
import { TargetColumn } from '../../utilities/TargetColumn'
import { TargetData } from '../../utilities/TargetData'
import Language from '../../components/Language'

const MenuPage = () => {
    return (
        <North>
            <Language />
            <Upsert />
            <Table
                title="Menü Listesi"
                description="Menü listesini inceleyebilirsiniz."
                id="headerID"
                column={TargetColumn(1)}
                data={TargetData(1)}
            />
            <Sort />
        </North>
    )
}

export default MenuPage
