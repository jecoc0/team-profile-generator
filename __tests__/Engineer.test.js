const Engineer = require("../lib/Engineer");

test("Can create a github.", () => {
  const testGithub = "jecoc0";
  const employeeInstance = new Engineer("Jessica", 10, "jlg@gmail.com", testGithub);
  expect(employeeInstance.github).toBe(testGithub);
});

test("Testing getGithub will return github.", () => {
  const testGithub = "jecoc0";
  const employeeInstance = new Engineer("Jessica", 2, "jlg@gmail.com", testGithub);
  expect(employeeInstance.getGithub()).toBe(testGithub);
});

test("Testing role.", () => {
  const returnValue = "Engineer";
  const employeeInstance = new Engineer("Jessica", 2, "jlg@gmail.com", "Jessica");
  expect(employeeInstance.getRole()).toBe(returnValue);
});