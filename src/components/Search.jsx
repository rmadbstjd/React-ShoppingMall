import React,{useEffect, useState} from 'react';
import styles from './css/Search.module.css';
import {GrClose} from 'react-icons/gr';
import {useNavigate} from 'react-router-dom';
import useStore from '../store';
import {IoMdCloseCircle} from 'react-icons/io';
const Search = ({setShowSearch}) => {
    const navigate = useNavigate();
    const {text, setText, recentKeyword,addRecentKeyword,setRecentKeyword, allDeleteRecentKeyword} = useStore();
    const [showKeyword, setShowKeyword] = useState(recentKeyword ||[]);
    const submitKeyword = async (e) => {
        e.preventDefault();
        sessionStorage.clear();
        console.log("1111111111");        
        navigate(`/search?keyword=${text}`);
        setShowSearch((prev) => !prev);
        if(!recentKeyword.includes(text)){
            addRecentKeyword(text);
        }
       
    };
    const goToSearchPage = (item) => {
        sessionStorage.clear();
        console.log("1111111111");    
        navigate(`/search?keyword=${item}`);
        setShowSearch((prev) => !prev);
    };
    const closeSearch = () => {
        setShowSearch((prev) => !prev);
       
        setText('');
    };
    const handleChange = (e) => {
        setText(e.target.value);
    };
    const deleteAllRecentKeyword = () => {
        localStorage.removeItem("recentKeyword");
        setShowKeyword([]);
        allDeleteRecentKeyword();
       
    };
    const deleteKeyword = (item) => {
        setShowKeyword(showKeyword.filter(keyword => keyword !== item));
        setRecentKeyword(item);
   
    };
    useEffect(() => {
   
        recentKeyword && localStorage.setItem("recentKeyword",JSON.stringify(recentKeyword));

    },
    [recentKeyword]);
    return (
        <div className={styles.container}>
                 <div className={styles.searchContainer}>
                    <form className={styles.searchContent} onSubmit={(e)=>submitKeyword(e)}>
                        
                            <input type="text" value={text} placeholder="????????????, ?????????" onChange={(e) =>handleChange(e)} className={styles.searchBar}  autoFocus/>
                                                
                        <GrClose className={styles.close} onClick={closeSearch}/>
                    </form>
                    <div className={styles.horizonLine}></div>
                    <div className={styles.recentSearchContainer}>
                        <div className={styles.recentSearch}>
                            ?????? ?????????
                        </div>
                        <div className={styles.delete}onClick={deleteAllRecentKeyword}>
                            ?????? ?????????
                            <IoMdCloseCircle/>
                        </div>
                        </div>
                    <div className={styles.keywordContainer}>{showKeyword && showKeyword.map(item => <div className={styles.keywordContent}><div className={styles.keyword} onClick={()=>goToSearchPage(item)}>{item}</div><IoMdCloseCircle className={styles.keywordClose} onClick={() =>deleteKeyword(item)}/> </div>)}</div>
                </div>
                
                
        </div>
    );
};

export default Search;