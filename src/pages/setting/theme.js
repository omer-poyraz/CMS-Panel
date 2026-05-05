import { useState } from "react"
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap"
import ColorElement from "../../components/ColorElement"

const ThemeSettings = ({ settings }) => {
    const [color, setColor] = useState("#e8e8e8")
    return (
        <div>
            <Card className="shadow ">
                <CardHeader className="bg-transparent border-0">
                    <h5>Tema Ayarları</h5>
                    <small>Tema ayarlarınızı buradan yapabilirsiniz.</small>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md={4}>
                            <Card className="mb-4 p-3 d-flex justify-content-center align-items-center">
                                <ColorElement
                                    label="Arkaplan Rengi"
                                    id="themeColor"
                                    value={color}
                                    onChangeExtra={(color) => setColor(color)}
                                />
                            </Card>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default ThemeSettings