const { existsOrError, notExistsOrError, equalsOrError } = require('./app');
const ValidationError = require('./errors/ValidationError');

const valueNullString = null;
const valueString = 'Value for Test';

describe('Values Existence test', () => {
  test('Should throw error when value not exist', () => {
    const t = () => existsOrError(valueNullString, 'Null Value');
    expect(t).toThrow(ValidationError);
    expect(t).toThrow('Null Value');
  });

  test('Should throw error when value exist', () => {
    const t = () => notExistsOrError(valueString, 'Exists Value');
    expect(t).toThrow(ValidationError);
    expect(t).toThrow('Exists Value');
  });
});
