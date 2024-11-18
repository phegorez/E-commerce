import React, { useEffect, useState } from 'react'
import useEcomStore from '../stores/ecom-store'
import { currentUser } from '../api/auth'
import LoadingToRedirect from './loadingToRedirect'


const ProtectRouteUser = ({ element }) => {

    const [ok, setOk] = useState(false)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)
    
    useEffect(() => {
        if(user && token) {
            // send to back
            currentUser(token)
            .then((res) => setOk(true))
            .catch((err) => setOk(false))
        }
    },[])

    return ok ? element : <LoadingToRedirect />
}

export default ProtectRouteUser