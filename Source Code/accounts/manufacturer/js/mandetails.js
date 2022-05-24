//const Web3 = require("web3");
//const configuration =require('../../../build/contracts/main.json');

//usage:
const request='../../../build/contracts/main.json';

let contractAddress;
let contractAbi;
async function jsonf(){
  let configuration;
  const res=await fetch(request);
  const json=await res.json();
  configuration= json;
  contractAddress = configuration.networks['5777'].address; // Add Your Contract address here!!!
  // Set the Contract
  contractAbi =configuration.abi;

}




//Initiate Firebase
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
  firebase.initializeApp(firebaseConfig);
  const firestore=firebase.firestore();
  
  //Listen for form Submit 
  document.getElementById('medicineform').addEventListener('submit', submitForm);
  
  //Submit Form
  function submitForm(e) {
      e.preventDefault();
  
      //Get Values
      var cname = getInputVal('cname');
      var medname = getInputVal('medname');
      var dosage = getInputVal('dosage');
      var bno = getInputVal('bno');
      var mfdate = getInputVal('mfdate');
      var exdate= getInputVal('exdate');
  
      //Save Message 
      saveMessage(cname,medname,dosage,bno,mfdate,exdate);
  
     
  }
  
  // Function to get get form values
  function getInputVal(id) {
      return document.getElementById(id).value;
  }

  // Save message to firebase
  function saveMessage(cname,medname,dosage,bno,mfdate,exdate) {
    var name1=localStorage['name'];
     var data={
         cname:cname,
         medname:medname,
         dosage:dosage,
         bno:bno,
         mfdate:mfdate,
         exdate:exdate,
        'status':'Not Verified',
        'mname':name1,
      };
     
      jsonf().then(()=>{
      const web3=new Web3( "HTTP://127.0.0.1:7545");
      web3.eth.getAccounts().then(function(accounts){
       var contract = new web3.eth.Contract(contractAbi, contractAddress);
         var medicineState = 0    
            var account = accounts[0];
            console.log('Account: ' + account);
            web3.eth.defaultAccount = account;
            contract.methods.makeMedicine(bno, medname, dosage, accounts[1], accounts[0],cname, mfdate, exdate,  medicineState).send({
                from: account,
                gas: '1000000'
            });
            
        });
   
    
      });
      firestore.collection("medicine").doc('Manufacturer').collection(name1).doc(bno).set(data).then(()=>{
           //Alert Message
      window.alert('Medicine Added !');
  
     window.location.href="../html/manpro.html";
     
      // Clear form
      document.getElementById('medicinedetails').reset();
    }
      ).catch((error)=>{
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode,errorMessage);
      });    
  }