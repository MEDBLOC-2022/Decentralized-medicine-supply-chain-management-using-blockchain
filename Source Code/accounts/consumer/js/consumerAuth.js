const firebaseConfig = {
apiKey: "AIzaSyASs24zLrrud1mqqTsGpYSM074F4iLHDAw",
authDomain: "consumer-medbloc.firebaseapp.com",
projectId: "consumer-medbloc",
storageBucket: "consumer-medbloc.appspot.com",
messagingSenderId: "1001329348664",
appId: "1:1001329348664:web:370b5fe2ac9317395b56cd",
measurementId: "G-ZPN6HNGXL9"
};

const firebaseConfig1 = {
    apiKey: "AIzaSyDcrsnE5aYzx2bNGVlVAoIYHN30sAkQS9U",
    authDomain: "medbloc-project2022.firebaseapp.com",
    databaseURL: "https://medbloc-project2022-default-rtdb.firebaseio.com",
    projectId: "medbloc-project2022",
    storageBucket: "medbloc-project2022.appspot.com",
    messagingSenderId: "266229450148",
    appId: "1:266229450148:web:4d1a3483c318811b92ed31",
    measurementId: "G-QN4W6V4E8Q"
  };
// Initialize Firebase
const signins=firebase.initializeApp(firebaseConfig,'signin');
const db=firebase.initializeApp(firebaseConfig1,'db');
///make auth references 
const auth = signins.auth();
const firestore=db.firestore();

const signupForm = document.querySelector('#sign-up-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info 
    const name=signupForm['signup-name'].value;
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    var data = {
        name: name,
        mail:email,
        pass:password
    } ;

    //sign up the user
    auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
            console.log(cred.user);
            localStorage.setItem('comail',email);
            firestore.collection("Users").doc('Consumer').collection('Consumer').doc(email).set(data).then(()=>{
                window.alert("Account Created Sucessfully!!");
                const modal = document.querySelector('#sign-up');
                window.location.href = "consumer.html";
            }).catch((error)=>{
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode,errorMessage);
            });     
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorMessage); 
            signupForm.reset();
            console.log(errorCode,errorMessage);
        });
});


const signinForm = document.querySelector('#signin-form');
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info 
    const email = signinForm['signin-email'].value;
    const password = signinForm['signin-password'].value;

    //sign up the user 
    auth.signInWithEmailAndPassword(email, password)
        .then(cred => {
            console.log(cred.user);
            localStorage.setItem('comail',email);
            window.alert("Logged In successfully!!");
            const modal = document.querySelector('#sign-in');
            window.location.href = "consumer.html";
        })
        .catch((error) => {
         var errorCode = error.code; 
        var errorMessage = error.message; 
        console.log(errorCode,errorMessage);
        window.alert(errorMessage);
        signinForm.reset();
        });
});