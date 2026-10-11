'use client';

import { useState } from 'react';
import { Calendar, CodeBlock, Columns, Divider, Typography, useTheme } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';

export default function Page() {
  const theme = useTheme();

  const [basic, setBasic] = useState<string | null>('2026-06-15');
  const [bounded, setBounded] = useState<string | null>('2026-06-15');
  const [weekdays, setWeekdays] = useState<string | null>(null);

  const toValue = (date: Date) => date.toISOString().slice(0, 10);

  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Calendar</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        The standalone date grid. <code>DateInput</code>{' '}embeds this inside an anchored popover, but you can
        render it on its own when you want a date picker that is always visible.
      </Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Every prop is required &mdash; there are no defaults. If you do not want to restrict the range, pass
        wide bounds and a predicate that always returns <code>false</code>.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard</Typography>
      <Columns numberOfColumns={2}>
        <div>
          <Calendar
            value={basic}
            onChange={(date) => setBasic(toValue(date))}
            minDate='1900-01-01'
            maxDate='2100-01-01'
            shouldDisableDate={() => false}
          />
        </div>
        <div>
          <Typography type='body2' style={{ color: theme.text.secondary }}>
            Selected: {basic ?? 'nothing'}
          </Typography>
        </div>
      </Columns>
      <CodeBlock code={`
        import { useState } from 'react';
        import { Calendar } from '@esmalley/react-material-ui';

        const [value, setValue] = useState<string | null>('2026-06-15');

        <Calendar
          value={value}
          onChange={(date) => setValue(date.toISOString().slice(0, 10))}
          minDate='1900-01-01'
          maxDate='2100-01-01'
          shouldDisableDate={() => false}
        />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Navigation</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        The calendar has three views. Clicking the month name in the header opens a month grid, and clicking
        the year opens a year list. Picking a year drops back to the month grid, and picking a month drops
        back to the days &mdash; so jumping to a distant date is two clicks rather than a long arrow crawl.
      </Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        The header arrows step a month at a time in the day view and a year at a time in the month view.
        They are disabled in the year view. The day grid is always six weeks tall, so the calendar does not
        change height as you move between months.
      </Typography>
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Bounded range</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        <code>minDate</code>{' '}and <code>maxDate</code>{' '}grey out everything outside the range and cap the year
        list. The year list is also clamped to 200 years regardless of what you pass.
      </Typography>
      <Columns numberOfColumns={2}>
        <div>
          <Calendar
            value={bounded}
            onChange={(date) => setBounded(toValue(date))}
            minDate='2026-06-10'
            maxDate='2026-06-20'
            shouldDisableDate={() => false}
          />
        </div>
        <div>
          <Typography type='body2' style={{ color: theme.text.secondary }}>
            Limited to 2026-06-10 through 2026-06-20. Selected: {bounded ?? 'nothing'}
          </Typography>
        </div>
      </Columns>
      <CodeBlock code={`
        <Calendar
          value={value}
          onChange={(date) => setValue(toValue(date))}
          minDate='2026-06-10'
          maxDate='2026-06-20'
          shouldDisableDate={() => false}
        />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Disabling individual dates</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        <code>shouldDisableDate</code>{' '}runs for every rendered day, after the min and max checks. Use it for
        rules a range cannot express &mdash; weekends, holidays, days already booked.
      </Typography>
      <Columns numberOfColumns={2}>
        <div>
          <Calendar
            value={weekdays}
            onChange={(date) => setWeekdays(toValue(date))}
            minDate='1900-01-01'
            maxDate='2100-01-01'
            shouldDisableDate={(date) => date.getDay() === 0 || date.getDay() === 6}
          />
        </div>
        <div>
          <Typography type='body2' style={{ color: theme.text.secondary }}>
            Weekends are not selectable. Selected: {weekdays ?? 'nothing'}
          </Typography>
        </div>
      </Columns>
      <CodeBlock code={`
        <Calendar
          value={value}
          onChange={(date) => setValue(toValue(date))}
          minDate='1900-01-01'
          maxDate='2100-01-01'
          shouldDisableDate={(date) => date.getDay() === 0 || date.getDay() === 6}
        />
      `} />
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Note that <code>DateInput</code>{' '}does not forward this prop &mdash; it always passes a predicate that
        disables nothing. Render <code>Calendar</code>{' '}directly when you need per-day rules.
      </Typography>
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Props</Typography>
      <PropsTable
        note='onChange hands you a Date object. The value prop is a date string, so convert on the way back in.'
        rows={[
          { name: 'value', type: 'string | null | undefined', required: true, description: 'The selected date. Changing it re-navigates the grid to that month and resets to the day view.' },
          { name: 'onChange', type: '(date: Date) => void', required: true, description: 'Called with the picked day as a Date.' },
          { name: 'minDate', type: 'string', required: true, description: 'Earliest selectable date. Days before it are disabled and the year list starts here.' },
          { name: 'maxDate', type: 'string', required: true, description: 'Latest selectable date.' },
          { name: 'shouldDisableDate', type: '(date: Date) => boolean', required: true, description: 'Return true to disable a day. Runs after the min and max checks. Pass () => false to disable nothing.' },
        ]}
      />
    </div>
  );
}
