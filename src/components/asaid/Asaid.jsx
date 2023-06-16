import useCategories from '../../hook/useCategorye';
import { Link } from 'react-router-dom';
import './asaid.scss'
import { useState, useEffect } from 'react';
// import { Button } from 'antd';


function Asaid({active}) {

  const role = localStorage.getItem('role') || sessionStorage.getItem('role')
  console.log(active, "active");
  const categories = useCategories();
  const [ admin, setAdmin] = useState(false);

  useEffect (()=>{
    if(role === "1") {
      setAdmin(!admin)
    } else {
      setAdmin(admin)
    }
  }, [role, active ])

  return (
    <div className='Asaid'>
    {
      categories?.map((cat, index) => {
        return (
          <div className='box' key={index}>
          <Link to = {'/cat/' + cat.categoryName} >{cat.categoryName}</Link>

          </div>
        )
      })
    }
    <div className='box'>
      <Link className={active ?  "show": "hide"} to={'/add-cat'}>add category</Link>

    </div>

    </div>
  )
}

export default Asaid