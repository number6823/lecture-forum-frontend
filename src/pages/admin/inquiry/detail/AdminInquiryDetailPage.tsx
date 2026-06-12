import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Inquiry } from "../../../../types/Inquiry.type.ts";
import { DetailContent, DetailHeader, DetailInfo, DetailTitle, DetailWrapper, LoadingText, PostContainer } from "../../../../components/post/post.style.tsx";
import { AdminButtonGroup } from "../../../../components/admin/admin.style.tsx";
import Button from "../../../../components/common/button/Button.tsx";
import adminInquiryApi from "../../../../api/admin/adminInquiryApi.ts";

function AdminInquiryDetailPage() {
    const navigate = useNavigate();
    const [inquiry, setInquiry] = useState<Inquiry | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams<{ id: string }>();
    const inquiryId = Number(id)

    useEffect(() => {
        const loadInquiry = async () => {
            try {
                const data = await adminInquiryApi.getInquiryById(inquiryId);
                setInquiry(data);
            } catch (error) {
                console.log(error);
                alert("게시글을 불러오는데 오류가 발생했습니다.");
                navigate(-1)
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
