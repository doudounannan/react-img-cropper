import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AntdUploadCropper from './AntdUploadCropper';
import InputCropper from './InputCropper';

let imgUri = '';

if (!true) {
  imgUri =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc_S0V_-e8SU7proXxAtLlYgkixn6YTIhm4u4aW8YBviBu_CjwtA&s';
}

const App = () => {
  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ width: '45%' }}>
        <h2>antd Upload</h2>
        <AntdUploadCropper imgUri={imgUri} />
      </div>

      <div style={{ width: '45%' }}>
        <h2>input Upload</h2>
        <InputCropper imgUri={imgUri} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
