// script.js
async function sendOTP() {
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const age = document.getElementById('age').value;

  const response = await fetch('/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, phone, firstName, lastName, age })
  });
  const result = await response.json();

  if (result.success) {
      document.getElementById('otpForm').style.display = 'block';
      document.getElementById('loginForm').style.display = 'none';
      document.getElementById('message').innerText = "OTP sent to your email.";
  } else {
      document.getElementById('message').innerText = result.message;
  }
}

async function verifyOTP() {
  const email = document.getElementById('email').value;
  const otp = document.getElementById('otp').value;

  const response = await fetch('/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
  });
  const result = await response.json();

  if (result.success) {
    window.location.href = 'home.html';
  } else {
      document.getElementById('message').innerText = "Invalid OTP. Please try again.";
  }
}
