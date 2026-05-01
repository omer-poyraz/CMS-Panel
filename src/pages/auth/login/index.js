import { faEye, faEyeSlash, faLock, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Col, Container, Form, Label, Row } from 'reactstrap'
import InputElement from '../../../components/Input'
import LgBg from '../../../images/login.png'
import { fetchLogin } from '../../../redux/slices/loginSlice'
import { AuthSchema } from '../../../utilities/Schemas'

const LoginPage = () => {
    const { handleSubmit, formState: { errors }, control, watch, setValue } = useForm({ resolver: yupResolver(AuthSchema), defaultValues: { username: "", password: "" } })
    const [isEye, setIsEye] = useState(false)
    const [load, setLoad] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        setLoad(true)
        var res = await dispatch(fetchLogin({ username: e.username, password: e.password }))
        if (res.payload?.result?.accessToken && res.payload?.result?.isAdmin === 1) {
            navigate("/")
        } else {
            toast.error("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.")
        }
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
                                className='mb-0'
                                control={control}
                                errors={errors.username?.message}
                                label={`Kullanıcı Adı`}
                                icon={<FontAwesomeIcon icon={faUser} color='#c1beea' size='xxl' />}
                                value={watch("username")}
                                onChangeExtra={(value) => {
                                    setValue("username", value)
                                }}
                            />
                            <InputElement
                                id="password"
                                type={isEye ? 'text' : 'password'}
                                className='mb-0'
                                control={control}
                                errors={errors.password?.message}
                                label={`Şifre`}
                                icon={<FontAwesomeIcon icon={faLock} color='#c1beea' size='1x' />}
                                value={watch("password")}
                                onChangeExtra={(value) => {
                                    setValue("password", value)
                                }}
                                suffix={isEye ? <FontAwesomeIcon icon={faEye} color='#c1beea' size='1x' onClick={() => setIsEye(!isEye)} /> :
                                    <FontAwesomeIcon icon={faEyeSlash} color='#c1beea' size='1x' onClick={() => setIsEye(!isEye)} />}
                            />
                            <Button className='w-100 primary rounded-l border-0 py-2 mt-3' disabled={load}>Giriş Yap</Button>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container >
    )
}

export default LoginPage