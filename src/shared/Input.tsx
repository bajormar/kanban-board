import React from 'react';
import classNames from 'classnames';

type Props = {
  id?: string;
  name?: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  placeholder: string;
  onChange?: (value: string) => void;
  className?: string;
  forwardedRef?: any;
};

const Input: React.FC<Props> = ({
  id,
  name,
  type,
  value,
  forwardedRef,
  defaultValue,
  placeholder,
  onChange,
  className,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      ref={forwardedRef}
      className={classNames(
        className,
        'shadow appearance-none border rounded py-2 px-3 text-gray-700leading-tight focus:outline-none focus:shadow-outline'
      )}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={e => {
        if (onChange) {
          onChange(e.currentTarget.value);
        }
      }}
      aria-label="input"
    />
  );
};

export default Input;
