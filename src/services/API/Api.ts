import { IPostRow, IResonceByCreateRow, IRowByList, TUpdateOneRow } from "../types/Api";

interface ImainApi {
  baseUrl: string;
}

class mainApi {
  private _baseUrl: string;
  constructor({ baseUrl }: ImainApi) {
    this._baseUrl = baseUrl;
  }

  private responseHandler = (res: Response) =>
    res.ok ? res.json() : Promise.reject(res);

  private _fetcher(
    path: string,
    method: "GET" | "POST" | "DELETE",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any
  ) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options: RequestInit = {
      method,
      headers,
      body,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    return fetch(`${this._baseUrl}/${path}`, options).then(
      this.responseHandler
    );
  }

  getList = (): Promise<IRowByList[]> => this._fetcher("/list", "GET");
  createRow = (body: IPostRow): Promise<IResonceByCreateRow> =>
    this._fetcher("create", "POST", body);
  updateRow = (
    rID: number,
    body: TUpdateOneRow
  ): Promise<IResonceByCreateRow> =>
    this._fetcher(`${rID}/update`, "POST", body);
  deleteRow = (rID: number): Promise<IResonceByCreateRow> =>
    this._fetcher(`${rID}/delete`, 'DELETE');
}

const eID = 148553;
// const rowName = "6f823acb-e563-4a50-bc76-979cd5ac90cb";

const baseUrl =
  `http://185.244.172.108:8081//v1/outlay-rows/entity/${eID}/row`;

export const API = new mainApi({ baseUrl: baseUrl });
