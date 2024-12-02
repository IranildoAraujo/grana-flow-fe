// CurrencyInput.tsx
import React from 'react';
import Input from 'antd/es/input';

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
}


export const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onChange }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^0-9,]/g, ''); // Remove caracteres não numéricos, exceto vírgula
    
    // Garante que haja apenas uma vírgula
    const virgulaIndex = inputValue.indexOf(',');
    if (virgulaIndex !== -1) {
      inputValue = inputValue.substring(0, virgulaIndex + 1) + inputValue.substring(virgulaIndex + 1).replace(/,/g, '');
    }
    
    // Limita a duas casas decimais
    if (virgulaIndex !== -1 && inputValue.length - virgulaIndex - 1 > 2) {
      inputValue = inputValue.substring(0, virgulaIndex + 3);
    }
  
    onChange(inputValue);
  };

  return (
    <Input
      value={value}
      onChange={handleInputChange}
    />
  );
};

