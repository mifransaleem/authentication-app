import axios from "axios";
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "http://authdemoproject-env.eba-npftjhqe.us-east-2.elasticbeanstalk.com/api/user",
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

export default instance;
