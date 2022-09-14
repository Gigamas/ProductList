import { Link } from "react-router-dom";
import axios from 'axios';

function Menu(props)
{
   
    
    return(
        <div style={{display:'block', width:'300px', marginTop:'10px', marginLeft:'auto'}}>
            <Link to = {'/addproduct'}>
            <button className="btn btn-primary" style={{marginRight:'10px'}} >ADD</button>
            </Link>
            <button className="btn btn-primary" onClick={props.onDelete}>MASS DELETE</button>
        </div>
    )
}
export default Menu;