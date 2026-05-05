import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Upload, message } from 'antd'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { Container, FormGroup, Label } from 'reactstrap'
import { FileCreateService } from '../service'

const isMimeTypeAccepted = (fileType, accept) => {
    if (!accept) {
        return true
    }

    const acceptedTypes = accept.split(',').map((v) => v.trim()).filter(Boolean)

    if (acceptedTypes.length === 0) {
        return true
    }

    return acceptedTypes.some((acceptedType) => {
        if (acceptedType.endsWith('/*')) {
            const prefix = acceptedType.replace('/*', '')
            return fileType.startsWith(`${prefix}/`)
        }

        return acceptedType === fileType
    })
}

const FileElement = ({ control, errors, label, icon, id, value, onChangeExtra, accept = 'image/*', maxSizeMB = 10, uploadText = 'Yukle' }) => {
    const [loading, setLoading] = useState(false)
    const [localImageUrl, setLocalImageUrl] = useState(typeof value === 'string' ? value : '')

    useEffect(() => {
        if (typeof value === 'string') {
            setLocalImageUrl(value)
        }
    }, [value])

    const errorMessage = typeof errors === 'string' ? errors : errors?.[id]?.message

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type='button'>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>{uploadText}</div>
        </button>
    )

    const normalizeFileUrl = (fileUrl) => {
        if (!fileUrl) return null

        if (fileUrl.startsWith('http')) {
            return fileUrl
        }

        return `${process.env.REACT_APP_API_URL.replace("/api", "")}${fileUrl}`
    }

    const renderUpload = (fieldValue, onChange) => {
        const imageUrl = typeof fieldValue === 'string' ? fieldValue : localImageUrl
        const fileList = imageUrl
            ? [
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: imageUrl,
                },
            ]
            : []

        const handleBeforeUpload = async (file) => {
            if (file.type && !isMimeTypeAccepted(file.type, accept)) {
                message.error('Dosya tipi desteklenmiyor!')
                return Upload.LIST_IGNORE
            }

            const isAllowedSize = file.size / 1024 / 1024 < maxSizeMB

            if (!isAllowedSize) {
                message.error(`Dosya boyutu ${maxSizeMB}MB altinda olmali!`)
                return Upload.LIST_IGNORE
            }

            setLoading(true)

            try {
                const response = await FileCreateService(file)

                const rawUrl = response?.result?.fileUrl
                const fileUrl = normalizeFileUrl(rawUrl)

                if (!fileUrl) {
                    message.error('Dosya URL bilgisi alinamadi!')
                    return Upload.LIST_IGNORE
                }

                onChange(fileUrl)
                setLocalImageUrl(fileUrl)

                if (onChangeExtra) {
                    onChangeExtra(fileUrl, file, response)
                }
            } finally {
                setLoading(false)
            }

            return Upload.LIST_IGNORE
        }

        return (
            <Upload
                name={id}
                listType='picture-card'
                fileList={fileList}
                showUploadList={{
                    showPreviewIcon: false,
                    showRemoveIcon: true,
                }}
                accept={accept}
                beforeUpload={handleBeforeUpload}
                onRemove={() => {
                    setLocalImageUrl(null)

                    if (onChange) {
                        onChange(null)
                    }

                    if (onChangeExtra) {
                        onChangeExtra(null, null)
                    }
                }}
            >
                {!localImageUrl && uploadButton}
            </Upload>
        )
    }

    return (
        <FormGroup>
            <Label className='text-secondary mb-1' htmlFor={id}>
                {label}
            </Label>

            <Container className='position-relative p-0 m-0'>
                <div className=''>
                    {icon}
                    {control ? (
                        <Controller
                            name={id}
                            control={control}
                            render={({ field }) => renderUpload(field.value, (uploadedValue) => {
                                field.onChange(uploadedValue)
                            })}
                        />
                    ) : (
                        renderUpload(value, () => { })
                    )}
                </div>
            </Container>

            {errorMessage && (
                <small className='ml-1 text-danger'>{errorMessage}</small>
            )}
        </FormGroup>
    )
}

export default FileElement
