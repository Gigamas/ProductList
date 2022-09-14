import React, { useState, useEffect } from 'react'
import Input from './Input/Input'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

let propProduct={
    SKU: '',
    Name: '',
    Price: '',
    Units: []
}

function AddForm(props) {
    let navigate = useNavigate(); 
    const [productType, setProductType] = useState('')
    const [newProduct, setNewProduct] = useState(propProduct)
    const [alert, setAlert] = useState('')
    const [error, setError] = useState(true)

    //Changing values in newProduct
    const setHandler = (event) =>{
            setNewProduct({
                ...newProduct,
                [event.target.name]: event.target.value
            })
    }

    //Changing values in newProduct.Units
    const setUnitsHandler = (event) =>{
        setNewProduct({
            ...newProduct, 
            Units: [...newProduct.Units.filter(x => x.name != event.target.name), 
            {name: event.target.name, [event.target.name]: event.target.value}]
        })
    }
    //Options for Select
    const options = [
        { value: '', label: '' },
        { value: 'DVD', label: 'DVD' },
        { value: 'Book', label: 'Book' },
        { value: 'Furniture', label: 'Furniture' }
    ]
        // clearing newProduct Units
    useEffect(()=>{
        setNewProduct({
            ...newProduct,
            Units: []
        })
    }, [productType])

    //checking inputs
    const unitsFilter = () =>{
        let counter = 0;
        counter = Object.values(newProduct.Units).filter(x => x.Size == '').length +
        Object.values(newProduct.Units).filter(x => x.Weight == '').length +
        Object.values(newProduct.Units).filter(x => x.Height == '').length +
        Object.values(newProduct.Units).filter(x => x.Width == '').length +
        Object.values(newProduct.Units).filter(x => x.Length == '').length
        return counter
    }
     useEffect(()=>{
        setError(() =>{
            if((Object.values(newProduct).filter(x=>!x).length || (productType.value === 'Furniture'? newProduct.Units.length < 3 : !newProduct.Units.length) || unitsFilter()) === 0){
                return false}else {
                    return true}
            })
    })

    //taking out values from newProduct.Units
    const takingOut = name =>{
        let prop = Object.values(newProduct.Units.filter(x => x.name ===name))[0]
        return (prop? Object.values(prop)[1] : '')
    }

    const setProductTypeHandler = (event) =>{
        setProductType(event.target.value)
    }

    //Sending new product to database
 const submit = async (event) =>{
    event.preventDefault()
    if(error === true){
        setAlert(() => <h4 className='alert alert-danger text-center'> Please, submit required data </h4>)
    }else {
        setAlert()
        const productToSend = {
            ...newProduct, 
            Size: takingOut('Size'), 
            Weight: takingOut('Weight'), 
            Height: takingOut('Height'), 
            Width: takingOut('Width'), 
            Length: takingOut('Length')
        }
        delete productToSend.Units
        await axios.post('https://jakubrozankiewicz.pl/server/', productToSend).then(function (response) {
        if(response.data.slice(-2,-1) == 1){navigate('/')} {setAlert(() => <h4 className='alert alert-danger text-center'> Invalid data </h4>)}})
    }
 }
    return (
        <div style={{ display: 'block', width: '500px', minHeight: '70vh', margin: '0 auto' }} >
            {alert}
            <form onSubmit={submit} id="product_form">
                
                <Input label='sku' value={newProduct.SKU} setHandler={setHandler} name='SKU' id='sku' type='text'/>
                
                <Input label='name' value={newProduct.Name} setHandler={setHandler} name='Name' id='name' className='mt-5' type='text'/>
                
                <Input label='price' value={newProduct.Price} setHandler={setHandler} name='Price' id='price' className='mt-5' type='number'/>

                <div className="row mt-5 ">
                    <label className="col-3"> Type Switcher</label>
                    <select required className="col-9 rounded productType" id='productType' onChange={setProductTypeHandler}>
                        {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div style={{display: productType === 'DVD'? 'inline':'none'}}>
                        <h5 className='mt-5 text-center alert alert-info' >Please, provide size</h5>
                        <Input label='size (MB)' value={newProduct.Units.Size} setHandler={setUnitsHandler} name='Size' id='size' className='mt-5' type='number'/>
                </div>

                <div style={{display: productType === 'Book'? 'inline':'none'}}>
                    <h5 className='mt-5 text-center alert alert-info'>Please, provide weight</h5>
                        <Input label='weight (KG)' value={newProduct.Units.Weight} setHandler={setUnitsHandler} name='Weight' id='weight' className='mt-5' type='number'/>
                </div>

                    <div style={{display: productType === 'Furniture'? 'inline':'none'}}>
                        <h5 className='mt-5 text-center alert alert-info'>Please, provide dimensions</h5>
                        
                        <Input label='height (CM)' value={newProduct.Units.Height} setHandler={setUnitsHandler} name='Height' id='height' className='mt-5' type='number'/>

                        <Input label='width (CM)' value={newProduct.Units.Width} setHandler={setUnitsHandler} name='Width' id='width' className='mt-5' type='number'/>
                        
                        <Input label='length (CM)' value={newProduct.Units.Length} setHandler={setUnitsHandler} name='Length' id='length' className='mt-5' type='number'/>
                    </div>

            </form>
        </div>
    );
}
export default AddForm;   