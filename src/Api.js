const url = "https://powerful-garden-68078.herokuapp.com/api"

export const callApi = async ({ method, path, token, body }) => {
    const options = {
      method: method ? method : "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    try {
        const result = await fetch(url + path, options);
        const data = await result.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(err);
    }
  };
