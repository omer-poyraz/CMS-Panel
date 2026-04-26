import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from "framer-motion"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardBody, CardHeader } from 'reactstrap'
import { fetchMenuSort } from '../../redux/slices/menuSortSlice'
import { fetchMenusByGroup } from '../../redux/slices/menusByGroupSlice'

const Sort = ({ id, data, lang }) => {
    const theme = useSelector((state) => state.theme.theme)
    const dispatch = useDispatch()
    const [list, setList] = useState([]);

    const swap = (arr, i, j) => {
        const newArr = [...arr];
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        return newArr;
    };

    const syncServer = async (newList) => {
        try {
            await Promise.all(
                newList.map((item, index) =>
                    dispatch(fetchMenuSort({ id: item.id, sort: index + 1 }))
                )
            );

            dispatch(fetchMenusByGroup({ id, lang }));
        } catch (err) {
            console.error("Sync error", err);
        }
    };

    const handleMoveUp = (index) => {
        let newList;
        if (index === 0) {
            newList = [...list];
            const first = newList.shift();
            newList.push(first);
        } else {
            newList = swap(list, index, index - 1);
        }
        setList(newList);
        syncServer(newList);
    };

    const handleMoveDown = (index) => {
        let newList;
        if (index === list.length - 1) {
            newList = [...list];
            const last = newList.pop();
            newList.unshift(last);
        } else {
            newList = swap(list, index, index + 1);
        }
        setList(newList);
        syncServer(newList);
    };

    useEffect(() => {
        const sorted = Array.from(data || [])
            .map(item => ({
                ...item,
                sort: typeof item.sort === 'number' ? item.sort : 9999
            }))
            .sort((a, b) => a.sort - b.sort);

        setList(sorted);
    }, [data]);

    return (
        <Card className={`border-0 mt-4 rounded-l overflow-hidden shadow ${theme ? 'card2' : ''}`}>
            <CardHeader className='bg-transparent border-0'>
                <div><h5>Menü Sıralama</h5></div>
                <div className='subtitle'><span className='text-s'>Menü elemanlarınızı sıralayabilirsiniz.</span></div>
            </CardHeader>
            <CardBody>
                {
                    list.map((item, index) => (
                        <motion.div
                            key={item.id}
                            layout
                            transition={{ duration: 0.25 }}
                        >
                            <Card key={item.id || item.sort} className={`mb-1 shadow sort-item ${theme ? 'card2' : ''}`}>
                                <CardBody className='d-flex justify-content-between'>
                                    <div className='d-flex justify-content-start align-items-center'>
                                        <div className='border roundedd w40 h40'>
                                            <h5 className='w-100 h-100 d-block d-flex justify-content-center align-items-center'>{item?.id}</h5>
                                        </div>
                                        <div className='ml-2'>
                                            <h5>{item?.translations?.find(t => t.lang === lang)?.title || ''}</h5>
                                            <small className='text-secondary'>{item?.translations?.find(t => t.lang === lang)?.slug}</small>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-end align-items-center'>
                                        <Button className='border bg-transparent mr-2' onClick={() => handleMoveUp(index)}>
                                            <FontAwesomeIcon icon={faChevronUp} color='#c1beea' size='1x' />
                                        </Button>
                                        <Button className='border bg-transparent mr-2' onClick={() => handleMoveDown(index)}>
                                            <FontAwesomeIcon icon={faChevronDown} color='#c1beea' size='1x' />
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </motion.div>
                    ))
                }
            </CardBody>
        </Card>
    )
}

export default Sort
