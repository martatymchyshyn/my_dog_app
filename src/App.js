import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as tmImage from "@teachablemachine/image";
import "./App.css";
import axios from "axios";

function App() {
    const [uploadedFile, setUploadedFile] = useState([]);
    const [modelPredictions, setModelPredictions] = useState([]);
    const [error, setError] = useState(null);
    const [statusType, setStatusType] = useState("going");
    const [dog, setDog] = useState({});

    const modelPredict = async (image) => {
        const model = await tmImage.load(
            "./model/model.json",
            "./model/metadata.json"
        );
        const predictionsByModel = await model.predictTopK(image, 10);
        axios({
            method: "GET",
            url:
                "https://api.api-ninjas.com/v1/dogs?name=" +
                predictionsByModel[0].className,
            headers: { "X-Api-Key": "5xnFVsJpuevHsyrueA8dqg==1dhW1SRUZNf6OQut" },
            contentType: "application/json",
        })
            .then(function (response) {
                console.log(response.data[0]);
                setDog(response.data[0]);
            })
            .catch(function (error) {
                console.error("Error: ", error.response.data);
            });
        console.log(predictionsByModel);
        return predictionsByModel;
    };

    const onImageDrop = useCallback(async (files) => {
        setError(null);
        console.log("acceptedFiles", files);
        try {
            console.log(files);
            const [single] = files;
            setUploadedFile(
                Object.assign(single, { preview: URL.createObjectURL(single) })
            );

            const image = document.getElementById("image");
            const prediction = await modelPredict(image);

            setModelPredictions(prediction);
        } catch (error) {
            setError(error);
            setStatusType("error");
            console.log(error);
        } finally {
            setStatusType("done");
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragReject } =
        useDropzone({ onDrop: onImageDrop });

    return (
        <div className="wrapper">
            <h1 className="title">Classify your dog breed</h1>
            <div className="App">
                <>
                    {uploadedFile.name ? (
                        <div>
                            <section>
                                <div className="image-container">
                                    <button {...getRootProps()}>Send another image</button>
                                    <input {...getInputProps()} />
                                </div>

                                <div className="image-preview">
                                    <figure>
                                        <img
                                            src={uploadedFile.preview}
                                            alt={uploadedFile.name}
                                            id="image"
                                        />
                                        <figcaption style={{ color: "#fff" }}>
                                            {uploadedFile.name}
                                        </figcaption>
                                    </figure>
                                </div>
                            </section>

                            {statusType === "going" && (
                                <div className="Loader">
                                    Loading
                                </div>
                            )}
                            {error && (
                                <div className="error-message">
                                    Try again with a different image.
                                </div>
                            )}
                            {modelPredictions[0] && modelPredictions[0].className && (
                                <div className="prediction-results">
                                    <div>I think it is a {modelPredictions[0].className}</div>
                                    <div>
                                        Probability{" "}
                                        {(modelPredictions[0].probability * 100).toFixed(2)} %
                                    </div>
                                    {dog && (
                                        <div className="info">
                                            <div>Good With Children: {dog.good_with_children}</div>
                                            <div>
                                                Good With Other Dogs: {dog.good_with_other_dogs}
                                            </div>
                                            <div>Good With Strangers: {dog.good_with_strangers}</div>
                                            <div>Playfulness: {dog.playfulness}</div>
                                            <div>Protectiveness: {dog.protectiveness}</div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} data-testid="upload-image" />
                            <h2 style={{ color: "#fff" }}>Choose a file</h2>

                            {isDragReject && (
                                <div className="error-message">not supported!</div>
                            )}
                            {isDragActive ? (
                                <p style={{ color: "#fff" }}>
                                    Drag 'n' drop some files here, or click to select files
                                </p>
                            ) : (
                                <div className="drag-container">
                                    <p style={{ color: "#fff" }}>
                                        Drag 'n' drop some files here, or click to select files
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </>
            </div>
        </div>
    );
}

export default App;
