import fetchJson from './fetchJson'

export const register = async ({ name, email, password }) => {
  const url = '/fastfinger/signup'
  const obj = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password}),
  }
  try {
    const res = await fetchJson(url, obj);
    return res
  } catch (error) {
    return error;
  }
};


export const getScore = async (url) => {
  var obj = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }
  }
  try {
    const res = await fetchJson(url, obj);
    return res
  } catch (error) {
    console.log(error);
  }
}

export const postScore = async (url, score) => {
  var obj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify({ score: score })
  }

  try {
    const res = await fetchJson(url, obj);
    return res
  } catch (error) {
    console.log(error);
  }
}

export const getWords = async (url) => {
  var obj = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ',
    },
/*     body: JSON.stringify({ score: score })
 */  }

  const data = await fetch(url, obj).then(r => r.json());
  return data
}