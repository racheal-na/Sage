function ReactList(){
    const cars = ["BYD","TOYOTA","BYM","HUNDA","BYD"];
    return(
        <ul>
            {cars.map((car,index)=>(<li key={index}>car</li>))}
        </ul>
    );
}
export default ReactList