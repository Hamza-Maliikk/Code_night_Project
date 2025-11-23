// For signup validation
const submitBtn = document.getElementById('submit_btn')

submitBtn.addEventListener('click', (e)=>{
    e.preventDefault()

    const name = document.getElementById('name').value.trim()
    const email = document.getElementById('email').value.trim()
    const password = document.getElementById('password').value.trim()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const fullName = document.getElementById('full_name')
    const fullEmail = document.getElementById('full_email')
    const fullPassword = document.getElementById('full_password')

    if(!name || !email || !password){
        Swal.fire({
        icon: "error",
        text: "All fields required"});
        return
    }
    if(!emailRegex.test(email)){
        fullEmail.innerText = `Enter valid email`
        return 
    }
    if(!passwordRegex.test(password) || password.length < 8 ){
        fullPassword.innerText = `Enter valid password`
        return  
    }


    const userData={
        name,
        email,
        password
    }


    localStorage.setItem('user',JSON.stringify(userData))
    Swal.fire({
  title: "Good job!",
  text: "You have successfully Signup",
  icon: "success"
}).then(()=>{
    window.location.href = '../pages/login.html'
});
    
});



 