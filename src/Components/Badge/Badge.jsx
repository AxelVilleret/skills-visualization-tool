import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Badge({ children }) {
  return (
    <div className="position-absolute top-0 end-0 translate-middle p-2 bg-primary rounded-circle">
      {children}
    </div>
  );
}

export default Badge;
