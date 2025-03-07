import { Header, NavList, WorksPanel } from "../components";
import style from "./App.module.scss";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { listSelector } from "../services/store/ListStore/listSelector";
import { API } from "../services/API/Api";
import { addOneOrAll } from "../services/store/ListStore/listSlace";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch()

  const list = useAppSelector(listSelector);

  const getList = async () => {
    await API.getList()
      .then((res) => {
        dispatch(addOneOrAll(res));
      })  
      .catch((err) => {
        console.log(err)
      })
  }


  useEffect(() => {
    getList()
  }, [])

  return (
    <>
      <Header />
      <div className={style.content}>
        <NavList title="Название проекта" abbreviation="Аббревиатура" />
        <WorksPanel title="Строительно-монтажные работы" list={list} />
      </div>
    </>
  );
}

export default App;
