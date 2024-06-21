import { useEffect, useState } from "react"


const userList =()=>{
  const [employee, setEmployee] = useState([])
  const [loading, setLoading] = useState(true)
useEffect(()=>{
  fetch('http://localhost:5000/users')
  .then(res => res.json())
  .then(data => {
    setEmployee(data);
    setLoading(false)
  })

},[])
return [employee, loading]
}

export default userList;