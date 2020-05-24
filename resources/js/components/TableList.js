import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { Row, Table } from 'react-bootstrap';

function TableList() {

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    let isSubscribed = true;
    isSubscribed && getCities();
    return () => isSubscribed = false
  }, [getCities]);

  return (
    <div className="cities">
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
                    <td><button type="button" className="btn btn-danger btn-sm">Удалить</button></td>
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
    </div>
  )
}

export default TableList;