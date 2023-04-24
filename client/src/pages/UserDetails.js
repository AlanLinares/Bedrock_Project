import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../css/User.css'

export default function UserDetails() {

    const { id } = useParams()
    const [user, setUser] = useState()

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/users/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data.data)
            })
        },[])

    return (
        <div className='main'>
            <div>
                <div className='user-info-container'>
                    
                    <div className='email'>{user?.email}</div>
                    <hr />
                    
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
                                    <div>{user?.street}</div>
                                    {/* <div>{user?.address.apt_suite}</div>  */}
                                    <div>{user?.city}</div>
                                    <div>{user?.state}</div>
                                    <div>{user?.zip}</div> 
                                </div>
                
                            </div>
                        </div>
                        <div className='info-flex'>
                            <div className = 'user-label'>Phone Number</div>
                            <div>
                                {user?.phone_number}
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}