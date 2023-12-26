import React, {RefObject, useState} from 'react';
import {Card, Divider, Form, message, Modal, Row, Tooltip, Typography, Upload, UploadProps} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import ReactQuill from "react-quill";
import * as Markerjs2 from "markerjs2";
import {IInstructionCard} from "../../pages/CreateInstruction/types";
import imageCls from "../InstructionContentCard/InstructionContentCard.module.scss";
import cls from './Card.module.scss'
import ContextMenu, {ContextMenuActions} from "../ContextMenu/ContextMenu";

const availableFiles = [
  'image/jpeg',
  'image/png'
]

const UploadButton = (
  <div>
    <InboxOutlined/>
    <div style={{marginTop: 8}}>Загрузить</div>
  </div>
);

const CreateInstructionCard = ({formValues, saveCallback, deleteCard, cardKey}: {
  formValues: IInstructionCard,
  saveCallback: (data: IInstructionCard) => void,
  deleteCard: () => void
  cardKey: number
}) => {
  const imgOriginalRef = React.createRef<HTMLImageElement>();
  const imgFakeRef = React.createRef<HTMLImageElement>();

  function showMarkerArea(ref: RefObject<HTMLImageElement>, whoseRef: 'original' | 'fake') {
    if (ref.current !== null) {
      const markerArea = new Markerjs2.MarkerArea(ref.current)
      markerArea.settings.displayMode = "popup"
      const colorSet = whoseRef === 'original' ? ['#28C98E'] : ['#ED522F']
      markerArea.settings.defaultColorSet = colorSet
      markerArea.settings.defaultColor = colorSet[0]
      markerArea.settings.defaultFillColor = 'transparent'
      markerArea.show()
      formValues.markerState[whoseRef] && markerArea.restoreState(formValues.markerState[whoseRef] as any)

      markerArea.addEventListener('render', event => {
        if (ref.current) {
          ref.current.src = event.dataUrl;
          const newState = {...formValues}
          newState.editedPhotos[whoseRef] = {base64: event.dataUrl}
          newState.markerState[whoseRef] = event.state
          saveCallback(newState)
        }
      });
      markerArea.addEventListener("beforeclose", (event) => {
        if (!confirm("Изменения не сохранятся, вы уверены?")) {
          event.preventDefault()
        } else if (ref.current?.src)
          ref.current.src = formValues.editedPhotos[whoseRef]?.base64 ?? ''
      })
    }
  }


  function uploadProps(whoseRef: 'original' | 'fake'): UploadProps {
    return {
      name: 'file',
      beforeUpload: () => false,
      onPreview: () => handlePreview(formValues.originalPhotos[whoseRef]?.base64 || '', whoseRef),
      multiple: false,
      listType: "picture-card",
      action: undefined,
      maxCount: 1,
      async onChange(info) {
        const fileTypeCheck = availableFiles.includes(info.file.type ?? '')
        if (!fileTypeCheck) {
          message.error('Вы можете прикрепить png, jpeg');
        }
        const isLt2M = info?.file?.size ?? 0 / 1024 / 1024 < 5;
        if (!isLt2M) {
          message.error('Изображение должно быть меньше 5MB');
        }
        if (fileTypeCheck && isLt2M) {
          const dataUrlList = await Promise.all(info.fileList.map(async (file) => {
            return new Promise<string | ArrayBuffer | null>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(file.originFileObj as File);
            });
          })) as string[]

          const newState = {...formValues}
          newState.editedPhotos[whoseRef] = {base64: dataUrlList[0]}
          newState.originalPhotos[whoseRef] = {base64: dataUrlList[0]}
          newState.markerState[whoseRef] = undefined
          saveCallback(newState)
        }
      }
    }
  }

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (fileUrl: string, whose: 'original' | 'fake') => {
    setPreviewImage(fileUrl)
    setPreviewOpen(true)
    setPreviewTitle(whose);
  };

  function validateFilesCount() {
    return formValues.originalPhotos.original || formValues.originalPhotos.fake ? Promise.resolve() : Promise.reject('Нужно прикрепить хотя бы одно фото');
  }

  return (
    <Card style={{position: 'relative'}}>
      <div className={cls.settings}>
        <ContextMenu actionsList={[ContextMenuActions.DELETE]} actionHandler={() => deleteCard()}/>
      </div>

      <Divider>Редактируемые фотографии</Divider>
      <Form.Item name={['files', cardKey]}
                 rules={[{required: true, validator: validateFilesCount, validateTrigger: 'onSubmit'}]}>
        <Row>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{width: '100%'}} src={previewImage}/>
          </Modal>
          <div className={cls.uploadListContainer}>
            <div className={cls.uploadBlock}>
              <Typography.Title level={3}>Фейк</Typography.Title>
              <Upload {...uploadProps('fake')}>
                {formValues.originalPhotos.fake ? null : UploadButton}
              </Upload>
            </div>
            <Divider style={{height: '100%'}} type={'vertical'}/>
            <div className={cls.uploadBlock}>
              <Typography.Title level={3}>Оригинал</Typography.Title>
              <Upload {...uploadProps('original')}>
                {formValues.originalPhotos.original ? null : UploadButton}
              </Upload>
            </div>
          </div>
        </Row>
      </Form.Item>
      <Divider>Выделение различий</Divider>

      <div className={imageCls.contentContainer}>
        {
          formValues.originalPhotos.fake && (
            <Tooltip placement={'top'} title={'Нажмите, чтобы выделить различия'}
                     mouseEnterDelay={0.6}>
              <div className={imageCls.contentImageContainer}>
                <img className={imageCls.contentImage} src={formValues.originalPhotos.fake.base64} alt={'Фейк'}
                     ref={imgFakeRef} onClick={() => {
                  if (imgFakeRef.current?.src) {
                    imgFakeRef.current.src = formValues.originalPhotos.fake?.base64 ?? ''
                    showMarkerArea(imgFakeRef, 'fake')
                  }
                }}/>
                <img className={imageCls.imageTag} alt={'fake'} src={'/assets/legitIcons/fake.png'}/>
              </div>
            </Tooltip>

          )
        }
        {
          formValues.originalPhotos.original && (
            <Tooltip placement={'top'} title={'Нажмите, чтобы выделить различия'}
                     mouseEnterDelay={0.6}>
              <div className={imageCls.contentImageContainer}>
                <img className={imageCls.contentImage} src={formValues.originalPhotos.original.base64}
                     alt={'Оригинал'}
                     ref={imgOriginalRef} onClick={() => {
                  if (imgOriginalRef.current?.src) {
                    imgOriginalRef.current.src = formValues.originalPhotos.original?.base64 ?? ''
                    showMarkerArea(imgOriginalRef, 'original')
                  }
                }}/>
                <img className={imageCls.imageTag} alt={'legit'} src={'/assets/legitIcons/legit.png'}/>
              </div>
            </Tooltip>
          )
        }
      </div>

      <Form.Item
        name={['description', cardKey] as any}
        label="Описание"
        rules={[{required: true, message: 'Введите описание различий'}]}
        style={{marginTop: '24px'}}
      >
        <ReactQuill preserveWhitespace={false} onChange={(value => {
          const newState = {...formValues}
          newState.imageDescription = value
          saveCallback(newState)
        })}/>
      </Form.Item>
    </Card>
  );
};

export default CreateInstructionCard;