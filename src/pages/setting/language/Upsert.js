import { faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, Col, Form, Row } from 'reactstrap'
import InputElement from '../../../components/Input'
import Language from '../../../components/Language'
import { fetchLanguageCreate } from '../../../redux/slices/languageCreateSlice'
import { fetchLanguages } from '../../../redux/slices/languagesSlice'
import { fetchLanguageUpdate } from '../../../redux/slices/languageUpdateSlice'
import { CardModel, PButtonModel } from '../../../utilities/Models'
import { LanguageSchema } from '../../../utilities/Schemas'

const Upsert = ({ setModal, isUpdate }) => {
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.theme)
    const language = useSelector((state) => state.languageId.data)
    const lng = useSelector((state) => state.lang.lang)
    const { handleSubmit, formState: { errors }, control, setValue, watch } = useForm({
        resolver: yupResolver(LanguageSchema),
        defaultValues: {
            translations: [
                { id: null, title: "", lang: "TR", code: "" },
                { id: null, title: "", lang: "EN", code: "" }
            ],
            activeLangTitle: "",
            activeLangCode: ""
        }
    })

    const onSubmit = async (form) => {
        try {
            let res
            const payload = { translations: form.translations.filter(t => t.title && t.title.trim() !== "") }

            if (isUpdate) {
                payload.id = language.id
                res = await dispatch(fetchLanguageUpdate({ data: payload }))
            } else {
                res = await dispatch(fetchLanguageCreate({ data: payload }))
            }

            if (res?.payload?.id) {
                dispatch(fetchLanguages({ lang: lng }))
            }
            setModal(false)
        } catch (error) {
            toast.error("Hata: " + error)
        }
    }

    useEffect(() => {
        const currentTranslations = watch("translations") || []
        if (isUpdate) {
            setValue("translations", language?.translations.map(t => ({ id: t.id, lang: t.lang, title: t.title, code: t.code })))
            const activeTranslation = currentTranslations.find(
                t => t.lang.toLowerCase() === lng.toLowerCase()
            )
            setValue("activeLangTitle", activeTranslation ? activeTranslation.title : "")
            setValue("activeLangCode", activeTranslation ? activeTranslation.code : "")
        }
    }, [language, setValue, lng, watch, isUpdate])

    useEffect(() => {
        const currentTranslations = watch("translations") || []
        const activeTranslation = currentTranslations.find(
            t => t.lang.toLowerCase() === lng.toLowerCase()
        )
        setValue("activeLangTitle", activeTranslation ? activeTranslation.title : "")
        setValue("activeLangCode", activeTranslation ? activeTranslation.code : "")
    }, [lng, language, setValue, watch])

    return (
        <Card className={CardModel(theme)}>
            <CardBody>
                <Language />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={6}>
                            <InputElement
                                id="activeLangTitle"
                                type="text"
                                control={control}
                                errors={errors?.translations?.[0]?.title?.message}
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
                        <Col md={6}>
                            <InputElement
                                id="activeLangCode"
                                type="text"
                                control={control}
                                errors={errors?.translations?.[0]?.code?.message}
                                label={`Dil (${lng})`}
                                icon={<FontAwesomeIcon icon={faList} color='#c1beea' size='1x' />}
                                value={watch("activeLangCode")}
                                onChangeExtra={(value) => {
                                    const currentTranslations = watch("translations") || []
                                    const updatedTranslations = currentTranslations.map(t => t.lang === lng ? { ...t, code: value } : t)
                                    setValue("translations", updatedTranslations)
                                    setValue("activeLangCode", value)
                                }}
                            />
                        </Col>
                        <Col md={12} className='d-flex justify-content-end'>
                            <Button className={PButtonModel} type='submit'>{isUpdate ? "Güncelle" : "Ekle"}</Button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}

export default Upsert
