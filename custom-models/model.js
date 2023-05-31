const tf = require('@tensorflow/tfjs');

const model = tf.sequential();

// Перший згортковий шар
model.add(tf.layers.conv2d({
    inputShape: [96, 96, 3],
    kernelSize: 3,
    filters: 32,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'heNormal'
}));
model.add(tf.layers.batchNormalization());
model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));

// Другий згортковий шар
model.add(tf.layers.conv2d({
    kernelSize: 3,
    filters: 64,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'heNormal'
}));
model.add(tf.layers.batchNormalization());
model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));

// Третій згортковий шар
model.add(tf.layers.conv2d({
    kernelSize: 3,
    filters: 128,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'heNormal'
}));
model.add(tf.layers.batchNormalization());
model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));

// Четвертий згортковий шар
model.add(tf.layers.conv2d({
    kernelSize: 3,
    filters: 256,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'heNormal'
}));
model.add(tf.layers.batchNormalization());
model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));

// Повнозв'язний шар
model.add(tf.layers.flatten());
model.add(tf.layers.dense({
    units: 512,
    activation: 'relu',
    kernelInitializer: 'heNormal'
}));
model.add(tf.layers.dropout({
    rate: 0.5
}));

// Додайте ще один повнозв'язний шар для зменшення розміру вихідних даних перед шаром softmax
model.add(tf.layers.dense({
    units: 256,
    activation: 'relu',
    kernelInitializer: 'heNormal'
}));
model.add(tf.layers.dropout({
    rate: 0.5
}));

model.add(tf.layers.dense({
    units: 5, // кількість класів
    activation: 'softmax'
}));

// Компіляція моделі
model.compile({
    optimizer: tf.train.adam(),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
});

module.exports = model;