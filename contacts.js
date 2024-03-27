import { promises as fs } from "fs";
import path from "path";

const contactsPath = path.join("db", "contacts.json");

// Функція для отримання всіх контактів
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

// Функція для отримання контакта по id
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    return contact || null;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const removedContact = contacts.find(({ id }) => id === contactId);
    if (!removedContact) return null; // Повертає null, якщо контакт не знайдено

    const updatedContacts = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return removedContact;
  } catch (error) {
    throw error;
  }
}

// Функція для додавання нового контакта
async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: Date.now(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }
}

export { listContacts, getContactById, removeContact, addContact };
