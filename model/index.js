import fs from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import contacts from './contacts.json'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const listContacts = async () => {
  return contacts
}

const getContactById = async (contactId) => {
  const contact = contacts.find((contact) => contact.id === contactId)
  return contact
}

const removeContact = async (contactId) => {
  const index = contacts.findIndex((contact) => contact.id === contactId)
  if (index !== -1) {
    const [result] = contacts.splice(index, 1)
    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(contacts, null, 2)
    )
    return result
  }
  return null
}

/* вариант через перебор и some */
// if (contacts.some((contact) => contact.id === contactId)) {
//   const newContacts = contacts.filter((contact) => contact.id !== contactId)
//   await fs.writeFile(
//     path.join(__dirname, 'db', 'contacts.json'),
//     JSON.stringify(newContacts, null, 2)
//   )
//   return newContacts
// }
// return contacts

const addContact = async ({ name, email, phone }) => {
  if (name && email && phone) {
    const newContact = { name, email, phone, id: uuidv4() }
    contacts.push(newContact)
    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(contacts, null, 2)
    )
    return newContact
  }
  return 'Please check your input data!'
}

const updateContact = async (contactId, body) => {
  const index = contacts.findIndex((contact) => contact.id === contactId)
  if (index !== -1) {
    const updatedContact = { id: contactId, ...contacts[index], ...body }
    contacts[index] = updatedContact
    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(contacts, null, 2)
    )
    return updatedContact
  }
  return null
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
