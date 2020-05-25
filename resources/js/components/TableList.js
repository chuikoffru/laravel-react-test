import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { Table, Form, Modal, Button, Toast } from 'react-bootstrap';

function TableList() {

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const [toastData, setToastData] = useState([]);
  const [errors, setErrors] = useState([]);
  const defaultForm = {
    name: '',
    population: '',
    lat: '',
    lng: ''
  }
  const [formData, setFormData] = useState(defaultForm);

  const getCities = useCallback(async () => {
    try {

      setLoading(true);

      const res = await Axios.get('/api/cities');

      if (res) {
        setCities(res.data);
        setLoading(false);
      }

    } catch (error) {

      setLoading(false);

      const confirm = window.confirm("Произошла ошибка при загрузке списка городов. Хотите повторить запрос?");

      if (confirm) {
        getCities()
      }

    }
  }, []);

  const addNewCity = async (event) => {
    event.preventDefault();
    try {
      // Включаем лоадер
      setLoading(true);
      const res = await Axios.post('/api/cities', formData);
      // Добавляем новый город в список
      setCities([...cities, res.data]);
      // Скрываем форму
      setShowForm(false);
      // Убираем лоадер
      setLoading(false);
      // Возвращаем форму к дефолту
      setFormData(defaultForm);

    } catch (error) {
      if (error.response.data) {
        // Обнуляем ошибки если были
        setToastData([]);
        // Убираем лоадер
        setLoading(false);
        for (let err in error.response.data.errors) {
          setErrors([...errors, {
            field: err,
            msg: error.response.data.errors[err][0]
          }]);
        }
      }
    }
  };

  // Удаляем город
  const removeCity = async (id) => {
    try {
      // Удаляем на сервере
      await Axios.delete(`/api/cities/${id}`);
      // Обновляем список городов
      getCities();
    } catch (error) {
      // Уведомляем о проблемах
      setErrors([{
        field: 'city',
        msg: 'Не удалось удалить город.'
      }]);
    }
  }

  useEffect(() => {
    // При обновлении errors, показываем тосты
    setShowToast(true);
    // Создаем массив тостов
    errors.map((err, index) => {
      setToastData([...toastData, {
        title: 'Ошибка',
        text: `${err.field}: ${err.msg}`,
        time: 'Только что'
      }]);
    });
    () => setErrors([]);
  }, [errors, setErrors]);

  // Получаем города при загрузке
  useEffect(() => {
    let isSubscribed = true;
    isSubscribed && getCities();
    return () => isSubscribed = false
  }, [getCities]);

  return (
    <div className="cities">
      <Button className="mb-3" variant="success" onClick={() => setShowForm(true)}>Добавить город</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название города</th>
            <th>Численность населения</th>
            <th>Широта</th>
            <th>Долгота</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            cities.length > 0 ? (
              cities.map((item, index) =>
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.population}</td>
                  <td>{item.lat}</td>
                  <td>{item.lng}</td>
                  <td>
                    <Button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeCity(item.id)}
                    >
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))
              : <tr>
                <td colSpan="6">
                  <p className="text-center m-5">В списке нет городов.</p>
                </td>
              </tr>
          )
            : (<tr>
              <td colSpan="6">
                <div className="d-flex justify-content-center">
                  <div className="spinner-border m-5" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </td>
            </tr>)}
        </tbody>
      </Table>
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Form onSubmit={addNewCity}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить новый город</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="name">
              <Form.Label>Название города</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                type="text"
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                required />
            </Form.Group>
            <Form.Group controlId="population">
              <Form.Label>Численность населения</Form.Label>
              <Form.Control
                name="population"
                value={formData.population}
                type="number"
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                required />
            </Form.Group>
            <Form.Group controlId="lat">
              <Form.Label>Широта</Form.Label>
              <Form.Control
                name="lat"
                value={formData.lat}
                type="text"
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                required />
            </Form.Group>
            <Form.Group controlId="lng">
              <Form.Label>Долгота</Form.Label>
              <Form.Control
                name="lng"
                value={formData.lng}
                type="text"
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowForm(false)}>
              Отмена
          </Button>
            <Button variant="success" type="submit">
              Добавить
          </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          left: 10,
          top: 10,
          minHeight: 100,
          width: 250
        }}
      >
        {toastData.map((toast, index) =>
            <Toast 
              style={{
                position: 'absolute',
                top: index * 110,
                left: 0,
                zIndex: 99999
              }}
              key={index} 
              autohide 
              show={showToast} 
              delay={3000} 
              onClose={() => setShowToast(false)}>
              <Toast.Header>
                <strong className="mr-auto">{toast.title}</strong>
                <small>{toast.time}</small>
              </Toast.Header>
              <Toast.Body>{toast.text}</Toast.Body>
            </Toast>
        )}
        </div>
    </div>
  )
}

export default TableList;