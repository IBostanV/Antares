import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {useRouter} from 'next/router';
import {logout} from '../../api/authentication';
import {NavbarItem} from './NavbarItem';
import {useTranslation} from "react-i18next";
import getLanguages from "../../api/question/get-languages";
import saveUserLanguage from "../../api/profile/save-language";
import {toast} from "react-toastify";
import {SecureComponent} from "../security";
import {FlexContainer} from "../common/FlexContainer";

const LinkButtonGroup = ({ links }) => {
  const {t} = useTranslation();

  function getButton(link) {
    return (
      <NavbarItem key={link.href || link.text}>
        <button onClick={link.onClick}>
          {t(link.text)}
        </button>
      </NavbarItem>
    );
  }

  return (
    <FlexContainer>
      {links.map((link) => link.href ? (
        <Link key={link.href} href={link.href}>
          {getButton(link)}
        </Link>
      ) : (getButton(link)))}
    </FlexContainer>
  );
};

function Navbar({ isLoggedIn }) {
  const router = useRouter();
  const {i18n} = useTranslation();

  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState(1);

  const signOut = () => logout()
      .then(() => router.push('/'));

  useEffect(() => {
    const fetchLanguages = async () => await getLanguages();
    fetchLanguages().then(setLanguages);

    const langId = localStorage.getItem('langId');
    setLanguage(langId);
  }, [isLoggedIn]);

  const handleLanguage = (event) => {
    const value = event.target.value;
    const newLang = languages.find(item => item.langId.toString() === value);

    const saveNewLanguage = async () => await saveUserLanguage(newLang);

    saveNewLanguage()
        .then((saved) => {
          if (saved) {
            localStorage.setItem('langCode', newLang.langCode);
            localStorage.setItem('langId', newLang.langId);
            setLanguage(newLang.langId);

            i18n.changeLanguage(newLang.langCode)
                .then((tFnc) => toast.success(tFnc('saved')));
          }
        });
  }

  const commonLinks = [
    {
      href: '/',
      text: 'home'
    },
    {
      href: '/quiz/categorized',
      text: 'take_quiz'
    },
    {
      href: '/quiz/express',
      text: 'express_quiz'
    },
    {
      href: '/chat',
      text: 'chat'
    },
    {
      href: '/knowledge-base',
      text: 'knowledge_base'
    },
    {
      href: '/admin',
      text: 'admin_dashboard'
    }
  ];

  const authenticatedLinks = [
    {
      href: '/profile',
      text: 'profile'
    },
    {
      text: 'sign_out',
      onClick: signOut
    }
  ];

  const unauthenticatedLinks = [
    {
      href: '/login',
      text: 'login'
    },
    {
      href: '/register',
      text: 'register'
    }
  ];

  const changeLang =
      <select className={'lang-select mx-3'} onChange={handleLanguage} value={language}>
        {languages?.map(lang =>
            <option key={lang.langId} value={lang.langId}>{lang.langCode}</option>
        )}
      </select>

  const notLoggedInRender =
      <FlexContainer>
        {changeLang}
        <LinkButtonGroup links={unauthenticatedLinks}/>
      </FlexContainer>;

  return (
      <div className="header">
        <LinkButtonGroup links={commonLinks}/>
        <SecureComponent
            roles={['ROLE_USER']}
            isAuthenticated={isLoggedIn}
            defaultRender={notLoggedInRender}
        >
          <FlexContainer>
            {changeLang}
            <LinkButtonGroup links={authenticatedLinks}/>
          </FlexContainer>
        </SecureComponent>
      </div>
  );
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
};

LinkButtonGroup.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape),
};

export default Navbar;
