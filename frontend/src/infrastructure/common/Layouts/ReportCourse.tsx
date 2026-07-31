import { Col, Modal, Row, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { MyCourseState } from "../../../core/atoms/myCourse/myCourseState";
import { configImageURL, formatCurrencyVND } from "../../helper/helper";
import { ShowStarCommon } from "../components/controls/ShowStar";
import authService from "../../repositories/auth/service/auth.service";
import { isTokenStoraged } from "../../utils/storage";
import { PaginationCommon } from "../components/pagination/Pagination";
import { InputSearchCommon } from "../components/input/input-search-common";
import { ButtonCommon } from "../components/button/button-common";
import Constants from "../../../core/common/constants";
import teacherService from "../../repositories/teacher/service/teacher.service";

type Props = {
  // handleOk: Function,
  handleCancel: Function;
  visible: boolean;
  loading?: boolean;
  setLoading: Function;
};

const ReportCourseModal = (props: Props) => {
  const { handleCancel, visible, loading, setLoading } = props;
  const [dataReport, setDataReport] = useState<Array<any>>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  const token = isTokenStoraged();

  const getMyCourseAsync = async () => {
    if (token) {
      try {
        await teacherService.reportTeacher(setLoading).then((response) => {
          if (response) {
            setDataReport(response.course_amounts);
            setTotalAmount(response.totalCourse);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (token) {
      getMyCourseAsync().then(() => {});
    }
  }, [token]);
  useEffect(() => {
    const totalCost = dataReport.reduce((total, item) => {
      return total + Number(item.totalAmount);
    }, 0);
    setTotalCost(totalCost)
  }, [dataReport]);
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
      <div className="flex flex-col gap-4 bg-[#f5f7fb] px-4 py-8">
        <div className="bg-[#FFF] px-3 py-5 rounded-[4px] flex flex-col border-l-4 border-[#0d9e6d]">
          <div className="text-[18px] text-[#1e293bb3] font-semibold uppercase">
            Báo cáo doanh số khóa học
          </div>
        </div>
        <div className="bg-[#FFF] px-3 py-5 rounded-[4px] flex flex-col gap-1 border-l-4 border-[#0d9e6d]">
          <div className="flex gap-1">
            <div className="text-[18px] text-[#1e293bb3] font-semibold uppercase">
              Tổng doanh số:
            </div>
            <div className="text-[18px] text-[#d63939] font-semibold">
              {formatCurrencyVND(String(totalCost))}
            </div>
          </div>
          <div className="flex gap-1">
            <div className="text-[18px] text-[#1e293bb3] font-semibold uppercase">
              Tổng số khóa học đã bán:
            </div>
            <div className="text-[18px] text-[#d63939] font-semibold">
              {totalAmount}
            </div>
          </div>
        </div>
        <div className="bg-[#FFF] px-3 py-5 rounded-[4px]">
          <Row gutter={[15, 15]}>
            {dataReport.map((it, index) => {
              return (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <div
                    className="bg-[#fff] shadow-sm p-4 rounded-[4px] flex flex-col gap-4 border-[1px] border-[#d7d7d7] cursor-pointer h-full"
                    // onClick={() => onNavigate(it.id)}
                  >
                    <div>
                      <img
                        src={configImageURL(it.course?.courseImage?.fileCode)}
                        alt=""
                        className="w-full h-full"
                      />
                    </div>
                    <Tooltip title={it.course?.name} color="#1e293bb3">
                      <div className="text-truncate text-[13px] text-[#2a70b8] font-semibold hover:text-[#c46f20] hover:underline transition duration-200">
                        {it.course?.name}
                      </div>
                    </Tooltip>
                    <div>
                      <ShowStarCommon star={5} />
                    </div>
                    <div className="flex gap-1 items-center text-[13px] font-semibold text-[#1e293bb3] ">
                      <p>Đã bán được:</p>
                      <p>
                        {(
                          Number(it.totalAmount) / Number(it.course?.cost)
                        ).toFixed(0)}{" "}
                        khóa{" "}
                      </p>
                    </div>
                    <div className="flex gap-1 items-center text-[14px] font-semibold text-[#d63939] ">
                      <p>Doanh thu khóa học:</p>
                      <p>{formatCurrencyVND(String(it.totalAmount))} </p>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </Modal>
  );
};

export default ReportCourseModal;
