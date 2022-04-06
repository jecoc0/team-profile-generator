// packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const pageTemplate = require('../src/page-template');
const Manager = require('../lib/Manager');

// create array of questions for manager
const promptManagerInfo = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'managerName',
      message: 'What is the name of your team manager? (Required)',
      validate: managerNameInput => {
        if (managerNameInput) {
          return true;
        } else {
          console.log('Please enter the name of your team manager')
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'What is your manager ID? (Required)',
      validate: managerIdInput => {
        if (managerIdInput) {
          return true;
        } else {
          console.log('Please enter your manager ID')
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'managerEmail',
      message: 'What is the manager email? (Required)',
      validate: managerEmailInput => {
        if (managerEmailInput) {
          return true;
        } else {
          console.log('Please enter the manager email')
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'managerOffice',
      message: 'What is the manager office number? (Required)',
      validate: managerOfficeInput => {
        if (managerOfficeInput) {
          return true;
        } else {
          console.log('Please enter the manager office number')
          return false;
        }
      }
    },
    {
      type: 'list',
      name: 'nextStep',
      message: 'Would you like to add an employee or build the page?',
      choices: ['Add Employee', 'Build HTML Page']
    }
  ])
}

const employeeInfoPrompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'employeeName',
      message: 'What is the employee name?',
      validate: employeeNameInput => {
        if (employeeNameInput) {
          return true;
        } else {
          console.log('Please enter the employee name')
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'employeeEmail',
      message: 'What is the employee email?',
      validate: employeeEmailInput => {
        if (employeeEmailInput) {
          return true;
        } else {
          console.log('Please enter the employee email')
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'employeeId',
      message: 'What is the employee ID?',
      validate: employeeIdInput => {
        if (employeeIdInput) {
          return true;
        } else {
          console.log('Please enter the employee ID')
          return false;
        }
      }
    },
    {
      type: 'list',
      name: 'employeeJobClass',
      message: 'What position does this employee hold?',
      choices: ['Engineer', 'Intern']
    },
    {
      type: 'input',
      name: 'employeeGithub',
      message: 'What is the employee GitHub username?',
      when: ({ employeeJobClass }) => employeeJobClass === "Engineer",
      validate: employeeGitHubInput => {
        if (employeeGitHubInput) {
          return true;
        } else {
          console.log('Please enter employee GitHub username')
        }
      }
    },
    {
      type: 'input',
      name: 'internSchool',
      message: 'What is the school attended?',
      when: ({ employeeJobClass }) => employeeJobClass === "Intern",
      validate: internSchoolInput => {
        if (internSchoolInput) {
          return true;
        } else {
          console.log('Please enter the school attended')
          return false;
        }
      }
    },
    {
      type: 'list',
      name: 'nextStep',
      message: 'Would you like to add an employee or build the page?',
      choices: ['Add Employee', 'Build HTML Page']
    }
  ])
}

// This function is a recursive function because it calls itself
function addEmployee(team = []) {

  // since this is a recursive function, we need to spread the existing array each time this function calls itself.
  const employeesList = [...team]
  employeeInfoPrompt()
    .then(employeeInformation => {

      const { nextStep: employeeNextStep } = employeeInformation;
      if (employeeNextStep === "Add Employee") {

        // recursive function call
        addEmployee([...employeesList, employeeInformation])
      } else if (employeeNextStep === "Build HTML Page") {
        buildHtmlPage([...employeesList, employeeInformation])
      }
    })
}

function buildHtmlPage(employees = []) {
  const htmlPage = pageTemplate(employees)
  fs.writeFile("team.html", htmlPage, (err) => {
    if (err) console.log(err);
    else {
      console.log("File was written successfully");
    }
  });
}

function init() {
  promptManagerInfo()
    .then(managerInformation => {
      const { managerName, managerId, managerEmail, managerOffice } = managerInformation
      const manager = new Manager(managerName, managerId, managerEmail, managerOffice)
      console.log('manager name from class', manager.getName())
      // we need to add the employeeJobClass to the manager because we didn't assign this when we were asking manager questions
      managerInformation.employeeJobClass = 'manager'

      const { nextStep } = managerInformation;
      if (nextStep === "Add Employee") {
        addEmployee([managerInformation])
      } else if (nextStep === "Build HTML Page") {
        //since buildHtmlPage requires and Array for the parameter, we are just wrapping the object here in an array
        buildHtmlPage([managerInformation])
      }
    })
}



init();