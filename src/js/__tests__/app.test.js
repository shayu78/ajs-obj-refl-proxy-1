import getCharacterPropsByOrder from '../app';

test('getCharacterPropsByOrder - no or incorrect parameter character', () => {
  expect(getCharacterPropsByOrder()).toEqual([]);
  expect(getCharacterPropsByOrder(true)).toEqual([]);
});

test('getCharacterPropsByOrder - parameter character has no own properties', () => {
  const data = Object.create({ proto: true });
  getCharacterPropsByOrder(data);
  expect(data).not.toHaveProperty('attack');
  expect(data).toHaveProperty('proto');
});

test('getCharacterPropsByOrder - throw (incorrect parameter sortOrder)', () => {
  expect(() => {
    getCharacterPropsByOrder({
      health: 10,
      level: 2,
      name: 'мечник',
      attack: 80,
      defence: 40,
    }, true);
  }).toThrowError(Error);
});

test('getCharacterPropsByOrder - no parameter sortOrder', () => {
  expect(getCharacterPropsByOrder({
    health: 10,
    level: 2,
    name: 'мечник',
    attack: 80,
    defence: 40,
  })).toEqual([
    { key: 'attack', value: 80 },
    { key: 'defence', value: 40 },
    { key: 'health', value: 10 },
    { key: 'level', value: 2 },
    { key: 'name', value: 'мечник' },
  ]);
});

test('getCharacterPropsByOrder - one value in sortOrder', () => {
  expect(getCharacterPropsByOrder({
    health: 10,
    level: 2,
    name: 'мечник',
    attack: 80,
    defence: 40,
  }, ['level'])).toEqual([
    { key: 'level', value: 2 },
    { key: 'attack', value: 80 },
    { key: 'defence', value: 40 },
    { key: 'health', value: 10 },
    { key: 'name', value: 'мечник' },
  ]);
});

test('getCharacterPropsByOrder - several values in sortOrder', () => {
  expect(getCharacterPropsByOrder({
    health: 10,
    level: 2,
    name: 'мечник',
    attack: 80,
    defence: 40,
  }, ['name', 'level'])).toEqual([
    { key: 'name', value: 'мечник' },
    { key: 'level', value: 2 },
    { key: 'attack', value: 80 },
    { key: 'defence', value: 40 },
    { key: 'health', value: 10 },
  ]);
});

test('getCharacterPropsByOrder - all values in sortOrder like in character', () => {
  expect(getCharacterPropsByOrder({
    health: 10,
    level: 2,
    name: 'мечник',
    attack: 80,
    defence: 40,
  }, ['name', 'level', 'defence', 'attack', 'health'])).toEqual([
    { key: 'name', value: 'мечник' },
    { key: 'level', value: 2 },
    { key: 'defence', value: 40 },
    { key: 'attack', value: 80 },
    { key: 'health', value: 10 },
  ]);
});
