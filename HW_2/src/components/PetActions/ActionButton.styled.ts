import styled from '@emotion/styled';

interface ActionButtonProps {
  variant: 'feed' | 'levelup' | 'cheer' | 'reset';
  disabled?: boolean;
}

const getVariantColors = (variant: ActionButtonProps['variant']) => {
  switch (variant) {
    case 'feed':
      return {
        bg: '#4caf50',
        hover: '#45a049',
        disabled: '#555',
      };
    case 'levelup':
      return {
        bg: '#2196f3',
        hover: '#1976d2',
        disabled: '#555',
      };
    case 'cheer':
      return {
        bg: '#ff9800',
        hover: '#f57c00',
        disabled: '#555',
      };
    case 'reset':
      return {
        bg: '#9e9e9e',
        hover: '#757575',
        disabled: '#555',
      };
  }
};

export const ActionButton = styled.button<ActionButtonProps>`
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #ffffff;
  background-color: ${({ variant, disabled }) => {
    const colors = getVariantColors(variant);
    return disabled ? colors.disabled : colors.bg;
  }};

  &:hover:not(:disabled) {
    background-color: ${({ variant }) => {
      const colors = getVariantColors(variant);
      return colors.hover;
    }};
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
  }
`;
