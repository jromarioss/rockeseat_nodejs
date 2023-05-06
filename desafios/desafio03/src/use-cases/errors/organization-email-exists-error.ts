export class OrganizationEmailExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
