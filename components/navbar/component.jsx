import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { logout } from '../../api/authentication';
import { NavbarItem } from './NavbarItem';
import {useTranslation} from "react-i18next";
import {Col} from "react-bootstrap";
import {Dropdown} from "primereact/dropdown";
import getLanguages from "../../api/question/get-languages";
import saveUserLanguage from "../../api/profile/save-language";
import {toast} from "react-toastify";

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
    <div className="d-flex">
      {links.map((link) => link.href ? (
        <Link key={link.href} href={link.href}>
          {getButton(link)}
        </Link>
      ) : (getButton(link)))}
    </div>
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
    fetchLanguages()
        .then(result => setLanguages(result));

    setLanguage(localStorage.getItem('lang')?.langId);
  }, []);

  const handleLanguage = (event) => {
    const value = event.target.value;
    const newLang = languages.find(item => item.langId.toString() === value);

    const saveNewLanguage = async () => await saveUserLanguage(newLang);

    saveNewLanguage()
        .then((saved) => {
          if (saved) {
            localStorage.setItem('lang', newLang);
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

  const changeLang = () =>
      <select className={'lang-select mx-3'} onChange={handleLanguage} value={language}>
        {languages?.map(lang =>
            <option key={lang.langId} value={lang.langId}>{lang.langCode}</option>
        )}
      </select>

  return (
      <div className="header">
        <LinkButtonGroup links={commonLinks}/>
        {isLoggedIn
            ? (<div className={'d-flex'}>{changeLang()}<LinkButtonGroup links={authenticatedLinks}/></div>)
            : (<div className={'d-flex'}>{changeLang()}<LinkButtonGroup links={unauthenticatedLinks}/></div>)}
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
