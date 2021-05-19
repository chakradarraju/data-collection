const date = document.getElementById("date");

const dt = new Date();
const hrs = 1 + ((dt.getHours() + 11) % 12);
const hours = (hrs < 10 ? '0' : '') + hrs;
const minutes = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
date.value = dt.toISOString().substr(0, 10) + " " + hours + ":" + minutes + " " + (dt.getHours() < 12 ? "AM" : "PM");
(() => {
  window.onload = () => {
    const eles = Array.from(form.elements);
    console.log('l', eles.length);
  }
})();

const form = document.forms.patient_form;

form.onsubmit = (ev) => {
  ev.preventDefault();

  const formElements = Array.from(form.elements);

  const patient_data = [];
  formElements.slice(0, 1).forEach((e) => {
    patient_data.push(`${e.name}: ${e.value}`);
  });

  patient_data.push("\n");

  formElements.slice(1, -1).forEach((e, i) => {
    patient_data.push(`${i + 1}) ${e.name}: ${e.value}`);
  });

  window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    patient_data.join("\n")
  )}`;
};
