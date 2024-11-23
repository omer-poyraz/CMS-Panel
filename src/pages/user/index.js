import React, { useEffect } from 'react'
import North from '../../components/North'
import Upsert from './Upsert'
import Table from '../../components/Table'
import { TargetColumn } from '../../utilities/TargetColumn'
import { TargetData } from '../../utilities/TargetData'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../redux/slices/usersSlice'

const UserPage = () => {
    const data = useSelector((state) => state.users.data)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    return (
        <North>
            <Upsert />
            <Table
                title="Kullanıcı Listesi"
                description="Kullanıcı listesini inceleyebilirsiniz."
                id="userId"
                column={TargetColumn(3)}
                data={data}
            />
        </North>
    )
}

export default UserPage
