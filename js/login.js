

const LoginBtn = document.getElementById('login_btn')

LoginBtn.addEventListener('click', (e)=>{
    e.preventDefault()

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const loginEmail = document.getElementById('login_email')
    const loginPassword  = document.getElementById('login_password')

    if(!email || !password){
         Swal.fire({
        icon: "error",
        text: "All fields required"});
        return
    }
    // check data in Local storage
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
    alert("No user found — please signup first");
    return;
  }

  const localEmail = user.email;
  const localPassword = user.password;

  // Email check
  if (localEmail !== email) {
    loginEmail.innerText = `Enter valid email`
    return;
  }

  // Password check
  if (localPassword !== password) {
    loginPassword.innerText = `Enter valid password`;
    return;
  }

    window.location.replace('./feed.html')


})