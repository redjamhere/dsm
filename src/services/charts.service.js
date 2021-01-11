import axios from 'axios';

const API_URL = 'http://dsm.ds.do:8080/rest/';

class ChartsService {
  // получить категории количества элементов
  getQuantityElementsCategories(projectId) {
    return axios
      .get(API_URL + `quantityelements/categories/${projectId}`)
      .then(response => response.data)
      .catch(err => `Ошибка запроса: ${err}`);
  }
  // получить суммарное значение количества
  getQuantityElementsAggregate(model) {
    return axios
      .post(API_URL + `quantityelements/aggregate`, model)
      .then(response => response.data)
      .catch(err => `Ошибка запроса: ${err}`);
  }
  // получить значение категории разбитое по конкретным моделям
  getQuantityElementsSeparate(model) {
    return axios
      .post(API_URL + `quantityelements/separate`,model)
      .then(response => response.data)
      .catch(err => `Ошибка запроса: ${err}`);
  }
  // --------------------------------
  // получть категории площади
  getAreaElementsCategories(projectId) {
    return axios
      .get(API_URL + `areaelements/categories/${projectId}`)
      .then(response => response.data)
      .catch(err => `Ошибка запроса: ${err}`);
  }
  // получить суммарное значение площади
  getAreaElementsAggregate(model) {
    return axios
      .post(API_URL + `areaelements/aggregate`, model)
      .then(response => response.data)
      .catch(err => `Ошибка запроса: ${err}`);
  }
  // получить значение категории разбитое по конкретным моделям
  getAreaElementsSeparate(model) {
    return axios
      .post(API_URL + `areaelements/separate`, model)
      .then(response => response.data)
      .catch(err => `Ошибка запроса: ${err}`);
  }
  // --------------------------------
  // получить категории объема
  getVolumeElementsCategories(projectId) {
    return axios
      .get(API_URL + `volumeelements/categories/${projectId}`)
      .then(response => response.data)
      .catch(err => `Ошибка запроса: ${err}`);
  }
  // получить суммарное значение объема
  getVolumeElementsAggregate(model) {
    return axios
      .post(API_URL + `volumeelements/aggregate`, model)
      .then(response => response.data)
      .catch(err => `Ошибка запроса: ${err}`);
  }
  // получить значение категории разбитое по конкретным моделям
  getVolumeElementsSeparate(model) {
    return axios
      .post(API_URL + `volumeelements/separate`, model)
      .then(response => response.data)
      .catch(err => `Ошибка запроса: ${err}`);
  }
}

export default new ChartsService();