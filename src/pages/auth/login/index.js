import React, { useState } from 'react'
import { Button, Col, Container, Form, Label, Row } from 'reactstrap'
import LgBg from '../../../images/login.png'
import { Eye, EyeOff, Lock, User } from 'react-feather'
import InputElement from '../../../components/Input'
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch } from 'react-redux'
import { fetchLogin } from '../../../redux/slices/loginSlice'
import { useForm } from 'react-hook-form'
import { AuthSchema } from '../../../utilities/Schemas'

const LoginPage = () => {
    const { handleSubmit, formState: { errors }, control } = useForm({ resolver: yupResolver(AuthSchema), })
    const [isEye, setIsEye] = useState(false)
    const [load, setLoad] = useState(false)
    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        setLoad(true)
        await dispatch(fetchLogin({ username: e.username, password: e.password }))
        setTimeout(() => { setLoad(false) }, 1000);
    }

    return (
        <Container className='loginpage'>
            <Row className='vh-100'>
                <Col sm={8} md={8} className='d-flex align-items-center'>
                    <Container>
                        <img src={LgBg} alt='' className='w-100' />
                    </Container>
                </Col>
                <Col sm={4} md={4} className='d-flex align-items-center'>
                    <Container className='p-0 m-0'>
                        <h3>North Panel'e Hoşgeldiniz</h3>
                        <Label className='text-secondary'>Eğer bir hesabınız varsa lütfen giriş yapınız. Bir hesabınız yoksa müşteri temsilcinizle irtibata geçiniz.</Label>
                        <Form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
                            <InputElement
                                id="username"
                                type="text"
                                control={control}
                                errors={errors}
                                label="Kullanıcı Adı"
                                icon={<User color="#c1beea" size={18} />} />
                            <InputElement
                                id="password"
                                type={isEye ? 'text' : 'password'}
                                control={control}
                                errors={errors}
                                label="Şifre"
                                suffix={isEye ? <Eye color='grey' size={20} onClick={() => setIsEye(!isEye)} /> :
                                    <EyeOff color='grey' size={20} onClick={() => setIsEye(!isEye)} />}
                                icon={<Lock color='#ccc' size={20} />} />
                            <Button className='w-100 primary rounded-l border-0 py-2 mt-3' disabled={load}>Giriş Yap</Button>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container >
    )
}

export default LoginPage