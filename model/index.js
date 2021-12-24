import db from './db'

const listContacts = async () => {
  const client = await db
  const collection = await client.db().collection('contacts')
  // const result
  return collection
}

const getContactById = (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async ({ name, email, phone }) => {}

const updateContact = async (contactId, body) => {}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
