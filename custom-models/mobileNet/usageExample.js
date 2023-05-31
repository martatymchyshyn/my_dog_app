import * as tf from '@tensorflow/tfjs';

// Функція для класифікації зображення
async function classifyImage(image) {
    // Завантаження моделі MobileNet
    const model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
    // Перетворення зображення на тензор та нормалізація
    const tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .div(tf.scalar(255.0))
        .expandDims();

    // Передача тензора через модель для отримання передбачень
    const predictions = await model.predict(tensor).data();
    return Array.from(predictions);
}

// Приклад використання
const image = document.getElementById('your-element-id'); // Отримання посилання на HTML-елемент зображення
const prediction = await classifyImage(image); // Класифікація зображення (це має бути в асинхронній функції, наприклад вішаємо обробник на кнопку для отриманні результатів або в useEffect)
console.log(prediction); // Виведення результатів класифікації
