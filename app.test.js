const {
  existsOrError,
  notExistsOrError,
  equalsOrError,
  validEmailOrError,
  numberOrError,
  positiveOrError,
  validLengthOrError,
} = require('./app');
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
describe('Checking types', () => {
  test('Should throw error when value is not equal', () => {
    const t = () => equalsOrError(valueNullString, valueString, 'Not equal');
    expect(t).toThrow(ValidationError);
    expect(t).toThrow('Not equal');
  });

  test('Should throw error when email is invalid', () => {
    const t = () => validEmailOrError('johns#gmail.com', 'Invalid email');
    expect(t).toThrow(ValidationError);
    expect(t).toThrow('Invalid email');
  });

  test('Should throw error when value is not a number', () => {
    const t = () => numberOrError('Text', 'Is not a number');
    expect(t).toThrow(ValidationError);
    expect(t).toThrow('Is not a number');
  });

  test('Should throw error when value is not a positive number', () => {
    const t = () => positiveOrError(-5, 'Is not a positive number');
    expect(t).toThrow(ValidationError);
    expect(t).toThrow('Is not a positive number');
  });

  test('Should throw error when value dont have min valid length', () => {
    const t = () => validLengthOrError('Joe', 20, 5, 'name');
    expect(t).toThrow(ValidationError);
    expect(t).toThrow('O limite mínimo de caracteres é de 5 para o campo name');
  });

  test('Should throw error when value dont have max valid length', () => {
    const t = () => validLengthOrError('Joelengthton', 10, 5, 'name');
    expect(t).toThrow(ValidationError);
    expect(t).toThrow(
      'O limite máximo de caracteres é de 10 para o campo name',
    );
  });
});
