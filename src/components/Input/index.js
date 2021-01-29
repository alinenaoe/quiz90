import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputBase = styled.input`
  width: 100%;
  height: 40px;
  background: none;
  color: ${({ theme }) => theme.colors.contrastText};
  border: 1px solid ${({ theme }) => theme.colors.contrastText};
  border-radius: 4px;
  padding: 10px;
  outline: 0;
  margin-bottom: 24px;
`;

export default function Input({
  name, value, onChange, placeholder, ...props
}) {
  return (
    <>
      <InputBase
        type="text"
        name="nome"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
    </>
  );
}

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
