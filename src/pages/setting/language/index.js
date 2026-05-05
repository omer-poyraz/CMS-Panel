import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import Language from "../../../components/Language"
import Table from "../../../components/Table"
import { fetchLanguages } from "../../../redux/slices/languagesSlice"
import { TargetColumn } from "../../../utilities/TargetColumn"
import Upsert from "./Upsert"

const LanguageSettings = () => {
    const dispatch = useDispatch()
    const lng = useSelector((state) => state.lang.lang)
    const data = useSelector((state) => state.languages.data)
    const [upsertModal, setUpsertModal] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)

    useEffect(() => {
        const getData = async () => {
            await dispatch(fetchLanguages({ lang: lng }))
        }
        getData()
    }, [dispatch, lng])

    return (
        <div>
            <Language />
            <Table
                title="Dil Listesi"
                description="Dil listesini inceleyebilirsiniz."
                key="id"
                id="languageID"
                column={TargetColumn(5, setUpsertModal, setIsUpdate)}
                data={data}
                modal={upsertModal}
                setModal={setUpsertModal}
                setIsUpdate={setIsUpdate}
            />

            <Modal isOpen={upsertModal} toggle={() => setUpsertModal(!upsertModal)} size='lg' centered>
                <ModalHeader toggle={() => setUpsertModal(!upsertModal)}>{isUpdate ? "Dil Güncelle" : "Dil Ekle"}</ModalHeader>
                <ModalBody>
                    <Upsert setModal={setUpsertModal} isUpdate={isUpdate} />
                </ModalBody>
            </Modal>
        </div>
    )
}

export default LanguageSettings