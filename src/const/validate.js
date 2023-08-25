const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const phonePattern = /^((09|03)+[0-9]{8})$/g
const QUANTITY_SIZE = 5;
const USERNAME_MIN_LENGTH = 5;
const USERNAME_MAX_LENGTH = 25;
const PASSWORD_MIN_LENGTH = 5;
const PASSWORD_MAX_LENGTH = 25;
const FULLNAME_MIN_LENGTH = 5;
const FULLNAME_MAX_LENGTH = 50;
// const usernamePattern = /^(\w{5,25})$/g
const usernamePattern = new RegExp(`^[\\w]{${USERNAME_MIN_LENGTH},${USERNAME_MAX_LENGTH}}$`
  // , {
  //     minLength: PASSWORD_MIN_LENGTH,
  //     maxLength: PASSWORD_MAX_LENGTH,
  //   }
);

const fullnamePattern = new RegExp(`^[\\w]{${FULLNAME_MIN_LENGTH},${FULLNAME_MAX_LENGTH}}$`
  // , {
  //     minLength: PASSWORD_MIN_LENGTH,
  //     maxLength: PASSWORD_MAX_LENGTH,
  //   }
);

const passwordPattern = new RegExp(`^[\\w]{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$`
  // , {
  //     minLength: PASSWORD_MIN_LENGTH,
  //     maxLength: PASSWORD_MAX_LENGTH,
  //   }
);

export { emailPattern, phonePattern, QUANTITY_SIZE, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH,FULLNAME_MIN_LENGTH,FULLNAME_MAX_LENGTH, usernamePattern, passwordPattern,fullnamePattern }