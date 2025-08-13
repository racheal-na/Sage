import Button from "../Button";

function LogAndLogout(){
    const isLogedIn = true;
    if(isLogedIn){
        return <Button name="Logout"/>
    }else {
       return <Button name="Login"/>

    }
    }


export default LogAndLogout;
