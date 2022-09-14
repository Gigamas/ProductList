import Product from "./product/Product";
import axios from "axios";
import {useState, useEffect} from 'react';


function Products(props)  {
    const [productsFromDB, setProductsFromDB] = useState([])
        //Getting products frod DB
        useEffect(()=>{
        axios.get('https://jakubrozankiewicz.pl/server/').then(function (response) {setProductsFromDB (response.data);})
    }, [])

        return(
            <div style={{display:'inline-block', margin: '0 50px', minHeight: '70vh'}}>
                {productsFromDB.map(prod => <Product key={prod.SKU} {...prod} setToDelete = {props.setToDelete} unsetToDelete = {props.unsetToDelete}/>)}
            </div>
        );
        }
export default Products;   