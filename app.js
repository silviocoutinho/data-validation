const owasp = require('owasp-password-strength-test');
const ValidationError = require('./errors/ValidationError');

//REVIEW Verificar se todas as funcoes estao
//REVIEW lancandos o new ValidationError ou outro erro
//TODO Documentar as funcoes

function existsOrError(value, msg, code = 400) {
  if (!value) throw new ValidationError(msg, code);
  if (Array.isArray(value) && value.length === 0)
    throw new ValidationError(msg, code);
  if (typeof value === 'string' && !value.trim())
    throw new ValidationError(msg, code);
}

function notExistsOrError(value, msg) {
  try {
    existsOrError(value, msg);
  } catch (msg) {
    return;
  }
  throw new ValidationError(msg);
}

function equalsOrError(valueA, valueB, msg, code = 400) {
  if (valueA !== valueB) throw new ValidationError(msg, code);
}

function validEmailOrError(value, msg) {
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!regex.test(value)) throw new ValidationError(msg);
}

function numberOrError(value, msg) {
  if (isNaN(value)) throw new ValidationError(msg);
}

function positiveOrError(value, msg) {
  if (Math.sign(value) === -1) throw new ValidationError(msg);
}

function validLengthOrError(value, max, min, field) {
  //console.log('TAMANHO', value.length)
  if (value.length > max)
    throw new ValidationError(
      `O limite máximo de caracteres é de ${max} para o campo ${field}`,
    );
  else if (value.length < min)
    throw new ValidationError(
      `O limite mínimo de caracteres é de ${min} para o campo ${field}`,
    );
}

function validTypeOfOrError(value, type, msg) {
  if (typeof value !== type) throw new ValidationError(msg);
}

//TODO Modificiar o retorno
//HACK Eliminar a variavel errossArray para apenas errors, retornando uma string e nao um array
//FIXME Ao passar value como parametro em existOrError, ocorre a quebra de todos os testes
function strengthPassword(passwd) {
  owasp.config({
    allowPassphrases: true,
    maxLength: 128,
    minLength: 10,
    minPhraseLength: 20,
    minOptionalTestsToPass: 4,
  });

  testPassword = Object.entries(owasp.test(passwd));

  let errorsArray = [];

  testPassword.forEach(([key, value]) => {
    if (key === 'failedTests') {
      value.forEach(v => {
        switch (v) {
          case 0:
            errorsArray.push('A senha deve conter no mínimo 10 caracteres');
            break;
          case 1:
            errorsArray.push('');
            break;
          case 2:
            errorsArray.push(
              'A senha não pode conter uma sequência de 3 ou mais caracteres repetidos',
            );
            break;
          case 3:
            errorsArray.push('A senha deve conter um caracter minúsculo');
            break;
          case 4:
            errorsArray.push('A senha deve conter um caracter maiusculo');
            break;
          case 5:
            errorsArray.push('A senha deve conter pelo menos um número');
            break;
          case 6:
            errorsArray.push(
              'A senha deve conter pelo menos um caracter especial',
            );
            break;
          default:
            break;
        }
      });
    }
  });
  if (Array.isArray(errorsArray) && errorsArray.length !== 0)
    throw new ValidationError(errorsArray[0]);
}

module.exports = {
  existsOrError,
  notExistsOrError,
  equalsOrError,
  validEmailOrError,
  numberOrError,
  positiveOrError,
  validLengthOrError,
  validTypeOfOrError,
  strengthPassword,
};
