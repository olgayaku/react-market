import { Form } from 'react-bootstrap';
import {
  FieldValues,
  FieldError,
  DeepMap,
  Controller,
  RegisterOptions,
  Control,
} from 'react-hook-form';

interface IOption {
  value: string | number;
  text: string;
}

interface IPropsControllInput {
  name: string;
  control: Control;
  rules?: RegisterOptions;
  label: string;
  className?: string;
  readOnly?: boolean;
  disabled?: boolean;
  options: IOption[];
}

interface IPropsInput {
  field: FieldValues;
  fieldState: DeepMap<FieldValues, FieldError>;
  label: string;
  className?: string;
  readOnly: boolean;
  disabled: boolean;
  options: IOption[];
}

const Input = ({
  field,
  fieldState,
  label,
  className,
  readOnly,
  disabled,
  options,
}: IPropsInput) => {
  const { invalid, error } = fieldState;
  return (
    <Form.Group className="mb-3" controlId={field.name}>
      <Form.Label>{label}</Form.Label>

      <Form.Select
        {...field}
        aria-label={label}
        className={className}
        isInvalid={invalid}
        disabled={disabled || readOnly}
      >
        {options.map((e) => (
          <option value={e.value} key={e.value}>
            {e.text}
          </option>
        ))}
      </Form.Select>

      <Form.Control.Feedback type="invalid">
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export const Select = ({
  name,
  label,
  control,
  rules,
  className,
  readOnly = false,
  disabled = false,
  options,
}: IPropsControllInput) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState }) => (
      <Input
        disabled={disabled}
        readOnly={readOnly}
        className={className}
        field={field}
        fieldState={fieldState}
        label={label}
        options={options}
      />
    )}
  />
);
