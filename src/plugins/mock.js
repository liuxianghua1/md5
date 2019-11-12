import axios from 'axios';

const mock = axios.create({
    baseURL: "http://yapi.demo.qunar.com/mock/33758/"
})

export default mock;