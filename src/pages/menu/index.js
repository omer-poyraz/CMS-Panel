import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import Language from '../../components/Language'
import North from '../../components/North'
import Table from '../../components/Table'
import { fetchMenuGroupId } from '../../redux/slices/menuGroupIdSlice'
import { fetchMenusByGroup } from '../../redux/slices/menusByGroupSlice'
import { TargetColumn } from '../../utilities/TargetColumn'
import Sort from './Sort'
import Upsert from './Upsert'

const MenuPage = () => {
    const params = useParams()
    const { id } = params
    const dispatch = useDispatch()
    const data = useSelector((state) => state.menusByGroup.data)
    const theme = useSelector((state) => state.theme.theme)
    const menuGroup = useSelector((state) => state.menuGroupId.data)
    const [upsertModal, setUpsertModal] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const lng = useSelector((state) => state.lang.lang)

    useEffect(() => {
        const getData = async () => {
            await dispatch(fetchMenusByGroup({ id: id, lang: lng }))
            await dispatch(fetchMenuGroupId({ id: id, lang: lng }))
        }
        getData()
    }, [dispatch, id, lng])

    return (
        <North>
            <Language />

            <Table
                title={`${menuGroup?.translations?.find(t => t.lang === lng)?.title || ''} Listesi`}
                description="Menü listesini inceleyebilirsiniz."
                key="id"
                id="menuID"
                column={TargetColumn(1, setUpsertModal, setIsUpdate)}
                data={data}
                modal={upsertModal}
                setModal={setUpsertModal}
                setIsUpdate={setIsUpdate}
            />
            <Modal isOpen={upsertModal} toggle={() => setUpsertModal(!upsertModal)} size='lg' centered className={`${theme ? 'modal2' : ''}`}>
                <ModalHeader toggle={() => setUpsertModal(!upsertModal)}>{isUpdate ? "Menü Güncelle" : "Menü Ekle"}</ModalHeader>
                <ModalBody>
                    <Upsert setModal={setUpsertModal} id={id} data={data} isUpdate={isUpdate} />
                </ModalBody>
            </Modal>
            <Sort data={data} lang={lng} id={id} />
        </North>
    )
}

export default MenuPage
