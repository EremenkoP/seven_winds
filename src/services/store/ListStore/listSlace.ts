import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResonceByCreateRow, IRowByList } from "../../types/Api";
import { firstRow } from "../../../utils/const/const";

interface IInitState {
  list: IRowByList[];
}

const initialState: IInitState = {
  list: [],
};

export const ListSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addOneOrAll: (state, actions: PayloadAction<IRowByList | IRowByList[]>) => {
      state.list = state.list.concat(actions.payload);
    },
    addOneInFront: (
      state,
      actions: PayloadAction<{ parentId: number; level: number }>
    ) => {
      const { level, parentId } = actions.payload;
      // here we can set the depth of nesting
      // ToDO rewrite this on recusia
      const realLevel = level <= 1 ? level : 1;
      state.list.forEach((element) => {
        switch (realLevel) {
          case 1: {
            element.child.forEach((el) => {
              if (el.id === parentId) {
                el.child = el.child?.concat({
                  ...firstRow,
                  child: [],
                }) || [{ ...firstRow, child: [] }];
              }
            });
            break;
          }
          default: {
            if (element.id === parentId) {
              element.child = element.child?.concat({
                ...firstRow,
                child: [],
              }) || [{ ...firstRow, child: [] }];
            }
            break;
          }
        }
      });
    },
    updateOneRow: (
      state,
      action: PayloadAction<{ data: IResonceByCreateRow; level: number }>
    ) => {
      const {
        data: { changed, current },
        level,
      } = action.payload;
      state.list.forEach((element) => {
        switch (level) {
          case 2: {
            element.child.forEach((elem) => {
              elem.child.forEach((el) => {
                if (el.id === current.id) {
                  el = { ...el, ...changed };
                }
              });
            });
            break;
          }
          case 1: {
            element.child.forEach((elem) => {
              if (elem.id === current.id) {
                elem = { ...elem, ...changed };
              }
            });
            break;
          }
          default: {
            if (element.id === current.id) {
              element = { ...element, ...changed };
            }
          }
        }
      });
    },
    deleteOneRow: (
      state,
      action: PayloadAction<{ level: number; id: number }>
    ) => {
      const { level, id } = action.payload;
      state.list.forEach((element, i) => {
        switch (level) {
          case 2: {
            element.child.forEach((elem, j) => {
              const index = elem.child.findIndex((value) => value.id === id);
              if (index !== -1) {
                state.list[i].child[j].child.splice(index, 1);
              }
            });
            break;
          }
          case 1: {
            const index = element.child.findIndex((value) => value.id === id);
            if (index !== -1) {
              state.list[i].child.splice(index, 1);
            }
            break;
          }
          default:
            if (element.id === id) {
              state.list.splice(i, 1);
            }
            break;
        }
      });
    },
  },
});

export const { addOneOrAll, addOneInFront, updateOneRow, deleteOneRow } =
  ListSlice.actions;

export const ListReducer = ListSlice.reducer;
