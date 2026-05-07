'use client';

import { usePathname } from 'next/navigation';
import { Objector, Style } from '@esmalley/ts-utils';

// icons
import KeyboardArrowUpIcon from '@esmalley/react-material-icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@esmalley/react-material-icons/KeyboardArrowDown';
import WebIcon from '@esmalley/react-material-icons/Web';
import { useState } from 'react';
import { Dimensions, Drawer, IconButton, Typography, useTheme, useWindowDimensions } from '@esmalley/react-material-ui';

const getSideBarContents = () => {
  const pathname = usePathname();
  const theme = useTheme();

  const [expanded, setExpanded] = useState(new Set(['inputs', 'containers', 'layouts', 'text', 'buttons', 'overlay', 'tables']));

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

      <Typography type='a' href="/" style={getSidebarItemStyle('/')}>
        Getting started
      </Typography>

      {sections.map((row) => {
        const section = row.value;
        const row_children = row.children;

        if (!row_children || !row_children.length) {
          return (
            <Typography type='a' href={`/${section}`} style={getSidebarItemStyle(`/${section}`)}>{row.name}</Typography>
          );
        }
        return (
          <>
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
              return (
                expanded.has(section) ?
                <Typography type='a' href={`/${section}/${child.value}`} style={getSidebarItemStyle(`/${section}/${child.value}`)}><span style = {{ paddingLeft: 10 }}></span>{child.name}</Typography>
                  : ''
              );
            })}
          </div>
          </>
        );
      })}
    </div>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const { width } = useWindowDimensions() as Dimensions;
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    width <= 750 ?
    <>
      <div style = {{ flexShrink: 0, width: 50, textAlign: 'center', paddingTop: 10 }}>
        <IconButton onClick = {() => setDrawerOpen(!drawerOpen)} value = 'sidebar' icon = {<WebIcon style = {{ fontSize: 24, color: theme.text.secondary }} />} />
      </div>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {getSideBarContents()}
      </Drawer>
    </>
      :
      <div className={Style.getStyleClassName({ flexShrink: 0, overflowY: 'auto' })}>
      {getSideBarContents()}
    </div>
  );
};

export default Sidebar;
