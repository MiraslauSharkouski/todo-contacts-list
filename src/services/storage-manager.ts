import type { Contact } from "../types/contact";
import type { Group } from "../types/group";

export class StorageManager {
  private static CONTACTS_KEY = "contacts";
  private static GROUPS_KEY = "groups";

  static getContacts(): Contact[] {
    return JSON.parse(localStorage.getItem(this.CONTACTS_KEY) || "[]");
  }

  static saveContacts(contacts: Contact[]) {
    localStorage.setItem(this.CONTACTS_KEY, JSON.stringify(contacts));
  }

  static getGroups(): Group[] {
    return JSON.parse(localStorage.getItem(this.GROUPS_KEY) || "[]");
  }

  static saveGroups(groups: Group[]) {
    localStorage.setItem(this.GROUPS_KEY, JSON.stringify(groups));
  }

  static deleteGroup(groupId: string) {
    const contacts = this.getContacts().filter((c) => c.groupId !== groupId);
    this.saveContacts(contacts);

    const groups = this.getGroups().filter((g) => g.id !== groupId);
    this.saveGroups(groups);
  }
}
