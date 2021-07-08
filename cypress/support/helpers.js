export const uuid = () => Date.now()

//arrow functions to get year, month and date
export const today = () => new Date()
export const year = () => today().getFullYear()
export const week = () => {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
export const day = () => today().getDate()

//to generate a fake email country+date
//parenthesis of parameters are optional in arrow function

export var email = "";
export const getUniqueEmail = () => `fake_+${uuid()}@email.com`

export var text = "";

export const getRandomName = () => {
  //var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

// set user function to return an object that gets object as parameter
export const user = () => ({
  Name: getRandomName(),
  
  //generate the email depending on the country
  email: getUniqueEmail()
})


function getNumberOfWeek() {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}