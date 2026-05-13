'use client';

// Icons
import DarkModeIcon from '@esmalley/react-material-icons/ModeNight';
import LightModeIcon from '@esmalley/react-material-icons/LightMode';
import { Code as GitHubIcon } from '@esmalley/react-material-icons/Code';
import OpenInNewIcon from '@esmalley/react-material-icons/OpenInNew';

import sratingLogo from '../public/favicon-32x32.png';


import { Objector, Style } from '@esmalley/ts-utils';
import { IconButton, Tooltip, Typography, useTheme, useWindowDimensions } from '@esmalley/react-material-ui';
import { set_theme_mode } from '../app/contents';

const getLogoColorPrimary = (): string => {
  const theme = useTheme();

  return theme.mode === 'light' ? theme.warning.light : '#FDD835';
};

const getLogoColorSecondary = (): string => {
  const theme = useTheme();

  return theme.mode === 'light' ? '#482ab9' : '#2ab92a';
};


export const headerBarHeight = 64;

const Header = () => {
  const theme = useTheme();

  const { width } = useWindowDimensions();

  const logoPrimaryColor = getLogoColorPrimary();
  const logoSecondaryColor = getLogoColorSecondary();


  const logoStyle: React.CSSProperties = {
    // 'fontFamily': 'Consolas',
    // 'fontFamily': 'Courier New',
    fontWeight: 600,
    fontSize: '20px',
    fontStyle: 'italic',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };

  const shrinkName = width <= 425;

  const headerStyle = {
    position: 'fixed',
    width: '100%',
    zIndex: Style.getZIndex().appBar,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.header.main,
    color: '#fff',
  };

  const toolBarStyle = {
    minHeight: 56,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    '@media (min-width: 600px)': {
      minHeight: 64,
    },
    justifyContent: 'space-between',
  };

  const iconStyle = {
    fontSize: 20,
    color: (theme.mode === 'dark' ? theme.info.main : '#fff'),
  };


  return (
    <div className={Style.getStyleClassName(headerStyle)}>
      <div style = {{ padding: '0px 20px' }}>
        <div className = {Style.getStyleClassName(toolBarStyle)}>
          <div style={{ display: 'flex' }}>
            <Typography type = 'a' href='/' style = {{ '&:hover': { textDecoration: 'none' } }}>
              <div style = {Objector.extender({ display: 'flex', marginRight: 5, alignItems: 'center' }, logoStyle)}>
                {width > 425 ? <img src={sratingLogo.src} width = '20' height = '20' style = {{ marginRight: 5 }} /> : ''}
                <><span style = {{ color: (theme.mode === 'dark' ? logoPrimaryColor : '#fff') }}>S</span><span style = {{ color: (theme.mode === 'dark' ? logoSecondaryColor : '#31ff00') }}>R{shrinkName ? '' : 'ATING'} UX</span></>
              </div>
            </Typography>
            <Tooltip text={'srating.io'}>
              <IconButton
                style = {iconStyle}
                value = {'srating.io'}
                icon = {<OpenInNewIcon />}
                onClick={() => window.open('https://srating.io', '_blank')}
              />
            </Tooltip>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip text={(theme.mode === 'dark' ? 'Light mode' : 'Dark mode')}>
              <IconButton
                style = {iconStyle}
                value = {theme.mode}
                icon = {(theme.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />)}
                onClick={() => set_theme_mode((theme.mode === 'light' ? 'dark' : 'light'))}
              />
            </Tooltip>
            |
            <Tooltip text='Github'>
              <div style = {{ display: 'flex', alignItems: 'center', marginLeft: 5, cursor: 'pointer' }} onClick={() => window.open('https://github.com/srating-io/react-material-ui', '_blank')}>
                <Typography type = 'caption' style = {{ color: iconStyle.color }}>{process.env.VERSION}</Typography>
                <IconButton
                  style = {iconStyle}
                  value = {'git'} icon = {<GitHubIcon />}
                  onClick={() => window.open('https://github.com/srating-io/react-material-ui', '_blank')}
                />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
