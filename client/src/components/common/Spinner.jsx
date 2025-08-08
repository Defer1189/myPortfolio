// myPortfolio/client/src/components/common/Spinner.jsx
import PropTypes from 'prop-types';
import React from 'react';

import '../../styles/Spinner.css';

const Spinner = ({ size = 'md', className = '' }) => {
    return <span className={`spinner spinner-${size} ${className}`} role='status' aria-label='Cargando' />;
};
Spinner.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
};

export default Spinner;
