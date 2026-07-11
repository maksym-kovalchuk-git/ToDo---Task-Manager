import { useTranslation } from 'react-i18next';

import './LangSwitch.scss';

function LangSwitch() {
  const { i18n } = useTranslation();
  return (
    <button className='lang-switch' onClick={() => i18n.changeLanguage(i18n.language === 'uk' ? 'en' : 'uk')}>
      {i18n.language === 'uk' ? 'EN' : 'UA'}
    </button>
  );
}

export default LangSwitch;