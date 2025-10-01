import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { useAppDispatch, useAppSelector } from "./hooks/redux.hooks";
import AppLayout from "./layouts/main/app.layout";
import { AuthLayout } from "./layouts/auth/auth-page.layout";
import { LoginInPage } from "./pages/auth/login-in.page";
import { RegisterPage } from "./pages/auth/sign-up.page";
import Blank from "./pages/blank.page";
import ButtonAntDPage from "./pages/button-antd/button-antd.page";
import BarChart from "./pages/charts/BarChart";
import LineChart from "./pages/charts/LineChart";
import Home from "./pages/dashboard/Home";
import DialogAntPage from "./pages/dialog-antd/dialog-ant.page";
import FormsAntDPage from "./pages/forms-antd/forms-antd.page";
import FormElements from "./pages/forms/FormElements";
import TableAntDPage from "./pages/table-antd/table-antd.page";
import Alerts from "./pages/ui-elements/Alerts";
import Avatars from "./pages/ui-elements/Avatars";
import Badges from "./pages/ui-elements/Badges";
import Buttons from "./pages/ui-elements/Buttons";
import Images from "./pages/ui-elements/Images";
import Videos from "./pages/ui-elements/Videos";
import UserProfiles from "./pages/user-profile.page";
import AuthProvider from "./providers/auth.provider";
import { RootState } from "./store";
import { fetchPermissions } from "./store/slices/permissions.slice";
import { TipTapPage } from "./pages/tiptap/tiptap.page";

export default function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchPermissions());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth/*" element={<AuthLayout />}>
        <Route path="login" element={<LoginInPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="" element={<Navigate to="/auth/login" replace />} />
      </Route>
      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          <AuthProvider>
            <AppLayout />
          </AuthProvider>
        }
      >
        {/* <Route path="dashbard" element={<div>HOME PAGE</div>} /> */}

        <Route path="home" element={<Home />} />
        <Route path="profile" element={<UserProfiles />} />
        <Route path="blank" element={<Blank />} />

        {/* Forms */}
        <Route path="form-elements" element={<FormElements />} />
        <Route path="form-antd" element={<FormsAntDPage />} />
        <Route path="editors" element={<TipTapPage />} />

        {/* Ant Design */}
        <Route path="table-antd" element={<TableAntDPage />} />
        <Route path="buttons-antd" element={<ButtonAntDPage />} />
        <Route path="dialogs-antd" element={<DialogAntPage />} />

        {/* Ui Elements */}
        <Route path="alerts" element={<Alerts />} />
        <Route path="avatars" element={<Avatars />} />
        <Route path="badge" element={<Badges />} />
        <Route path="buttons" element={<Buttons />} />
        <Route path="images" element={<Images />} />
        <Route path="videos" element={<Videos />} />

        {/* Charts */}
        <Route path="line-chart" element={<LineChart />} />
        <Route path="bar-chart" element={<BarChart />} />

        <Route path="" element={<Navigate to="/home" replace />} />
      </Route>
      {/* Fallback Route */}
      {/* <Route path="*" element={<NotFound />} /> */}

      {/* Redirect unauthenticated users to login */}
      {!isAuthenticated && (
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      )}
    </Routes>
  );
}
