export const getMessage = (e) => {
  return e.target.validity.valid ? "" : e.target.validationMessage;
};
