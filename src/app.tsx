import { useEffect, useMemo } from "react";
import { App as AntApp, ConfigProvider, ThemeConfig, theme } from "antd";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";

import ErrorBoundary from "@/components/error-boundary";
import Router from "@/router";
import { useGlobalStore } from "@/stores/global";
import ErrorPage from "@/pages/layouts/error-page";

function App() {
  const { darkMode, lang } = useGlobalStore();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [darkMode]);

  const curTheme: ThemeConfig = useMemo(() => {
    if (darkMode) {
      return {
        token: {
          colorPrimary: "rgb(124, 77, 255)",
          colorBgBase: "rgb(17, 25, 54)",
          colorBgContainer: "rgb(26, 34, 63)",
          colorBorder: "rgba(189, 200, 240, 0.157)",
          colorBgTextHover: "rgba(124, 77, 255, 0.082)",
          colorTextHover: "rgba(124, 77, 255, 0.082)",
          controlItemBgActive: "rgba(33, 150, 243, 0.16)",
          colorBgElevated: "rgb(33, 41, 70)",
        },
        algorithm: theme.darkAlgorithm,
      };
    } else {
      return {
        token: {
          colorPrimary: "rgb(124, 77, 255)",
        },
      };
    }
  }, [darkMode]);

  return (
    // ConfigProvider === config(antd) + provider
    <ConfigProvider
      theme={curTheme}
      locale={lang === "zh" ? zhCN : enUS}
      componentSize="large"
    >
      <AntApp>
        <ErrorBoundary fallback={() => <ErrorPage />}>
          <Router />
        </ErrorBoundary>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
