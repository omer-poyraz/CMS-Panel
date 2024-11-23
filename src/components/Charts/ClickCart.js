import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardHeader } from 'reactstrap'
import { lineChartOptions, series } from '../ApexChartsOptions'
import { CardModel } from '../../utilities/Models'

const ClickCart = ({ title, description, data }) => {
    const theme = useSelector((state) => state.theme.theme)

    return (
        <Card className={CardModel(theme)}>
            <CardHeader className='bg-transparent border-0'>
                <div><h4>{title}</h4></div>
                <div><span className='text-secondary'>{description}</span></div>
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
