var date, regNameEle, formTitle = null;

(() => {
  window.onload = () => {
    date = document.getElementById("date");
    regNameEle = document.getElementById('registered-by');
    titleEle = document.getElementById('form-title');

    if (titleEle) formTitle = titleEle.innerText;

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

  const patientData = ["Generated from http://covid-data-collection.netlify.com/", ""];
  if (formTitle !== null) {
    patientData.push("*" + formTitle + "*");
    patientData.push("");
  }

  formElements.slice(0, -3).forEach((e, i) => {
    var line = `${i + 1}) ${e.name}: ${e.value}`;
    if (e.dataset.type === "phone" && e.value && e.value.length === 10) line += `\n(💬: https://wa.me/91${e.value})`;
    patientData.push(line);
  });

  patientData.push('');

  formElements.slice(-3, -1).forEach((e, i) => {
    patientData.push(`${e.name}: ${e.value}`);
  });

  window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    patientData.join("\n")
  )}`;
};
