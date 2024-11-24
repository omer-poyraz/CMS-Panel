import React from 'react'
import North from '../../components/North'
import Table from '../../components/Table'
import { TargetColumn } from '../../utilities/TargetColumn'
import { useSelector } from 'react-redux'

const OrdersPage = () => {
    // const data = useSelector((state) => state.orders.data)
    const data = []

    return (
        <North>
            <Table
                title="Sipariş Listesi"
                description="Siparişte bulunan ürünlerini listeleyebilirsiniz."
                id="orderID"
                column={TargetColumn(4)}
                data={data}
            />
        </North>
    )
}

export default OrdersPage
