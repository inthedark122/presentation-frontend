import axios from "axios";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = "/api";

export default axios;
