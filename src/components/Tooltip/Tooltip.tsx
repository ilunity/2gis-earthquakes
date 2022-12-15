import React from 'react';

export const Tooltip = React.forwardRef<HTMLDivElement | null>((props, ref) => {
  return (
    <div
      ref={ ref }
      style={ {
        padding: '20px 40px',
        background: '#fff',
        boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
        borderRadius: '4px',
        display: 'none',
        position: 'fixed',
        zIndex: 1001,
        pointerEvents: 'none',
      } }
    />
  );
});
