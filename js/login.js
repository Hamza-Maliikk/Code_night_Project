

const LoginBtn = document.getElementById('login_btn')

LoginBtn.addEventListener('click', (e)=>{
    e.preventDefault()

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if(!email || !password){
        alert('Enter Both fields')
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
    alert("Enter valid email");
    return;
  }

  // Password check
  if (localPassword !== password) {
    alert("Enter valid password");
    return;
  }

    window.location.replace('./feed.html')


})