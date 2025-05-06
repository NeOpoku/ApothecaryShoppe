import axios from 'axios';

const token = 'YOUR_TOKEN';

axios.get('https://api.github.com/user', {
  headers: {
    Authorization: `token ${token}`
  }
}).then(res => {
  console.log(res.data);
});