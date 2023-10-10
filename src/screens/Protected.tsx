import React, { useEffect } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { fbAuth } from '../config/FirebaseSetup/firebaseMethods';


const Protected = (props: any) => {
    const { Screen } = props;
    const [loader, setLoader] = useState<any>(false);

    const navigate = useNavigate();
    let checkAuth = () => {
        setLoader(true);

        fbAuth()
            .then((res:any) => {
                setLoader(false);
            })
            .catch((err:any) => {
                setLoader(false);
                navigate('/login')
            })
    }


    useEffect(() => {
        checkAuth();
    }, []
    );


    return (
        <>
            {loader ? <h2>Loading</h2> : <Screen />}
        </>
    )


}

export default Protected