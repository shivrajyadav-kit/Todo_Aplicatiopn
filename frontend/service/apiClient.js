class ApiClient {
  contructor() {
    this.baseURL = "http://localhost:4000/api/v1";
    this.defaultHeaders = {
      "content-Type": "application/json",
      Accept: "application/json",
    };
  }

  async customFetch(endpoint, option = {}) {
    try {
      const url = `http://localhost:4000/api/v1/${endpoint}`;
      const headers = { ...this.defaultHeaders, ...option.headers };

      const config = {
        ...option,
        headers,
        credentials: "include",
      };
      console.log(`Fetching ${url}`);
      const response = await fetch(url, config);

      // check if response.ok === value
      console.log(response)

      // const data = await response.json();
      // return data;
    } catch (error) {
      console.error("Api Error", error);
      throw error;
    }
  }

  async signup({username, email, password}) {
    this.customFetch("/users/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });
  }

  async login(email, password) {url
    this.customFetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async getProfile() {
    return this.customFetch("/users/register");
  }
}

const apiClient = new ApiClient();

export default apiClient;
