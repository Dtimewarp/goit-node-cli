import { program } from "commander";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        const contacts = await listContacts();
        console.log('Список контактів:');
        console.table(contacts);
      break;

    case "get":
        const contactById = await getContactById(id);
        console.log('Контакт з вказаним id:');
        console.log(contactById || 'Контакт не знайдений');
      break;

    case "add":
        const newContact = await addContact(name, email, phone);
        console.log('Доданий контакт:');
        console.log(newContact);
      break;

    case "remove":
        const removedContact = await removeContact(id);
        console.log('Видалений контакт:');
        console.log(removedContact || 'Контакт не знайдений');
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
