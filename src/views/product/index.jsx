//import useState dan useEffect
import { useState, useEffect } from 'react';

//import api
import api from '../../api';

//import Link
import { Link } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';


export default function ProductIndex() {

    //ini state
    const [posts, setPosts] = useState([]);

    //define method
    const fetchDataPosts = async () => {

        //fetch data from API with Axios
        await api.get('/api/sl/v1/web/product/list')
            .then(response => {
                //assign response data to state "posts"
                setPosts(response.data.data);
            })

    }

  
    //run hook useEffect
    useEffect(() => {
        //call method "fetchDataPosts"
        fetchDataPosts();

    }, []);
    

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/product/create" className="btn btn-md btn-success rounded shadow border-0 mb-3">ADD NEW POST</Link>
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Nama Product</th>
                                        <th scope="col">Deskripsi</th>
                                        <th scope="col">Harga</th>
                                        <th scope="col">Diskon</th>
                                        <th scope="col">Harga Diskon</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col" style={{ 'width': '15%' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        posts.length > 0
                                            ?   posts.map((post, index) => (
                         

                                                    <tr key={ index }>
                                                        <td className='text-center'>
                                                            <img src={post.fileUrlList[0].image} alt={post.fileUrlList[0].image} width="200" className='rounded' />
                                                        </td>
                                                        <td>{ post.productName }</td>
                                                        <td>{ post.productDescription }</td>
                                                        <td><NumericFormat value={post.amount.toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></td>
                                                        {post.discount != null ? 
                                                        <td>{ post.discount}</td> 
                                                        :<td>{ Number(0) && "%" }</td> 
                                                        }
                                                        <td ><NumericFormat value={post.amountDiscount.toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></td>
                                                        <td>{ post.totalProductStock }</td>
                                                        
                                                        <td className="text-center">
                                                            <Link to={`/product/edit/${post.productSecureId}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</Link>
                                                            <button className="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                                        </td>
                                                    </tr>
                                                ))

                                            :   <tr>
                                                    <td colSpan="7" className="text-center">
                                                        <div className="alert alert-danger mb-0">
                                                            Data Belum Tersedia!
                                                        </div>
                                                    </td>
                                                </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}