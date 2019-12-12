# react-img-cropper

基于 `react-image-crop` 封装了一层，支持 `antd` 的 _Upload_ 组件和简单 _file_ 类型的 `input`

`package` 中包含 _es_ 和 _umd_(CommonJS & umd 混合) 两种 _module_，开发者可按需引用

## 使用

### es import

```js
import ReactImgCropper from 'react-img-cropper';

...
<ReactImgCropper
  uploadedImgBase64={uploadedImgBase64}
  uploadedImgFile={uploadedImgFile}
  setCroppedImgBlob={setCroppedImgBlob}
  setCroppedImgObjectURL={setCroppedImgObjectURL}
  showPreviewText
/>
...
```

## 开发调试

```shell
# 安装依赖
$ yarn install

# 调试
$ npm run examples:debug

# 构建
$ npm run build

# 发布
$ npm run publish
```

## 示例代码

### 支持

- `antd` 的 _Upload_ 组件
- 简单 _file_ 类型的 `input`

### 依赖

- node
- npm

```shell
# 安装依赖
$ yarn install

# 构建 examples 代码
# 启动 node server，处理图片上传，上传图片目录： examples/static/uploadedImg
$ npm run examples
```
