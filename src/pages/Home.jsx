import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LangSwitch from "../components/LangSwitch";
import logo from "../assets/icons/todo-logo.svg";

import "./Home.scss"

function Home() {
  const { t } = useTranslation();

  return (
    <>
      <header className="home-header">
        <Link to="/" className="home-header__logo">
          <img src={logo} alt="ToDo" />
          <h1 className='app-title'>To
              <span className='home-header__accent'>Do </span>
              - Task Manager
          </h1>
        </Link>
        <div className='home-header__right-side'>
          <LangSwitch />
          <Link className='button-to-board' to="/board">
            {t('getStarted')}
          </Link>
        </div>
      </header>
      <main className="home-main">
        <section className="hero">
          <h2 className="hero__title">
            {t('hero.title')}<br />
            <span className="hero__accent">{t('hero.titleAccent')}</span>
          </h2>
          <p className="hero__subtitle">{t('hero.subtitle')}</p>
          <Link className="hero__cta" to="/board">{t('hero.cta')}</Link>
        </section>
      </main>
    </>
  )
}

export default Home;