const emailObject = document.getElementById('email');
const nameObject = document.getElementById('name');
const ageObject = document.getElementById('age');
const fieldObject = document.getElementById('field');
const skillsObject = document.getElementById('skills');
const bioObject = document.getElementById('bio');
const numObject = document.getElementById('number');
const locObject = document.getElementById('location');
const form = document.querySelector("#accountForm");
const resumeElement = document.getElementById('embedDiv');

auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user)
        displayAccount(user);
    }
    else {
        displayAccount();
        console.log('user logged out')
    }
})

function displayAccount(user)
{
    if (user)
    {
        db.collection('users').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                
                if (doc.data().email == user.email){
                    emailObject.innerText = doc.data().email;
                    nameObject.value = doc.data().name;
                    ageObject.value = doc.data().age;
                    fieldObject.value = doc.data().field;
                    skillsObject.value = doc.data().skills;
                    bioObject.value = doc.data().bio;
                    numObject.value = doc.data().number;
                    locObject.value = doc.data().location;

                    function urltoFile(url, filename, mimeType){
                        return (fetch(url)
                            .then(function(res){return res.arrayBuffer();})
                            .then(function(buf){return new File([buf], filename,{type:mimeType});})
                        );
                    }

                    urltoFile(d.resume, 'resume.pdf','application/pdf')
                    .then(
                        function(file){ 
                            console.log(file);

                            resumeElement.innerHTML = "<embed src=\"" + URL.createObjectURL(file) + "\" width=\"800px\" height=\"800px\">"
                        }
                    )
                }

            })
        })
    }
    else {

    }
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log('user logged in: ', user)
            updateAccount(user);
            thisUser = user;
        }
        else {
            updateAccount();
            console.log('user logged out')
        }
    })
    
})

function updateAccount(user){
    if (user)
    {   
        db.collection('users').doc(user.email).set({
            name: form.name.value,
            age: form.age.value,
            location: form.location.value,
            field: form.field.value.toLowerCase(),
            skills: parseCSV(form.skills.value),
            bio: form.bio.value,
            email: user.email,
            number: form.number.value,
        }).then( function() { document.location.href = "index.html" })
    }
    else {

    }    
}