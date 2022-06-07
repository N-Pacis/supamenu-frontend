


export const showFormErrors = () => {
  const inputs = document.querySelectorAll('input');
  let isFormValid = true;

  inputs.forEach(input => {
    input.classList.add('active');

    const isInputValid = showInputError(input);

    if (!isInputValid) {
      isFormValid = false;
    }
  });

  return isFormValid;
}
