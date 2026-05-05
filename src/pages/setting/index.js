import { Tabs } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody } from 'reactstrap'
import North from '../../components/North'
import { fetchSettings } from '../../redux/slices/settingsSlice'
import ContactSettings from './contact'
import ContractSettings from './contract'
import LanguageSettings from './language'
import LocationSettings from './location'
import LogoSettings from './logo'
import ReferenceSettings from './reference'
import SocialMediaSettings from './social-media'
import ThemeSettings from './theme'

const SettingsPage = () => {
    const theme = useSelector((state) => state.theme.theme)
    const lng = useSelector((state) => state.lang.lang)
    const settings = useSelector((state) => state.settings.data)
    const dispatch = useDispatch()

    useEffect(() => {
        const getData = async () => {
            await dispatch(fetchSettings({ lang: lng }))
        }
        getData()
    }, [dispatch, lng])

    const tabs = [
        { key: 1, label: "Dil Ayarları", children: <LanguageSettings /> },
        { key: 2, label: "Logo Ayarları", children: <LogoSettings settings={settings} /> },
        { key: 3, label: "Tema Ayarları", children: <ThemeSettings settings={settings} /> },
        { key: 4, label: "Sözleşme Ayarları", children: <ContractSettings /> },
        { key: 5, label: "İletişim Ayarları", children: <ContactSettings /> },
        { key: 6, label: "Lokasyon Ayarları", children: <LocationSettings /> },
        { key: 7, label: "Referans Ayarları", children: <ReferenceSettings /> },
        { key: 8, label: "Sosyal Medya Ayarları", children: <SocialMediaSettings /> },
    ]

    return (
        <North>
            <Card className={`${theme ? 'bg-dark text-s' : 'bg-white'} shadow`}>
                <CardBody>
                    <Tabs
                        type="card"
                        items={tabs.map((tab) => {
                            return {
                                label: tab.label,
                                key: tab.key,
                                children: tab.children
                            }
                        })}
                    />
                </CardBody>
            </Card>
        </North>
    )
}

export default SettingsPage
