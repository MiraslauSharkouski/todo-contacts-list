// src/utils/initialize-contact-list.ts

import { StorageManager } from "../services/storage-manager";
import { createGroupContainerIfHasContacts } from "./create-group-container";
import { updateContactList } from "./update-contact-list";

export function initializeContactList() {
  const groups = StorageManager.getGroups();

  groups.forEach((group) => {
    const contactsInGroup = StorageManager.getContacts().filter(
      (contact) => contact.groupId === group.id
    );

    if (contactsInGroup.length > 0) {
      createGroupContainerIfHasContacts(group);
      updateContactList(group.id);
    }
  });
}
