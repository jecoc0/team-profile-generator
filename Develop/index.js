// packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs')

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
      message: 'What is your manager ID! (Required)',
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
      type: 'list',
      name: 'employeeJobClass',
      message: 'What position does this employee hold?',
      choices: ['Engineer', 'Intern']
    },
    {
      type: 'input',
      name: 'employeeGithub',
      message: 'What is the employee GitHub username?',
      when: ({employeeJobClass}) => employeeJobClass === "Engineer",
      validate: employeeGitHubInput => {
        if(employeeGitHubInput) {
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
      when: ({employeeJobClass}) => employeeJobClass === "Intern",
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
function addEmployee(employees = []) {
  console.log("employees", employees)
  

  const employeesList = [...employees]
  console.log("employee list", employeesList)
  employeeInfoPrompt()
  .then(employeeInformation => {
    // nextStep conflicts with our previous instance of nextStep
    // to rename on the spot, use previous name (nextStep), COLON new name,
    // as seen in { nextStep: employeeNextStep} below
    const { nextStep: employeeNextStep } = employeeInformation;
    if(employeeNextStep === "Add Employee") {
      addEmployee([...employeesList, employeeInformation])
    } else if (employeeNextStep === "Build HTML Page") {
      // newHtmlPage();
      console.log('Building HTML')
      employeesList.push(employeeInformation)
      console.log(employeesList)
    }
  })

}

function init() {
  promptManagerInfo()
  .then(managerInformation => {
    const { nextStep } = managerInformation;

    if(nextStep === "Add Employee") {
      addEmployee()
      
    } else if (nextStep === "Build HTML Page") {
      // newHtmlPage();
      console.log('Building HTML')
    }
    

    // const newHtmlPage = templateData(managerInformation);
    //this prints the manager responses
  
  })
}

// employeeInfoPrompt();

init();