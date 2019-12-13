import * as React from 'react';
import { PureComponent } from 'react';
// @ts-ignore
import ReactCrop, { Crop } from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

import { RcFile } from 'antd/lib/upload';

// TODO
type EnhancedFile = File & { [key: string]: string | boolean | number };

interface Props {
	uploadedImgBase64: string;
	// TODO
	// uploadedImgFile: RcFile;
	uploadedImgFile: any;
	setCroppedImgBlob(data: Blob): void;
	setCroppedImgObjectURL(data: string): void;
	previewText?: string;
	showPreviewText?: boolean;
}

interface State {
	croppedImageObjectURL: string;
	crop: Crop;
}

class ReactImgCropper extends PureComponent<Readonly<Props>, State> {
	public state = {
		croppedImageObjectURL: '',
		crop: {
			unit: '%' as '%' | 'px',
			width: 30,
			aspect: 1
		}
	};

	private fileUrl: string;
	private imageRef: HTMLImageElement;

	private getCroppedImg = (image: HTMLImageElement, crop: Crop) => {
		const {
			width: croppedWidth = 0,
			height: croppedHeight = 0,
			x: croppedX = 0,
			y: croppedY = 0
		} = crop;
		const {
			naturalWidth: imageNaturalWidth,
			naturalHeight: imageNaturalHeight,
			width: imageWidth,
			height: imageHeight
		} = image;

		const canvas = document.createElement('canvas');
		canvas.width = croppedWidth;
		canvas.height = croppedHeight;
		const ctx = canvas.getContext('2d');

		const scaleX = imageNaturalWidth / imageWidth;
		const scaleY = imageNaturalHeight / imageHeight;

		ctx.drawImage(
			image,
			croppedX * scaleX,
			croppedY * scaleY,
			croppedWidth * scaleX,
			croppedHeight * scaleY,
			0,
			0,
			croppedWidth,
			croppedHeight
		);

		return new Promise((resolve, reject) => {
			canvas.toBlob((blob: Blob & { name: string }) => {
				const { uploadedImgFile, setCroppedImgBlob } = this.props;

				if (!blob) {
					console.error('Canvas is empty');
					return;
				}

				blob.name = uploadedImgFile.name;

				setCroppedImgBlob(blob);

				window.URL.revokeObjectURL(this.fileUrl);
				this.fileUrl = window.URL.createObjectURL(blob);

				resolve(this.fileUrl);
			}, 'image/jpeg');
		});
	};

	private async makeClientCrop(crop: Crop) {
		if (this.imageRef && crop.width && crop.height) {
			const croppedImageObjectURL = await this.getCroppedImg(
				this.imageRef,
				crop
			);

			this.props.setCroppedImgObjectURL(croppedImageObjectURL as string);
			this.setState({ croppedImageObjectURL: croppedImageObjectURL as string });
		}
	}

	private onImageLoaded = (image: HTMLImageElement) => {
		this.imageRef = image;
	};

	private onCropChange = (crop: Crop) => {
		this.setState({ crop });
	};

	private onCropComplete = (crop: Crop) => {
		this.makeClientCrop(crop);
	};

	render() {
		const { imageRef, onImageLoaded, onCropComplete, onCropChange } = this;
		const { uploadedImgBase64, previewText, showPreviewText } = this.props;
		const { crop, croppedImageObjectURL } = this.state;

		return (
			<div className='cropper'>
				{uploadedImgBase64 && (
					<ReactCrop
						src={uploadedImgBase64}
						crop={crop}
						ruleOfThirds
						onImageLoaded={onImageLoaded}
						onComplete={onCropComplete}
						onChange={onCropChange}
					/>
				)}

				{showPreviewText && <h4>{previewText || '预览'}</h4>}

				{croppedImageObjectURL && (
					<img
						alt='Crop'
						style={{ maxWidth: '100%' }}
						src={croppedImageObjectURL}
					/>
				)}
			</div>
		);
	}
}

export default ReactImgCropper;
