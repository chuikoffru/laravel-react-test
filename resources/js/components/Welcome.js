import React, { useState } from "react";

function Welcome() {
    return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-4">Список городов</h1>
                <p className="lead">
                    Исполнение тестового задания с использованием React.js и
                    Laravel 7.
                </p>
                <hr className="my-4" />
                <p>Текст задания</p>
                <button
                    className="btn btn-primary mr-3"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                >
                    Прочитать текст задания
                </button>
                <a
                    className="btn btn-primary mr-3"
                    href="https://chuikoff.ru"
                    target="_blank"
                    role="button"
                >
                    Перейти на сайт исполнителя
                </a>
                <a
                    className="btn btn-primary"
                    href="https://chuikoff.ru"
                    target="_blank"
                    role="button"
                >
                    Посмотреть git репозиторий
                </a>
                <div class="collapse mt-3 mb-0" id="collapseExample">
                    <div class="card card-body">
                        <p>О проекте</p>
                        <ol>
                            <li>Создать новый Laravel-проект</li>
                            <li>
                                Создать в проекте страницу с формой и таблицей
                                форма
                            </li>
                            <li>
                                В форму вводятся данные населенного пункта
                                (название, широта, долгота, количество
                                населения)
                            </li>
                            <li>Форма отправляет данные по ajax</li>
                            <li>
                                Сервер должен их обработать и записать в БД и
                                вернуть результат добавления (успех/неудача)
                            </li>
                        </ol>
                        <p>REST API</p>
                        <ol>
                            <li>
                                Таблица выводит список всех населенных пунктов
                                из БД
                            </li>
                            <li>
                                При успешном добавлении нового населенного
                                пункта, новый населенный пункт добавляется в
                                таблицу при помощи AJAX
                            </li>
                        </ol>
                        <p>Требования</p>
                        <ol>
                            <li>
                                Проект должен быть залит на github-репозиторий{" "}
                            </li>
                            <li>
                                БД должна настраиваться при помощи
                                Laravel-миграций
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
