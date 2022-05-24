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
function logout(){
    localStorage.removeItem("name");
    window.alert('Account Logout Successfully!');
    
    firebase.auth().signOut();
   
    }
    // Your web app's Firebase configuration
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
firebase.initializeApp(firebaseConfig);
const firestore=firebase.firestore();
var mmail=localStorage['mmail'];
console.log(mmail);
firestore.collection('Users').doc('Manufacturer').collection('Manufacturer').doc(mmail).get().then(function(doc){
var name1= doc.data().name;
localStorage.setItem( 'name',name1 );
console.log(name1);
});
var name1=localStorage['name'];
document.getElementById("manname").innerHTML="Welcome  "+name1;
let medicine=[];
let sno=1;
firestore.collection('medicine').doc('Manufacturer').collection(name1).onSnapshot(function (querySnapshot){
 var content = '';
 querySnapshot.forEach(element => { 
    
            var med = element.data();
            var url="https://api.qrserver.com/v1/create-qr-code/?data="+med.bno+"&amp;size=100x100";
            var mname=med.medname;
            medicine.push(element.data());
           
            content +='<tr>';
            content += '<td>' + sno + '</td>';
            content += '<td>' + med.cname + '</td>';
            content += '<td>' + med.medname + '</td>';
            content += '<td>' + med.dosage + '</td>';
            content += '<td>' + med.bno+ '</td>';
            content += '<td>' + med.mfdate + '</td>';
            content += '<td>' + med.exdate + '</td>';
            content += '<td>' + `<img src="${url}" id="${med.bno}" alt="${med.medname}" alt=""/>`+
                `<button onClick="downloadQR(${med.bno})" class="Qbuton">Download</button>`+ '</td>';
            content += '</tr>';
            sno+=1;
    
 });   
 document.getElementById('tbd').innerHTML=content;
});
console.log(medicine);    
function downloadQR(no) {
    jsonf().then(()=>{
        const web3=new Web3( "HTTP://127.0.0.1:7545");
        var bno=no.toString();
        console.log(bno);
        web3.eth.getAccounts().then(function(accounts){
         var contract = new web3.eth.Contract(contractAbi, contractAddress);
      
    contract.methods.fetchMedicineBufferOne(bno).call(function(err, result) {
        console.log(err, result)
      });
    var name=document.getElementById(no).alt;
   var url= document.getElementById(no).src;
   var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function(){
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(this.response);
    var link = document.createElement('a');
    link.download = 'qr  '+name+'.jpg';
    link.href = imageUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link)
}
xhr.send();});});
}
document.getElementById("myButton").onclick = function () {
    location.href = "mandetails.html";
};
window.addEventListener("load", function() {
    const loader = document.querySelector(".loader");
    // class "loader hidden"
});