const emailElement = document.getElementById('email');
const nameElement = document.getElementById('name');
const ageElement = document.getElementById('age');
const locElement = document.getElementById('location');
const fieldElement = document.getElementById('field');
const skillsElement = document.getElementById('skills');
const bioElement = document.getElementById('bio');
const posElement = document.getElementById('pos');
const resumeElement = document.getElementById('embedDiv');



auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user)
        runOtherAccount(user);
    } else {
        runOtherAccount();
        console.log('user logged out')
    }
});

function runOtherAccount(user)
{
    if (user)
    {
        try{
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const other = urlParams.get('other');
            
            db.collection('users').where('email', '==', other).get().then(
                function (snapshot) {
                    snapshot.forEach(
                        function (doc) {
                            d = doc.data()
                            emailElement.innerHTML = d.email;
                            nameElement.innerHTML = d.name;
                            ageElement.innerHTML = d.age;
                            locElement.innerHTML = d.location;
                            fieldElement.innerHTML = d.field;
                            skillsElement.innerHTML = d.skills;
                            bioElement.innerHTML = d.bio;
                            posElement.innerHTML = d.position;

                            function urltoFile(url, filename, mimeType){
                                return (fetch(url)
                                    .then(function(res){return res.arrayBuffer();})
                                    .then(function(buf){return new File([buf], filename,{type:mimeType});})
                                );
                            }

                            if(d.resume !== "No resume"){
                                urltoFile(d.resume, 'resume.pdf','application/pdf')
                                .then(
                                    function(file){ 
                                        console.log(file);
    
                                        resumeElement.innerHTML = "<embed src=\"" + URL.createObjectURL(file) + "\" width=\"800px\" height=\"800px\">"
                                    }
                                )
                            } else {
                                resumeElement.innerHTML = "<p>No resume uploaded.</p>";
                            }
                            

                        }
                    )
                }
            )
        }
        catch(error){
            console.log(error);
        }
    }
    else
    {

    }
}