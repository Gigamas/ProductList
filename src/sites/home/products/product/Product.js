import {useState} from 'react'

function Product (props){


    //Chaanging status to delete
    const [check, setCheck] = useState(false)
    const toggleStatus = ()=>{
        setCheck(!check)
     if(check === false){
        props.setToDelete(props.SKU)} else {
            props.unsetToDelete(props.SKU)
        }
    }

    return(
        <form action="" style = {{ display:'inline-block'}}>
            <div style = {{width: 'auto', minWidth:'250px', padding:'10px', border: '2px solid', margin:'10px'}}>
                <input type='checkbox' className="delete-checkbox"  value={check} onChange = {toggleStatus}/>
                
                <div style={{margin:'0 30px'}}>
                    <p>SKU: {props.SKU}</p>
                    <p>Name: {props.Name}</p>
                    <p>Price: {props.Price} $</p>
                    {(props.Size != 0 && props.Size != null)? (<p>Size: {props.Size} MB</p>):(<></>)}
                    {(props.Weight != 0 && props.Weight != null) ? (<p>Weight: {props.Weight} KG</p>):(<></>)}
                    {(props.Height != 0 && props.Height != null) ? (<><p>Dimension: {props.Height} x {props.Width} x {props.Length}</p></>):(<></>)}

                    
                </div>
            </div>
        </form>
    )
}
export default Product;