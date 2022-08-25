import React from 'react';

import './Styles.css';
const ModalUI = (props) => {
	return (
		<div className="modal-container">
			<div className="modal-inner-container">{props.children}</div>
		</div>
	);
};

export default ModalUI;
