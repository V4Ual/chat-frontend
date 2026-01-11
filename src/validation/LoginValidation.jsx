export const onLoginChangeValidation = (name, value) => {
  const error = {};
  switch (name) {
    case "email":
      if (!value) {
        error.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error.email = "Invaild Email";
      } else {
        delete error.email;
      }
      break;
    case "name":
      if (!value) {
        error.name = "Name is required";
      } else {
        delete error.name;
      }
      break;

    default:
      break;
  }

  return error;
};

export const onLoginSubmitValidation = (values) => {
  const error = {};

  // Name validation
  if (!values.name) {
    error.name = "Name is required";
  }

  // Email validation
  if (!values.email) {
    error.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    error.email = "Please enter a valid email address";
  } else {
    delete error.email;
  }

  return error;
};
