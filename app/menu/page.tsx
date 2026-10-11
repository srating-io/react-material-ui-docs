'use client';

import React, { useState } from 'react';
import ListIcon from '@esmalley/react-material-icons/List';
import InfoIcon from '@esmalley/react-material-icons/Info';
import CheckCircleIcon from '@esmalley/react-material-icons/CheckCircle';
import {
  Button, CodeBlock, Divider, getToaster, Menu, MenuDivider, MenuItem, MenuList, MenuListIcon,
  MenuListText, MenuOption, Paper, Tile, Typography, useTheme,
} from '@esmalley/react-material-ui';
import PropsTable from '../../components/PropsTable';

const getOptions = () => {
  return [
    {
      value: 'option1',
      label: 'Option 1',
      secondaryLabel: 'Description for option 1',
      icon: <ListIcon />,
      selectable: true,
      onSelect: (opt: MenuOption) => getToaster().add(`Selected: ${opt.label}`, 'success'),
    },
    {
      value: 'option2',
      label: 'Option 2',
      secondaryLabel: 'Description for option 2',
      icon: <InfoIcon />,
      selectable: true,
      onSelect: (opt: MenuOption) => getToaster().add(`Selected: ${opt.label}`, 'success'),
    },
    {
      group: 'Actions',
      value: 'action1',
      label: 'Action 1',
      icon: <CheckCircleIcon />,
      selectable: true,
      onSelect: (opt: MenuOption) => getToaster().add(`Selected: ${opt.label}`, 'success'),
    },
    {
      value: 'disabled-option',
      label: 'Disabled Option',
      secondaryLabel: 'You cannot click this',
      disabled: true,
      selectable: true,
    },
  ];
};

const BasicMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleAnchorClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  return (
    <>
      <Button onClick={handleAnchorClick} value='menu-button' title='Open menu' />
      <Menu
        open={menuOpen}
        anchor={anchorEl}
        onClose={() => {
          setMenuOpen(false);
          setAnchorEl(null);
        }}
        options={getOptions()}
      />
    </>
  );
};

const TileMenu = () => {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <Tile
        primary="Context Menu"
        secondary="Click to see options"
        icon={<ListIcon style={{ color: theme.info.main }} />}
        onClick={(e) => {
          const target = (e.currentTarget as HTMLElement);
          setAnchorEl(target);
          setMenuOpen(true);
        }}
      />
      <Menu
        open={menuOpen}
        anchor={anchorEl}
        onClose={() => {
          setMenuOpen(false);
          setAnchorEl(null);
        }}
        options={getOptions()}
      />
    </>
  );
};


export default function Page() {
  const theme = useTheme();

  return (
    <div>
      <Typography type="h5" style={{ marginBottom: 10 }}>
        Menu
      </Typography>
      <Typography type="body1" style={{ color: theme.text.secondary, marginBottom: 30 }}>
        Examples of how to implement the Menu component with different configurations.
      </Typography>
      <Divider />
      <section style={{ marginTop: 40 }}>
        <Typography type="h6">Standard</Typography>
        <Typography type="body2" style={{ marginBottom: 20 }}>
          Click the button below to trigger a menu anchored to it.
        </Typography>
        <BasicMenu />

        <CodeBlock code={`
          import { Button, Menu, MenuOption, getToaster } from '@esmalley/react-material-ui';
          import ListIcon from '@esmalley/react-material-icons/List';

          const getOptions = () => {
            return [
              {
                value: 'option1',
                label: 'Option 1',
                secondaryLabel: 'Description for option 1',
                icon: <ListIcon />,
                selectable: true,
                onSelect: (opt: MenuOption) => getToaster().add(\`Selected: \${opt.label}\`, 'success'),
              },
              {
                value: 'option2',
                label: 'Option 2',
                secondaryLabel: 'Description for option 2',
                icon: <InfoIcon />,
                selectable: true,
                onSelect: (opt: MenuOption) => getToaster().add(\`Selected: \${opt.label}\`, 'success'),
              },
              {
                group: 'Actions',
                value: 'action1',
                label: 'Action 1',
                icon: <CheckCircleIcon />,
                selectable: true,
                onSelect: (opt: MenuOption) => getToaster().add(\`Selected: \${opt.label}\`, 'success'),
              },
              {
                value: 'disabled-option',
                label: 'Disabled Option',
                secondaryLabel: 'You cannot click this',
                disabled: true,
                selectable: true,
              },
            ];
          };

          const BasicMenu = () => {
            const [menuOpen, setMenuOpen] = useState(false);
            const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
            const handleAnchorClick = (event: React.MouseEvent<HTMLElement>) => {
              setAnchorEl(event.currentTarget);
              setMenuOpen(true);
            };

            return (
              <>
                <Button onClick={handleAnchorClick} value='menu-button' title='Open menu' />
                <Menu
                  open={menuOpen}
                  anchor={anchorEl}
                  onClose={() => {
                    setMenuOpen(false);
                    setAnchorEl(null);
                  }}
                  options={getOptions()}
                />
              </>
            );
          };
        `} />
      </section>
      <section style={{ marginTop: 40 }}>
        <Typography type='h6' style={{ marginBottom: 10 }}>Tile Interaction</Typography>
        <Typography type="body2" style={{ marginBottom: 20 }}>
          Using a Tile as an anchor for a menu.
        </Typography>
        <div style={{ width: '300px' }}>
          <TileMenu />
        </div>

        <CodeBlock code={`
          import { Tile, Menu, MenuOption, getToaster } from '@esmalley/react-material-ui';
          import InfoIcon from '@esmalley/react-material-icons/Info';
          import CheckCircleIcon from '@esmalley/react-material-icons/CheckCircle';

          const getOptions = () => {
            return [
              {
                value: 'option1',
                label: 'Option 1',
                secondaryLabel: 'Description for option 1',
                icon: <ListIcon />,
                selectable: true,
                onSelect: (opt: MenuOption) => getToaster().add(\`Selected: \${opt.label}\`, 'success'),
              },
              {
                value: 'option2',
                label: 'Option 2',
                secondaryLabel: 'Description for option 2',
                icon: <InfoIcon />,
                selectable: true,
                onSelect: (opt: MenuOption) => getToaster().add(\`Selected: \${opt.label}\`, 'success'),
              },
              {
                group: 'Actions',
                value: 'action1',
                label: 'Action 1',
                icon: <CheckCircleIcon />,
                selectable: true,
                onSelect: (opt: MenuOption) => getToaster().add(\`Selected: \${opt.label}\`, 'success'),
              },
              {
                value: 'disabled-option',
                label: 'Disabled Option',
                secondaryLabel: 'You cannot click this',
                disabled: true,
                selectable: true,
              },
            ];
          };

          const TileMenu = () => {
            const theme = useTheme();
            const [menuOpen, setMenuOpen] = useState(false);
            const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

            return (
              <>
                <Tile
                  primary="Context Menu"
                  secondary="Click to see options"
                  icon={<ListIcon style={{ color: theme.info.main }} />}
                  onClick={(e) => {
                    const target = (e.currentTarget as HTMLElement);
                    setAnchorEl(target);
                    setMenuOpen(true);
                  }}
                />
                <Menu
                  open={menuOpen}
                  anchor={anchorEl}
                  onClose={() => {
                    setMenuOpen(false);
                    setAnchorEl(null);
                  }}
                  options={getOptions()}
                />
              </>
            );
          };
        `} />
      </section>

      <section style={{ marginTop: 40 }}>
        <Typography type='h6' style={{ marginBottom: 10 }}>Building a menu by hand</Typography>
        <Typography type='body2' style={{ marginBottom: 10 }}>
          <code>Menu</code>{' '}assembles its rows from the <code>options</code>{' '}array, but the pieces it
          uses are exported too. Compose them directly when you need a surface <code>Menu</code>{' '}does not
          produce &mdash; a sidebar list, a popover body, or a row layout with its own markup.
        </Typography>

        <Paper style={{ maxWidth: 320, padding: 0 }}>
          <MenuList>
            <MenuItem onClick={() => getToaster().add('Profile', 'info')}>
              <MenuListIcon><InfoIcon style={{ fontSize: 20, color: theme.info.main }} /></MenuListIcon>
              <MenuListText primary='Profile' secondary='Name, avatar and contact' />
            </MenuItem>

            <MenuItem active onClick={() => getToaster().add('Billing', 'info')}>
              <MenuListIcon><ListIcon style={{ fontSize: 20, color: theme.info.main }} /></MenuListIcon>
              <MenuListText primary='Billing' secondary='The active row looks like this' />
            </MenuItem>

            <MenuDivider />

            <MenuItem onClick={() => getToaster().add('Done', 'success')}>
              <MenuListIcon><CheckCircleIcon style={{ fontSize: 20, color: theme.success.main }} /></MenuListIcon>
              <MenuListText primary='Mark as done' />
            </MenuItem>

            <MenuItem disabled>
              <MenuListText primary='Delete account' secondary='Disabled in this demo' />
            </MenuItem>
          </MenuList>
        </Paper>

        <CodeBlock code={`
          import {
            MenuDivider, MenuItem, MenuList, MenuListIcon, MenuListText, Paper,
          } from '@esmalley/react-material-ui';
          import InfoIcon from '@esmalley/react-material-icons/Info';

          <Paper style={{ maxWidth: 320, padding: 0 }}>
            <MenuList>
              <MenuItem onClick={handleProfile}>
                <MenuListIcon><InfoIcon style={{ fontSize: 20 }} /></MenuListIcon>
                <MenuListText primary='Profile' secondary='Name, avatar and contact' />
              </MenuItem>

              <MenuItem active onClick={handleBilling}>
                <MenuListText primary='Billing' />
              </MenuItem>

              <MenuDivider />

              <MenuItem disabled>
                <MenuListText primary='Delete account' />
              </MenuItem>
            </MenuList>
          </Paper>
        `} />
        <Typography type='body2' style={{ marginBottom: 10 }}>
          These parts are presentational only. <code>MenuList</code>{' '}renders a <code>ul</code>{' '}and{' '}
          <code>MenuItem</code>{' '}an <code>li</code>, both taken out of the tab order, so composing them
          yourself means wiring up your own keyboard handling &mdash; the arrow-key navigation and Escape
          handling live in <code>Menu</code>, not in these parts.
        </Typography>

        <PropsTable
          rows={[
            { name: 'MenuList', type: '{ style?, children }', description: 'The ul wrapper. Supplies the list reset and vertical padding.' },
            { name: 'MenuItem', type: '{ disabled?, active?, onClick?, style?, children }', description: 'One row. active applies the same highlight the keyboard navigation uses; disabled greys it out and blocks pointer events.' },
            { name: 'MenuListIcon', type: '{ style?, children }', description: 'Leading icon slot. Fixed right padding so labels line up.' },
            { name: 'MenuListText', type: '{ primary, secondary?, style? }', description: 'The text block. primary is required, secondary renders smaller underneath.' },
            { name: 'MenuDivider', type: 'no props', description: 'A hairline between groups of rows.' },
          ]}
        />
      </section>

      <section style={{ marginTop: 40 }}>
        <Typography type='h6' style={{ marginBottom: 10 }}>MenuOption</Typography>
        <Typography type='body2' style={{ marginBottom: 10 }}>
          The shape of each entry in the <code>options</code>{' '}array.
        </Typography>
        <PropsTable
          note='Groups render in the order they first appear - options are not sorted for you, so pre-sort the array if you want grouped output.'
          rows={[
            { name: 'value', type: 'string | number | null', required: true, description: 'Identifies the option. Also used as the React key.' },
            { name: 'selectable', type: 'boolean', required: true, description: 'Whether arrow-key navigation can land on this row. Set false for headers and separators.' },
            { name: 'label', type: 'string', description: 'Primary text. Falls back to Unknown when omitted.' },
            { name: 'secondaryLabel', type: 'string', description: 'Smaller second line under the label.' },
            { name: 'icon', type: 'React.JSX.Element', description: 'Leading icon.' },
            { name: 'customLabel', type: 'React.JSX.Element', description: 'Replaces the whole row rendering. The row stays clickable.' },
            { name: 'group', type: 'string', description: 'The first option carrying a given group renders a group header above it.' },
            { name: 'disabled', type: 'boolean', description: 'Greys the row out and suppresses onSelect.' },
            { name: 'onSelect', type: '(option: MenuOption) => void', description: 'Fired on click, and on Enter when the row is the active one.' },
            { name: 'style', type: 'object', description: 'Merged into the row.' },
          ]}
        />
      </section>

      <section style={{ marginTop: 40 }}>
        <Typography type='h6' style={{ marginBottom: 10 }}>Menu props</Typography>
        <PropsTable
          note='Menu portals into #menu-root, falling back to document.body, and renders nothing until it is open.'
          rows={[
            { name: 'open', type: 'boolean', required: true, description: 'Whether the menu is showing.' },
            { name: 'options', type: 'MenuOption[]', required: true, description: 'The rows to render.' },
            { name: 'anchor', type: 'HTMLElement | null', required: true, description: 'The element to position against, usually captured from the click that opened the menu.' },
            { name: 'onClose', type: '() => void', required: true, description: 'Called on Escape, on a click outside, and on a backdrop click.' },
            { name: 'anchorOrigin', type: '{ vertical, horizontal }', default: "{ vertical: 'top', horizontal: 'left' }", description: 'vertical reads center, bottom or a number; horizontal reads center, right or a number. Anything else falls back to 36px vertical and 0 horizontal.' },
            { name: 'useAnchorWidth', type: 'boolean', default: 'false', description: 'Match the menu width to the anchor. This is how Select lines its dropdown up.' },
            { name: 'showCloseButton', type: 'boolean', default: 'false', description: 'Adds a sticky close button in the top right.' },
            { name: 'style', type: 'React.CSSProperties', default: '{}', description: 'Merged into the menu surface.' },
          ]}
        />
        <Typography type='body2' style={{ marginBottom: 10 }}>
          The menu caps its height to the space below the anchor but does not flip above it, so anchor it
          with that in mind near the bottom of a tall page.
        </Typography>
      </section>
    </div>
  );
}
