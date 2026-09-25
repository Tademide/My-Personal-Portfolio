// Contact page — client-side form validation.
// Checks: no empty fields, valid email format, phone contains digits only.

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    message: document.getElementById('message')
  };

  var success = document.getElementById('form-success');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phonePattern = /^[0-9]+$/;

  function setError(fieldName, message) {
    var field = fields[fieldName];
    var errorEl = document.getElementById(fieldName + '-error');
    var wrapper = field.closest('.field');
    if (message) {
      wrapper.classList.add('invalid');
      errorEl.textContent = message;
    } else {
      wrapper.classList.remove('invalid');
      errorEl.textContent = '';
    }
  }

  function validate() {
    var isValid = true;

    ['name', 'email', 'phone', 'message'].forEach(function (key) {
      if (fields[key].value.trim() === '') {
        setError(key, 'This field cannot be empty.');
        isValid = false;
      } else {
        setError(key, '');
      }
    });

    var emailVal = fields.email.value.trim();
    if (emailVal !== '' && !emailPattern.test(emailVal)) {
      setError('email', 'Enter a valid email address (e.g. name@example.com).');
      isValid = false;
    }

    var phoneVal = fields.phone.value.trim();
    if (phoneVal !== '' && !phonePattern.test(phoneVal)) {
      setError('phone', 'Phone number must contain digits only.');
      isValid = false;
    }

    return isValid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    success.classList.remove('show');

    if (validate()) {
      success.textContent = 'Thanks, ' + fields.name.value.trim() + ' — your message has been received.';
      success.classList.add('show');
      form.reset();
    } else {
      success.classList.remove('show');
    }
  });

  // Clear a field's error as soon as the user starts fixing it.
  Object.keys(fields).forEach(function (key) {
    fields[key].addEventListener('input', function () {
      if (fields[key].value.trim() !== '') setError(key, '');
    });
  });
});
