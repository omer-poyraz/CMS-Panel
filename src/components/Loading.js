import { Spinner } from "reactstrap"

const Loading = () => {
    return (
        <div className='w-100 mt-5 mb-5 d-flex justify-content-center align-items-center'>
            <Spinner style={{ width: '3rem', height: '3rem' }} color='info'> </Spinner>
        </div>
    )
}

export default Loading