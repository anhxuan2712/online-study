import { Endpoint } from "../../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../../common/components/toast/notificationToast";
import { RequestService } from "../../../utils/response";
import { saveToken } from "../../../utils/storage";

class CommentService {

    async addComment(data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .post(Endpoint.Comment.Add,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Bình luận thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            FailMessage("Bình luận không thành công", "Vui lòng kiểm tra thông tin")
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
}

export default new CommentService();
