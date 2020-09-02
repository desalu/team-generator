const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const { type } = require("os");

const allEmployees = [];

const generalQuestion = [

  {
    type: "input",
    name: "name",
    message: "Name: "
  },

  {
    type: "input",
    name: "id",
    message: `Id: `
  },

  {
    type: "input",
    name: "email",
    message: `Email: `
  },

];

const managerQuestion = [{
  type: "input",
  name: "officeNumber",
  message: "Manager's Office Number:  "
}];

const engineerQuestion = [{
  type: "input",
  name: "github",
  message: "What's your github?"
}];

const internQuestion = [{
  type: "input",
  name: "school",
  message: 'which school are you attending?'
}];


async function startProgram() {


  await inquirer.prompt(
    {
      type: "rawlist",
      name: "options",
      message: "What is this person's role?",
      choices: [
        'Manager',
        'Engineer',
        'Intern',
      ]
    }
  )
  .then(async role => {

    if (role.options === "Manager") {

      let officeNumber;
      await questions();
      
      await inquirer
      .prompt(managerQuestion)
      .then( res => {
       officeNumber= res.officeNumber;
      });
      const manager = new Manager(employee.name, employee.id, employee.email, officeNumber);
      allEmployees.push(manager);

    };
    if (role.options === "Engineer") {

      let github;
      await questions();
      
      await inquirer
      .prompt(engineerQuestion)
      .then( res => {
       github = res.github;
      });
      const engineer = new Engineer(employee.name, employee.id, employee.email, github);
      allEmployees.push(engineer);

    };
    if (role.options === "Intern") {
      let school;
      await questions();
      
      await inquirer
      .prompt(internQuestion)
      .then( res => {
       school = res.school
      });
      const intern = new Intern(employee.name, employee.id, employee.email, school);
      allEmployees.push(intern);
    };
    console.log(allEmployees);
  });

  await inquirer.prompt(
    {
    type: 'confirm',
    name: 'addEmployee',
    message: "Would you like to add another employee?"
    }
  ).then(res => {
    if (res.addEmployee) {
      startProgram();
    }
    else {
      publish();
    }
  }); 

}

async function publish() {
  console.log(allEmployees);
  await inquirer.prompt(
    {
    type: 'confirm',
    name: 'view',
    message: `Would you like to publish now?`
    }
  ).then(res => {
    if (res.view) {
      fs.writeFile(outputPath, render(allEmployees), function (err) {
      if (err) throw err;
      console.log('Saved!');
      });
      
    }
    else {
      return;
    }
  });
}

const employee = new Employee();

let questions = async () => {
  await inquirer
      .prompt(generalQuestion)
      .then(res => {
        employee.name = res.name;
        employee.id = res.id;
        employee.email = res.email;
      });
 
}

startProgram();


