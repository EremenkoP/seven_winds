import { FC } from "react";
import { ILink } from "../../services/types/forRender";
import style from "./NavButton.module.scss";

interface INavButton extends ILink {
  isActive: boolean;
}

export const NavButton: FC<INavButton> = ({ name, uuid, isActive }) => {
  return (
    <li key={uuid} className={style.li + " " + (isActive && style.li_active)}>
      <a className={style.a}>
        <p className={style.text + " " + style.text_accient}>{name}</p>
      </a>
    </li>
  );
};
