const tf = require("@tensorflow/tfjs-node-gpu"); // should be installed
const fs = require("fs");
const path = require("path");

const TRAIN_IMAGES_DIR = "path_to_train_dir";
const TEST_IMAGES_DIR = "path_to_test_dir";

// Function to load dog images and their labels from a given directory
function loadDogImages(dataDir) {
    const dogImages = [];
    const dogLabels = [];

    var files = fs.readdirSync(dataDir);
    for (let i = 0; i < files.length; i++) {
        if (!files[i].toLocaleLowerCase().endsWith(".jpg")) {
            continue;
        }

        var filePath = path.join(dataDir, files[i]);
        // Read the image file, preprocess it, and store it as a tensor
        var buffer = fs.readFileSync(filePath);
        var imageTensor = tf.node
            .decodeImage(buffer)
            .resizeNearestNeighbor([224, 224])
            .toFloat()
            .div(tf.scalar(255.0))
            .expandDims();

        // Add the image tensor to the images array
        dogImages.push(imageTensor);
        // Add the label for the image based on its file name
        // Add your own label mapping logic here
        //
        // // var Siberian_husky = files[i].endsWith("-Siberian_husky.jpg");
        //
        // var Maltese_dog = files[i].endsWith("-Maltese_dog.jpg");
        //
        // // var Irish_wolfhound = files[i].endsWith("-Irish_wolfhound.jpg");
        //
        // var papillon = files[i].endsWith("-papillon.jpg");
        //
        // // var chow = files[i].endsWith("-chow.jpg");
        //
        // var beagle = files[i].endsWith("-beagle.jpg");
        // // var Samoyed = files[i].endsWith("-Samoyed.jpg");
        //
        // var Airedale = files[i].endsWith("-Airedale.jpg");
        //
        // var basenji = files[i].endsWith("-basenji.jpg");
        //
        // var Afghan_hound = files[i].endsWith("-Afghan_hound.jpg");
        //
        //
        //
        //
        // // if ( Siberian_husky == true ) {dogLabels.push(1)}
        //
        // if ( Maltese_dog == true ) {dogLabels.push(2)}
        //
        // // else if ( Irish_wolfhound == true ) {dogLabels.push(3)}
        //
        // else if ( papillon == true ) {dogLabels.push(4)}
        //
        // // else if ( chow == true ) {dogLabels.push(5)}
        //
        // else if ( beagle == true ) {dogLabels.push(6)}
        // // else if ( Samoyed == true ) {dogLabels.push(7)}
        //
        // else if ( Airedale == true ) {dogLabels.push(8)}
        //
        // else if ( basenji == true ) {dogLabels.push(9)}
        //
        //
        // else if ( Afghan_hound == true ) {dogLabels.push(10)}
        //
        // else {console.log(files[i])}
        //

        // var Lhasa = files[i].endsWith("-Lhasa.jpg");
        // var malinois = files[i].endsWith("-malinois.jpg");
        // var boxer = files[i].endsWith("-boxer.jpg");
        // var chihuahua = files[i].endsWith("-chihuahua_cross.jpg");
        // var greyhound = files[i].endsWith("-greyhound.jpg");
        // var jack_russell_terrier = files[i].endsWith("-jack_russell_terrier.jpg");
        // var husky = files[i].endsWith("-siberian_husky.jpg");

        // if ( Lhasa == true ) {labels.push(0)}
        // else if ( malinois == true ) {labels.push(1)}
        // if ( boxer == true ) {labels.push(0)}
        // // else if ( chihuahua == true ) {labels.push(1)}
        // else if ( greyhound == true ) {labels.push(1)}
        // else if ( jack_russell_terrier == true ) {labels.push(2)}
        // else if ( husky == true ) {labels.push(3)}
    }
    return [dogImages, dogLabels];
}

class DogDataset {
    constructor() {
        this.trainData = [];
        this.testData = [];
    }

    loadData() {
        // Load the train and test data using the loadDogImages function
        this.trainData = loadDogImages(TRAIN_IMAGES_DIR);
        this.testData = loadDogImages(TEST_IMAGES_DIR);
        console.log("Images loaded successfully.");
        const images = this.trainData[0];
    }
    getTrainData() {
        // Concatenate the train images and create one-hot encoded labels
        return {
            images: tf.concat(this.trainData[0]),
            labels: tf.oneHot(tf.tensor1d(this.trainData[1], "int32"), 5), //number of categories
            // .reshape([-1, 1, 1, 2])
            // .tile([1, 224, 224, 1])
        };
    }
    getTestData() {
        // Concatenate the test images and create one-hot encoded labels
        return {
            images: tf.concat(this.testData[0]),
            labels: tf.oneHot(tf.tensor1d(this.testData[1], "int32"), 5), //number of categories
            // .reshape([-1, 1, 1, 2])
            // .tile([1, 224, 224, 1])
        };
    }
}

module.exports = new DogDataset();
