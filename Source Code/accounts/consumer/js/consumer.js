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
var content = '';
firebase.initializeApp(firebaseConfig);
const firestore=firebase.firestore();
var comail=localStorage['comail'];
console.log(comail);
let sno=1;
firestore.collection('Users').doc('Consumer').collection('Consumer').doc(comail).get().then(function(doc){
var name1= doc.data().name;
localStorage.setItem( 'name',name1 );
console.log(name1);
document.getElementById("sname").innerHTML="Welcome  "+name1;
});
var name1=localStorage['name'];
function val() {
var item = document.getElementById("content").innerText;
if(item===""){
  alert("Please upload QR code once again!!!!");
}
else{
document.getElementById("scan").value = item;
const no=document.getElementById('content').innerText;
jsonf().then(()=>{
  const web3=new Web3( "HTTP://127.0.0.1:7545");
  web3.eth.getAccounts().then(function(accounts){
   var contract = new web3.eth.Contract(contractAbi, contractAddress);   
        var account = accounts[0];
        console.log('Account: ' + account);
        web3.eth.defaultAccount = account;
        contract.methods.fetchMedicineBufferTwo(no).call(function(err, result) {
          console.log(err, result)
          if (result[0] == "") {
          alert("QR NOT FOUND please check the medicine");}
            else{
              firestore.collection('vMedicine').doc(no).get().then(function(doc){
                var med = doc.data(); 
                console.log(med);        
                content +='<tr>';
                content += '<td>' + sno + '</td>';
                content += '<td>' + med.cname + '</td>';
                content += '<td>' + med.medname + '</td>';
                content += '<td>' + med.dosage + '</td>';
                content += '<td>' + med.bno+ '</td>';
                content += '<td>' + med.mfdate + '</td>';
                content += '<td>' + med.exdate + '</td>';
                content += '<td>' +med.sname+ '</td>';
                content += '<td>' +med.status+ '</td>';
                content += '</tr>';
                document.getElementById('tbd').innerHTML=content;
                sno+=1;
            });
            contract.methods.receiveMedicine(no).send({from:account,gas: '1000000'});
            contract.methods.fetchMedicineBufferThree(no).call(function(err, result) {
             console.log(err, result)
             if (result[0] == "") {
           console.log('QR NOT FOUND');
     
             } else {
               console.log('QR:'+result);
             }
     
           });     
            }
        });
    });
});
}
}
function logout(){
  localStorage.removeItem("name");
  window.alert('Account Logout Successfully!');
  firebase.auth().signOut(); 
  }
