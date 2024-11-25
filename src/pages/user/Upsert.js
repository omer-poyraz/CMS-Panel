import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BButtonModel, CardHModel, CardModel, EndModel, PButtonModel } from '../../utilities/Models'
import { Button, Card, CardBody, CardHeader, Col, Form, Row } from 'reactstrap'
import InputElement from '../../components/Input'
import { Key, Lock, Mail, Phone, User, X } from 'react-feather'
import { yupResolver } from "@hookform/resolvers/yup"
import { fetchUserEdit } from '../../redux/slices/userEditSlice'
import { fetchUsers } from '../../redux/slices/usersSlice'
import { useForm } from 'react-hook-form'
import { UserSchema } from '../../utilities/Schemas'

const Upsert = () => {
    const { handleSubmit, reset, formState: { errors }, control } = useForm({ resolver: yupResolver(UserSchema), })
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.theme)
    const data = useSelector((state) => state.userId.data)

    const clearData = () => {
        reset()
    }

    const onSubmit = async (value) => {
        console.log(value)
        await dispatch(fetchUserEdit({ data: value }))
        await dispatch(fetchUsers())
        clearData()
    }

    useEffect(() => { if (data) reset(data) }, [data])

    return (
        <Card className={CardModel(theme)}>
            <CardHeader className={CardHModel}>
                <div><h5>Kullanıcı {data ? "Güncelle" : "Ekle"}</h5></div>
                <div className='subtitle'><span className='text-s'>Kullanıcı ekleyebilir veya düzenleyebilirsiniz.</span></div>
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={6}>
                            <InputElement
                                id="firstName"
                                label="İsim"
                                control={control}
                                errors={errors}
                                icon={<User color='#c1beea' size={20} />} />
                        </Col>
                        <Col md={6}>
                            <InputElement
                                id="lastName"
                                label="Soyisim"
                                control={control}
                                errors={errors}
                                icon={<User color='#c1beea' size={20} />} />
                        </Col>
                        <Col md={6}>
                            <InputElement
                                id="userName"
                                label="Kullanıcı Adı"
                                control={control}
                                errors={errors}
                                icon={<Key color='#c1beea' size={20} />} />
                        </Col>
                        <Col md={6}>
                            <InputElement
                                id="phoneNumber"
                                label="Telefon"
                                control={control}
                                errors={errors}
                                icon={<Phone color='#c1beea' size={20} />} />
                        </Col>
                        <Col md={6}>
                            <InputElement
                                id="email"
                                label="Mail"
                                control={control}
                                errors={errors}
                                icon={<Mail color='#c1beea' size={20} />} />
                        </Col>
                        {!data ? <Col md={6}>
                            <InputElement
                                id="password"
                                label="Şifre"
                                control={control}
                                errors={errors}
                                icon={<Lock color='#c1beea' size={20} />} />
                        </Col> : null}
                        <Col md={12} className={EndModel}>
                            {data ? <Button onClick={clearData} className={BButtonModel}><X /></Button> : null}
                            <Button type='submit' className={PButtonModel}>{data ? "Güncelle" : "Ekle"}</Button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}

export default Upsert
