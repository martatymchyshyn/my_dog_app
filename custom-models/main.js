const tf = require('@tensorflow/tfjs-node-gpu');

const data = require('path_to_data_js');
const model = require('path_to_model_js');

async function trainModel(epochs, batchSize, modelSavePath) {
    data.loadData();

    const {images: trainImages, labels: trainLabels} = data.getTrainData();
    model.summary();

    const earlyStopping = tf.callbacks.earlyStopping({
        monitor: 'val_loss',
        patience: 5,
        mode: 'min'
    });

    const validationSplit = 0.1;
    await model.fit(trainImages, trainLabels, {
        epochs,
        batchSize,
        validationSplit,
    });

    const {images: testImages, labels: testLabels} = data.getTestData();
    const evalOutput = model.evaluate(testImages, testLabels);

    console.log(
        `\nresult:\n` +
        `  Loss = ${evalOutput[0].dataSync()[0].toFixed(2)}; `+
        `Accuracy = ${evalOutput[1].dataSync()[0].toFixed(2)}`);

    if (modelSavePath != null) {
        await model.save(`file://${modelSavePath}`);
    }
}

trainModel(100, 16, 'path_to_save_model');