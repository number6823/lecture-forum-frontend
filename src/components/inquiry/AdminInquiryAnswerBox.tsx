import type { Inquiry } from "../../types/Inquiry.type.ts";
import type { ReactElement } from "react";
import { AdminButtonGroup, AnswerContent, AnswerDisplay, AnswerHeader } from "../admin/admin.style.tsx";
import Button from "../common/button/Button.tsx";
import adminInquiryApi from "../../api/admin/adminInquiryApi.ts";

interface Props {
    inquiry: Inquiry;
    reload: () => Promise<void>;
}


function AdminInquiryAnswerBox ({inquiry, reload}: Props): ReactElement {
    // 답변 내용이 출력되는 컴포넌트\
    const handleDeleteAnswer = async () => {
        try {
            await adminInquiryApi.deleteInquiryAnswer(inquiry.id);
            // 글 상세 내용을 다시 받아와야 함
            await reload();
        } catch (error) {
            console.log(error);
            alert("관리자 답변 삭제 중 오류가 발생되었습니다.")
        }
    }

    return (
        <AnswerDisplay>
            <AnswerHeader>
                <h4>관리자 답변</h4>
                <small>
                    답변일시 : {inquiry.answeredAt && new Date(inquiry.answeredAt).toLocaleString()}
                </small>
            </AnswerHeader>
            <AnswerContent className={"answer-content"}>{inquiry.answer}</AnswerContent>

            <AdminButtonGroup $align={"right"} style={{marginTop:"24px"}}>
                <Button color={"warning"} variant={"contained"}>답변 수정</Button>
                <Button color={"error"} variant={"contained"} onClick={handleDeleteAnswer}>답변 삭제</Button>
            </AdminButtonGroup>

        </AnswerDisplay>
    );
}

export default AdminInquiryAnswerBox;