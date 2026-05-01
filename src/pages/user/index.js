import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import North from '../../components/North'
import Table from '../../components/Table'
import { fetchUsers } from '../../redux/slices/usersSlice'
import { TargetColumn } from '../../utilities/TargetColumn'
import Upsert from './Upsert'

const UserPage = () => {
    const data = useSelector((state) => state.users.data)
    const theme = useSelector((state) => state.theme.theme)
    const [upsertModal, setUpsertModal] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    return (
        <North>
            <Table
                key="userId"
                title="Kullanıcı Listesi"
                description="Kullanıcı listesini inceleyebilirsiniz."
                id="userId"
                column={TargetColumn(3, setUpsertModal, setIsUpdate)}
                data={data}
                modal={upsertModal}
                setModal={setUpsertModal}
                setIsUpdate={setIsUpdate}
            />
            <Modal isOpen={upsertModal} toggle={() => setUpsertModal(!upsertModal)} size='lg' centered className={`${theme ? 'modal2' : ''}`}>
                <ModalHeader toggle={() => setUpsertModal(!upsertModal)}>{isUpdate ? "Menü Güncelle" : "Menü Ekle"}</ModalHeader>
                <ModalBody>
                    <Upsert setModal={setUpsertModal} isUpdate={isUpdate} />
                </ModalBody>
            </Modal>
        </North>
    )
}

export default UserPage
