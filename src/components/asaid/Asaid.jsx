import useCategories from '../../hook/useCategorye';
import { Link } from 'react-router-dom';
import './asaid.scss'
import { useEffect, useState} from 'react';
// import { Button } from 'antd';


function Asaid({active, setActive}) {

  const role = localStorage.getItem('role') || sessionStorage.getItem('role')
  console.log(active, "active");
  const  [admin, setAdmin ] = useState(false)
  const [ data ] = useCategories();
 


  useEffect (()=> {
    if(role === '1') {
      setAdmin(!admin);
    } else {
      setAdmin(false);
    } 
  }, [role])
  


  return (
    <nav className='Asaid'>
    {
      data?.map((cat, index) => {
        return (
       
          <Link key={index} to = {'/cat/' + cat.id} >{cat.categoryName}</Link>

        )
      })
    }

      <Link className={admin ?  "show": "hide"} to={'/add-cat'}>option <i className="fa-sharp fa-regular fa-pen-to-square"></i></Link>

    </nav>
  )
}

export default Asaid