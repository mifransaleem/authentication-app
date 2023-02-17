import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import axios from "../constants/AxiosConfig";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const navigate = useNavigate()
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = async() =>{
        const baseUrl = "http://authdemoproject-env.eba-npftjhqe.us-east-2.elasticbeanstalk.com/api/user"
        try {
          // debugger
          // console.log(signupState)
          const response = await axios.post(`${baseUrl}/login`, loginState)
        //   console.log(response)
           if(response.data.status ==="success"){
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("firstname",response.data.user.firstName)
            localStorage.setItem("lastname",response.data.user.lastName)
            navigate("/")
           }else{
            Swal.fire({
              position: "center",
              icon: "error",
              title: response.data.message,
              showConfirmButton: true,
              timer: 5000,
            });
          
           }
        } catch (error) {
          return error.response;
        }
         }
    

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
    )
}