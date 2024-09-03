export const FIELDS = {
  username: 'username',
  address: 'address',
  email: 'email'
}

export const FORM_COMMANDS = {
  submit: 'user wants to submit the form',
}

export const LOGIN_COMMANDS = {
  username: `user wants to enter ${FIELDS.username}`,
}

export const HOME_COMMANDS = {
  email: `user wants to enter ${FIELDS.email}`,
  address: `user wants to enter ${FIELDS.address}`,
}

export const HEADER_COMMANDS = {
  menu1: 'user wants to open menu number one',
}

export const NAVIGATION_COMMANDS = {
  signin: 'user wants to log in or sign in',
  signup: 'user wants to signup or register',
  logout: 'user wants to logout or leave the application',
  page1: 'user wants to open or navigate to page one',
  page2: 'user wants to open or navigate to page two',
  page3: 'user wants to open or navigate to page three',
  home: 'user wants to go on home page'
}

export const BROWSER_HISTORY_COMMANDS = {
  back: 'user wants to go back or on previous page',
  forward: 'user wants to go forward or on next page',
}

export const COMMANDS = {
  ...NAVIGATION_COMMANDS,
  ...BROWSER_HISTORY_COMMANDS,
  ...FORM_COMMANDS,
  ...HEADER_COMMANDS
}

export const INTERACTIVE_COMMANDS = {
  ...LOGIN_COMMANDS,
  ...HOME_COMMANDS,
}

export const NO_MATCH = 'no match';