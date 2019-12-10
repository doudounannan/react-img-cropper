import * as React from 'react';
import { useState, useEffect } from 'react';

import { Upload, Icon, Button } from 'antd';

import { RcFile } from 'antd/lib/upload';

import ReactImgCropper from '../../src/ReactImgCropper';

import 'antd/dist/antd.css';
import './AntdUploadCropper.less';

interface Props {
	imgUri?: string;
}

const getBase64 = (
	img: RcFile,
	callback: (data: string | ArrayBuffer) => void
) => {
	const reader = new FileReader();

	reader.addEventListener('load', () => {
		if (reader.result) {
			callback(reader.result);
		}
	});

	reader.readAsDataURL(img);
};

const AntdUploadCropper: React.FC<Readonly<Props>> = (props: Props) => {
	const [finalImgUri, setFinalImgUri] = useState('');
	const [uploadedImgFile, setUploadedImgFile] = useState<RcFile>();
	const [uploadedImgBase64, setUploadedImgBase64] = useState('');
	const [croppedImgBlob, setCroppedImgBlob] = useState<Blob>();
	const [croppedImgObjectURL, setCroppedImgObjectURL] = useState('');

	const { imgUri } = props;

	useEffect(() => {
		setFinalImgUri(imgUri);
	}, [imgUri]);

	const beforeUpload = (file: RcFile) => {
		setUploadedImgFile(file);

		getBase64(file, imgUrl => {
			setUploadedImgBase64(imgUrl as string);
		});

		return false;
	};

	const onUpload = () => {
		console.log('debug-onUpload');
	};

	return (
		<>
			<Upload
				name='image'
				listType='picture-card'
				className='img__uploader'
				showUploadList={false}
				beforeUpload={beforeUpload}
				accept={'.jpg,.jpeg,.png'}
			>
				{finalImgUri && (
					<img className='img--preview' src={finalImgUri} alt='头像' />
				)}

				{!finalImgUri && (
					<div>
						<Icon type='plus' />
						<div className='upload__text'>上传头像</div>
					</div>
				)}
			</Upload>

			<div className='cropper__wrapper'>
				<ReactImgCropper
					uploadedImgBase64={uploadedImgBase64}
					uploadedImgFile={uploadedImgFile}
					setCroppedImgBlob={setCroppedImgBlob}
					setCroppedImgObjectURL={setCroppedImgObjectURL}
				/>
			</div>

			<Button type='primary' onClick={onUpload} className='upload__btn'>
				确定
			</Button>
		</>
	);
};

export default React.memo(AntdUploadCropper);
