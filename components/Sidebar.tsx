'use client';

import { usePathname } from 'next/navigation';
import { Objector, Style } from '@esmalley/ts-utils';

// icons
import KeyboardArrowUpIcon from '@esmalley/react-material-icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@esmalley/react-material-icons/KeyboardArrowDown';
import WebIcon from '@esmalley/react-material-icons/Web';

import React, { useEffect, useRef, useState } from 'react';

import {
  Drawer,
  IconButton,
  Typography,
  useTheme,
} from '@esmalley/react-material-ui';
import Link from 'next/link';


const SidebarContents = ({
  scrollContainerRef,
}: {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const pathname = usePathname();
  const theme = useTheme();

  const activeLinkRef = useRef<HTMLAnchorElement | null>(null);

  const [expanded, setExpanded] = useState(
    new Set([
      'inputs',
      'containers',
      'layouts',
      'text',
      'buttons',
      'overlay',
      'tables',
    ]),
  );

  // Manual scrolling instead of scrollIntoView()
  // fixes iOS sticky/overflow bugs
  useEffect(() => {
    const activeEl = activeLinkRef.current;
    const container = scrollContainerRef.current;

    if (!activeEl || !container) return;

    requestAnimationFrame(() => {
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();

      const isAbove = activeRect.top < containerRect.top;
      const isBelow = activeRect.bottom > containerRect.bottom;

      if (!isAbove && !isBelow) return; // already fully visible

      const targetTop =
        activeRect.top -
        containerRect.top +
        container.scrollTop -
        24;

      container.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: 'smooth',
      });
    });
  }, [pathname, scrollContainerRef]);

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
      value: 'themeprovider',
      name: 'ThemeProvider',
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
      padding: '8px 0px 8px 16px',
      cursor: 'pointer',
      color: isActive ? theme.info.main : theme.text.primary,
      transition: 'background-color 0.2s',
      display: 'block',
      textDecoration: 'none',
      fontSize: 13,
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
    <div
      style={{
        width: '250px',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 8,
        paddingBottom: 32,
      }}
    >
      <Typography
        type='body1'
        style={{
          paddingLeft: 16,
          color: theme.text.secondary,
        }}
      >
        Component list
      </Typography>

      <Link
        href='/'
        className={Style.getStyleClassName(getSidebarItemStyle('/'))}
        ref={pathname === '/' ? activeLinkRef : undefined}
      >
        Getting started
      </Link>

      {sections.map((row, index) => {
        const section = row.value;
        const rowChildren = row.children;

        if (!rowChildren?.length) {
          const path = `/${section}`;

          return (
            <Link
              key = {index}
              ref={pathname === path ? activeLinkRef : undefined}
              href={path}
              className={Style.getStyleClassName(getSidebarItemStyle(path))}
            >
              {row.name}
            </Link>
          );
        }

        return (
          <div key={index}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'pointer',
                paddingLeft: 16,
                paddingRight: 12,
                paddingTop: 8,
                paddingBottom: 8,
              }}
              onClick={() => {
                const next = new Set(expanded);

                if (next.has(section)) {
                  next.delete(section);
                } else {
                  next.add(section);
                }

                setExpanded(next);
              }}
            >
              <Typography type='body2'>{row.name}</Typography>

              {expanded.has(section) ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </div>

            {expanded.has(section) && (
              <div>
                {rowChildren.map((child) => {
                  const path = `/${section}/${child.value}`;

                  return (
                    <Link
                      key={child.value}
                      ref={pathname === path ? activeLinkRef : undefined}
                      href={path}
                      className={Style.getStyleClassName(getSidebarItemStyle(path))}
                    >
                      <span style={{ paddingLeft: 10 }} />
                      {child.name}
                    </Link>
                  );
                })}
              </div>
            )}
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

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div style={{ width: '250px', flexShrink: 0 }} />;
  }

  return (
    <>
      {/* MOBILE */}
      <div
        className={Style.getStyleClassName(
          Objector.extender(
            {
              display: 'none',
              '@media (max-width: 750px)': {
                display: 'block',
                flexShrink: 0,
                width: '40px',
                position: 'sticky',
                top: 0,
                alignSelf: 'flex-start',
                textAlign: 'center',
                paddingTop: '10px',
              },
            },
            {},
          ),
        )}
      >
        <IconButton
          onClick={() => setDrawerOpen(!drawerOpen)}
          value='sidebar'
          icon={
            <WebIcon
              style={{
                fontSize: 24,
                color: theme.text.secondary,
              }}
            />
          }
        />

        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <SidebarContents
            scrollContainerRef={{
              current: null,
            }}
          />
        </Drawer>
      </div>

      {/* DESKTOP */}
      <div
        ref={scrollContainerRef}
        className={Style.getStyleClassName(
          Objector.extender(
            {
              display: 'block',
              flexShrink: 0,

              position: 'sticky',
              top: 0,

              height: '100dvh',
              minHeight: 0,
              paddingBottom: 64,

              overflowY: 'auto',
              overflowX: 'hidden',

              WebkitOverflowScrolling: 'touch',

              backgroundColor: theme.background.main,

              '@media (max-width: 750px)': {
                display: 'none',
              },
            },
            {},
          ),
        )}
      >
        <SidebarContents
          scrollContainerRef={scrollContainerRef}
        />
      </div>
    </>
  );
};

export default Sidebar;