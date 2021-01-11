const initialState = {
  selectedTable: 
  { title: 'Выберите таблицу', action: '', value: '', },
  tableHeader: {
    "grids": [
      { text: 'Наименование', value: 'name', editable: false },
      { text: 'Закреплен', value: 'isPinned', editable: false },
      { text: 'Мониторинг', value: 'isLinkMonitoringOn', editable: false },
    ],
    "basePoints": [
      { text: 'Тип точки', value: 'projectBasePoint', editable: false },
      { text: 'С-Ю', value: 'northsouth', editable: false },
      { text: 'В-З', value: 'eastwest', editable: false },
      { text: 'Отметка', value: 'elevation', editable: false},
      { text: 'Угол от ист. сервера', value: 'angelton', editable: false },
      { text: 'Долгота', value: 'longitude', editable: false},
      { text: 'Широта', value: 'latitude', editable: false},
      { text: 'Закреплен', value: 'pinned', editable: false}
    ],
    "levels": [
      { text: 'Наименование', value: 'name', editable: false },
      { text: 'Этаж', value: 'floor', editable: false},
      { text: 'Уровень', value: 'elevation', editable: false },
      { text: 'Построение этажа', value: 'buildingStory', editable: false },
      { text: 'Закреплен', value: 'pinned', editable: false },
      { text: 'Мониторинг', value: 'linkMonitoringOn', editable: false }
    ],
    "types": [
      { text: 'ID', value: 'rvtElementId', editable: false},
      { text: 'Наименование', value: 'name', editable: false },
      { text: 'Описание тега', value: 'description', editable: false},
      { text: 'Категория', value: 'categoryName', editable: false },
      { text: 'Код классификатора', value: 'classificationCode', editable: false },
      { text: 'Описание классификатора', value: 'classificationDescription', editable: false },
      { text: 'Ширина', value: 'width', editable: false },
      { text: 'Высота', value: 'height', editable: false },
      { text: 'Толщина', value: 'thickness', editable: false },
      { text: 'Материал', value: 'materialDto.name', editable: false },
      { text: 'Несущих к-ций', value: 'structuralMaterialDto.name', editable: false },
    ],
    "typesCharacteristics": [
      { text: 'Наименование типа', value: 'type.name', editable: false },
      { text: 'Категория', value: 'type.categoryName', editable: false },
      { text: 'Количество элементов', value: 'rvtElementCount', editable: false },
      { text: 'Объем (метры в кубе)', value: 'volume', editable: false },
      { text: 'Площадь (метры в квадрате)', value: 'area', editable: false },
      { text: 'Длина (миллиметры)', value: 'length', editable: false },
      { text: 'Цена (₽)', value: 'price', editable: true,  },
      { text: 'Стоимость (₽)', value: 'cost', editable: false },
    ],
    "fullTypesCharacteristics": [],
  }
}

export const tables = {
  namespaced: true,
  state: initialState,
  actions: {
    setTable({commit}, table) {
      commit('setTableSuccess', table);
    },
  },
  mutations: {
    setTableSuccess(state, table) {
      state.selectedTable = table;
    },
  }
}