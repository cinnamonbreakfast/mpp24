export default class DBDuplicateException extends Error {
  statusCode: number = 0;

  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
  }

  static of(message: string, code: number) {
    const instance = new DBDuplicateException(message);
    instance.setStatusCode(code);
    return instance;
  }

  setMessage(message: string) {
    this.message = message;
    return this;
  }

  setStatusCode(code: number) {
    this.statusCode = code;
    return this;
  }
}
