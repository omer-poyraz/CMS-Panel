import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import { changeLang } from '../redux/slices/langSlice'

const Language = () => {
    const lng = useSelector((state) => state.lang.lang)
    const dispatch = useDispatch()

    return (
        <div className='mb-3'>
            <Button className={`${lng === "TR" ? "primary border-primary text-white" : "text-s bg-transparent border-primary"} rounded-l px-4 mr-2 py-2`} onClick={() => dispatch(changeLang("TR"))}>Türkçe</Button>
            <Button className={`${lng === "EN" ? "primary border-primary text-white" : "text-s bg-transparent border-primary"} rounded-l px-4 mr-2 py-2`} onClick={() => dispatch(changeLang("EN"))}>İngilizce</Button>
        </div>
    )
}

export default Language
