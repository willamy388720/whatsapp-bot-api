export class ContactAlreadyExistsError extends Error {
  constructor() {
    super("Contact Already Exists");
  }
}
