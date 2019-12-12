import * as React from 'react';
import { useState, useEffect } from 'react';

import { Upload, Icon, Button, message } from 'antd';

import { RcFile } from 'antd/lib/upload';

import ReactImgCropper from '../../es/ReactImgCropper';

import 'antd/dist/antd.css';

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
    if (imgUri) {
      setFinalImgUri(imgUri);
    }
  }, [imgUri]);

  const beforeUpload = (file: RcFile) => {
    setUploadedImgFile(file);

    getBase64(file, imgUrl => {
      setUploadedImgBase64(imgUrl as string);
    });

    return false;
  };

  const onUpload = () => {
    const formData: FormData = new FormData();

    formData.append('image', croppedImgBlob, uploadedImgFile?.name);

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
    <>
      <Upload
        name="image"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        accept={'.jpg,.jpeg,.png'}
      >
        {finalImgUri && (
          <img
            style={{ width: '100px', height: '100px' }}
            src={finalImgUri}
            alt="头像"
          />
        )}

        {!finalImgUri && (
          <div>
            <Icon type="plus" />
            <div>上传头像</div>
          </div>
        )}
      </Upload>

      <ReactImgCropper
        uploadedImgBase64={uploadedImgBase64}
        uploadedImgFile={uploadedImgFile}
        setCroppedImgBlob={setCroppedImgBlob}
        setCroppedImgObjectURL={setCroppedImgObjectURL}
        showPreviewText
      />

      <Button type="primary" onClick={onUpload} style={{ marginTop: '20px' }}>
        确定
      </Button>
    </>
  );
};

export default React.memo(AntdUploadCropper);
