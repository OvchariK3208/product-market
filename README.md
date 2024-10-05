# Тестовое задание на позицию React Frontend Developer

![](demo_img/MacBook_Air_1500.png)

[**Онлайн-версия**](https://product-market-delta.vercel.app/products) - Нажмите здесь, чтобы перейти на сайт.

[**API**](https://66df2b92de4426916ee3c37d.mockapi.io/products) - Доступ к API данных продуктов.

___

## Задача

Разработать приложение для работы с продуктами. Необходимо вывести список продуктов, получаемый через API. Приложение должно содержать страницы для отображения всех продуктов, а также для их создания, обновления и удаления.

### Требования

- **Технологии**: React, Redux для управления состоянием.
- **API для продуктов**: Для запросов к API используйте любой сервис.
- **UI-библиотеки**: Допускается использование любых UI-библиотек и библиотек для работы с формами.

### Оценка

Будет оцениваться подход к выполнению задания, качество и структура кода, а также внимание к деталям.

___

### Задачи:

#### 1. **Вывод списка продуктов**

На странице `/products` необходимо отобразить список продуктов. API-запрос должен загружать 9 продуктов по умолчанию. Реализовать возможность переключения количества отображаемых продуктов:

- Показать 9 продуктов
- Показать 15 продуктов
- Показать все продукты (до 20)

Также необходимо реализовать переходы на страницу конкретного продукта для отображения подробной информации.

#### 2. **Страница продукта**

На странице `/product/:id` необходимо вывести детальную информацию о выбранном продукте.

#### 3. **Создание, обновление и удаление продукта**

Реализовать функционал для создания, обновления и удаления продукта. Форма должна содержать необходимые поля: **title, price, description**. Все поля должны быть обязательными и иметь минимальную валидацию.

#### 4. **Список созданных продуктов**

На странице создания продукта `/product-creation` необходимо вывести таблицу созданных продуктов с отображением всех полей.

**Бонус**: Список сохраняется при перезагрузке страницы.

#### 5. **Редактирование продукта**

На отдельной странице реализовать функционал редактирования продукта.

Используйте API-запрос для обновления продукта.

#### 6. **Удаление продукта**

На странице продукта необходимо реализовать удаление продукта.

Используйте API-запрос для удаления продукта.
