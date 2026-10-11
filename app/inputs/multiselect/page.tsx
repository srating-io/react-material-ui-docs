'use client';

import SearchIcon from '@esmalley/react-material-icons/Search';
import { CodeBlock, Columns, Divider, Inputs, MultiSelect, MultiSelectInputProps, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';
import { useState } from 'react';

type ControlledMultiSelectProps = Omit<MultiSelectInputProps, 'options'> & {
  options?: MultiSelectInputProps['options'];
};

const ControlledMultiSelect = (props: ControlledMultiSelectProps) => {
  const { value: propsValue, options: propsOptions, ...otherProps } = props;
  const [value, setValue] = useState<(string | number)[]>(propsValue || []);
  const inputHandler = new Inputs();

  const options = [
    {
      label: 'Option 1',
      value: 1,
    },
    {
      label: 'Option 2',
      value: 2,
    },
    {
      label: 'Option 3',
      value: 3,
    },
    {
      label: 'Option 4',
      value: 4,
    },
    {
      label: 'Option 5',
      value: 5,
    },
  ];

  return (
    <MultiSelect
      inputHandler={inputHandler}
      value={value}
      onChange={(val) => setValue(val)}
      options={propsOptions || options}
      {...otherProps}
    />
  );
};

export default function Page() {
  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>MultiSelect</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        A multiple-choice dropdown. The trigger is the same styled element as Select, but the menu rows are checkboxes and the value is an array, so the menu stays open while you tick several of them.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>The wrapper used below</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Every example on this page renders through this small page-local wrapper, so each one is a real
        controlled input with its own state and its own form handler. Swap it for your own state and the
        snippets work as written.
      </Typography>
      <CodeBlock code={`
        import { useState } from 'react';
        import { Inputs, MultiSelect, MultiSelectInputProps } from '@esmalley/react-material-ui';

        const options = [
          { label: 'Option one', value: 1 },
          { label: 'Option two', value: 2 },
        ];

        const ControlledMultiSelect = (props: Omit<MultiSelectInputProps, 'options'>) => {
          const { value: propsValue, ...otherProps } = props;
          const [value, setValue] = useState<(string | number)[]>(propsValue || []);
          const inputHandler = new Inputs();

          return (
            <MultiSelect
              inputHandler={inputHandler}
              options={options}
              value={value}
              onChange={(val) => setValue(val)}
              {...otherProps}
            />
          );
        };
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard</Typography>
      <Columns numberOfColumns={3}>
        <ControlledMultiSelect placeholder='Outlined' variant='outlined' />
        <ControlledMultiSelect placeholder='Filled' variant='filled' />
        <ControlledMultiSelect placeholder='Standard' variant='standard' />
      </Columns>
      <CodeBlock code={`
        import { Columns, MultiSelect } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledMultiSelect placeholder='Outlined' variant='outlined' />
          <ControlledMultiSelect placeholder='Filled' variant='filled' />
          <ControlledMultiSelect placeholder='Standard' variant='standard' />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard w/ label</Typography>
      <Columns numberOfColumns={3}>
        <ControlledMultiSelect label='Outlined label' placeholder='Outlined' variant='outlined' />
        <ControlledMultiSelect label='Filled label' placeholder='Filled' variant='filled' />
        <ControlledMultiSelect label='Standard label' placeholder='Standard' variant='standard' />
      </Columns>
      <CodeBlock code={`
        import { Columns, MultiSelect } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledMultiSelect label='Outlined label' placeholder='Outlined' variant='outlined' />
          <ControlledMultiSelect label='Filled label' placeholder='Filled' variant='filled' />
          <ControlledMultiSelect label='Standard label' placeholder='Standard' variant='standard' />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>The All option</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        allOption prepends a row that clears the selection back to an empty array, which is the usual way
        to say &quot;no filter&quot;. It reads as ticked only while nothing is selected &mdash; selecting every
        option one by one is a different value from selecting All, so the row does not pretend otherwise.
        Rename it with allLabel.
      </Typography>
      <Columns numberOfColumns={2}>
        <ControlledMultiSelect label='Clears to an empty array' placeholder='Conferences' allOption />
        <ControlledMultiSelect label='Renamed' placeholder='Conferences' allOption allLabel='Everything' />
      </Columns>
      <CodeBlock code={`
        import { Columns, MultiSelect } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={2}>
          <ControlledMultiSelect label='Clears to an empty array' placeholder='Conferences' allOption />
          <ControlledMultiSelect label='Renamed' placeholder='Conferences' allOption allLabel='Everything' />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>What the trigger shows</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        displayMode picks between listing the selected labels, counting them, or showing nothing at all so
        the placeholder carries the meaning. The last one is how you get a plain
        &quot;Conferences&quot; button that never changes as the selection does.
      </Typography>
      <Columns numberOfColumns={3}>
        <ControlledMultiSelect label="'labels'" placeholder='Pick some' displayMode='labels' value={[1, 2]} />
        <ControlledMultiSelect label="'count'" placeholder='Pick some' displayMode='count' value={[1, 2]} />
        <ControlledMultiSelect label="'none'" placeholder='Conferences' displayMode='none' value={[1, 2]} />
      </Columns>
      <CodeBlock code={`
        import { Columns, MultiSelect } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledMultiSelect label="'labels'" placeholder='Pick some' displayMode='labels' value={[1, 2]} />
          <ControlledMultiSelect label="'count'" placeholder='Pick some' displayMode='count' value={[1, 2]} />
          <ControlledMultiSelect label="'none'" placeholder='Conferences' displayMode='none' value={[1, 2]} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Custom trigger text</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        renderValue overrides displayMode entirely. It receives the selected options, in the order they
        appear in the value array, and is called even when nothing is selected.
      </Typography>
      <ControlledMultiSelect
        label='Reworded'
        placeholder='Pick some'
        value={[1, 3]}
        renderValue={(selected) => (selected.length ? `${selected.length} of 5 chosen` : 'Nothing yet')}
      />
      <CodeBlock code={`
        import { MultiSelect } from '@esmalley/react-material-ui';

        <ControlledMultiSelect
          label='Reworded'
          placeholder='Pick some'
          value={[1, 3]}
          renderValue={(selected) => (selected.length ? \`\${selected.length} of 5 chosen\` : 'Nothing yet')}
        />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Close on select</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        The menu stays open by default, since the point is ticking several boxes. Set closeOnSelect when a
        single pick is the common case and the array is only there to allow the occasional second one.
      </Typography>
      <ControlledMultiSelect label='Closes after each pick' placeholder='Pick one' closeOnSelect />
      <CodeBlock code={`
        import { MultiSelect } from '@esmalley/react-material-ui';

        <ControlledMultiSelect label='Closes after each pick' placeholder='Pick one' closeOnSelect />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Errors</Typography>
      <Columns numberOfColumns={3}>
        <ControlledMultiSelect placeholder='Outlined' variant='outlined' error={true} errorMessage='Outlined error message!' />
        <ControlledMultiSelect placeholder='Filled' variant='filled' error={true} errorMessage='Filled error message!' />
        <ControlledMultiSelect placeholder='Standard' variant='standard' error={true} errorMessage='Standard error message!' />
      </Columns>
      <CodeBlock code={`
        import { Columns, MultiSelect } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledMultiSelect placeholder='Outlined' variant='outlined' error={true} errorMessage='Outlined error message!' />
          <ControlledMultiSelect placeholder='Filled' variant='filled' error={true} errorMessage='Filled error message!' />
          <ControlledMultiSelect placeholder='Standard' variant='standard' error={true} errorMessage='Standard error message!' />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Disabled</Typography>
      <Columns numberOfColumns={3}>
        <ControlledMultiSelect placeholder='Outlined' variant='outlined' disabled={true} />
        <ControlledMultiSelect placeholder='Filled' variant='filled' disabled={true} />
        <ControlledMultiSelect placeholder='Standard' variant='standard' disabled={true} />
      </Columns>
      <CodeBlock code={`
        import { Columns, MultiSelect } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledMultiSelect placeholder='Outlined' variant='outlined' disabled={true} />
          <ControlledMultiSelect placeholder='Filled' variant='filled' disabled={true} />
          <ControlledMultiSelect placeholder='Standard' variant='standard' disabled={true} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Required</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        An empty array counts as nothing selected, so a required MultiSelect blocks a save button through
        its inputHandler even before anyone touches it. Note that required and allOption contradict each
        other &mdash; All produces the empty value that required rejects.
      </Typography>
      <Columns numberOfColumns={3}>
        <ControlledMultiSelect placeholder='Outlined' variant='outlined' required={true} />
        <ControlledMultiSelect placeholder='Filled' variant='filled' required={true} />
        <ControlledMultiSelect placeholder='Standard' variant='standard' required={true} />
      </Columns>
      <CodeBlock code={`
        import { Columns, MultiSelect } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledMultiSelect placeholder='Outlined' variant='outlined' required={true} />
          <ControlledMultiSelect placeholder='Filled' variant='filled' required={true} />
          <ControlledMultiSelect placeholder='Standard' variant='standard' required={true} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Icons</Typography>
      <Columns numberOfColumns={3}>
        <ControlledMultiSelect icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='outlined' />
        <ControlledMultiSelect icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='filled' />
        <ControlledMultiSelect icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='standard' />
      </Columns>
      <CodeBlock code={`
        import { Columns, MultiSelect } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledMultiSelect icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='outlined' />
          <ControlledMultiSelect icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='filled' />
          <ControlledMultiSelect icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='standard' />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Clear input</Typography>
      <Columns numberOfColumns={3}>
        <ControlledMultiSelect placeholder='Clear' variant='outlined' clear={true} value={[1]} />
        <ControlledMultiSelect placeholder='Clear' variant='filled' clear={true} value={[2, 3]} />
        <ControlledMultiSelect placeholder='Clear' variant='standard' clear={true} value={[3]} />
      </Columns>
      <CodeBlock code={`
        import { Columns, MultiSelect } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledMultiSelect placeholder='Clear' variant='outlined' clear={true} value={[1]} />
          <ControlledMultiSelect placeholder='Clear' variant='filled' clear={true} value={[2, 3]} />
          <ControlledMultiSelect placeholder='Clear' variant='standard' clear={true} value={[3]} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Hide Error msg</Typography>
      <Columns numberOfColumns={3}>
        <ControlledMultiSelect placeholder='Hidden error message' variant='outlined' showError={false} />
        <ControlledMultiSelect placeholder='Hidden error message' variant='filled' showError={false} />
        <ControlledMultiSelect placeholder='Hidden error message' variant='standard' showError={false} />
      </Columns>
      <CodeBlock code={`
        import { Columns, MultiSelect } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledMultiSelect placeholder='Hidden error message' variant='outlined' showError={false} />
          <ControlledMultiSelect placeholder='Hidden error message' variant='filled' showError={false} />
          <ControlledMultiSelect placeholder='Hidden error message' variant='standard' showError={false} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Hide placeholder transform</Typography>
      <Columns numberOfColumns={3}>
        <ControlledMultiSelect placeholder='Hide placeholder' variant='outlined' transformPlaceholder={false} />
        <ControlledMultiSelect placeholder='Hide placeholder' variant='filled' transformPlaceholder={false} />
        <ControlledMultiSelect placeholder='Hide placeholder' variant='standard' transformPlaceholder={false} />
      </Columns>
      <CodeBlock code={`
        import { Columns, MultiSelect } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledMultiSelect placeholder='Hide placeholder' variant='outlined' transformPlaceholder={false} />
          <ControlledMultiSelect placeholder='Hide placeholder' variant='filled' transformPlaceholder={false} />
          <ControlledMultiSelect placeholder='Hide placeholder' variant='standard' transformPlaceholder={false} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Props</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        The shared base props &mdash; variant, label, placeholder, defaultValue, required, disabled, error,
        errorMessage, showError, triggerValidation, validator, transformOnBlur, clear and icon &mdash; are
        documented once on the{' '}
        <Typography type='a' href='/inputs/validation'>Forms and validation</Typography>{' '}page. Listed
        below are the props specific to this component. For a single choice use{' '}
        <Typography type='a' href='/inputs/select'>Select</Typography>, and for a grid of cards rather than
        a dropdown use <Typography type='a' href='/inputs/multiple'>MultiPicker</Typography>.
      </Typography>
      <PropsTable
        note='The menu matches the width of the trigger, the same as Select. Arrow keys move through the rows and Enter toggles one; Space does not. A value with no matching option is dropped from the trigger text and flagged as invalid.'
        rows={[
          { name: 'options', type: 'SelectOption[]', required: true, description: 'The choices, each { label, value }. The same type Select takes, so option arrays are interchangeable.' },
          { name: 'value', type: '(string | number)[]', description: 'The selected values. An empty array means nothing selected. Leave it off to use the input uncontrolled.' },
          { name: 'onChange', type: '(value: (string | number)[]) => void', description: 'Receives the whole next array, never a single value.' },
          { name: 'allOption', type: 'boolean', default: 'false', description: 'Prepends a row that clears the selection to []. Ticked only while the selection is empty.' },
          { name: 'allLabel', type: 'string', default: '\'All\'', description: 'Label for that row.' },
          { name: 'displayMode', type: 'MultiSelectDisplay', default: '\'labels\'', description: "What the closed trigger shows: 'labels' joins them with commas, 'count' shows \"2 selected\", 'none' shows nothing so the placeholder carries the meaning." },
          { name: 'renderValue', type: '(selected: SelectOption[]) => React.ReactNode', description: 'Overrides displayMode. Receives the selected options in value order, and is called even when the selection is empty.' },
          { name: 'closeOnSelect', type: 'boolean', default: 'false', description: 'Close the menu after a row is toggled.' },
          { name: 'showMenuCloseButton', type: 'boolean', default: 'false', description: 'Adds a close button inside the menu, which helps on a long list.' },
          { name: 'ref', type: 'RefObject<HTMLDivElement | null>', default: 'null', description: 'Attaches to the trigger element.' },
        ]}
      />
    </div>
  );
}
