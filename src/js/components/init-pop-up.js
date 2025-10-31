export function initPopUp() {
  const modal = document.getElementById("pop-up-modal");
  const overlay = modal.querySelector(".pop-up-modal__overlay");
  const closeBtn = modal.querySelector(".pop-up-modal__close");
  const openBtns = document.querySelectorAll(".request-button");
  const form = document.getElementById("modal-form");

  const successModal = document.querySelector(".pop-up-success");
  const successCloseBtn = successModal?.querySelector(".pop-up-success__btn");
  const successOverlay = successModal?.querySelector(".pop-up-success__overlay");

 //Open/Close modals
  const openModal = () => {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  const openSuccessModal = () => {
    successModal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeSuccessModal = () => {
    successModal.classList.remove("active");
    document.body.style.overflow = "";
  };

  openBtns.forEach(btn => btn.addEventListener("click", openModal));
  overlay.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);


  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      if (modal.classList.contains("active")) closeModal();
      if (successModal.classList.contains("active")) closeSuccessModal();
    }
  });

  //Validation
  const fieldsConfig = {
    modalName: /^[A-Za-z\s]{2,}$/,
    modalLastName: /^[A-Za-z\s]{2,}$/,
    modalCity: /^[A-Za-z\s]{2,}$/,
    modalPhone: /^\+\d{10,15}$/,
    modalEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  };

  function validateField(field) {
    const value = field.value.trim();
    const errorRequired = field.parentElement.querySelector(".form__error_required");
    const regex = fieldsConfig[field.id];
    const errorPattern = field.parentElement.querySelector(".form__error_pattern");

    if (!value) {
      errorRequired?.classList.add("visible");
      errorPattern?.classList.remove("visible");
      return false;
    } else if (regex && !regex.test(value)) {
      errorRequired?.classList.remove("visible");
      errorPattern?.classList.add("visible");
      return false;
    } else {
      errorRequired?.classList.remove("visible");
      errorPattern?.classList.remove("visible");
      return true;
    }
  }

  const validateRadioGroup = (radioGroupWrapper) => {
    const radios = radioGroupWrapper.querySelectorAll("input[type='radio']");
    const radioError = radioGroupWrapper.querySelector("#area-error");
    const oneChecked = Array.from(radios).some(r => r.checked);

    if (!oneChecked) radioError.classList.add("visible");
    else radioError.classList.remove("visible");

    return oneChecked;
  };

  //Submit
  form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;

    Object.keys(fieldsConfig).forEach(id => {
      const field = form.querySelector(`#${id}`);
      if (!validateField(field)) valid = false;
    });

    const select = form.querySelector("#modalPropertyType");
    const selectWrapper = select.closest(".form__field_select");
    const selectError = selectWrapper.querySelector(".form__error_required");

    if (!select.value) {
      selectError.classList.add("visible");
      selectWrapper.style.setProperty("--arrow-top", "30%");
      valid = false;
    } else {
      selectError.classList.remove("visible");
      selectWrapper.style.setProperty("--arrow-top", "55%");
    }

    const radioGroupWrapper = form.querySelector(".form__radio-group__wrapper");
    if (!validateRadioGroup(radioGroupWrapper)) valid = false;


    if (valid) {
      form.reset();
      closeModal();
      openSuccessModal();
    }
  });

  successCloseBtn?.addEventListener("click", () => {
    closeSuccessModal();
    openModal(); //Не зовсім зрозумів макет, тому поки що буде тут 
  });

  successOverlay?.addEventListener("click", closeSuccessModal);

  //Blur/Change actions
  form.querySelectorAll("input, select").forEach(input => {
    input.addEventListener("blur", () => {
      if (input.id === "modalPropertyType") {
        const err = input.parentElement.querySelector(".form__error_required");
        if (!!input.value) err.classList.remove("visible");
        return;
      }
      if (fieldsConfig[input.id]) validateField(input);
    });
  });

  const radioGroupWrapper = form.querySelector(".form__radio-group__wrapper");
  const radios = radioGroupWrapper.querySelectorAll("input[type='radio']");
  radios.forEach(radio => {
    radio.addEventListener("change", () => validateRadioGroup(radioGroupWrapper));
  });
}
