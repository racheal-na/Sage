let bulbs= "off";
const newDiv= document.createElement("h1")
// document.getElementById("btclick").addEventListener("click",inserHTML)
$('#btclick').click(inserHTML)

$('#box').css("background-color","orange").css("color","white")
.css("width","300px")
.css("height","auto")
.slideUp(2000)
// .slideDown(2000)
// .slideDown(1000)
// $('#box').slideUP(100)
// $('#box').slideDown(100)


// $('#box').addClass("highlight");
// $('#box').removeClass("hidden");
function inserHTML(){
    document.getElementById("Change me").style.fontSize="35px";
    document.getElementById("Change me").style.color="red";
    newDiv.innerText= "added element";
    document.body.appendChild(newDiv);
}
function InsertHTML(){
document.getElementById("change me").InnerHTML="<h1 style='color: red;'>Hello </h1>"
}
function turnOn(){
    document.getElementById("bulb").src="bulbon.gif"
    bulb=true
}
function turnoff(){
    document.getElementById("bulb").src="bulboff.gif"
    bulb=false
}
let bulb=false

function turntoggle(){
    if(bulb==true){
    document.getElementById("bulb").src="bulboff.gif"
    bulb=false
    }else{
        document.getElementById("bulb").src="bulbon.gif"
    bulb=true

    }
}
const person= {
firstName:"rachel",
lastName: "Berhane",
age: 23,
height: 1.6,
address: {
    country:"Ethiopia",
    city:"A.A",
    subCity:"Arada",
    woreda: "16",
},
job: "student",
array: [2,3,4,5,6],
fullName: function(){
    return this.firstName + " " +this.lastName
},
}
const array =[
    {name:"estif",age: 25},
    {name:"rahel",age: 23},
    {name:"tsiyon",age: 22},
    {name:"naol",age: 19},
    {name:"abel",age: 24},
]
console.log("array of objects"+ " "+ array[0].name)
console.log("array of objects"+ " "+ array[1].name + " "+array[2].name)
console.log("firstName:"+person.firstName);
console.log("address" + JSON.stringify(person.address));
console.log("array:"+person.array)


const name= " rachel "
console.log("string:" + name.toUpperCase());
console.log("string:" + name.trim());
console.log("string:" + name.trim().length);

const marks=["ere",23,{name:"estif"}]
// marks.push(100)
// marks.pop
const array2 = []
marks.map((mark)=>{
if(mark!="ere") array.push(mark)
})
console.log("array:", marks);

const date= new Date(2025,13,28);
console.log("date",date)
console.log("date: ",date.getMonth())
console.log("date: ",date.getFullYear())

const today = new Date(2025,10,16)
const d = new Date(2025,7,24)
if(d>today){
    text="d is before November 16,2025.";
}
else{
    text="d is after November 16,2025."
}
console.log(text);

(10>20)?console.log("true"):console.log("false")


let x

console.log(x??"the value of x is undefine")

// let student=89
//  if(student>=85){
//     console.log("very Good")
//  }else if(studentMark>85)&&(studentMark>50){
//     console.log("GOOd!")
//  }else{
//     console.log("Bad")
//  }
let day=5
 switch (date) {
    case 1:

        console.log("sunday");
        break;
    case 2:
    console.log("monady");
         break;
    case 3:
    console.log("tuesday");
      break;   
    default:
        console.log("day is not found");
        break;

 }

 for (let i=0; i<5; i++){
    console.log(i)
 }
 let books=["heary poter","love up to death","me and u","the power"]
 for(let book of books){
     console.log(book)
 }
 for(let key in person){
    console.log(key,person[key])
 }

const arr=["apple","peach","pear"]
for(i=0; i<10; i++){
    console.log(i)
}




