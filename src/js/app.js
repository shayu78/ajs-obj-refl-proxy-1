/* eslint-disable no-console */

export default function getCharacterPropsByOrder(character, sortOrder = []) {
  if (!Array.isArray(sortOrder)) throw new Error('Некорректный параметр sortOrder, требуется массив свойств для сортировки');

  const outArray = [];

  for (const key in character) {
    if (Object.prototype.hasOwnProperty.call(character, key)) {
      outArray.push({ key, value: character[key] });
    }
  }

  let countSortProps = 0;
  sortOrder.forEach((sortValue) => {
    outArray.filter((value, index) => {
      if (sortValue === value.key) {
        // перемещаем элемент согласно позиции сортировки
        outArray.splice(countSortProps, 0, outArray.splice(index, 1).shift());
        countSortProps += 1;
      }
      return outArray;
    });
  });

  // сортируем "остаток" массива по алфавиту
  const sortPartArray = outArray.slice(countSortProps)
    .sort((a, b) => a.key.toString().localeCompare(b.key.toString()));

  return outArray.splice(0, countSortProps).concat(sortPartArray);
}

const data = {
  health: 10,
  level: 2,
  name: 'мечник',
  attack: 80,
  defence: 40,
};

try {
  const props = getCharacterPropsByOrder(data, ['name', 'level']);
  console.log(props);
  getCharacterPropsByOrder(data, 'data');
} catch (error) {
  console.error(error.message);
}
