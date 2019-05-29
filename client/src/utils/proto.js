
/**
 * Загрузка данных
 * @param Object
 * @param function
 */
export function getProtoData(AwesomeMessage, callback) {
  const process = (data) => (AwesomeMessage.decode(new Uint8Array(data)));

  return callback(process);
}

/**
 * Отправка данных
 * @param Object
 * @param {}
 */
export function postProtoData(AwesomeMessage, data, callback) {
  const errMsg = AwesomeMessage.verify(data);
  if (errMsg) {
    throw Error(errMsg);
  }

  const message = AwesomeMessage.fromObject(data);
  console.log(`message = ${JSON.stringify(message)}`);

  return callback(AwesomeMessage.encode(message).finish());
}
