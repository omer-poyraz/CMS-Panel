import { faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, Col, Form, Row } from 'reactstrap'
import InputElement from '../../components/Input'
import Language from '../../components/Language'
import { fetchMenuGroupCreate } from '../../redux/slices/menuGroupCreateSlice'
import { fetchMenuGroups } from '../../redux/slices/menuGroupsSlice'
import { fetchMenuGroupUpdate } from '../../redux/slices/menuGroupUpdateSlice'
import { CardModel, PButtonModel } from '../../utilities/Models'
import { MenuGroupSchema } from '../../utilities/Schemas'

const Upsert = ({ setModal }) => {
    const dispatch = useDispatch()
    const [isSave, setIsSave] = useState(false)
    const [menuGroups, setMenuGroups] = useState({})
    const { handleSubmit, reset, formState: { errors }, control, setValue, watch } = useForm({
        resolver: yupResolver(MenuGroupSchema),
        defaultValues: {
            translations: [
                { id: null, lang: "TR", title: "" },
                { id: null, lang: "EN", title: "" }
            ],
            activeLangTitle: ""
        }
    })
    const [formData, setFormData] = useState({})
    const theme = useSelector((state) => state.theme.theme)
    const data = useSelector((state) => state.menuGroups.data)
    const menuGroup = useSelector((state) => state.menuGroupId.data)
    const lng = useSelector((state) => state.lang.lang)
    const currentTranslations = watch("translations") || []

    const onSubmit = async (form) => {
        try {
            const payload = {
                translations: form.translations.filter(t => t.title && t.title.trim() !== "")
            }

            let res

            if (menuGroup?.id) {
                payload.id = menuGroup.id
                res = await dispatch(fetchMenuGroupUpdate({ data: payload }))
            } else {
                res = await dispatch(fetchMenuGroupCreate({ data: payload }))
            }

            if (res?.payload?.id) {
                dispatch(fetchMenuGroups({ lang: lng }))
            }
            setModal(false)
        } catch (error) {
            toast.error("Hata: " + error)
        }
    }

    useEffect(() => {
        if (menuGroup?.id) {
            setValue("translations", menuGroup.translations.map(t => ({ id: t.id, lang: t.lang, title: t.title })))
            const activeTranslation = currentTranslations.find(
                t => t.lang.toLowerCase() === lng.toLowerCase()
            )
            setValue("activeLangTitle", activeTranslation ? activeTranslation.title : "")
        }
    }, [menuGroup])

    useEffect(() => {
        const currentTranslations = watch("translations") || []
        const activeTranslation = currentTranslations.find(
            t => t.lang.toLowerCase() === lng.toLowerCase()
        )
        setValue("activeLangTitle", activeTranslation ? activeTranslation.title : "")
    }, [lng, menuGroup])

    return (
        <Card className={CardModel(theme)}>
            <CardBody>
                <Language />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={12}>
                            <InputElement
                                id="activeLangTitle"
                                type="text"
                                control={control}
                                errors={errors.translations?.[0]?.title?.message}
                                label={`Başlık (${lng})`}
                                icon={<FontAwesomeIcon icon={faList} color='#c1beea' size='1x' />}
                                value={watch("activeLangTitle")}
                                onChangeExtra={(value) => {
                                    const currentTranslations = watch("translations") || []
                                    const updatedTranslations = currentTranslations.map(t => t.lang === lng ? { ...t, title: value } : t)
                                    setValue("translations", updatedTranslations)
                                    setValue("activeLangTitle", value)
                                }}
                            />
                        </Col>
                        <Col md={12} className='d-flex justify-content-end'>
                            <Button className={PButtonModel} type='submit'>{menuGroup ? "Güncelle" : "Ekle"}</Button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}

export default Upsert
