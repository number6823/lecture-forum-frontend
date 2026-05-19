import { useEffect, useState } from "react";
import adminCategoryAPi from "../../../api/admin/adminCategoryAPi.ts";
import { type Category, CategoryStatus } from "../../../types/category.type.ts";
import Button from "../../../components/common/button/Button.tsx";
import { Link } from "react-router";
import Card from "../../../components/common/card/Card.tsx";
import {
    AdminContainer,
    AdminLoadingText,
    AdminPageHeader,
    AdminTable,
    AdminTableWrapper,
    AdminTd,
    AdminTh,
    AdminTitle,
} from "../../../components/admin/admin.style.tsx";
import Badge from "../../../components/common/badge/Badge.tsx";
import { FiRefreshCcw,  FiTrash2 } from "react-icons/fi";

function AdminCategoryListPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await adminCategoryAPi.fetchCategoryList();
                setCategories(data);
            } catch (error) {
                console.log(error);
                alert("카테고리 목록을 불러오는데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        loadCategories().then(() => {});
    }, []);

    const handleToggleCategoryStatus =  async (id: number) => {
        try {
           const result = await adminCategoryAPi.toggleCategoryStatus(id);
           alert(`카테고리가 성공적으로 ${result.status}로 변경되었습니다.`);

           // 백엔드에게 목록을 요청하지 않고, 화면에 데이터만  교체해줄 것임
            setCategories(prev => prev.map(item => item.id ? {...item,status: result.status }: item), );
        } catch (error) {
            console.log(error);
            alert("카테고리 변경 중 오류가 발생되었습니다.");
        }
        // 백엔드에게 그 카테고리의 status를 바꿔줘 -> 함수 실행할 때 id를 받아야 함

    }

    return (
        <AdminContainer>
            <AdminPageHeader>
                <AdminTitle>카테고리 관리</AdminTitle>
                <Button
                    color={"primary"}
                    variant={"contained"}
                    as={Link}
                    to={"/admin/category/create"}>
                    + 카테고리 추가
                </Button>
            </AdminPageHeader>

            <Card>
                {isloading ? (
                    <AdminLoadingText>불러오는 중...</AdminLoadingText>
                ) : (
                    <AdminTableWrapper>
                        <AdminTable>
                            <thead>
                                <tr>
                                    <AdminTh $width={"10%"}>ID</AdminTh>
                                    <AdminTh $width={"65%"}>카테고리명</AdminTh>
                                    <AdminTh $width={"15%"}>상태</AdminTh>
                                    <AdminTh $width={"15%"}>관리</AdminTh>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length === 0 && (
                                    <tr>
                                        <AdminTd
                                            colSpan={4}
                                            style={{ textAlign: "center", padding: "100px" }}>
                                            등록된 카테고리가 없습니다.
                                        </AdminTd>
                                    </tr>
                                )}
                                {categories.map(item => (
                                    <tr key={item.id}>
                                        <AdminTd>{item.id}</AdminTd>
                                        <AdminTd>{item.name}</AdminTd>
                                        <AdminTd>
                                            <Badge
                                                color={
                                                    item.status === CategoryStatus.ACTIVE
                                                        ? "success"
                                                        : "secondary"
                                                }>
                                                {item.status === CategoryStatus.ACTIVE
                                                    ? "활성"
                                                    : "비활성"}
                                            </Badge>
                                        </AdminTd>
                                        <AdminTd>
                                            <Button
                                                color={"primary"}
                                                variant={"icon"}
                                                onClick={() => handleToggleCategoryStatus(item.id)}>
                                                {item.status === CategoryStatus.ACTIVE ? (
                                                    <FiTrash2 size={18} />
                                                ) : (
                                                    <FiRefreshCcw size={18} />
                                                )}
                                            </Button>
                                        </AdminTd>
                                    </tr>
                                ))}
                            </tbody>
                        </AdminTable>
                    </AdminTableWrapper>
                )}
            </Card>
        </AdminContainer>
    );
}

export default AdminCategoryListPage;
