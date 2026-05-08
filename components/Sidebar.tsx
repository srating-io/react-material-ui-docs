'use client';

import { usePathname } from 'next/navigation';
import { Objector, Style } from '@esmalley/ts-utils';

// icons
import KeyboardArrowUpIcon from '@esmalley/react-material-icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@esmalley/react-material-icons/KeyboardArrowDown';
import WebIcon from '@esmalley/react-material-icons/Web';
import { useEffect, useRef, useState } from 'react';
import { Drawer, IconButton, Typography, useTheme } from '@esmalley/react-material-ui';

const SidebarContents = () => {
  const pathname = usePathname();
  const theme = useTheme();
  const activeLinkRef = useRef<HTMLAnchorElement | null>(null);

  const [expanded, setExpanded] = useState(new Set(['inputs', 'containers', 'layouts', 'text', 'buttons', 'overlay', 'tables']));

  // Scroll active item into view when path changes or on mount
  useEffect(() => {
    console.log('hello', activeLinkRef)
    if (activeLinkRef.current) {
      console.log('ok', activeLinkRef.current)
      activeLinkRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest', // Scrolls only if it's hidden out of view
      });
    }
  }, [pathname, activeLinkRef.current]);

  const sections = [
    {
      value: 'layouts',
      name: 'Layouts',
      children: [
        { value: 'columns', name: 'Columns' },
        { value: 'wizard', name: 'Wizard' },
      ],
    },
    {
      value: 'containers',
      name: 'Containers',
      children: [
        { value: 'paper', name: 'Paper' },
        { value: 'chip', name: 'Chip' },
        { value: 'slab', name: 'Slab' },
        { value: 'tile', name: 'Tile' },
      ],
    },
    {
      value: 'text',
      name: 'Text',
      children: [
        { value: 'typography', name: 'Typography' },
        { value: 'codeblock', name: 'CodeBlock' },
      ],
    },
    {
      value: 'inputs',
      name: 'Inputs',
      children: [
        { value: 'text', name: 'Text' },
        { value: 'date', name: 'Date' },
        { value: 'select', name: 'Select' },
        { value: 'multiple', name: 'Multiple' },
        { value: 'toggle', name: 'Toggle' },
        { value: 'textarea', name: 'Textarea' },
      ],
    },
    {
      value: 'buttons',
      name: 'Buttons',
      children: [
        { value: 'button', name: 'Button' },
        { value: 'iconbutton', name: 'IconButton' },
        { value: 'tab', name: 'Tab' },
      ],
    },
    {
      value: 'overlay',
      name: 'Overlay',
      children: [
        { value: 'drawer', name: 'Drawer' },
        { value: 'plane', name: 'Plane' },
        { value: 'tooltip', name: 'Tooltip' },
        { value: 'toast', name: 'Toast' },
      ],
    },
    {
      value: 'tables',
      name: 'Tables',
      children: [
        { value: 'table', name: 'Table' },
        { value: 'virtualtable', name: 'Virtual table' },
      ],
    },
    {
      value: 'icons',
      name: 'Icons',
    },
    {
      value: 'modal',
      name: 'Modal',
    },
    {
      value: 'menu',
      name: 'Menu',
    },
    {
      value: 'loading',
      name: 'Loading states',
    },
  ];

  const getSidebarItemStyle = (path: string) => {
    const isActive = pathname === path;

    const style: Record<string, unknown> = {
      padding: '10px 0px',
      cursor: 'pointer',
      // borderRadius: '4px',
      color: isActive ? theme.info.main : theme.text.primary,
      transition: 'background-color 0.2s',
      display: 'block',
      textDecoration: 'none',
      paddingLeft: 20,
      '&:hover': {
        backgroundColor: theme.action.hover,
      },
    };

    if (isActive) {
      style.borderLeft = `1px solid ${style.color}`;
      style.backgroundColor = theme.action.hover;
    }
    return style;
  };


  return (
    <div style={{
      width: '250px',
      display: 'flex',
      flexDirection: 'column',
      // gap: '8px',
      backgroundColor: theme.background.main,
    }}>
      <Typography type='h6' style={{ marginBottom: '16px', paddingLeft: 20, color: theme.text.secondary }}>Component list</Typography>

      <Typography
        type='a'
        href="/" style={getSidebarItemStyle('/')}
        ref={pathname === '/' ? activeLinkRef : undefined}
      >
        Getting started
      </Typography>

      {sections.map((row, index) => {
        const section = row.value;
        const row_children = row.children;

        if (!row_children || !row_children.length) {
          const path = `/${section}`;
          return (
            <Typography
              ref={pathname === path ? activeLinkRef : undefined}
              key = {index}
              type='a'
              href={`/${section}`}
              style={getSidebarItemStyle(`/${section}`)}>{row.name}
            </Typography>
          );
        }
        return (
          <div key = {index}>
            <div
              style = {{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', paddingLeft: 20 }}
              onClick={() => {
                if (expanded.has(section)) {
                  expanded.delete(section);
                } else {
                  expanded.add(section);
                }
                setExpanded(Objector.deepClone(expanded));
              }}
            >
              <Typography type = 'body1'>{row.name}</Typography>
              {expanded.has(section) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
            <div>
              {row_children.map((child) => {
                const path = `/${section}/${child.value}`;
                return (
                  expanded.has(section) ?
                  <Typography
                    ref={pathname === path ? activeLinkRef : undefined}
                    key = {child.value} type='a' href={`/${section}/${child.value}`}
                    style={getSidebarItemStyle(`/${section}/${child.value}`)}
                  >
                    <span style = {{ paddingLeft: 10 }}></span>{child.name}
                  </Typography>
                    : ''
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return a stable structural placeholder of the identical desktop width (250px)
  // during SSR to prevent layout shifts.
  if (!isMounted) {
    return <div style={{ width: '250px', flexShrink: 0 }} />;
  }

  return (
    <>
      {/* 1. MOBILE SIDEBAR: Only visible when viewport <= 750px */}
      <div 
        className={Style.getStyleClassName({
          display: 'none', 
          '@media (max-width: 750px)': {
            display: 'block',
            flexShrink: 0, 
            width: '50px', 
            textAlign: 'center', 
            paddingTop: '10px'
          }
        })}
      >
        <IconButton 
          onClick={() => setDrawerOpen(!drawerOpen)} 
          value='sidebar' 
          icon={<WebIcon style={{ fontSize: 24, color: theme.text.secondary }} />} 
        />
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <SidebarContents />
        </Drawer>
      </div>

      {/* 2. DESKTOP SIDEBAR: Only visible when viewport > 750px */}
      <div 
        className={Style.getStyleClassName({
          display: 'block',
          flexShrink: 0, 
          overflowY: 'auto',
          '@media (max-width: 750px)': {
            display: 'none'
          }
        })}
      >
        <SidebarContents />
      </div>
    </>
  );
};

export default Sidebar;
