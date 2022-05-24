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
var mmail=localStorage['mmail'];
console.log(mmail);
let mmap=[];
var uname=[];
let sno=1;
firestore.collection('Users').doc('Supplier').collection('Supplier').doc(mmail).get().then(function(doc){
var name1= doc.data().name;
localStorage.setItem( 'name',name1 );
console.log(name1);
document.getElementById("sname").innerHTML="Welcome  "+name1;
});

var name1=localStorage['name'];
firestore.collection('medicine').doc('Supplier').collection(name1).onSnapshot(function(querySnapshot){
    querySnapshot.forEach(element => { 
    var med = element.data(); 
    console.log(med);        
    content +='<tr>';
    content += '<td>' + sno + '</td>';
    content += '<td>' + med.cname + '</td>';
    content += '<td>' + med.medname + '</td>';
    content += '<td>' + med.dosage + '</td>';
    content += '<td>' + med.bno+ '</td>';
    content += '<td>' + med.mfdate + '</td>';
    content += '<td>' + med.exdate + '</td>';
    content += '<td>' + ` Verified `+ '</td>';
    content += '</tr>';
    sno+=1
});
document.getElementById('tbd').innerHTML=content;
});

if(uname.length!=0){
        uname=[]
}
firestore.collection('Users').doc('Manufacturer').collection('Manufacturer').onSnapshot(function (querySnapshot){
querySnapshot.docs.forEach(element => {    
 var users = element.data()['name'];
uname.push(users.toString().toLowerCase());
});
});


function srch(){

var manname=document.getElementById('getman').value;
var manf=manname.toString().toLowerCase().trim();
console.log(uname);
if(uname.includes(manf)){
    document.getElementById('showsrch').innerText="Manufacturer Found!";
}
else{
    console.log(true)
    document.getElementById('showsrch').innerText="Manufacturer Not Found!"
}
console.log(uname.length,manname);
localStorage.setItem( 'mname',manname );
}
function val() {
var bno=document.getElementById("content").innerText;
localStorage.setItem('bno',bno);
var item = document.getElementById("content").innerText;
document.getElementById("scan").value = item;
var mname1=localStorage['mname'];
console.log(mname1,bno)
if(mmap.length>1){
    mmap=[];
}
if(bno===""){
    window.alert("Please Upload QR Code once again !!!");
}
else{
firestore.collection('medicine').doc('Manufacturer').collection(mname1).doc(bno).get().then(function(doc){
    var med = doc.data(); 
    mmap.push(med);
    console.log(mmap);
    console.log(med);        
    content +='<tr>';
    content += '<td>' + sno + '</td>';
    content += '<td>' + med.cname + '</td>';
    content += '<td>' + med.medname + '</td>';
    content += '<td>' + med.dosage + '</td>';
    content += '<td>' + med.bno+ '</td>';
    content += '<td>' + med.mfdate + '</td>';
    content += '<td>' + med.exdate + '</td>';
    content += '<td id="checkstatus">' + `Not Verified  <button onClick="verifys()">verify</button>`+ '</td>';
    content += '</tr>';
    document.getElementById('tbd').innerHTML=content;
    sno+=1;
}).catch((error)=>{
    window.alert('Invalid QR NOT FOUND Contact manufacturer '+mname1);
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode,errorMessage);
});;
}
}

function verifys(){
    med=mmap[0];
    var mname1=localStorage['mname'];
    document.getElementById('checkstatus').innerHTML="Verified"
    var name1=localStorage['name'];
    var bno=localStorage['bno'];
    jsonf().then(()=>{
        const web3=new Web3( "HTTP://127.0.0.1:7545");
        web3.eth.getAccounts().then(function(accounts){
         var contract = new web3.eth.Contract(contractAbi, contractAddress);
            medicineState = 1     
              var account = accounts[0];
              console.log('Account: ' + account);
              web3.eth.defaultAccount = account;
       
        console.log(med);
        med['sname']=name1;
        med['status']='Verified';
        console.log(med);
    contract.methods.fetchMedicineBufferOne(bno).call(function(err, result) {
        console.log(err, result)
        if((err!=null)||(result[0] == "")) {
           alert('Invalid QR NOT FOUND Contact manufacturer '+mname1);
        } else {
            contract.methods.packMedicine(bno, result.medicineName, result.dosage, result.originManufacturerID, result.ownerID, result.FactoryName, result.mfgdate, result.expdate, 1,accounts[2]).send({
                from: account,
                gas: '1000000'
            });
            
            firestore.collection('medicine').doc('Supplier').collection(name1).doc(bno).set(med).then(()=>{})
            firestore.collection('vMedicine').doc(bno).set(med).then(()=>{
                window.alert('Verified!');
            }).catch((error)=>{
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode,errorMessage);
            });
        }

    });
    });
    });
  

}

  
function logout(){
    localStorage.removeItem("name");
    window.alert('Account Logout Successfully!');
    firebase.auth().signOut(); 
    }
 


  
  