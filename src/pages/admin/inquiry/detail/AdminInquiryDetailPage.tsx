import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Inquiry } from "../../../../types/Inquiry.type.ts";
import {
    DetailContent,
    DetailHeader,
    DetailInfo,
    DetailTitle,
    DetailWrapper,
    LoadingText,
    PostContainer,
} from "../../../../components/post/post.style.tsx";
import { AdminButtonGroup, AnswerSection } from "../../../../components/admin/admin.style.tsx";
import Button from "../../../../components/common/button/Button.tsx";
import adminInquiryApi from "../../../../api/admin/adminInquiryApi.ts";
import AdminInquiryAnswerForm from "../../../../components/inquiry/AdminInquiryAnswerForm.tsx";
import AdminInquiryAnswerBox from "../../../../components/inquiry/AdminInquiryAnswerBox.tsx";

function AdminInquiryDetailPage() {
    const navigate = useNavigate();
    const [inquiry, setInquiry] = useState<Inquiry | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams<{ id: string }>();
    const inquiryId = Number(id);

    useEffect(() => {
        const loadInquiry = async () => {
            try {
                const data = await adminInquiryApi.getInquiryById(inquiryId);
                setInquiry(data);
            } catch (error) {
                console.log(error);
                alert("게시글을 불러오는데 오류가 발생했습니다.");
                navigate(-1);
            } finally {
                setIsLoading(false);
            }
        };
        loadInquiry().then(() => {});
    }, [inquiryId, navigate]);

    if (isLoading) {
        return (
            <PostContainer>
                <LoadingText>1:1 문의 내용을 불러오는 중입니다...</LoadingText>
            </PostContainer>
        );
    }

    if (!inquiry) {
        return;
    }

    return (
        <PostContainer>
            <DetailWrapper>
                <DetailHeader>
                    <DetailTitle>{inquiry.title}</DetailTitle>
                    <DetailInfo>
                        <div className={"left-info"}>
                            <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                        </div>
                    </DetailInfo>
                </DetailHeader>

                <DetailContent>{inquiry.content}</DetailContent>

                <hr />

                {/* 만약에, 답변이 아직 달리지 않았다면 Textarea를 띄워서 답변을 달 수 있도록  할 것이고
                           답변이 이미 달렸다면 답변 내용잉 출렫괼 수 있도록 함

                 */}
                <AnswerSection>
                    {inquiry.answer ? <AdminInquiryAnswerBox /> : <AdminInquiryAnswerForm inquiryId={inquiryId}/>}
                </AnswerSection>

                <AdminButtonGroup style={{ marginTop: "40px" }}>
                    <Button color={"secondary"} variant={"contained"} onClick={() => navigate(-1)}>
                        목록으로
                    </Button>
                    <Button
                        color={"warning"}
                        variant={"contained"}
                        onClick={() => navigate(`/admin/notice/update/${inquiry.id}`)}>
                        수정
                    </Button>
                    <Button color={"error"} variant={"contained"}>
                        삭제
                    </Button>
                </AdminButtonGroup>
            </DetailWrapper>
        </PostContainer>
    );
}

export default AdminInquiryDetailPage;
