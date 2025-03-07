import { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import style from "./OneRow.module.scss";
import { IChangeRow } from "../../services/types/Api";
import { SubmitHandler, useForm } from "react-hook-form";
import { API } from "../../services/API/Api";
import { useAppDispatch } from "../../hooks/store";
import {
  addOneInFront,
  deleteOneRow,
  updateOneRow,
} from "../../services/store/ListStore/listSlace";

interface IOneRow {
  data: IChangeRow;
  level?: number;
  parentId?: number;
}

interface IForm {
  rowName: string;
  salary: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
}

export const OneRow: FC<IOneRow> = ({ data, parentId, level = 0 }) => {
  const dispatch = useAppDispatch();


  const [isDisabled, setIsDisabled] = useState(data.id !== 0);
  const formRef = useRef<HTMLFormElement | null>(null);

  const chouseIsDisabled = () => {
    setIsDisabled((prev) => !prev);
  };

  useEffect(() => {
    formRef.current?.addEventListener("dblclick", chouseIsDisabled);

    const formElement = formRef.current;
    return () => {
      formElement?.removeEventListener("dblclick", chouseIsDisabled);
    };
  }, []);

  const { register, handleSubmit } = useForm<IForm>({
    defaultValues: data,
  });

  const onSubmit: SubmitHandler<IForm> = async (formData: IForm) => {
    console.log(data, parentId);
    if (data.id === 0) {
      await API.createRow({
        ...formData,
        parentId: parentId || null,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        supportCosts: 0,
      })
        .then((res) => {
          dispatch(updateOneRow({ data: res, level: level }));
          setIsDisabled(true);
        })
        .then((err) => {
          console.log(err);
        });
    } else {
      await API.updateRow(data.id, {
        ...data,
        ...formData,
      })
        .then((res) => {
          dispatch(updateOneRow({ data: res, level: level }));
          setIsDisabled(true);
        })
        .then((err) => {
          console.log(err);
        });
    }
  };

  const deleteRow = async (event: SyntheticEvent) => {
    event.stopPropagation();
    if (data.id !== 0) {
      await API.deleteRow(data.id)
        .then((res) => {
          dispatch(deleteOneRow({ id: data.id, level }));
          console.log(res);
        })
        .then((err) => {
          console.log(err);
        });
    }
  };

  const createOneRow = (event: SyntheticEvent) => {
    event.stopPropagation();
    console.log(data, parentId, level);
    const id = level !== 0 ? data.id : parentId;
    console.log(id)
    if (id) {
      dispatch(addOneInFront({ parentId: id, level }));
    }
  };

  return (
    <form
      className={style.article}
      onSubmit={handleSubmit(onSubmit)}
      ref={formRef}
    >
      <div className={style.article__box}>
        <div
          className={style.buttonBox + ' ' + (!isDisabled && style.buttonBox_unactive)}
          style={{ marginLeft: 20 * level + "px" }}
        >
          <button
            className={style.button + " " + style.button_create}
            onClick={createOneRow}
            disabled={!isDisabled}
            type="button"
          />
          <button
            type="button"
            className={style.button + " " + style.button_delete}
            disabled={!isDisabled}
            onClick={deleteRow}
          />
          {level !== 0 && (
            <>
              <span className={style.buttonBox__horizont} />
              <span className={style.buttonBox__vertical} />
            </>
          )}
        </div>
      </div>
      <div className={style.article__box}>
        <input
          {...register("rowName")}
          className={style.input}
          disabled={isDisabled}
        />
      </div>{" "}
      <div className={style.article__box}>
        <input
          {...register("salary", { pattern: /[\d]*.*[\d]/ })}
          className={style.input}
          disabled={isDisabled}
        />
      </div>{" "}
      <div className={style.article__box}>
        <input
          {...register("equipmentCosts", { pattern: /[\d]*.*[\d]/ })}
          className={style.input}
          disabled={isDisabled}
        />
      </div>{" "}
      <div className={style.article__box}>
        <input
          {...register("overheads", { pattern: /[\d]*.*[\d]/ })}
          className={style.input}
          disabled={isDisabled}
        />
      </div>{" "}
      <div className={style.article__box}>
        <input
          {...register("estimatedProfit", { pattern: /[\d]*.*[\d]/ })}
          className={style.input}
          disabled={isDisabled}
        />
      </div>
      <input type="submit" hidden />
    </form>
  );
};
