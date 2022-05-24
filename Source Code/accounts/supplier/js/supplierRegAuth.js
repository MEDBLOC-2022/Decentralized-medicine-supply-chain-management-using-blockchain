//Initialize Firebase
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

// Initialize Firebase
const db=firebase.initializeApp(firebaseConfig,'db');
const firestore=db.firestore();

//Listen for form Submit 
document.getElementById('supplierform').addEventListener('submit', submitForm);

//Submit Form
function submitForm(e) {
    e.preventDefault();

    //Get Values
    var fname = getInputVal('fname');
    var lname = getInputVal('lname');
    var emailid = getInputVal('emailid');
    var address = getInputVal('address');
    var postalcode = getInputVal('postalcode');
    var medno = getInputVal('medno');
    var phno = getInputVal('phno');
    var govlic = getInputVal('govlic');

    //Save Message 
    saveMessage(fname, lname, emailid,  address, postalcode, medno, phno, govlic);

   
}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(fname, lname, emailid,  address, postalcode, medno, phno, govlic) {
  var name1=fname.toLowerCase();
   var data={
        fname: fname,
        lname: lname,
        emailid: emailid,
        address: address,
        postalcode: postalcode,
        medno: medno,
        phno: phno,
        govlic: govlic
    };

    firestore.collection('Supplier').doc(name1).set(data).then(()=>{
         //Alert Message
    window.alert('Account created !');

    window.location.href="qrcodeupload.html";

    // Clear form
    document.getElementById('supplierform').reset();}
    ).catch((error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode,errorMessage);
    });    
}