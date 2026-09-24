function Card(props){
    return(
        <div style={{backgroundColor:props.clr}} className="border rounded-md flex-grow text-center p-10">
            <h1 className="text-3xl">{props.title}</h1>
            <p>{props.content}</p>
        </div>
    )
}
export default Card;