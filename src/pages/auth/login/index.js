import React, { useState } from 'react'
import { Button, Col, Container, Label, Row } from 'reactstrap'
import LgBg from '../../../images/login.png'
import { Eye, EyeOff, Lock, User } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import InputElement from '../../../components/Input'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '../../../redux/slices/loginSlice'
import { toast } from 'react-toastify'

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const [load, setLoad] = useState(false)
    const [isEye, setIsEye] = useState(false)
    const [formData, setFormData] = useState({ username: "", password: "" })

    const loginData = async () => {
        setLoad(true)
        var data = await dispatch(fetchLogin({ username: formData.username, password: formData.password }))
        if (data.payload.userId) {
            localStorage.setItem("auth", JSON.stringify(data.payload))
            toast.success(`Hoşgeldin ${data.payload.name}.`)
            setTimeout(() => {
                navigation("/")
            }, 1000);
        }
        setTimeout(() => {
            setLoad(false)
        }, 1000);
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
                        <div className='mt-4'>
                            <InputElement
                                label="Kullanıcı adı"
                                type="text"
                                icon={<User color='#ccc' size={20} />}
                                onchange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                            />
                            <InputElement
                                label="Şifre"
                                icon={<Lock color='#ccc' size={20} />}
                                type={isEye ? 'text' : 'password'}
                                suffix={isEye ? <Eye color='grey' size={20} onClick={() => setIsEye(!isEye)} /> :
                                    <EyeOff color='grey' size={20} onClick={() => setIsEye(!isEye)} />}
                                onchange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            />
                            <Button className='w-100 primary rounded-l border-0 py-2 mt-3' onClick={loginData} disabled={load}>Giriş Yap</Button>
                        </div>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage