import { FC } from "react";
import style from "./WorksPanel.module.scss";
import { IRowByList } from "../../services/types/Api";
import { OneRow } from "../OneRow/OneRow";
import { firstRow } from "../../utils/const/const";
import { v4 as uuid } from "uuid";

interface IWorksPanel {
  title: string;
  list: IRowByList[];
}

export const WorksPanel: FC<IWorksPanel> = ({ title, list }) => {
  const renderFunction = (
    oneElement: IRowByList,
    level = 0,
    parentId?: number,
  ) => {
    const res = [
      <li key={oneElement.id}>
        <OneRow
          data={oneElement}
          level={level}
          parentId={level === 0 ? oneElement.id : parentId}
        />
      </li>,
    ];
    if (oneElement.child.length !== 0) {
      res.push(
        ...oneElement.child.map((child) => {
          return (
            <ul className={style.ul + " " + style.ul_child} key={uuid()}>
              {renderFunction(child, level + 1, oneElement.id)}
            </ul>
          );
        })
      );
    }
    return res;
  };

  return (
    <section className={style.section}>
      <div className={style.titleBox}>
        <h3 className={style.title}>{title}</h3>
      </div>
      <ul className={style.ul}>
        <li key={-1} className={style.ul__firstLi}>
          <p className={style.text}>Уровень</p>
          <p className={style.text}>Наименование работ</p>
          <p className={style.text}>Основная з/п</p>
          <p className={style.text}>Оборудование</p>
          <p className={style.text}>Накладные расходы</p>
          <p className={style.text}>Сметная прибыль</p>
        </li>
        {list.length ? (
          list.map((el) => {
            return renderFunction(el);
          })
        ) : (
          <li key={0}>
            <OneRow data={firstRow}/>
          </li>
        )}
      </ul>
    </section>
  );
};
