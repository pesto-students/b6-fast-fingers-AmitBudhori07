import fetchJson from 'service/fetchJson'
import withSession from 'data/session'

export default withSession(async (req, res) => {
  const { email,password } = await req.body;
  const url = `http://localhost:5000/fastfinger/signin`;
  const obj={
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email:email,password:password}),
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
