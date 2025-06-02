// src/services/storage-manager.ts
const CONTACTS_KEY = "contacts";
const GROUPS_KEY = "groups";

export class StorageManager {
  static getContacts(): Contact[] {
    return JSON.parse(localStorage.getItem(CONTACTS_KEY) || "[]");
  }

  static saveContacts(contacts: Contact[]) {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }

  static getGroups(): Group[] {
    return JSON.parse(localStorage.getItem(GROUPS_KEY) || "[]");
  }

  static saveGroups(groups: Group[]) {
    localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
  }

  static deleteGroup(groupId: string) {
    const groups = this.getGroups().filter((g) => g.id !== groupId);
    const contacts = this.getContacts().filter((c) => c.groupId !== groupId);
    this.saveGroups(groups);
    this.saveContacts(contacts);
  }
}
