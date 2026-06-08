import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import type { Notice } from "../../../types/notice.type.ts";
import noticeApi from "../../../api/user/noticeApi.ts";
import adminNoticeApi from "../../../api/admin/adminNoticeApi.ts";
import { Container, NoticeTitle} from "../../../components/notice/notice.style.tsx";
import { AdminButtonGroup, AdminLoadingText, AdminPageHeader, AdminTable, AdminTableWrapper, AdminTd, AdminTh } from "../../../components/admin/admin.style.tsx";
import Button from "../../../components/common/button/Button.tsx";
import Card from "../../../components/common/card/Card.tsx";
import Badge from "../../../components/common/badge/Badge.tsx";
import { Role } from "../../../types/user.type.ts";
import { FiEdit, FiTrash } from "react-icons/fi";
import Pagination from "../../../components/common/pagination/Pagination.tsx";

function AdminNoticeList() {
    const [list, setList] = useState<Notice[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [searchParam, setSearchParams] = useSearchParams();
    const page = Number(searchParam.get("page")) || 1;

    const SIZE = 20;
    const [total, setTotal] = useState(0);
    const totalPage = Math.ceil(total / SIZE);

    const loadNoticeUsers = async (page: number) => {
        try {
            setIsLoading(true);
            const data = await noticeApi.getNoticeList(page, SIZE);
            setList(data.list)
            setTotal(data.total)
        } catch (error) {
            console.error(error);
            alert("공지사항 목록을 불러오는데 실패했습니다.")
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});

        loadNoticeUsers(page).then(() => {})
    },[page]);

    const handleDeleteNotice = async (id: number) => {
        if (!confirm("정말 이 공지사항을 삭제 하시겠습니까?")){
            return;
        }
        try {
            await adminNoticeApi.deleteNotice(id)
            alert("공지사항이 정상적으로 삭제되었습니다.")
            loadNoticeUsers(page).then(() => {})
        } catch (error) {
            console.error(error);
            alert("공지사항 삭제 중 오류가 발생했습니다.")
        }
    };

    const handlePageChange = (page: number) => {
        setSearchParams({
            page: page.toString(),
        })
    };
    return (
        <Container>
            <NoticeTitle>공지사항 관리</NoticeTitle>
            <AdminPageHeader>
                <div>총 {total}건</div>
                <Button color={"primary"} variant={"contained"} as={Link} to={"/notice/list"}>
                    + 공지사항 추가
                </Button>
            </AdminPageHeader>
            <Card>
                {isLoading ? (
                    <AdminLoadingText>불러오는 중...</AdminLoadingText>
                ) : (
                    <AdminTableWrapper>
                        <AdminTable>
                            <thead>
                                <AdminTh $width={"15%"}>이름 (닉네임)</AdminTh>
                                <AdminTh $width={"10%"}>권한</AdminTh>
                                <AdminTh $width={"10%"}>상태</AdminTh>
                                <AdminTh $width={"15%"}>등록일</AdminTh>
                                <AdminTh $width={"10%"}>관리</AdminTh>
                            </thead>
                            <tbody>
                                {list.length === 0 && (
                                    <tr>
                                        <AdminTd
                                            colSpan={8}
                                            style={{ textAlign: "center", padding: "100px" }}>
                                            등록된 공지사항이 없습니다.
                                        </AdminTd>
                                    </tr>
                                )}
                                {list.map(item => (
                                    <tr key={item.id}>
                                        <AdminTd>{item.id}</AdminTd>
                                        <AdminTd>{item.username}</AdminTd>
                                        <AdminTd>
                                            {item.name} <br />
                                            <small>{item.nickname}</small>
                                        </AdminTd>
                                        <AdminTd>{item.email}</AdminTd>
                                        <AdminTd>
                                            <Badge
                                                color={
                                                    item.role === Role.ADMIN ? "error" : "primary"
                                                }>
                                                {item.role === Role.ADMIN ? "관리자" : "일반"}
                                            </Badge>
                                        </AdminTd>
                                        <AdminTd>
                                            <Badge color={item.deletedAt ? "default" : "success"}>
                                                {item.deletedAt ? "탈퇴" : "정상"}
                                            </Badge>
                                        </AdminTd>
                                        <AdminTd>
                                            {new Date(item.createdAt).toLocaleString()}
                                        </AdminTd>
                                        <AdminTd>
                                            <AdminButtonGroup>
                                                <Button
                                                    variant={"icon"}
                                                    color={"primary"}
                                                    as={Link}
                                                    to={`/admin/user/${item.id}`}>
                                                    <FiEdit size={18} />
                                                </Button>
                                                {!item.deletedAt && (
                                                    <Button
                                                        color={"error"}
                                                        variant={"icon"}
                                                        onClick={() => handleDeleteNotice(item.id)}>
                                                        <FiTrash size={18} />
                                                    </Button>
                                                )}
                                            </AdminButtonGroup>
                                        </AdminTd>
                                    </tr>
                                ))}
                            </tbody>
                        </AdminTable>
                    </AdminTableWrapper>
                )}

                {total > 0 && (
                    <Pagination
                        currentPage={page}
                        totalPage={totalPage}
                        onPageChange={handlePageChange}
                    />
                )}
            </Card>
        </Container>
    );
}

export default AdminNoticeList;
