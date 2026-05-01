import ReactApexChart from 'react-apexcharts'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardHeader } from 'reactstrap'
import { CardModel } from '../../utilities/Models'
import { lineChartOptions, series } from '../ApexChartsOptions'

const ClickCart = ({ title, description, data }) => {
    const theme = useSelector((state) => state.theme.theme)

    return (
        <Card className={CardModel(theme)}>
            <CardHeader className='bg-transparent border-0'>
                <div><h5>{title}</h5></div>
                <div className='subtitle'><span className='text-secondary'>{description}</span></div>
            </CardHeader>
            <CardBody>
                <ReactApexChart
                    options={lineChartOptions}
                    series={series({ data: data })}
                    type="line"
                    height={200}
                />
            </CardBody>
        </Card>
    )
}

export default ClickCart
