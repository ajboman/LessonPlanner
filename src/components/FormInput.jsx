import { TextInput, Textarea, Label } from 'flowbite-react';

const FormInput = ({ type, name, placeholder, value, onChange }) => {
    return (
      <Label>
        {name.charAt(0).toUpperCase() + name.slice(1)}:
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
  