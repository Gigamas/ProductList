import { Link } from "react-router-dom" 

function Menu(props)
{  
    
    return(
        <div style={{display:'block', width:'300px', marginTop:'10px', marginLeft:'auto'}}>
                <button className="btn btn-primary" style={{marginRight:'10px'}} form='product_form' type="submit" >Save</button>
            <Link to = {'/'}>
                <button className="btn btn-primary" >Cancel</button>
            </Link>
        </div>
    )
}
export default Menu;