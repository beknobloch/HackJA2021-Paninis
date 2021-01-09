

// listen for auth status changes and logs them to the console
let thing64;

function parseCSV(csv) {
    let x = csv.split(",");
    for(let i=0; i< x.length; i++){
        x[i]=x[i].toLowerCase().trim()
    }
    return x;
}

function convertToBase64() {
    //Read File
    let selectedFiles = document.getElementById("myFile").files;
    //Check File is not Empty
    if (selectedFiles.length > 0) {
        // Select the very first file from list
        let fileToLoad = selectedFiles[0];
        // FileReader function for read the file.*/
        let fileReader = new FileReader();
        let base64;
        console.log("function");
        // Onload of file read the file content
        fileReader.onload = function(fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            // Print data in console
            console.log(base64);
            thing64 = base64;
        };
        // Convert data to base64
        console.log(fileToLoad);
        fileReader.readAsDataURL(fileToLoad);
        }
    else {
        thing64 = "No resume";
    }
}

auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user)
        setupUI(user);
    } else {
        setupUI();
        console.log('user logged out')
    }
})

// sign up
try{
    const signupForm = document.querySelector('#signup-form');
    const ele = document.getElementsByName('position');
    let pos = "Job Seeker";
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
            pos = ele[i].value;
    } 
    
    convertToBase64();
    signupForm.addEventListener('submit', (e) => {
    // prevent refresh (losing info)
    e.preventDefault();
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const numbersign = signupForm['signup-number'].value;
    docID = signupForm.email.value;
    //let resumeFile = document.getElementById("myFile").files[0];
    console.log(thing64);
    db.collection('users').doc(docID).set({
        name: signupForm.name.value,
        age: signupForm.age.value,
        location: signupForm.location.value,
        field: signupForm.field.value.toLowerCase(),
        skills: parseCSV(signupForm.skills.value),
        email: signupForm.email.value,
        bio: signupForm.bio.value,
        number: numbersign,
        position: pos,
        resume: thing64
    })
    

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })

    auth.onAuthStateChanged(user => {
        db.collection('users').doc(docID).update({
            userID:  "none" || user.uid
        })
    })
})
}
catch (error){
    console.error(error);
}


try{
    // log out
    const logout = document.querySelector('#logout');
    logout.addEventListener('click', (e) => {
    // prevent default actions (refresh)
    e.preventDefault()
    auth.signOut().then(() => {
    //
    })
})
}
catch (error) {
    console.error(error);
}

try{
    //  login
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', (e) => {
    // prevent default actions (refresh)
    e.preventDefault()

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log in user
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // close login modal and reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
})
}
catch (error){
    console.error(error);
}

