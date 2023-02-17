import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import axios from "../constants/AxiosConfig";
import Swal from 'sweetalert2';

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const history = useNavigate()
  const [signupState,setSignupState]=useState(fieldsState);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    createAccount()
  }
  
  //handle Signup API Integration here
  const createAccount= async()=>{
    const baseUrl = "http://authdemoproject-env.eba-npftjhqe.us-east-2.elasticbeanstalk.com/api/user"
    try {
      debugger
      // console.log(signupState)
      const response = await axios.post(`${baseUrl}/register`, signupState)
      // console.log(response)
       if(response.data.status ==="success"){
        history("/account/login")
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
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
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
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>

         

      </form>
    )
}