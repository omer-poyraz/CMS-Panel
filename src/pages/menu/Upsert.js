import { faChevronDown, faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, Col, Form, Row } from 'reactstrap'
import InputElement from '../../components/Input'
import Language from '../../components/Language'
import SelectElement from '../../components/SelectElement'
import SwitchElement from '../../components/SwitchElement'
import { fetchMenuCreate } from '../../redux/slices/menuCreateSlice'
import { fetchMenuUpdate } from '../../redux/slices/menuUpdateSlice'
import { fetchMenusByGroup } from '../../redux/slices/menusByGroupSlice'
import { fetchMenus } from '../../redux/slices/menusSlice'
import { CardModel, PButtonModel } from '../../utilities/Models'
import { MenuSchema } from '../../utilities/Schemas'

const Upsert = ({ setModal, id, data, isUpdate }) => {
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.theme)
    const [menuOptions, setMenuOptions] = useState([])
    const menu = useSelector((state) => state.menuId.data)
    const lng = useSelector((state) => state.lang.lang)
    const { handleSubmit, reset, formState: { errors }, control, setValue, watch } = useForm({
        resolver: yupResolver(MenuSchema),
        defaultValues: {
            menuGroupID: id,
            parentMenuID: null,
            translations: [
                { id: null, lang: "TR", title: "", slug: "", active: true },
                { id: null, lang: "EN", title: "", slug: "", active: true },
            ],
            sort: null,
            activeLangTitle: "",
            activeLangSlug: "",
            activeLangActive: true
        }
    })

    const onSubmit = async (form) => {
        try {
            const payload = {
                menuGroupID: parseInt(id),
                parentMenuID: parseInt(form?.parentMenuID),
                translations: form?.translations.filter(t => t.title && t.title.trim() !== "" && t.slug && t.slug.trim() !== "" && t.lang && t.active !== undefined) || [],
            }

            let res

            if (menu?.id) {
                payload.id = menu.id
                res = await dispatch(fetchMenuUpdate({ data: payload }))
            } else {
                res = await dispatch(fetchMenuCreate({ data: payload }))
            }
            await dispatch(fetchMenusByGroup({ id: id, lang: lng }))

            if (res?.payload?.id) {
                dispatch(fetchMenus({ lang: lng }))
            }
            setModal(false)
        } catch (error) {
            toast.error("Hata: " + error)
        }
    }

    useEffect(() => {
        if (!isUpdate) {
            reset({
                menuGroupID: id,
                parentMenuID: null,
                translations: [
                    { id: null, lang: "TR", title: "", slug: "", active: true },
                    { id: null, lang: "EN", title: "", slug: "", active: true },
                ],
                sort: null,
                activeLangTitle: "",
                activeLangSlug: "",
                activeLangActive: true
            });
        }
    }, [isUpdate, reset, id]);

    useEffect(() => {
        const getData = async () => {
            let menuList = []
            data?.forEach(element => {
                menuList.push({ value: element?.id, label: element?.translations[0]?.title })
            });
            setMenuOptions(menuList)
        }
        getData()
    }, [data])

    useEffect(() => {
        if (menu?.id) {
            const newTranslations = menu.translations.map(t => ({
                id: t.id,
                lang: t.lang,
                title: t.title,
                slug: t.slug,
                active: t.active
            }))

            setValue("translations", newTranslations)

            const activeTranslation = newTranslations.find(
                t => t.lang.toLowerCase() === lng.toLowerCase()
            )

            setValue("activeLangTitle", activeTranslation ? activeTranslation.title : "")
            setValue("activeLangSlug", activeTranslation ? activeTranslation.slug : "")
            setValue("activeLangActive", activeTranslation ? activeTranslation.active : true)
        }
    }, [menu, setValue, lng])

    useEffect(() => {
        const currentTranslations = watch("translations") || []
        const activeTranslation = currentTranslations.find(
            t => t.lang.toLowerCase() === lng.toLowerCase()
        )
        setValue("activeLangTitle", activeTranslation ? activeTranslation.title : "")
        setValue("activeLangSlug", activeTranslation ? activeTranslation.slug : "")
        setValue("activeLangActive", activeTranslation ? activeTranslation.active : true)
    }, [lng, menu, setValue, watch])

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
                                className='mb-0'
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
                        <Col md={12}>
                            <InputElement
                                id="activeLangSlug"
                                type="text"
                                className='mb-0'
                                control={control}
                                errors={errors.translations?.[0]?.slug?.message}
                                label={`Slug (${lng})`}
                                icon={<FontAwesomeIcon icon={faList} color='#c1beea' size='1x' />}
                                value={watch("activeLangSlug")}
                                onChangeExtra={(value) => {
                                    const currentTranslations = watch("translations") || []
                                    const updatedTranslations = currentTranslations.map(t => t.lang === lng ? { ...t, slug: value } : t)
                                    setValue("translations", updatedTranslations)
                                    setValue("activeLangSlug", value)
                                }}
                            />
                        </Col>
                        <Col md={12}>
                            <SelectElement
                                id="parentMenuID"
                                label="Üst Menü"
                                control={control}
                                icon={<FontAwesomeIcon icon={faList} color='#c1beea' size='1x' />}
                                suffix={<FontAwesomeIcon icon={faChevronDown} color='#c1beea' size='1x' />}
                                data={menuOptions}
                                errors={errors}
                            />
                        </Col>
                        <Col md={12}>
                            <SwitchElement
                                id="activeLangActive"
                                control={control}
                                errors={errors}
                                label={`Aktif (${lng})`}
                                checkedChildren="Aktif"
                                unCheckedChildren="Pasif"
                                value={watch("activeLangActive")}
                                onChangeExtra={(checked) => {
                                    const currentTranslations = watch("translations") || []
                                    const updatedTranslations = currentTranslations.map(t => t.lang === lng ? { ...t, active: checked } : t)
                                    setValue("translations", updatedTranslations)
                                    setValue("activeLangActive", checked)
                                }}
                            />
                        </Col>
                        <Col md={12} className='d-flex justify-content-end'>
                            <Button className={PButtonModel} type='submit'>{menu ? "Güncelle" : "Ekle"}</Button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}

export default Upsert
