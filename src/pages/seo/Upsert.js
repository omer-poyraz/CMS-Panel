import React, { useEffect } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Form, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { CardModel, EndModel, PButtonModel } from '../../utilities/Models'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { SeoSchema } from '../../utilities/Schemas'
import InputElement from '../../components/Input'
import { Globe } from 'react-feather'
import { fetchSeoAdd } from '../../redux/slices/seoAddSlice'
import { fetchSeos } from '../../redux/slices/seosSlice'
import { fetchSeoUpdate } from '../../redux/slices/seoUpdateSlice'

const Upsert = () => {
    const { handleSubmit, reset, formState: { errors }, control } = useForm({ resolver: yupResolver(SeoSchema), })
    const theme = useSelector((state) => state.theme.theme)
    let data = useSelector((state) => state.seoId.data)
    const dispatch = useDispatch()

    const onSubmit = async (value) => {
        let res
        if (data) res = await dispatch(fetchSeoUpdate({ data: value }))
        else res = await dispatch(fetchSeoAdd({ data: value }))
        await dispatch(fetchSeos())
    }

    useEffect(() => { if (data) reset(data) }, [data])

    return (
        <Card className={CardModel(theme)}>
            <CardHeader className="bg-transparent border-0">
                <div><h5>Seo {data ? "Güncelle" : "Ekle"}</h5></div>
                <div className="subtitle"><span className="text-s">Sayfalarınız için seo ekleyebilir veya düzenleyebilirsiniz.</span></div>
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={6}>
                            <InputElement
                                id="titleTR"
                                type="text"
                                control={control}
                                errors={errors}
                                label="Meta Başlık"
                                icon={<Globe color="#c1beea" size={18} />} />
                        </Col>
                        <Col md={6}>
                            <InputElement
                                id="descriptionTR"
                                type="text"
                                control={control}
                                errors={errors}
                                label="Meta Açıklama"
                                icon={<Globe color="#c1beea" size={18} />} />
                        </Col>
                        <Col md={6}>
                            <InputElement
                                id="keywordsTR"
                                type="text"
                                control={control}
                                errors={errors}
                                label="Meta Anahtarlar"
                                icon={<Globe color="#c1beea" size={18} />} />
                        </Col>
                        <Col md={6}>
                            <InputElement
                                id="authorTR"
                                type="text"
                                control={control}
                                errors={errors}
                                label="Meta Yazar"
                                icon={<Globe color="#c1beea" size={18} />} />
                        </Col>
                        <Col md={12} className={EndModel}>
                            <Button className={PButtonModel} type="submit">{data ? "Güncelle" : "Ekle"}</Button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    );
};

export default Upsert;
