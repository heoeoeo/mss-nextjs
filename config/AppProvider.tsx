"use client";

import { useEffect } from "react";
import { ThemeProvider } from "config/material-tailwind-theme-provider";
import ChannelService from "utils/channeltalk/ChannelTalk";
import ReactQueryClientProvider from "./ReactQueryClientProvider";
import AuthProvider from "./authProvider";
import RecoilProvider from "./RecoilProvider";

export default function AppProvider({ accessToken, children }) {
  useEffect(() => {
    ChannelService.loadScript();

    ChannelService.boot({
      pluginKey: process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY || "",
    });
  }, []);
  return (
    <RecoilProvider>
      <AuthProvider accessToken={accessToken}>
        <ReactQueryClientProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ReactQueryClientProvider>
      </AuthProvider>
    </RecoilProvider>
  );
}
