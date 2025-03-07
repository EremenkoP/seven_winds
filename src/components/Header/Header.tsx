import { FC } from "react";
import AppsIcon from "@mui/icons-material/Apps";
import style from "./Header.module.scss";
import { v4 as uuid } from "uuid";
import arrowBack from "../../images/arrow_back.svg";
import { routers } from "../../utils/const/routers";
import { ILink } from "../../services/types/forRender";



export const Header: FC = () => {
  // По хорошему перем путь из locatin.path
  const location = routers.main;

  const list: ILink[] = [
    {
      name: "Просмотр",
      router: routers.main,
      uuid: uuid(),
    },
    {
      name: "Управление",
      router: routers.controle,
      uuid: uuid(),
    },
  ];

  return (
    <header className={style.header}>
      <button className={style.button}>
        <AppsIcon className={style.icon} />
      </button>
      <button className={style.button}>
        <img src={arrowBack} alt="стрелка назад" />
      </button>
      <ul className={style.ul}>
        {list.map((el) => {
          return (
            <li
              key={el.uuid}
              className={
                style.ul__li +
                " " +
                (location === el.router && style.ul__li_active)
              }
            >
              <p
                className={
                  style.text +
                  " " +
                  (location === el.router && style.text_accient)
                }
              >
                {el.name}
              </p>
            </li>
          );
        })}
      </ul>
    </header>
  );
};
