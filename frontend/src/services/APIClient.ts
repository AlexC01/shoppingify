import axios, { AxiosInstance, AxiosResponse } from "axios";

class APIClient {
  client: AxiosInstance;

  constructor(url: string = `${process.env.REACT_APP_API_BASE_URL}`) {
    this.client = axios.create({ baseURL: url });

    this.client.interceptors.response.use(
      response => response,
      error => {
        const { response } = error;
        return this.handleError(response);
      },
    );
  }

  protected async get<T>(path: string): Promise<AxiosResponse<T>> {
    return this.client.get<T, AxiosResponse<T>>(path);
  }

  protected async post<T>(
    path: string,
    data?: unknown,
    config?: any,
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T, AxiosResponse<T>>(path, data, config);
  }

  // eslint-disable-next-line class-methods-use-this
  private handleError(error: any): Promise<never> {
    if (error === null || error === undefined) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
}

const clientAPI = new APIClient();
Object.freeze(clientAPI);
export default clientAPI;
