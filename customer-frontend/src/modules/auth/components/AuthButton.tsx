// AuthButton.tsx
import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import AuthBox from './AuthBox'; // Import AuthBox

const AuthButton: React.FC = () => {
  const [isAuthBoxOpen, setIsAuthBoxOpen] = useState(false);

  const handleAuthButtonClick = () => {
    setIsAuthBoxOpen(true);
  };

  const handleCloseAuthBox = () => {
    setIsAuthBoxOpen(false);
  };

  return (
    <div>
      <Button
        type="button"
        title="Auth"
        label="Sign In"
        icon="/assets/icons/user.png"
        variant={['btn', 'signin']}
        onClick={handleAuthButtonClick}
      />
      {isAuthBoxOpen && <AuthBox onClose={handleCloseAuthBox} />} {/* Render AuthBox when opened */}
    </div>
  );
};

export default AuthButton;
