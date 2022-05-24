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
const db=firebase.initializeApp(firebaseConfig1,'db');
const firebaseConfig = {
    apiKey: "AIzaSyA5wOo7QS6bESWbt9VLkVEnZxMBr26o77g",
    authDomain: "supplier-medbloc.firebaseapp.com",
    databaseURL: "https://supplier-medbloc-default-rtdb.firebaseio.com",
    projectId: "supplier-medbloc",
    storageBucket: "supplier-medbloc.appspot.com",
    messagingSenderId: "571196897631",
    appId: "1:571196897631:web:839b5d66f224ee00a29eea",
    measurementId: "G-M4CXG3K9D8"
  };
const signins=firebase.initializeApp(firebaseConfig,'signin');
//make auth reference 
const auth = signins.auth();

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
    .then(cred =>{
        console.log(cred.user); 
        localStorage.setItem( 'mmail', email );
        firestore.collection("Users").doc('Supplier').collection('Supplier').doc(email).set(data).then(()=>{
            window.alert("Account Created Sucessfully!!");
            const modal = document.querySelector('#sign-up'); 
            window.location.href="html/supplierReg.html";
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
        localStorage.setItem( 'mmail', email );
        console.log(cred.user); 
        window.alert("Logged In successfully!!");
        const modal = document.querySelector('#sign-in');  
        window.location.href="html/qrcodeupload.html";
    })
    .catch((error) => {
        var errorCode = error.code; 
        var errorMessage = error.message; 
        console.log(errorCode,errorMessage);
        window.alert(errorMessage);
        signinForm.reset();
    })
});