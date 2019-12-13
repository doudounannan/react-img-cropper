import * as React from 'react';
import { useState, useEffect } from 'react';

import ReactImgCropper from '../../src/ReactImgCropper';

interface Props {
	imgUri?: string;
}

const getBase64 = (
	img: File,
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

const uploadCropper: React.FC<Readonly<Props>> = (props: Props) => {
	const [finalImgUri, setFinalImgUri] = useState('');
	const [uploadedImgFile, setUploadedImgFile] = useState<File>();
	const [uploadedImgBase64, setUploadedImgBase64] = useState('');
	const [croppedImgBlob, setCroppedImgBlob] = useState<Blob>();
	const [croppedImgObjectURL, setCroppedImgObjectURL] = useState('');

	const { imgUri } = props;

	useEffect(() => {
		if (imgUri) {
			setFinalImgUri(imgUri);
		}
	}, [imgUri]);

	const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		const file = e.target.files[0];

		setUploadedImgFile(file);

		getBase64(file, imgUrl => {
			setUploadedImgBase64(imgUrl as string);
		});
	};

	const onUpload = () => {
		const formData: FormData = new FormData();

		formData.append('image', croppedImgBlob, uploadedImgFile.name);

		fetch('http://localhost:4000/uploader', {
			method: 'POST',
			body: formData
		})
			.then((res: Response) => res.json())
			.then((data: { code: number }) => {
				if (data.code === 0) {
					setFinalImgUri(croppedImgObjectURL);
				}
			});
	};

	return (
		<div className='wrapper'>
			<input
				type='file'
				name='image'
				onChange={onChange}
				style={{ marginBottom: '20px' }}
			/>

			<ReactImgCropper
				uploadedImgBase64={uploadedImgBase64}
				uploadedImgFile={uploadedImgFile}
				setCroppedImgBlob={setCroppedImgBlob}
				setCroppedImgObjectURL={setCroppedImgObjectURL}
				showPreviewText
			/>

			<button onClick={onUpload} style={{ marginTop: '20px' }}>
				确定
			</button>
		</div>
	);
};

export default uploadCropper;
