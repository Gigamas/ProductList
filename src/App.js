import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './sites/home/header/Header';
import Products from './sites/home/products/Products';
import Footer from './components/footer/Footer';
import AddHeader from './sites/addProduct/header/AddHeader';
import AddForm from './sites/addProduct/addForm/addForm';
import axios from 'axios';


function App() {
const [toDelete, setToDelete] = useState([]);

//Change boolean Delete in product
const setToDeleteHandler = (SKU)=>  {
  setToDelete([...toDelete, SKU])
}
const unsetToDeleteHandler =(SKU)=> {
  setToDelete(toDelete.filter(x=> x != SKU))
}
  //Delete from DataBase
 const deleteHandler =() => {
  toDelete.map(del => {
    axios.delete(`https://jakubrozankiewicz.pl/server/${del}`).then(() => {window.location.reload(false);});})
}
// home page
const productList = (
  <>
  <Header onDelete={()=>deleteHandler()}/>
  <Products setToDelete ={(SKU) => setToDeleteHandler(SKU)} unsetToDelete = {(SKU)=>unsetToDeleteHandler(SKU)}/>
  </>
);
// /addproduct page
const addProduct = (
<>
  <AddHeader />
  <AddForm />
  </>
);
    return (
        <div >
          
          <Router>
            <Routes>
              <Route path ='/' element={productList}/>
              <Route path='/addproduct' element={addProduct}/>
            </Routes>
          </Router>
          <Footer/>
        </div>
      );
}

export default App;
