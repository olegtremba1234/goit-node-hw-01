const { Command } = require("commander");
const program = new Command();
const contactsRepository = require("./contacts");

run();

async function run() {
  try {
    program
      .option("-a, --action <type>", "choose action")
      .option("-i, --id <type>", "user id")
      .option("-n, --name <type>", "user name")
      .option("-e, --email <type>", "user email")
      .option("-p, --phone <type>", "user phone");
    program.parse(process.argv);
    const argv = program.opts();
    invokeAction(argv);
  } catch (error) {
    console.log(error);
  }
}

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsRepository.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const contact = await contactsRepository.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const addContact = await contactsRepository.addContact({
        name,
        email,
        phone,
      });
      console.log(addContact);
      break;

    case "remove":
      const deleteContact = await contactsRepository.removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
