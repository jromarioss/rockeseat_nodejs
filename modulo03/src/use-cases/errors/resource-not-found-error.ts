export class ResourceNotFoundError extends Error {
  constructor() {
    super('Resource not found.') //constructor do Error
  }
}