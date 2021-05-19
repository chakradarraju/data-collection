const date = document.getElementById("date");

date.value = new Date().toDateString();

const form = document.forms.patient_form;

form.onsubmit = (ev) => {
  ev.preventDefault();

  const formElements = Array.from(form.elements);

  const patient_data = [];
  formElements.slice(0, 2).forEach((e) => {
    patient_data.push(`${e.name}: ${e.value}`);
  });

  patient_data.push("\n");

  formElements.slice(2, 24).forEach((e, i) => {
    patient_data.push(`${i + 1}) ${e.name}: ${e.value}`);
  });

  window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    patient_data.join("\n")
  )}`;
};
