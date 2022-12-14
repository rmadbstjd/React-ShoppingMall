import React,{useState,useEffect} from 'react';
import styles from './css/SearchPage.module.css';
import {useQuery} from '@tanstack/react-query';
import ProductLikeCard from '../components/ProductLikeCard';
import useStore from '../store';
import {useNavigate} from 'react-router-dom';
import {useSearchParams} from 'react-router-dom';
import {GrClose} from 'react-icons/gr';
import {TbArrowsUpDown} from 'react-icons/tb';
import Toggle from '../components/Toggle';
import Side from '../components/Side';
import {GiHamburgerMenu} from 'react-icons/gi';
import HamburgerSide from '../components/HamburgerSide';
const SearchPage = () => {
    const {product,sort,initSort,addRecentKeyword} = useStore();
    const [query,setQuery] = useSearchParams();
    const [toggle, setToggle] = useState(false);
    const [hamburger, setHamburger] = useState(false);
    const [show, setShow] = useState(true);
    const sessionSort = sessionStorage.getItem("sort");
    const searchQuery= query.get('keyword')|| "null";
    const searchSort= sessionSort || query.get('sort')|| "null";
   
    
    const priceOrder = query.get('priceOrder') || undefined;
    let collectionName = query.get('collectionName') || undefined; 
    const [result, setResult] = useState(searchQuery);
    let {error, isLoading, data : products} = useQuery([searchQuery,searchSort,collectionName,priceOrder], () => product.search(searchQuery,searchSort,collectionName,priceOrder));  
    const navigate = useNavigate();
    const submitKeyword = (e) => {        
        e.preventDefault();       
    
        navigate(`/search?keyword=${result}&sort=${sessionSort || sort}$collectionName=${collectionName}&priceOrder=${priceOrder}`);
        addRecentKeyword(result);
    };
    const closeSearch = () => {        
        setResult('');       
    };
    useEffect(() => {
        setResult(searchQuery);
        products && initSort(sessionSort);
       
    },[searchQuery,searchSort]);
    
    const clickToSort = (e) => {
        e.stopPropagation();
        setToggle((prev) =>!prev);   
    };
    const handleChange = (e) => {        
        setResult(e.target.value);     
    };
    const clickHamburger = () => {
        setHamburger((prev) =>!prev);
        setShow((prev) => !prev);
    };
    return (
        <div className={styles.container} onClick={() => setToggle(false)}>
            { show && <div className={styles.productsContainer}>

                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                
                <div className={styles.contentContainer}>                    
                    <div className={styles.searchContainer}>
                        <form className={styles.searchContent} onSubmit={(e)=>submitKeyword(e)}>                            
                                <input type="text" value={result} placeholder="????????????, ?????????" onChange={(e) =>handleChange(e)} className={styles.searchBar} autoFocus/>                                                    
                                <GrClose className={styles.close} onClick={closeSearch}/>
                        </form>
                        <div className={styles.horizonLine}></div>                   
                    </div>
                                    
                </div> 

                <div className={styles.sortContainer}>
                            <GiHamburgerMenu className={styles.hamburger} onClick={clickHamburger}/>
                            
                            <div className={styles.test}>
                                <div className={styles.sort} onClick={clickToSort}>{sessionSort==='new'?'?????????':'?????????'}</div>                           
                            <TbArrowsUpDown className={styles.toggleIcon} onClick={clickToSort}/>    
                            </div>
                            {toggle && <Toggle setToggle={setToggle}/>}
                </div>  
                
                <div className={styles.content}>
                        <Side className={styles.side}/>
                        <div className={styles.products}>
                            {products && products.products.map((product,index) => product.map((product,index) =><ProductLikeCard none={'none'}product={product} key={index} />))}
                        </div>
                </div>               
            </div>}
            {hamburger && <HamburgerSide  setShow={setShow} setHamburger={setHamburger}/>}
        </div>
    );
};

export default SearchPage;