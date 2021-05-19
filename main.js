var date, regNameEle;

(() => {
  window.onload = () => {
    date = document.getElementById("date");
    regNameEle = document.getElementById('registered-by');

    const regName = localStorage.getItem('register-name');
    if (regName)
      regNameEle.value = regName;

    const dt = new Date();
    const hrs = 1 + ((dt.getHours() + 11) % 12);
    const hours = (hrs < 10 ? '0' : '') + hrs;
    const minutes = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
    date.value = dt.toISOString().substr(0, 10) + " " + hours + ":" + minutes + " " + (dt.getHours() < 12 ? "AM" : "PM");
  }
})();

const form = document.forms.patient_form;

form.onsubmit = (ev) => {
  ev.preventDefault();

  localStorage.setItem('register-name', regNameEle.value);

  const formElements = Array.from(form.elements);

  const patient_data = [];
  formElements.slice(0, -3).forEach((e, i) => {
    patient_data.push(`${i + 1}) ${e.name}: ${e.value}`);
  });

  patient_data.push('\n');

  formElements.slice(-3, -1).forEach((e, i) => {
    patient_data.push(`${e.name}: ${e.value}`);
  });

  window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    patient_data.join("\n")
  )}`;
};
