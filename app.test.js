const {
  existsOrError,
  notExistsOrError,
  equalsOrError,
  validEmailOrError,
  numberOrError,
  positiveOrError,
  dateOrError,
  validLengthOrError,
  strengthPassword,
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

  test('Should throw error when value is not equal with code 404', () => {
    const t = () => equalsOrError(valueNullString, valueString, 'Not equal', 404);    
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

  test('Should throw error when value is not a Date', () => {
    const t = () => dateOrError('25/25/25', 'Is not a valid date');
    expect(t).toThrow(ValidationError);
    expect(t).toThrow('Is not a valid date');
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

describe('Password Checkup', () => {
  test('Should throw error when password have less than 10 chars', () => {
    const t = () => strengthPassword('Myp@ss#31');
    expect(t).toThrow(ValidationError);
    expect(t).toThrow('A senha deve conter no mínimo 10 caracteres');
  });

  test('Should throw error when password have 3 or more chars repeated', () => {
    const t = () => strengthPassword('Myp@ss#333');
    expect(t).toThrow(ValidationError);
    expect(t).toThrow(
      'A senha não pode conter uma sequência de 3 ou mais caracteres repetidos',
    );
  });

  test('Should throw error when password dont have lowercase letter', () => {
    const t = () => strengthPassword('MYP@SS#433');
    expect(t).toThrow(ValidationError);
    expect(t).toThrow('A senha deve conter um caracter minúsculo');
  });

  test('Should throw error when password dont have lowercase letter', () => {
    const t = () => strengthPassword('myp@ss#433');
    expect(t).toThrow(ValidationError);
    expect(t).toThrow('A senha deve conter um caracter maiusculo');
  });

  test('Should throw error when password dont have one number', () => {
    const t = () => strengthPassword('myp@ss#Hgg');
    expect(t).toThrow(ValidationError);
    expect(t).toThrow('A senha deve conter pelo menos um número');
  });

  test('Should throw error when password dont have one number', () => {
    const t = () => strengthPassword('mypadss3H4g');
    expect(t).toThrow(ValidationError);
    expect(t).toThrow('A senha deve conter pelo menos um caracter especial');
  });
});
