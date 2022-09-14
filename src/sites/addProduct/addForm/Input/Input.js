export default function Input(props) {
    return <div className= {`row ${props.className}`} >
            <label className="col-3 "> {props.label} </label>
            <input className='col-9  rounded'  type={props.type} id={props.name.toLowerCase()} name={props.name} value={props.value} onChange ={props.setHandler} />
            <div className='invalid-feedback'>Cannot be empty</div>
         </div>
}