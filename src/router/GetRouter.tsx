import { createBrowserRouter, redirect } from "react-router";
import HomePage from "../pages/HomePage.tsx";
import SignInPage from "../pages/auth/signin/signInPage.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
import AdminLayout from "../layouts/AdminLayout.tsx";
import AdminCategoryListPage from "../pages/admin/category/AdminCategoryListPage.tsx";
import { useAuthStore } from "../stores/auth/authStore.ts";
import { Role } from "../types/user.type.ts";
import AdminCategoryCreatePage from "../pages/admin/category/create/AdminCategoryCreatePage.tsx";
import AdminCategoryEditPage from "../pages/admin/category/edit/AdminCategoryEditPage.tsx";
import AdminUserCreatePage from "../pages/admin/user/create/AdminUserCreatePage.tsx";
import AdminUserListPage from "../pages/admin/user/AdminUserListPage.tsx";
import AdminUserUpdatePage from "../pages/admin/user/update/AdminUserUpdatePage.tsx";
import PostListPage from "../pages/post/PostListPage.tsx";
import PostCreatePage from "../pages/post/create/PostCreatePage.tsx";
import PostDetailPage from "../pages/post/detail/PostDetailPage.tsx";
import SignUpPage from "../pages/auth/signUp/signUpPage.tsx";
import AdminNoticeList from "../pages/admin/notice/AdminNoticeList.tsx";
import AdminCreateNoticePage from "../pages/admin/notice/create/AdminCreateNoticePage.tsx";

// 회원의 권한에 따라 접근할 수 있는 주소를 판별하기 위해서
// react-router 라이브러리에서는 "loader" 기능 제공

const adminLoader = () => {
    const { user, isLoggedIn } = useAuthStore.getState();

    if (!isLoggedIn) {
        alert("로그인이 필요합니다.");
        return redirect("/auth/signin");
    }

    if (user?.role !== Role.ADMIN) {
        alert("관리자만 접근할 수 있는 페이지입니다.");
        return redirect("/");
    }

    return null;
};

const guestLoader = () => {
    const { isLoggedIn } = useAuthStore.getState();

    if (isLoggedIn) {
        return redirect("/");
    }

    return null;
};

const userLoader = () => {
    const { isLoggedIn } = useAuthStore.getState();

    if (!isLoggedIn) {
        return redirect("/");
    }

    return null;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage /> },

            {
                path: "category",
                children: [
                    {
                        path: ":categoryId",
                        element: <PostListPage />,
                    },
                ],
            },

            {
                path: "post",
                children: [
                    { path: ":id", element: <PostDetailPage /> },
                    { path: "create/:categoryId", loader: userLoader, element: <PostCreatePage /> },
                ],
            },

            {
                path: "auth",
                loader: guestLoader,
                children: [
                    { path: "signin", element: <SignInPage /> },
                    { path: "signup", element: <SignUpPage /> },
                ],
            },
        ],
    },

    {
        path: "/admin",
        loader: adminLoader,
        element: <AdminLayout />,
        children: [
            {
                path: "category",
                children: [
                    { index: true, element: <AdminCategoryListPage /> },
                    { path: "create", element: <AdminCategoryCreatePage /> },
                    { path: "edit/:id", element: <AdminCategoryEditPage /> },
                ],
            },

            {
                path: "user",
                children: [
                    { index: true, element: <AdminUserListPage /> },
                    { path: "create", element: <AdminUserCreatePage /> },
                    { path: ":id", element: <AdminUserUpdatePage /> },
                ],
            },
            {
                path: "notice",
                children: [{ index: true, element: <AdminNoticeList /> },
                    {path: "create", element: <AdminCreateNoticePage />}],
            },
        ],
    },
]);

export default router;
