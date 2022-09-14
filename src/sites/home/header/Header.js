import Menu from "./menu/Menu";

function Header(props)
{
   return <div className="row" style={{margin:'10px 40px 50px 40px', minHeight: '10vh'}}>
        <h1 className="col-8" style={{marginLeft:'40px'}}>Product list</h1>
        <Menu  className="col-4"  onDelete={props.onDelete}/>
        <hr/>
    </div>
}
export default Header;