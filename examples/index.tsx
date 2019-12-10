import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AntdUploadCropper from './src/AntdUploadCropper';

import './index.less';

let imgUri = '';

if (!true) {
	imgUri =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc_S0V_-e8SU7proXxAtLlYgkixn6YTIhm4u4aW8YBviBu_CjwtA&s';
}

const App = () => {
	return (
		<div className='app'>
			<div className='demo__item'>
				<h2>antd Upload</h2>
				<AntdUploadCropper imgUri={imgUri} />
			</div>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
