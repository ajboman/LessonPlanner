import { TextInput, Textarea, Label } from 'flowbite-react';

const FormInput = ({ type, name, placeholder, value, onChange }) => {
  const formattedName = name.replace(/([A-Z])/g, ' $1').trim();

  return (
    <Label>
      {formattedName.charAt(0).toUpperCase() + formattedName.slice(1)}:
      {type === 'text' ? (
        <TextInput
          type='text'
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <Textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className='textarea'
        />
      )}
    </Label>
  );
};

export default FormInput;
