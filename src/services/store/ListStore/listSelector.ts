import { RootState } from "../store";

export const listSelector = (state: RootState) => state.list.list;