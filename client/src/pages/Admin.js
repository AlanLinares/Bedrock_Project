import {useState, useEffect} from 'react'
import '../css/User.css'


export default function Admin() {
    const [users, setUsers] = useState()

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/users')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.data)
            })
    },[])


    return (
        <div className='main non-flex'>
        <h2>Here are all the Users</h2>
        <div className='user-container'>
            {users
                ? users.map((user) => {
                      return (
                            <div className='user-info'>
                                <div className='info-flex'>
                                    <div className = 'user-label'>UserName</div>
                                    <div>
                                        {user?.username}
                                    </div>
                                </div>
                                <div className='info-flex'>
                                    <div className = 'user-label'>Full name</div>
                                    <div>
                                        {user?.first_name + ' ' + user?.last_name}
                                    </div>
                                </div>
                                <div className='info-flex'>
                                    <div className = 'user-label'>Email</div>
                                    <div>
                                        {user?.email}
                                    </div>
                                </div>
                                <div className='info-flex'>
                                    <div className = 'user-label'>Address</div>
                                    <div>
                                        <div id = 'address-container'>
                                            <div>{user?.address.street}</div>
                                            {/* <div>{user?.address.apt_suite}</div>  */}
                                            <div>{user?.address.city}</div>
                                            <div>{user?.address.state}</div>
                                            <div>{user?.address.zip}</div> 
                                        </div>
                                    
                        
                                    </div>
                                </div>
                                <div className='info-flex'>
                                    <div className = 'user-label'>Phone Number</div>
                                    <div>
                                        {user?.phone_number}
                                    </div>
                                </div>
                                <hr />
                            </div>
                        )
                  })
                : null}
        </div>
    </div>
    )


}