import axios from 'axios'
import React, { useState } from 'react'
import useAuth from './useAuth'

const useChagePass = ({setAlert}) => {

    const [loading, setLoading] = useState(false)
    const {accessToken} = useAuth()

    const changePass = async  (data) => {
        console.log(JSON.stringify(data))

        const config = {
            headers: {
                  'Authorization': `${accessToken}`,
                  'Content-Type': 'application/json',
                },
        }
        const url = "#"
        try {
            setLoading(true)
            await axios.post(url,JSON.stringify(data),config)
            
            setAlert({
                open:true,
                severity:"success",
                message:"Thay đổi mật khẩu thành công",
            })

            setLoading()
        } catch (error) {
            setLoading(false)
            setAlert({
                open:true,
                severity:"error",
                message:"Lỗi máy chủ gửi về"// 
            })
            // setAlert({
            //     open:true,
            //     severity:"error",
            //     message:(error.response?.data?.errors?.body[0]),
            // })
            
        }
    }


  return {loading, changePass}
}

export default useChagePass