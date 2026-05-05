import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap"
import FileElement from "../../components/FileElement"
import Language from "../../components/Language"
import { fetchSettings } from "../../redux/slices/settingsSlice"
import { fetchSettingsUpdate } from "../../redux/slices/settingsUpdateSlice"

const LogoSettings = ({ settings }) => {
    const [headerLogo, setHeaderLogo] = useState(null)
    const [footerLogo, setFooterLogo] = useState(null)
    const [darkHeaderLogo, setDarkHeaderLogo] = useState(null)
    const [darkFooterLogo, setDarkFooterLogo] = useState(null)
    const lng = useSelector((state) => state.lang.lang)
    const dispatch = useDispatch()

    const getTranslation = (settings, lng) => {
        return (
            settings.translations?.find(x => x.lang === lng) ||
            settings.translations?.find(x => x.lang === "tr") ||
            settings.translations?.[0]
        )
    }

    const buildTranslation = (existing, lang) => {
        return {
            ...(existing?.id ? { id: existing.id } : {}),
            lang,
            logos: {
                ...existing?.logos,
                header: headerLogo || existing?.logos?.header,
                footer: footerLogo || existing?.logos?.footer,
                darkHeader: darkHeaderLogo || existing?.logos?.darkHeader,
                darkFooter: darkFooterLogo || existing?.logos?.darkFooter,
            },
            settingsID: settings.id,
            theme: existing?.theme,
            contacts: existing?.contacts,
            contracts: existing?.contracts,
            locations: existing?.locations,
            references: existing?.references,
            socialMedias: existing?.socialMedias,
        }
    }

    const handleSave = async () => {
        const tr = buildTranslation(
            settings.translations?.find(x => x.lang === "tr"),
            "tr"
        )
        const en = buildTranslation(
            settings.translations?.find(x => x.lang === "en"),
            "en"
        )
        const payload = {
            id: settings.id,
            translations: [tr, en]
        }
        console.log("FINAL PAYLOAD:", payload)
        const res = await dispatch(fetchSettingsUpdate({ data: payload }))

        if (res?.payload?.id) {
            toast.success("Ayarlar başarıyla güncellendi!")
        } else {
            toast.error("Hata oluştu")
        }

        await dispatch(fetchSettings({ lang: lng }))
    }

    useEffect(() => {
        if (!settings) return

        const activeTranslation = getTranslation(settings, lng)

        const logos = activeTranslation?.logos

        setHeaderLogo(logos?.header || null)
        setFooterLogo(logos?.footer || null)
        setDarkHeaderLogo(logos?.darkHeader || null)
        setDarkFooterLogo(logos?.darkFooter || null)

    }, [settings, lng])

    console.log("RENDER LOGO SETTINGS", { headerLogo, footerLogo, darkHeaderLogo, darkFooterLogo })

    return (
        <div className="mt-3 w-100">
            <Language />
            <Card className="shadow">
                <CardHeader className="bg-transparent border-0">
                    <h5>Logo Ayarları</h5>
                    <small>Logo ayarlarınızı buradan yönetebilirsiniz.</small>
                </CardHeader>
                <CardBody>
                    <Row className="w-100 p-0 m-0">
                        <Col xs={6} sm={6} md={3} lg={3} xl={3} xxl={4} className="mb-3">
                            <Card className="d-flex justify-content-center align-items-center p-4 w-100">
                                <FileElement label="Header Logo" id="header" value={headerLogo} onChangeExtra={(base64) => setHeaderLogo(base64)} />
                            </Card>
                        </Col>
                        <Col xs={6} sm={6} md={3} lg={3} xl={3} xxl={4} className="mb-3">
                            <Card className="d-flex justify-content-center align-items-center p-4 w-100">
                                <FileElement label="Footer Logo" id="footer" value={footerLogo} onChangeExtra={(base64) => setFooterLogo(base64)} />
                            </Card>
                        </Col>
                        <Col xs={6} sm={6} md={3} lg={3} xl={3} xxl={4} className="mb-3">
                            <Card className="d-flex justify-content-center align-items-center p-4 w-100">
                                <FileElement label="Koyu Header Logo" id="darkHeader" value={darkHeaderLogo} onChangeExtra={(base64) => setDarkHeaderLogo(base64)} />
                            </Card>
                        </Col>
                        <Col xs={6} sm={6} md={3} lg={3} xl={3} xxl={4} className="mb-3">
                            <Card className="d-flex justify-content-center align-items-center p-4 w-100">
                                <FileElement label="Dark Footer Logo" id="darkFooter" value={darkFooterLogo} onChangeExtra={(base64) => setDarkFooterLogo(base64)} />
                            </Card>
                        </Col>
                        <Col xs={12} xxl={12} className="d-flex justify-content-end">
                            <Button className="primary border-primary rounded-l" onClick={handleSave}>Kaydet</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default LogoSettings