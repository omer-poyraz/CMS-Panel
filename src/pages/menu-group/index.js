import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import Language from '../../components/Language'
import North from '../../components/North'
import Table from '../../components/Table'
import { fetchMenuGroups } from '../../redux/slices/menuGroupsSlice'
import { TargetColumn } from '../../utilities/TargetColumn'
import Sort from './Sort'
import Upsert from './Upsert'

const MenuGroupPage = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.menuGroups.data)
    const [upsertModal, setUpsertModal] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const lng = useSelector((state) => state.lang.lang)

    useEffect(() => {
        dispatch(fetchMenuGroups({ lang: lng }))
    }, [dispatch, lng])

    return (
        <North>
            <Language />
            <Table
                key="menuGroupID"
                title="Menü Grubu Listesi"
                description="Menü grubu listesini inceleyebilirsiniz."
                id="menuGroupID"
                column={TargetColumn(2, setUpsertModal, setIsUpdate)}
                data={data}
                modal={upsertModal}
                setModal={setUpsertModal}
            />
            <Modal isOpen={upsertModal} toggle={() => setUpsertModal(!upsertModal)} size='lg' centered>
                <ModalHeader toggle={() => setUpsertModal(!upsertModal)}>{isUpdate ? "Menü Grubunu Güncelle" : "Menü Grubu Ekle"}</ModalHeader>
                <ModalBody>
                    <Upsert setModal={setUpsertModal} />
                </ModalBody>
            </Modal>
            <Sort />
        </North>
    )
}

export default MenuGroupPage
