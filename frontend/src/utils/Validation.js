
export const isValidEmail = (value) => {
  return {
    valid: !(value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,64}$/i.test(value)),
    from: 'mail',
    type: "INVALID_MAIL"
  }
}

export const isValidPassword = (value) => {
  if (value.length < 6) {
    return {
      valid: false,
      from: 'pass',
      type: 'LENGTH_LESS_THAN'
    }
  }
  if (value.length > 12) {
    return {
      valid: false,
      from: 'pass',
      type: 'LENGTH_MORE_THAN'
    }
  }
  if (!(/[0-9]/).test(value)) {
    return {
      valid: false,
      from: 'pass',
      type: 'NOT_CONTAIN_NUMBER'
    }
  }
  if (!((/[A-Z]/).test(value) || (/[a-z]/).test(value))) {
    return {
      valid: false,
      from: 'pass',
      type: 'NOT_CONTAIN_LETTER'
    }
  }
  return {
    valid: true,
    from: 'pass'
  }
}

export const isValidRegister = (name, mail, remail, password, repassword, job, specQuestion, legalWarning) => {

  const emailValidation = isValidEmail(mail);
  const passwordValidation = isValidPassword(password);

  if (!name) {
    return {
      valid: false,
      from: 'name',
      type: 'EMPTY_FIELD'
    }
  }

  if (!emailValidation.valid) {
    return emailValidation;
  }

  if (!passwordValidation.valid) {
    return passwordValidation;
  }
  
  if (mail !== remail) {
    return {
      valid: false,
      from: 'mail',
      type: 'MAIL_NOT_SAME'
    }
  } 

  if (password !== repassword) {
    return {
      valid: false,
      from: 'pass',
      type: 'PASS_NOT_SAME'
    }
  } 

  if (!job) {
    return {
      valid: false,
      from: 'job',
      type: 'EMPTY_FIELD'
    }
  }

  if (!specQuestion) {
    return {
      valid: false,
      from: 'specQuestion',
      type: 'EMPTY_FIELD'
    }
  }

  if (!legalWarning) {
    return {
      valid: false,
      from: 'legalWarning',
      type: 'DISAGREE_LEGAL'
    }
  }
  return {
    valid: true,
  }
}

// export const loginValidation = (mail, password) => {
//   const emailValidation = isValidEmail(mail);
//   const passwordValidation = isValidPassword(password);
  
//   if (!emailValidation.valid) {
//     return emailValidation;
//   }
//   if (!passwordValidation.valid) {
//     return passwordValidation;
//   }
//   return {
//     valid: true
//   }
// }