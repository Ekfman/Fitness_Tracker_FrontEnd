const url = "https://powerful-garden-68078.herokuapp.com/api"

export const fetchAPIroutines = async () => {
    try {
      const response = await fetch(`${url}/routines`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  export const fetchAPIactivities = async () => {
    try {
        const response = await fetch(`${url}/activities`, {
            headers: {
                "Content-Type": "application/json",
              },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
  };
