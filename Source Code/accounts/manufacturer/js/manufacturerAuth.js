const firebaseConfig1 = {
    apiKey: "AIzaSyDle6gwfaPenj_BJXh1EYssxUSVQbopMqI",
    authDomain: "manufacturer-d0533.firebaseapp.com",
    databaseURL: "https://manufacturer-d0533-default-rtdb.firebaseio.com",
    projectId: "manufacturer-d0533",
    storageBucket: "manufacturer-d0533.appspot.com",
    messagingSenderId: "960613147540",
    appId: "1:960613147540:web:2aefea7f9e9fb9edee6581",
    measurementId: "G-WCQLRS6SC6"
};
const signin=firebase.initializeApp(firebaseConfig1,'signin'); 
const auth = signin.auth();

const firebaseConfig = {
    apiKey: "AIzaSyDcrsnE5aYzx2bNGVlVAoIYHN30sAkQS9U",
    authDomain: "medbloc-project2022.firebaseapp.com",
    databaseURL: "https://medbloc-project2022-default-rtdb.firebaseio.com",
    projectId: "medbloc-project2022",
    storageBucket: "medbloc-project2022.appspot.com",
    messagingSenderId: "266229450148",
    appId: "1:266229450148:web:4d1a3483c318811b92ed31",
    measurementId: "G-QN4W6V4E8Q"
  };
const db=firebase.initializeApp(firebaseConfig,'db');  
const firestore=db.firestore();
const signupForm = document.querySelector('#sign-up-form');
signupForm.addEventListener('submit',(e) => {
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
    auth.createUserWithEmailAndPassword(email,password)
    .then(cred => {
        console.log(cred.user);
        localStorage.setItem( 'mmail', email );
        firestore.collection("Users").doc('Manufacturer').collection('Manufacturer').doc(email).set(data).then(()=>{
            window.alert("Account Created Sucessfully!!");
            const modal = document.querySelector('#sign-up'); 
            window.location.href="html/manufacturerReg.html";
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
    
    })
});


const signinForm = document.querySelector('#signin-form');
signinForm.addEventListener('submit',(e) => {
    e.preventDefault();
    
    //get user info 
    const email = signinForm['signin-email'].value;
    const password = signinForm['signin-password'].value;
   
    //sign up the user 
    auth.signInWithEmailAndPassword(email,password)
    .then(cred =>{
        console.log(cred.user); 
        localStorage.setItem( 'mmail', email );
        window.alert("Logged In successfully!!");
        const modal = document.querySelector('#sign-in');  
        window.location.href="html/manpro.html";
    })
    .catch((error) => {
        var errorCode = error.code; 
        var errorMessage = error.message; 
        window.alert(errorMessage);
        signinForm.reset();
    })
});