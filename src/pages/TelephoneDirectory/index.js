import React, {useEffect, useState} from 'react'
import classes from './TelephoneDirectory.module.css'
import axios from 'axios';
import {v4} from 'uuid';
import BaseButon from '../../button/BaseButton.jsx';
 export default function Index(props) {
    const [userMas,setUserMas] = useState([]);
    const [updateTable,setUpdateTable] = useState(0);
    useEffect(() => {
      if(localStorage.token){
        axios.post(`http://localhost:3001/user?companyName=${localStorage.company}`)
        .then((resp) => {
          const allUsers = resp.data.userInfo;
          setUserMas(allUsers);
        }).catch((e) => {
          alert(e.message)
        });
        
      }
    }, [setUserMas]);
    
    function DeliteUser(id) {
      axios.post(`http://localhost:3001/userDelete?id=${id}`)
      window.location.reload(); 
    }

  const user = userMas.map((obj) => {return [<tr key={v4()}><td key={v4()}>{obj.firstName}</td><td key={v4()}>{obj.name}</td><td key={v4()}>{obj.midleName}</td><td key={v4()}>{obj.phone}</td>{localStorage.role == 1 ? <td><BaseButon f={() => DeliteUser(obj.id)} type={'reg'} w={'45px'} h={'45px'} text={'X'}/></td> : <div></div> }</tr>]});
  if(localStorage.token){
  return(
    <div className={classes.mainContainer}>

      <table className={classes.iksweb}>
        <thead>
          <tr><th>Фамилия</th><th>Имя</th><th>Отчество</th><th>Телефон</th> {localStorage.role == 1 ? <th>Удалить</th> : <div></div> } </tr>
          {user}
        </thead>
      </table>

    </div>
  );
  }
  else{
    return (
      <div className={classes.container}>
            <div className={classes.box}>
                <h1>
                  Пожалуйста авторизуйтесь
                </h1>
            </div>
      </div>
    );
  }
}