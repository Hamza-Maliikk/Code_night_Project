// For signup validation
const submitBtn = document.getElementById('submit_btn')

submitBtn.addEventListener('click', (e)=>{
    e.preventDefault()

    const name = document.getElementById('name').value.trim()
    const email = document.getElementById('email').value.trim()
    const password = document.getElementById('password').value.trim()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!name || !email || !password){
        alert('All fields required')
        return
    }
    if(!emailRegex.test(email)){
        alert("Enter valid email")
        return 
    }
    if(!passwordRegex.test(password) || password.length < 8 ){
        alert('Enter valid password')
        return  
    }


    const userData={
        name,
        email,
        password
    }

    localStorage.setItem('user',JSON.stringify(userData))
    window.location.href = '../pages/login.html'
})


// For Login Form

 