import React, { useEffect, useState } from 'react'
import { BButtonModel, CardModel, PButtonModel } from '../../utilities/Models'
import { Button, Card, CardBody, CardHeader, Col, Form, Input, Row } from 'reactstrap'
import InputElement from '../../components/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faFile, faGlobeEurope, faList } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form'
import { MenuSchema } from '../../utilities/Schemas'
import { fetchHeaders } from '../../redux/slices/headersSlice'
import SelectElement from '../../components/SelectElement'
import FileElement from '../../components/FileElement'

const Upsert = () => {
    const dispatch = useDispatch()
    const [isSave, setIsSave] = useState(false)
    const [menus, setMenus] = useState({})
    const { handleSubmit, reset, formState: { errors }, control } = useForm({ resolver: yupResolver(MenuSchema), })
    const theme = useSelector((state) => state.theme.theme)
    const data = useSelector((state) => state.headers.data)
    const header = useSelector((state) => state.headerId.data)
    const lng = useSelector((state) => state.lang.lang)

    const getData = async () => {
        if (data) {
            var newlist = []
            for (var i = 0; i < data.length; i++) {
                newlist.push({ value: data[i].headerID, label: data[i].titleTR })
            }
            setMenus(newlist)
        }
    }

    const onSubmit = (e) => {
        if (isSave) {
            console.log(e)
        } else {
            setIsSave(false)
        }
    }

    useEffect(() => {
        dispatch(fetchHeaders())
        getData()
    }, [dispatch])

    return (
        <Card className={CardModel(theme)}>
            <CardHeader className='bg-transparent border-0'>
                <div><h5>Menü {header ? "Güncelle" : "Ekle"}</h5></div>
                <div className='subtitle'><span className='text-s'>Menü elemanlarını ekleyebilir veya düzenleyebilirsiniz.</span></div>
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={6}>
                            <FileElement
                                id="file"
                                label="Logo"
                                control={control}
                                errors={errors}
                                icon={<FontAwesomeIcon icon={faFile} color='#c1beea' size='1x' />}
                            />
                        </Col>
                        <Col md={6}>
                            <SelectElement
                                id="ParentHeaderID"
                                label="Üst Başlık"
                                control={control}
                                data={menus}
                                errors={errors}
                                icon={<FontAwesomeIcon icon={faList} color='#c1beea' size='1x' />}
                                suffix={<FontAwesomeIcon icon={faChevronDown} color='#c1beea' size='1x' />} />
                        </Col>
                        <Col md={4}>
                            <InputElement
                                id="TitleTR"
                                type="text"
                                control={control}
                                errors={errors}
                                label={`Başlık - ${lng}`}
                                icon={<FontAwesomeIcon icon={faList} color='#c1beea' size='1x' />} />
                        </Col>
                        <Col md={4}>
                            <InputElement
                                id="LongTitleTR"
                                type="text"
                                control={control}
                                errors={errors}
                                label={`Uzun Başlık - ${lng}`}
                                icon={<FontAwesomeIcon icon={faList} color='#c1beea' size='1x' />} />
                        </Col>
                        <Col md={4}>
                            <InputElement
                                id="UrlTR"
                                type="text"
                                control={control}
                                errors={errors}
                                label={`URL - ${lng}`}
                                icon={<FontAwesomeIcon icon={faGlobeEurope} color='#c1beea' size='1x' />} />
                        </Col>
                        <Col md={12} className='d-flex justify-content-end'>
                            <Button className={BButtonModel} onClick={() => setIsSave(true)}>Kaydet - {lng}</Button>
                            <Button className={PButtonModel} type='submit'>{header ? "Güncelle" : "Ekle"}</Button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}

export default Upsert
