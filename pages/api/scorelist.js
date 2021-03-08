import fetchJson from 'service/fetchJson'
import withSession from 'data/session';

export const getScore = async (url) => {
    var obj = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }
    const data = await fetch(url, obj).then(r => r.json());
    return data;
  }

export default withSession(async (req, res) => {
  const { email,password } = await req.body;
  const url = `http://localhost:5000/fastfinger/scorelist`;
  const obj={
    method: 'GET',
    headers: { 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
 }
  }

  try {
    const {token} = await fetchJson(url,obj)
    const user = { isLoggedIn: true, token }
    req.session.set('user', user)
    await req.session.save()
    res.json(user)
  } catch (error) {
    console.log(error)
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})
