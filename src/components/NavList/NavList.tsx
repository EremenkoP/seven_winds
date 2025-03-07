import { FC } from "react";
import style from "./NavList.module.scss";
import { ILink } from "../../services/types/forRender";
import { routers } from "../../utils/const/routers";
import { v4 as uuid } from "uuid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NavButton } from "../NavButton/NavButton";

interface INavList {
  title: string;
  abbreviation: string;
}

export const NavList: FC<INavList> = ({ title, abbreviation }) => {
  // По хорошему перем путь из locatin.path
  const location = routers.constructionInstallationWorks;

  const list: ILink[] = [
    {
      name: "По проекту",
      router: routers.main,
      uuid: uuid(),
    },
    {
      name: "Объекты",
      router: routers.objects,
      uuid: uuid(),
    },
    {
      name: "РД",
      router: routers.rd,
      uuid: uuid(),
    },
    {
      name: "МТО",
      router: routers.logistics,
      uuid: uuid(),
    },
    {
      name: "СМР",
      router: routers.constructionInstallationWorks,
      uuid: uuid(),
    },
    {
      name: "График",
      router: routers.schedule,
      uuid: uuid(),
    },
    {
      name: "МиМ",
      router: routers.mim,
      uuid: uuid(),
    },
    {
      name: "Рабочие",
      router: routers.workers,
      uuid: uuid(),
    },
    {
      name: "Капвложения",
      router: routers.capitalInvestments,
      uuid: uuid(),
    },
    {
      name: "Бюджет",
      router: routers.budget,
      uuid: uuid(),
    },
    {
      name: "Финансирование",
      router: routers.financing,
      uuid: uuid(),
    },
    {
      name: "Панорамы",
      router: routers.panoramas,
      uuid: uuid(),
    },
    {
      name: "Камеры",
      router: routers.cameras,
      uuid: uuid(),
    },
    {
      name: "Поручения",
      router: routers.instructions,
      uuid: uuid(),
    },
    {
      name: "Контрагенты",
      router: routers.contractors,
      uuid: uuid(),
    },
  ];

  return (
    <section className={style.section}>
      <div className={style.titleBox}>
        <h1 className={style.titleBox__title + " " + style.title}>{title}</h1>
        <h2 className={style.titleBox__abbr + " " + style.abbr}>
          {abbreviation}
        </h2>
        <button className={style.titleBox__button + " " + style.button}>
          <KeyboardArrowDownIcon className={style.icon} />
        </button>
      </div>
      <ul className={style.ul}>
        {list.map((el) => {
          return (
            <NavButton
              name={el.name}
              router={el.router}
              uuid={el.uuid}
              isActive={location === el.router}
              key={el.uuid}
            />
          );
        })}
      </ul>
    </section>
  );
};
