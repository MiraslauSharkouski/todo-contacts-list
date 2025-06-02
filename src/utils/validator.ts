import { StorageManager } from "../services/storage-manager";

export class Validator {
  static isUniqueGroupName(name: string): boolean {
    const groups = StorageManager.getGroups();
    return !groups.some((g) => g.name === name);
  }

  static isUniquePhoneNumber(phone: string): boolean {
    const contacts = StorageManager.getContacts();
    return !contacts.some((c) => c.phone === phone);
  }
}
