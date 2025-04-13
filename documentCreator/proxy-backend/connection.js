const Sequelize = require('sequelize');

//**  Подключение к БД  **//
const sequelize = new Sequelize(
    'proxy3', // название Базы Данных
    'root', // Пользователь Базы Данных 
    'йцукен', // Пароль для пользователя root
    {
        host: 'localhost', // Адрес сервера БД
        dialect: 'mysql', // Название сервера БД

    }
);

// Экспорт экземпляра подключения
// Нужен для использования в других файлах
module.exports = sequelize;
