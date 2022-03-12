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
  type?: string;
  className?: string;
}

interface IPropsInput {
  field: FieldValues;
  fieldState: DeepMap<FieldValues, FieldError>;
  label: string;
  className?: string;
}

const Input = ({ field, fieldState, label, className }: IPropsInput) => {
  return (
    <Form.Group className="mb-3" controlId={field.name}>
      <Form.Check
        {...field}
        type="checkbox"
        label={label}
        value={label}
        className={className}
      />
    </Form.Group>
  );
};

export const Checkbox = ({
  name,
  label,
  placeholder,
  type = 'text',
  control,
  rules,
  className,
}: IPropsControllInput) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          field={field}
          className={className}
          fieldState={fieldState}
          label={label}
        />
      )}
    />
  );
};
