'use client';

import InfoIcon from '@esmalley/react-material-icons/Info';
import { CodeBlock, Divider, IconButton, Tooltip, Typography } from '@esmalley/react-material-ui';

export default function Page() {
  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Tooltip</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        Adds hover, focus and click driven title text to any element. Tooltip renders no wrapper of its own
        &mdash; it clones its single child, so the child must forward <code>ref</code>{' '}and the pointer and
        focus handlers to a real DOM node. Every component in this library already does.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Positions</Typography>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <Tooltip text='Top' position='top'>
          <IconButton icon={<InfoIcon style={{ fontSize: 30 }} />} value={1} onClick={() => {}} />
        </Tooltip>
        <Tooltip text='Left' position='left'>
          <IconButton icon={<InfoIcon style={{ fontSize: 30 }} />} value={2} onClick={() => {}} />
        </Tooltip>
        <Tooltip text='Right' position='right'>
          <IconButton icon={<InfoIcon style={{ fontSize: 30 }} />} value={3} onClick={() => {}} />
        </Tooltip>
        <Tooltip text='Bottom' position='bottom'>
          <IconButton icon={<InfoIcon style={{ fontSize: 30 }} />} value={4} onClick={() => {}} />
        </Tooltip>
      </div>
      <CodeBlock code={`
        import InfoIcon from '@esmalley/react-material-icons/Info';
        import { IconButton, Tooltip } from '@esmalley/react-material-ui';

        <Tooltip text='Top' position='top'>
          <IconButton icon={<InfoIcon style={{ fontSize: 30 }} />} value={1} onClick={() => {}} />
        </Tooltip>
        <Tooltip text='Left' position='left'>
          <IconButton icon={<InfoIcon style={{ fontSize: 30 }} />} value={2} onClick={() => {}} />
        </Tooltip>
        <Tooltip text='Right' position='right'>
          <IconButton icon={<InfoIcon style={{ fontSize: 30 }} />} value={3} onClick={() => {}} />
        </Tooltip>
        <Tooltip text='Bottom' position='bottom'>
          <IconButton icon={<InfoIcon style={{ fontSize: 30 }} />} value={4} onClick={() => {}} />
        </Tooltip>
      `} />
      <Typography type='body2' style={{ marginBottom: 10 }}>
        The tooltip is clamped into the viewport, so a tooltip near an edge may not sit exactly where
        <code>position</code>{' '}asks. It also hides on any scroll.
      </Typography>
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Delay</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        <code>delay</code>{' '}is the hover and focus delay in milliseconds, defaulting to 100. A click always
        shows the tooltip immediately, regardless of the delay.
      </Typography>
      <Tooltip text='Delayed tooltip' delay={1000}>
        <IconButton icon={<InfoIcon style={{ fontSize: 30 }} />} value={5} onClick={() => {}} />
      </Tooltip>
      <CodeBlock code={`
        <Tooltip text='Delayed tooltip' delay={1000}>
          <IconButton icon={<InfoIcon style={{ fontSize: 30 }} />} value={5} onClick={() => {}} />
        </Tooltip>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Click behavior</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        <code>onClickFade</code>{' '}hides the tooltip that many milliseconds after a click (default 3000, and
        0 disables it). <code>onClickRemove</code>{' '}inverts the interaction so a click hides instead of shows.
      </Typography>
      <div style={{ display: 'flex', gap: 20 }}>
        <Tooltip text='Click to show and fade' onClickFade={1000}>
          <IconButton icon={<InfoIcon style={{ fontSize: 30 }} />} value={6} onClick={() => {}} />
        </Tooltip>
        <Tooltip text='Click to remove' onClickRemove={true}>
          <IconButton icon={<InfoIcon style={{ fontSize: 30 }} />} value={7} onClick={() => {}} />
        </Tooltip>
      </div>
      <CodeBlock code={`
        <Tooltip text='Click to show and fade' onClickFade={1000}>
          <IconButton icon={<InfoIcon style={{ fontSize: 30 }} />} value={6} onClick={() => {}} />
        </Tooltip>
        <Tooltip text='Click to remove' onClickRemove={true}>
          <IconButton icon={<InfoIcon style={{ fontSize: 30 }} />} value={7} onClick={() => {}} />
        </Tooltip>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Focus</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Tooltips also open on keyboard focus. Pass <code>disableOnFocus</code>{' '}when that is noisy, for
        example on a densely packed toolbar.
      </Typography>
      <Tooltip text='Hover only, no focus' disableOnFocus>
        <IconButton icon={<InfoIcon style={{ fontSize: 30 }} />} value={9} onClick={() => {}} />
      </Tooltip>
      <CodeBlock code={`
        <Tooltip text='Hover only, no focus' disableOnFocus>
          <IconButton icon={<InfoIcon style={{ fontSize: 30 }} />} value={9} onClick={() => {}} />
        </Tooltip>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Custom styles</Typography>
      <Tooltip
        text='Custom styled tooltip'
        style={{ backgroundColor: 'red', color: 'white', borderRadius: '10px' }}
      >
        <IconButton icon={<InfoIcon style={{ fontSize: 30 }} />} value={8} onClick={() => {}} />
      </Tooltip>
      <CodeBlock code={`
        <Tooltip
          text='Custom styled tooltip'
          style={{ backgroundColor: 'red', color: 'white', borderRadius: '10px' }}
        >
          <IconButton icon={<InfoIcon style={{ fontSize: 30 }} />} value={8} onClick={() => {}} />
        </Tooltip>
      `} />
      <Divider />
    </div>
  );
}
