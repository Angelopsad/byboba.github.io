/**
 * Скрипт для управления сменой одежды
 * Данные берутся из файла data.js, который генерируется скриптом Обновить_сайт.bat
 */

// Текущие индексы
const currentIndex = {
    top: 0,
    bot: 0
};

function changeImage(type, direction) {
    if (!outfitData || !outfitData[type] || outfitData[type].length === 0) return;

    const maxImages = outfitData[type].length;
    const imgElement = document.getElementById(`${type}-image`);

    // Определяем новый индекс
    let newIndex = currentIndex[type] + direction;

    // Зацикливаем 
    if (newIndex >= maxImages) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = maxImages - 1;
    }

    currentIndex[type] = newIndex;

    // Определяем классы для анимации ухода
    const outClass = direction > 0 ? 'slide-out-left' : 'slide-out-right';
    const inClass = direction > 0 ? 'slide-in-right' : 'slide-in-left';

    // Убираем старые классы и активный статус, добавляем класс ухода
    imgElement.className = '';
    imgElement.classList.add(outClass);

    // Ждем окончания анимации исчезновения
    setTimeout(() => {
        // Меняем источник изображения
        imgElement.src = `${type}/${outfitData[type][newIndex]}`;

        // Подготавливаем изображение к появлению с нужной стороны
        imgElement.className = '';
        imgElement.classList.add(inClass);

        // Маленькая задержка перед запуском анимации появления
        setTimeout(() => {
            imgElement.classList.remove(inClass);
            imgElement.classList.add('active');
        }, 50);

    }, 500); // Время должно совпадать с transition в CSS
}

document.addEventListener('DOMContentLoaded', () => {
    // Устанавливаем первые картинки при загрузке
    if (outfitData && outfitData.top && outfitData.top.length > 0) {
        document.getElementById('top-image').src = `top/${outfitData.top[0]}`;
        document.getElementById('top-image').className = 'active';
    } else {
        document.getElementById('top-image').alt = 'Добавьте фото в папку top и нажмите Обновить_сайт.bat';
        document.getElementById('top-image').src = '';
    }

    if (outfitData && outfitData.bot && outfitData.bot.length > 0) {
        document.getElementById('bot-image').src = `bot/${outfitData.bot[0]}`;
        document.getElementById('bot-image').className = 'active';
    } else {
        document.getElementById('bot-image').alt = 'Добавьте фото в папку bot и нажмите Обновить_сайт.bat';
        document.getElementById('bot-image').src = '';
    }
});
