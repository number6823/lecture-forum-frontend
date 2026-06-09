import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type NoticeInputType,
    noticeSchema,
} from "../../../../schemas/notice/notice/noticeSchema.ts";
import adminNoticeApi from "../../../../api/admin/adminNoticeApi.ts";
import * as axios from "axios";
import {
    AdminButtonGroup,
    AdminContainer,
    AdminForm,
    AdminPageHeader,
    AdminTitle,
} from "../../../../components/admin/admin.style.tsx";
import Card from "../../../../components/common/card/Card.tsx";
import InputGroup from "../../../../components/common/input/InputGroup.tsx";
import Button from "../../../../components/common/button/Button.tsx";
import TextareaGroup from "../../../../components/common/textarea/TextareaGroup.tsx";

function AdminCreateNoticePage_Me() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(noticeSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: NoticeInputType) => {
        try {
            await adminNoticeApi.createNotice(data);
            alert("공지사항이 성공적으로 추가되었습니다.")
            navigate("/admin/notice");
        } catch (error) {
if (axios.isAxiosError(error) && error.response?.status === 409) {
    setError("title" ,{message:"이미 존재하는 공지사항 입니다."})
} else {
    alert("공지사항 생성 중 오류가 발생했습니다.");
}
        }
    }
    return (
        <AdminContainer>
            <AdminPageHeader>
                <AdminTitle>새 공지사항 추가</AdminTitle>
            </AdminPageHeader>

            <Card>
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup
                        id={"title"}
                        label={"공지사항 제목"}
                        placeholder={"추가할 공지사항을 입력하세요 (최대 50자)"}
                        errorMessage={errors.title?.message}
                        registerObj={register("title")}
                    />
                    <TextareaGroup
                        id={"content"}
                        label={"공지사항 내용"}
                        placeholder={"공지사항 내용을 입력하세요 (최대 100자)"}
                        errorMessage={errors.content?.message}
                        registerObj={register("content")}
                    />
                    <AdminButtonGroup>
                        <Button color={"secondary"} variant={"text"} as={Link} to={"/admin/notice"}>
                            취소
                        </Button>
                        <Button
                            type={"submit"}
                            variant={"contained"}
                            color={"primary"}
                            disabled={isSubmitting}>
                            등록
                        </Button>
                    </AdminButtonGroup>
                </AdminForm>
            </Card>
        </AdminContainer>
    );
}

export default AdminCreateNoticePage_Me;
