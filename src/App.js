import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaDog } from "react-icons/fa";
import * as tmImage from "@teachablemachine/image";
import "./styles";
import axios from "axios";
import {
    AppLogo,
    IconContainer,
    Loader,
    StyledButton,
    StyledContainer,
    StyledDragnDropContainer,
    StyledDragnDropInfo,
    StyledErrorMessage,
    StyledImage,
    StyledImageContainer,
    StyledImagePreview,
    StyledInfo,
    StyledInfoWrapper,
    StyledPredictionsContainer,
    StyledSubHeader,
    StyledTitle,
    StyledWrapper,
} from "./styles";

function App() {
    const pathToModel = "./model/model.json";
    const pathToMetaData = "./model/metadata.json";
    const maxPredictions = 10;
    const [uploadedFile, setUploadedFile] = useState([]);
    const [modelPredictions, setModelPredictions] = useState([]);
    const [error, setError] = useState(null);
    const [statusType, setStatusType] = useState("going");
    const [dog, setDog] = useState({});

    const modelPredict = async (image) => {
        const model = await tmImage.load(pathToModel, pathToMetaData);
        const predictionsByModel =
            image && (await model.predictTopK(image, maxPredictions));
        axios({
            method: "GET",
            url:
                "https://api.api-ninjas.com/v1/dogs?name=" +
                predictionsByModel[0].className,
            headers: { "X-Api-Key": "5xnFVsJpuevHsyrueA8dqg==1dhW1SRUZNf6OQut" },
            contentType: "application/json",
        })
            .then(function (response) {
                setDog(response.data[0]);
            })
            .catch(function (error) {
                console.error("Error: ", error.response.data);
            });
        return predictionsByModel;
    };

    const onImageDrop = useCallback(async (files) => {
        setError(null);
        try {
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
            console.error("Error: ", error);
        } finally {
            setStatusType("done");
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragReject } =
        useDropzone({ onDrop: onImageDrop });

    return (
        <>
            <AppLogo>
                <IconContainer>
                    <FaDog />
                </IconContainer>
                Doggy
            </AppLogo>
            <StyledWrapper>
                <StyledTitle>Classify your dog breed</StyledTitle>
                <StyledContainer>
                    {uploadedFile.name ? (
                        <div>
                            <section>
                                <StyledImageContainer>
                                    <StyledButton {...getRootProps()}>
                                        Send another image
                                    </StyledButton>
                                    <input {...getInputProps()} />
                                </StyledImageContainer>
                                <StyledImagePreview>
                                    <figure>
                                        <StyledImage
                                            src={uploadedFile.preview}
                                            alt={uploadedFile.name}
                                            id="image"
                                        />
                                        <figcaption style={{ color: "#fff" }}>
                                            {uploadedFile.name}
                                        </figcaption>
                                    </figure>
                                </StyledImagePreview>
                            </section>

                            {statusType === "going" && <Loader>Loading</Loader>}
                            {error && (
                                <StyledErrorMessage>
                                    Try again with a different image.
                                </StyledErrorMessage>
                            )}
                            {modelPredictions[0] && modelPredictions[0].className && (
                                <StyledPredictionsContainer>
                                    <StyledInfo>
                                        I think it is a {modelPredictions[0].className}
                                    </StyledInfo>
                                    <StyledInfo>
                                        Probability{" "}
                                        {(modelPredictions[0].probability * 100).toFixed(2)} %
                                    </StyledInfo>
                                    {dog && Object.keys(dog).length !== 0 && (
                                        <StyledInfoWrapper>
                                            <StyledInfo>
                                                Good With Children: {dog?.good_with_children}
                                            </StyledInfo>
                                            <StyledInfo>
                                                Good With Other Dogs: {dog?.good_with_other_dogs}
                                            </StyledInfo>
                                            <StyledInfo>
                                                Good With Strangers: {dog?.good_with_strangers}
                                            </StyledInfo>
                                            <StyledInfo>Playfulness: {dog?.playfulness}</StyledInfo>
                                            <StyledInfo>
                                                Protectiveness: {dog?.protectiveness}
                                            </StyledInfo>
                                        </StyledInfoWrapper>
                                    )}
                                </StyledPredictionsContainer>
                            )}
                        </div>
                    ) : (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <StyledSubHeader>Choose a file</StyledSubHeader>
                            {isDragReject && (
                                <StyledErrorMessage>not supported!</StyledErrorMessage>
                            )}
                            {isDragActive ? (
                                <StyledDragnDropInfo>
                                    Drag 'n' drop some files here, or click to select files
                                </StyledDragnDropInfo>
                            ) : (
                                <StyledDragnDropContainer>
                                    <StyledDragnDropInfo>
                                        Drag 'n' drop some files here, or click to select files
                                    </StyledDragnDropInfo>
                                </StyledDragnDropContainer>
                            )}
                        </div>
                    )}
                </StyledContainer>
            </StyledWrapper>
        </>
    );
}

export default App;
