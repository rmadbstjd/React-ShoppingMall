import React,{useState} from 'react';
import {useNavigate, Navigate} from 'react-router-dom';
import { addProduct } from '../api/firebase';
import { uploadImage } from '../api/upload';
import styles from './css/NewProducts.module.css';
import useStore from '../store';
const NewProducts = () => {
    const {product, setProduct, setInitProduct} = useStore();
    const [file, setFile] = useState('');
    const [count, setCount] = useState(0);
    let isAdmin = localStorage.getItem('admin');
    const navigate = useNavigate();
    
    if(isAdmin !=='true') {
        console.log("어드민",isAdmin);
        return <Navigate to="/" replace></Navigate>
    }
    
    const onChange = (e) => {
        const {name ,value, files} = e.target;
        setFile(files && files[0]);
        
    }
    const onSubmit = async(e) => {
        if(!file) {
            return;
        }
        setCount(1);
        const url =await uploadImage(file);
        console.log("ur;url",url);
        addProduct(product,url);
        
    };
    const onCancel = () => {
        setCount(0);
        setInitProduct();
        navigate('/');
    };
    const onChangeProduct = (e,column) => {
        const row = e.target.value;
        setProduct(column,row);
    };
    return (
        <div className={styles.container}>
                
                <div className={styles.formContainer}>
                    
                        
                    
                <div className={styles.btnContainer}>
                    <div>새로운 제품 등록</div>
                    
                    <div>
                        <button onClick={onSubmit} className={styles.addBtn}>등록하기</button>
                        <button onClick={onCancel}className={styles.addBtn}>취소하기</button>
                    </div>
                    
                </div>
                <div className={styles.imgContainer}>{file && <img className={styles.img}src={URL.createObjectURL(file)}></img>}</div>
                    <div className={styles.form1}>
                        <div>
                            <input type='file' 
                            accept='image/jpg,impge/png,image/jpeg,image/gif' 
                            name='file'
                            required
                            onChange={onChange}>
                            
                            </input>
                        </div>
                    </div>
                    <div className={styles.form}>
                        <input type="text"
                        placeholder={count===0?'제품명':product.title===true?'제품명':'제품명을 입력해주세요.'}
                        onChange={(e) =>onChangeProduct(e,'title')}
                        className={count===0?styles.input:product.title===true?styles.input:styles.input2}>
                        
                        </input>
                    </div>
                    <div className={styles.form}>
                        <input type="text"
                        placeholder={count===0?'가격':product.price===true?'가격':'가격을 입력해주세요.'}
                        onChange={(e) =>onChangeProduct(e,'price')}
                        className={count===0?styles.input:product.price===true?styles.input:styles.input2}>
                        

                        </input>
                    </div>
                    <div className={styles.form}>
                        <input type="text"
                        placeholder={count===0?'카테고리':product.category===true?'카테고리':'카테고리를 입력해주세요.'}
                        onChange={(e) =>onChangeProduct(e,'category')}
                        className={count===0?styles.input:product.category===true?styles.input:styles.input2}>

                        </input>
                    </div>
                    <div className={styles.form}>
                        <input type="text"
                        placeholder={count===0?'설명':product.description===true?'설명':'설명을 입력해주세요.'}
                        onChange={(e) =>onChangeProduct(e,'description')}
                        className={count===0?styles.input:product.description===true?styles.input:styles.input2}>

                        </input>
                    </div>
                    <div className={styles.form}> 
                        <input type="text"
                        //placeholder="사이즈(,로 구분해주세요)"
                        placeholder={count===0?'"사이즈(쉼표로 구분해주세요)"':product.size===true?'"사이즈(쉼표로 구분해주세요)"':"사이즈를 입력해주세요"}
                        onChange={(e) =>onChangeProduct(e,'size')}
                        className={count===0?styles.input:product.price===true?styles.input:styles.input2}>

                        </input>
                    </div>
                    
                </div>
                
        </div>
    );
};

export default NewProducts;