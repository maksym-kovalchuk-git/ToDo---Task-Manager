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

        <section className="features">
          <h2 className="features__title">{t('features.sectionTitle')}</h2>
          <div className="features__grid">

            <div className="feature-card">
              <video className="feature-card__video" autoPlay muted loop playsInline>
                <source src="/videos/drag-drop.mp4" type="video/mp4" />
              </video>
              <h3 className="feature-card__title">{t('features.organize.title')}</h3>
              <p className="feature-card__desc">{t('features.organize.desc')}</p>
            </div>

            <div className="feature-card">
              <video className="feature-card__video" autoPlay muted loop playsInline>
                <source src="/videos/bg-switch.mp4" type="video/mp4" />
              </video>
              <h3 className="feature-card__title">{t('features.theme.title')}</h3>
              <p className="feature-card__desc">{t('features.theme.desc')}</p>
            </div>

            <div className="feature-card">
              <video className="feature-card__video" autoPlay muted loop playsInline>
                <source src="/videos/deadline.mp4" type="video/mp4" />
              </video>
              <h3 className="feature-card__title">{t('features.deadline.title')}</h3>
              <p className="feature-card__desc">{t('features.deadline.desc')}</p>
            </div>

            <div className="feature-card">
              <video className="feature-card__video" autoPlay muted loop playsInline>
                <source src="/videos/columns.mp4" type="video/mp4" />
              </video>
              <h3 className="feature-card__title">{t('features.columns.title')}</h3>
              <p className="feature-card__desc">{t('features.columns.desc')}</p>
            </div>

          </div>
        </section>
      </main>

      <footer className="home-footer">
        <span className="home-footer__copy">© {new Date().getFullYear()} ToDo - Task Manager</span>
        <a
          className="home-footer__github"
          href="https://github.com/maksym-kovalchuk-git/ToDo---Task-Manager"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
          GitHub
        </a>
        <span className="home-footer__license">MIT License</span>
      </footer>
    </>
  )
}

export default Home;