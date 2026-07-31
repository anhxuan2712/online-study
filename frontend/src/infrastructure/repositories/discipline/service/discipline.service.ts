import { Endpoint } from "../../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../../common/components/toast/notificationToast";
import { RequestService } from "../../../utils/response";
import { saveToken } from "../../../utils/storage";

class DisciplineService {
    async Detdiscipline(params: object, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.Discipline.Get, {
                    ...params
                })
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };
    async DetdisciplineById(id: number, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Discipline.Get}/${id}`)
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };
    async Ddddiscipline(data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .post(Endpoint.Discipline.Add,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Thêm mới thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            FailMessage("Thêm mới không thành công", "Vui lòng kiểm tra thông tin")
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async Dpdatediscipline(id: number, data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .put(`${Endpoint.Discipline.Update}/${id}`,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Cập nhật thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            FailMessage("Cập nhật không thành công", "Vui lòng kiểm tra thông tin")
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async Deletediscipline(id: number, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .delete(`${Endpoint.Discipline.Delete}/${id}`)
                .then(response => {
                    if (response) {
                        SuccessMessage("Xóa thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            FailMessage("Xóa không thành công", "Vui lòng kiểm tra thông tin")
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
}

export default new DisciplineService();
