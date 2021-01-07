import axios from 'axios';

const API_URL = 'http://dsm.ds.do:8080/rest/';

class FileModelService {
  // получить все модели
  getAllFileModels() {
    return axios
      .get(API_URL + 'filemodels')
      .then(response => response.data)
      .catch(err => `Ошибка запроса: ${err}`)
  }
  // базовые  точки
  getBaseBoints(fileModelId) {
    return axios
      .get(API_URL + `basepoints/fm${fileModelId}`)
      .then(response => response.data)
      .catch(err => `Ошибка запроса: ${err}`);
  }
  // оси
  getGrids(fileModelId) {
    return axios
      .get(API_URL + `grids/fm${fileModelId}`)
      .then(response => response.data)
      .catch(err => `Ошибка запроса: ${err}`);
  }
  // Уровни
  getLevels(fileModelId) {
    return axios
      .get(API_URL + `levels/fm${fileModelId}`)
      .then(response => response.data)
      .catch(err => `Ошибка запроса: ${err}`);
  }
  // Типы
  getTypes(fileModelId) {
    return axios
      .get(API_URL + `types/fm${fileModelId}`)
      .then(response => response.data)
      .catch(err => `Ошибка запроса: ${err}`);
  }
  // Характеристики типов
  getTypesCharacteristics(fileModelId) {
    return axios
      .get(API_URL + `typescharacteristics/fm${fileModelId}`)
      .then(response => response.data)
      .catch(err => `Ошибка запроса: ${err}`);
  }
  // Полная информация конкретной характеристики типа
  getFullTypesCharacteristics(fileModelId, characterId) {
    return axios
      .get(API_URL + `typescharacteristics/fm${fileModelId}/${characterId}`)
      .then(response => response.data)
      .catch(err => `Ошибка запроса: ${err}`);
  }
}

export default new FileModelService();