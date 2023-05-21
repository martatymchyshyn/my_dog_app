import {useCallback, useState} from 'react'
import * as tmImage from '@teachablemachine/image'

export function useUploadFile() {
    const [uploadedFile, setUploadedFile] = useState([])
    const [modelPredictions, setModelPredictions] = useState([])
    const [statusType, setStatusType] = useState("going")

    const modelPredict = async (image) => {
        const model = await tmImage.load('./model/model.json', './model/metadata.json')
        const predictionsByModel = await model.predictTopK(image, 10)
        console.log(predictionsByModel)
        // const highestPrediction = predictionsByModel.reduce(
        //     (prev, current) =>
        //         prev.probability > current.probability ? prev : current,
        //     0
        // )

        return predictionsByModel
    }

    const onImageDrop = useCallback(async (files) => {
        console.log("acceptedFiles", files)
        try {
            console.log(files)
            const [single] = files
            setUploadedFile(Object.assign(single, {preview: URL.createObjectURL(single)}))

            const image = document.getElementById('image')
            const prediction = await modelPredict(image)

            setModelPredictions(prediction)
        } catch (error) {
            console.log(error)
        }finally {
            console.log(files)
        }
    }, [])

    return { onImageDrop, uploadedFile, modelPredictions}
}