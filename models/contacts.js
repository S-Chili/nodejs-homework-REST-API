const path = require('path');
const fs = require('fs/promises');

let nanoid;
import("nanoid").then((module) => {
  nanoid = module.nanoid;
});

const contactsPath = path.join(__dirname, './contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
}

async function getById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    return contact;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      return false;
    }
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return true;
  } catch (error) {
    throw error;
  }
}
  
async function addContact({name, email, phone}) {
  if (!name) {
    const error = new Error('missing required name field');
    error.status = 400;
    throw error;
  } else if (!email) {
    const error = new Error('missing required email field');
    error.status = 400;
    throw error;
  } else if (!phone) {
    const error = new Error('missing required phone field');
    error.status = 400;
    throw error;
  }
  try {
    const newContact = { id: nanoid(), name, email, phone };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }
}

async function updateContact(contactId, data) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === contactId);
    if (!contact) {
      return null;
    }
    Object.assign(contact, data);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
  } catch (error) {
    throw error;
  }
}

module.exports = { listContacts, getById, removeContact, addContact, updateContact };