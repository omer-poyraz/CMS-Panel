import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import { Card, CardBody } from 'reactstrap'
import North from '../../components/North'
import ContactSettings from './contact'
import ContractSettings from './contract'
import GeneralSettings from './general'
import LanguageSettings from './language'
import LocationSettings from './location'
import LogoSettings from './logo'
import ReferenceSettings from './reference'
import SocialMediaSettings from './social-media'
import ThemeSettings from './theme'

const SettingsPage = () => {
    const theme = useSelector((state) => state.theme.theme)

    const tabs = [
        { key: 1, label: "Genel Ayarlar", children: <GeneralSettings /> },
        { key: 2, label: "Dil Ayarları", children: <LanguageSettings /> },
        { key: 3, label: "Logo Ayarları", children: <LogoSettings /> },
        { key: 4, label: "Tema Ayarları", children: <ThemeSettings /> },
        { key: 5, label: "Sözleşme Ayarları", children: <ContractSettings /> },
        { key: 6, label: "İletişim Ayarları", children: <ContactSettings /> },
        { key: 7, label: "Lokasyon Ayarları", children: <LocationSettings /> },
        { key: 8, label: "Referans Ayarları", children: <ReferenceSettings /> },
        { key: 9, label: "Sosyal Medya Ayarları", children: <SocialMediaSettings /> },
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
