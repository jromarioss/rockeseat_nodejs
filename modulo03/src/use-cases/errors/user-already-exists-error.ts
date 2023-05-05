export class UserAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.') //constructor do Error
  }
}