const path = require("path");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");


const contactsPath = path.join(__dirname, "db", "contacts.json");

const saveChanges = async (arr) => {
	return await fs.writeFile(contactsPath, JSON.stringify(arr, null, 2));
};

const listContacts = async () => {
	const data = await fs.readFile(contactsPath);

	return JSON.parse(data);
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const contact =
		(await contacts.find((item) => item.id === contactId)) || null;

	return contact;
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) return null
    const deletedContact = contacts.splice(index, 1);
    await saveChanges(contacts);
    return deletedContact;
};

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
			id: uuidv4(),
			name,
			email,
			phone,
		};
    contacts.push(newContact);
    await saveChanges(contacts);
    return newContact;
};

const contacts = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};

module.exports = contacts;
