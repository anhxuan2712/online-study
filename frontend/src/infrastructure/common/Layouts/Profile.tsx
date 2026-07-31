import { Col, Modal, Row } from 'antd';
import InputTextCommon from '../components/input/input-text';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../repositories/auth/service/auth.service';
import { WarningMessage } from '../components/toast/notificationToast';
import { ButtonCommon } from '../components/button/button-common';
import { useRecoilState } from 'recoil';
import { ProfileState } from '../../../core/atoms/profile/profileState';
import UploadImage from '../components/input/upload-image';
import InputDateCommon from '../components/input/input-date';
import { convertDateOnly } from '../../helper/helper';
import { isTokenStoraged } from '../../utils/storage';

type Props = {
  // handleOk: Function,
  handleCancel: Function,
  visible: boolean,
  loading?: boolean,
  setLoading: Function
}
const ProfileModal = (props: Props) => {
  const { handleCancel, visible, loading, setLoading } = props;
  const [validate, setValidate] = useState<any>({});
  const [submittedTime, setSubmittedTime] = useState<any>();
  const [detailProfile, setDetailProfile] = useState<any>({});

  const [imageUrl, setImageUrl] = useState<any>(null);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const token = isTokenStoraged();

  const [, setDetailState] = useRecoilState(ProfileState);

  const [_data, _setData] = useState<any>({});
  const dataProfile = _data;

  const setDataProfile = (data: any) => {
    Object.assign(dataProfile, { ...data });
    _setData({ ...dataProfile });
  };

  const isValidData = () => {
    let allRequestOK = true;

    setValidate({ ...validate });

    Object.values(validate).forEach((it: any) => {
      if (it.isError === true) {
        allRequestOK = false;
      }
    });
    return allRequestOK;
  };

  const onGetProfileAsync = async () => {
    if (token) {
      try {
        await authService.profile(
          setLoading
        ).then((response) => {
          setDetailProfile(response)
          setDetailState({
            user: response
          })
        })
      }
      catch (error) {
        console.error(error)
      }
    }
  }
  useEffect(() => {
    if (token) {
      onGetProfileAsync().then(() => { })
    }
  }, [token])

  useEffect(() => {
    if (detailProfile) {
      setDataProfile({
        avatar: detailProfile.avatar,
        name: detailProfile.name,
        email: detailProfile.email,
        username: detailProfile.username,
        phoneNumber: detailProfile.phoneNumber,
        cccd: detailProfile.cccd,
        dob: detailProfile.dob,
      });
    }
  }, [detailProfile]);

  const onUpdateProfile = async () => {
    await setSubmittedTime(Date.now());
    if (isValidData()) {
      await authService.updateProfile(
        {
          file: avatar ? avatar : imageUrl,
          email: dataProfile.email,
          username: dataProfile.username,
          name: dataProfile.name,
          phoneNumber: dataProfile.phoneNumber,
          cccd: dataProfile.cccd,
          dob: convertDateOnly(dataProfile.dob),
        },
        () => {
          onGetProfileAsync();
          handleCancel();
        },
        setLoading
      )
    }
    else {
      WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
    };
  };

  return (
    <Modal
      key={"f-0"}
      centered
      visible={visible}
      closable={false}
      footer={false}
      onCancel={() => handleCancel()}
      width={"70%"}
    >
      <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
        <div className='bg-white scroll-auto'></div>
        <Row>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
            <div className='legend-title'>Cập nhật ảnh</div>
            <UploadImage
              attributeImg={imageUrl}
              imageUrl={imageUrl}
              setAvatar={setAvatar}
              setImageUrl={setImageUrl}
              label={'Ảnh'}
              validate={validate}
              setValidate={setValidate}
              submittedTime={submittedTime}
              attribute={'avatar'}
              isRequired={false}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={16} xl={18} xxl={19} className='border-add'>
            <div className='legend-title'>Cập nhật thông tin</div>
            <Row gutter={[30, 0]}>

              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <InputTextCommon
                  label={"Tên đăng nhập"}
                  attribute={"username"}
                  isRequired={false}
                  dataAttribute={dataProfile.username}
                  setData={setDataProfile}
                  disabled={true}
                  validate={validate}
                  setValidate={setValidate}
                  submittedTime={submittedTime}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <InputTextCommon
                  label={"Email"}
                  attribute={"email"}
                  isRequired={false}
                  dataAttribute={dataProfile.email}
                  setData={setDataProfile}
                  disabled={true}
                  validate={validate}
                  setValidate={setValidate}
                  submittedTime={submittedTime}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <InputTextCommon
                  label={"Tên khách hàng"}
                  attribute={"name"}
                  isRequired={true}
                  dataAttribute={dataProfile.name}
                  setData={setDataProfile}
                  disabled={false}
                  validate={validate}
                  setValidate={setValidate}
                  submittedTime={submittedTime}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <InputTextCommon
                  label={"Số điện thoại"}
                  attribute={"phoneNumber"}
                  isRequired={true}
                  dataAttribute={dataProfile.phoneNumber}
                  setData={setDataProfile}
                  disabled={false}
                  validate={validate}
                  setValidate={setValidate}
                  submittedTime={submittedTime}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <InputTextCommon
                  label={"CCCD"}
                  attribute={"cccd"}
                  isRequired={false}
                  dataAttribute={dataProfile.cccd}
                  setData={setDataProfile}
                  disabled={false}
                  validate={validate}
                  setValidate={setValidate}
                  submittedTime={submittedTime}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <InputDateCommon
                  label={"Ngày sinh"}
                  attribute={"dob"}
                  isRequired={true}
                  dataAttribute={dataProfile.dob}
                  setData={setDataProfile}
                  disabled={false}
                  validate={validate}
                  setValidate={setValidate}
                  submittedTime={submittedTime}
                  disabledToDate={false}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className='container-btn main-page bg-white p-4 flex flex-col'>
        <Row justify={"center"}>
          <Col className='mx-1'>
            <ButtonCommon
              onClick={handleCancel}
              classColor="black"
              icon={null}
              title={'Quay lại'}
            />
          </Col>
          <Col className='mx-1'>
            <ButtonCommon
              onClick={onUpdateProfile}
              classColor="green"
              icon={null}
              title={'Cập nhật'}
            />
          </Col>
        </Row>
      </div >
    </Modal >
  )
}

export default ProfileModal