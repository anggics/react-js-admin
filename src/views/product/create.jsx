//import useState
import { useState, useEffect } from 'react';

//import useNavigate
import { useNavigate } from 'react-router-dom';

//import API
import api from '../../api';
import { Link } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';




export default function ProductCreate() {

   
     //for select option
     const [values, setValues] = useState([])
     const [categorySecureId, setCategorySecureId] = useState()
    //define state
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [stockProduct, setStockProduct] = useState(0);
    const [fileImage, setFileImage] = useState();
    const [discount, setDiscount] = useState(0);
    const [messageErr, setMsgErr] = useState();
    

    //state validation
    const [errors, setErrors] = useState([]);
    //useNavigate
    const navigate = useNavigate();

     //method handle file change
     const handleFileChange = async (e) => {
        const dataFile = [];
      
        for (let i = 0; i <  e.target.files.length; i++) {
            // const fileNames = e.target.files[i].name.trim()
            // dataFile.push(fileNames.replace(/ /g,'%20'))
    
            const formdata = new FormData();
            formdata.append('file', e.target.files[i])
           // formdata.append

            await api.post('/api/sl/v1/backoffice/uploadfile/upload', formdata)
               .then((res) => {
                    dataFile.push(res.data.data)
                  //  console.log("ini response upload == ", dataFile)
               }) .catch(error => {
                //set errors response to state "errors"
                setErrors(error.response.data);
            })
        }
        setFileImage(dataFile);
     }

     const handleInputSelect = (e) => {
        setCategorySecureId(e.target.value)
     }

    //method store post
    const storePost = async (e) => {
        e.preventDefault();
        const body ={
        productName : productName,
        description : description,
        stockProduct : Number(stockProduct) ,
        amount : Number(amount),
        categorySecureId : categorySecureId,
        discount :Number(discount),
        fileUrl :fileImage
    }

        //send data with API
        await api.post('/api/sl/v1/backoffice/product/add', 
         body)
            .then(() => {  
                //redirect to posts index
                navigate('/product');
            })
            .catch(error => {
                //set errors response to state "errors"
                setMsgErr(error.response.data);
            })

    }

      //define method
    const fetchDataCategory = async () => {

        //fetch data from API with Axios
        await api.get('/api/sl/v1/web/product-category/list')
        .then(response => {
            //assign response data to state "posts"
            setValues(response.data.data);
        })
        
    }

      //run hook useEffect
    useEffect(() => {
        
        //call method 
        fetchDataCategory();

    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                        {/* {
                            messageErr >0 ?{
                                        messageErr.message && (
                                            <div className="alert alert-danger mt-2">
                                                {messageErr.message}
                                            </div>
                                        )
                                    }
                        } */}
                            <form onSubmit={storePost}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Image</label>
                                    <input type="file"   onChange={handleFileChange} className="form-control" multiple/>
                                    {
                                        errors.message && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.message}
                                            </div>
                                        )
                                    }
                                
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nama Category</label>
                                        <select className="form-control" onChange={handleInputSelect}>
                                            <option>Silahkan pilih category...</option>
                                            {
                                                values.map(
                                                    (opts, index) => <option value={opts.categorySecureId} key={opts.categorySecureId}>{opts.categoryName}</option>
                                                )
                                            }
                                        </select>
                                        {/* {
                                        errors.message && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.message}
                                            </div>
                                        )
                                    } */}
                                </div>    


                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nama Product</label>
                                    <input type="text" className="form-control" onChange={(e) => setProductName(e.target.value)} name = "productName" placeholder="Nama Product"/>
                                    {/* {
                                        errors.message && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.message}
                                            </div>
                                        )
                                    } */}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Deskripsi Product</label>
                                    <textarea className="form-control" onChange={(e) => setDescription(e.target.value)} rows="5"name = "description" placeholder="Deskripsi"></textarea>
                                    {/* {
                                        errors.message && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.message}
                                            </div>
                                        )
                                    } */}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Harga</label>
                                    <CurrencyInput
                                    className="form-control"
                                    //id="input-example"
                                    //name="input-name"
                                    placeholder="Harga"
                                    prefix='Rp.'
                                    defaultValue={0}
                                    decimalsLimit={2}
                                    onValueChange={(value, name, values) => setAmount(value)}
                                    />
                                    {/* <div>{amount}</div>
                                    <input  type = "number" className="form-control" onChange={(e) => setAmount(e.target.value)}  placeholder="Harga"/> */}
                                   {
                                        errors.productName && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.productName[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Discount (Dalam %)</label>
                                    <CurrencyInput
                                    className="form-control"
                                    placeholder="Discount"
                                    suffix='%'
                                    defaultValue={0}
                                    decimalsLimit={2}
                                    onValueChange={(value, name, values) => setDiscount(value)}
                                    />
                                    {/* <input type = "number" className="form-control" onChange={(e) => setDiscount(e.target.value)} name = "discount" placeholder="Diskon"/> */}
                                    {
                                        errors.productName && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.productName[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Stock</label>
                                    <input type = "number" className="form-control" onChange={(e) => setStockProduct(e.target.value)} name ="stockProduct" placeholder="Stock Product"/>
                                    {
                                        errors.content && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.content[0]}
                                            </div>
                                        )
                                    }
                                </div>
                               
                               <div className="text-center"> 
                               <button type="submit"  className="btn btn-lg btn-success rounded-sm shadow border-0 me-4">Simpan</button>
                                <Link to={`/product`} className="btn btn-lg btn-warning rounded-sm shadow border-0">Cancel</Link>
                                </div>
                               
                            </form>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}