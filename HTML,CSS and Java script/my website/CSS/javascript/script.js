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