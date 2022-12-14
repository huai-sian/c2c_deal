import axios from 'axios';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, editProduct, deleteProduct, addProduct } from './../../slices/adminProductsSlice';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Loading from './../../components/loading';
import Pagination from './../../components/pagination';
import './products.scss';
import { useEffect } from 'react';

export default function Products() {
  const dispatch = useDispatch();
  const files = useRef();
  const { user } = useSelector((store) => store.user);
  const { products, isLoading, pagination } = useSelector((store) => store.adminProducts);
  const [show, setShow] = useState(false);
  const [fileUploading, setFileUploading] = useState('');
  const [nowPage, setNowPage] = useState(1);
  const [data, setData] = useState({
    imageUrl: '',
    title: '',
    category: 0,
    unit: '',
    origin_price: '',
    price: '',
    description: '',
    content: '',
    is_enabled: false,
  });

  const newProduct = () => {
    setData({
        imageUrl: '',
        title: '',
        category: 0,
        unit: '',
        origin_price: '',
        price: '',
        description: '',
        content: '',
        is_enabled: false,
    });
  }

  const handleToggle = (bool) => {
    setShow(bool);
  }

  const passData = (data) => {
      setData(data);
  }

  const handleSubmit = (data) => {
    dispatch(editProduct(data));
  }

  const handleAdd = (data) => {
    dispatch(addProduct(data));
  }

  const boolCheck = (num) => {
    if(num == 1) {
        return true
    } else {
        return false
    }
  }

  const handleBool = (bool) => {
      if(bool) {
        return 1
      } else {
        return 0
      }
  }

  const removeProduct = (data) => {
      dispatch(deleteProduct(data));
  }

  const uploadFile = () => {
    console.log(files.current.files[0]);
    const uploadedfile = files.current.files[0];
    const formData = new FormData();
    formData.append('file-to-upload', uploadedfile);
    const api = 'https://vue-course-api.hexschool.io/api/exploreu/admin/upload';
    setFileUploading('loading');
    axios.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
        if (response.data.success) {
          setData((prev) => (
            { ...prev, imageUrl: response.data.imageUrl }
          ))
          console.log(data.imageUrl);
          setFileUploading('done');
        } else {
          setFileUploading('fail');
        }
    })
  }

  useEffect(() => {
    dispatch(getProducts(nowPage));
  }, [])

  useEffect(() => {
    dispatch(getProducts(nowPage));
  }, [nowPage])

  if(isLoading) {
    return <Loading />
  }

  return (
    <>
        <div className="d-flex justify-content-end">
           <button className="btn btn-main mb-3" onClick={() => { handleToggle(true); newProduct(); }}>????????????</button>
        </div>
        <table className="table mt-4">
            <thead>
                <tr>
                    <th width="110">??????</th>
                    <th>????????????</th>
                    <th width="130">??????</th>
                    <th width="130">??????</th>
                    <th width="130">????????????</th>
                    <th width="140">??????</th>
                </tr>
            </thead>
            <tbody>
                {products && products.map(item => ( 
                    <tr key={item.id}>
                        <td>{item.category}</td>
                        <td>{item.title}</td>
                        <td>{item.origin_price}</td>
                        <td>{item.price}</td>
                        <td>
                            {item.is_enabled == true ? <span className="text-success">??????</span> : <span>?????????</span>}
                        </td>
                        <td>
                            <button className="btn btn-open btn-sm" onClick={() => { passData(item); handleToggle(true);}}>??????</button>
                            <button className="btn btn-delete btn-danger btn-sm" onClick={() => removeProduct(item) }>??????</button>
                        </td>
                    </tr>
                ))}
                
            </tbody>
        </table>
        {products && <Pagination pagination={pagination} setNowPage={setNowPage} nowPage={nowPage}></Pagination>}
        <Modal show={show} size="lg">
            <Modal.Header>
                <Modal.Title>?????? / ????????????</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group">
                        <label htmlFor="image">??????????????????</label>
                        <input type="text" className="form-control" id="image"
                            onChange={(e) => setData((prev) => (
                                { ...prev, imageUrl: e.target.value }
                            ))}
                            value={data.imageUrl ? data.imageUrl : ''}
                            placeholder="?????????????????????" />
                        </div>
                        <div className="form-group">
                        <label htmlFor="customFile">??? ????????????
                            {fileUploading == 'loading' && <i className="fas fa-spinner fa-spin"></i>}
                            {fileUploading == 'done' && <i className="fas fa-check-circle"></i>}
                            {fileUploading == 'fail' && <i className="far fa-times-circle"></i>}
                        </label>
                        <input type="file" id="customFile" className="form-control"
                            ref={files} onChange={() => uploadFile()} />
                        </div>
                        <img className="img-fluid" alt="" src={data.imageUrl} />
                    </div>
                    <div className="col-sm-8">
                    <div className="form-group">
                    <label htmlFor="title">??????</label>
                    <input type="text" className="form-control" id="title"
                        onChange={(e) => setData((prev) => (
                            { ...prev, title: e.target.value }
                        ))}
                        value={data.title ? data.title : ''}
                        placeholder="???????????????" />
                    </div>

                    <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="category">??????</label>
                        <input type="text" className="form-control" id="category"
                            onChange={(e) => setData((prev) => (
                                { ...prev, category: e.target.value }
                            ))}
                            value={data.category ? data.category : ''}
                            placeholder="???????????????" />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="price">??????</label>
                        <input type="unit" className="form-control" id="unit"
                        onChange={(e) => setData((prev) => (
                            { ...prev, unit: e.target.value }
                        ))}
                        value={data.unit ? data.unit : ''}
                        placeholder="???????????????" />
                    </div>
                    </div>

                    <div className="form-row">
                    <div className="form-group col-md-6">
                    <label htmlFor="origin_price">??????</label>
                        <input type="number" className="form-control" id="origin_price"
                        onChange={(e) => setData((prev) => (
                            { ...prev, origin_price: e.target.value }
                        ))}
                        value={data.origin_price ? data.origin_price : ''}
                        placeholder="???????????????" />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="price">??????</label>
                        <input type="number" className="form-control" id="price"
                        onChange={(e) => setData((prev) => (
                            { ...prev, price: e.target.value }
                        ))}
                        value={data.price ? data.price : ''}
                        placeholder="???????????????" />
                    </div>
                    </div>
                    <hr />

                    <div className="form-group">
                    <label htmlFor="description">????????????</label>
                    <textarea type="text" className="form-control" id="description"
                        onChange={(e) => setData((prev) => (
                            { ...prev, description: e.target.value }
                        ))}
                        value={data.description ? data.description : ''}
                        placeholder="?????????????????????"></textarea>
                    </div>
                    <div className="form-group">
                    <label htmlFor="content">????????????</label>
                    <textarea type="text" className="form-control" id="content"
                        onChange={(e) => setData((prev) => (
                            { ...prev, content: e.target.value }
                        ))}
                        value={data.content ? data.content : ''}
                        placeholder="???????????????????????????"></textarea>
                    </div>
                    <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox"
                        onChange={(e) => {setData((prev) => (
                            { ...prev, is_enabled: handleBool(e.target.checked) }
                            ))
                        }
                        }
                        id="is_enabled"
                        defaultChecked={data.is_enabled? boolCheck(data.is_enabled) : false}
                        />
                        <label className="form-check-label" htmlFor="is_enabled">
                        ????????????
                        </label>
                    </div>
                    </div>
                </div>
                </div>
            </Modal.Body>
            
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleToggle(false)}>
                    ??????
                </Button>
                <Button 
                    variant="primary"
                    onClick={() => {
                        data.id ? handleSubmit({data: data}) : handleAdd({data: data}); 
                        handleToggle(false);
                    }}
                >
                    ??????
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}