// Error controlado: lleva un código HTTP y un mensaje seguro para el cliente.
export class AppError extends Error {
  constructor(statusCode, message, detalles = undefined) {
    super(message);
    this.statusCode = statusCode;
    this.detalles = detalles;
  }
}
