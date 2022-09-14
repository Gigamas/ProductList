import Menu from "./menu/Menu";

function AddHeader(props)
{
   return <div className="row" style={{margin:'10px 40px 50px 40px', minHeight: '10vh'}}>
        <h1 className="col-8" style={{marginLeft:'40px'}}>Add Product </h1>
        <Menu  className="col-4"  error = {props.error}/>
        <hr/>
    </div>
}
export default AddHeader;