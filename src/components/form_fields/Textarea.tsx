import { Form } from 'react-bootstrap';
import {
  FieldValues,
  FieldError,
  DeepMap,
  Controller,
  RegisterOptions,
  Control,
} from 'react-hook-form';

interface IPropsControllInput {
  name: string;
  control: Control;
  rules?: RegisterOptions;
  label: string;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  disabled?: boolean;
  rows: number;
}

interface IPropsInput {
  field: FieldValues;
  fieldState: DeepMap<FieldValues, FieldError>;
  label: string;
  placeholder: string;
  className?: string;
  readOnly: boolean;
  disabled: boolean;
  rows: number;
}

const Input = ({
  field,
  fieldState,
  label,
  placeholder,
  className,
  readOnly,
  disabled,
  rows,
}: IPropsInput) => {
  const { invalid, error } = fieldState;
  return (
    <Form.Group className="mb-3" controlId={field.name}>
      <Form.Label>{label}</Form.Label>
      {readOnly ? (
        <p>{field.value}</p>
      ) : (
        <Form.Control
          {...field}
          disabled={disabled}
          isInvalid={invalid}
          className={className}
          placeholder={placeholder}
          as='textarea'
          rows={rows}

        />
      )}
      <Form.Control.Feedback type="invalid">
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export const Textarea = ({
  name,
  label,
  placeholder = '',
  control,
  rules,
  className,
  readOnly = false,
  disabled = false,
  rows,
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
        placeholder={placeholder}
        rows={rows}
      />
    )}
  />
);
