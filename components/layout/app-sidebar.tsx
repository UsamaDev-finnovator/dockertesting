"use client";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import { useTranslation } from "react-i18next";
import { useLayoutEffect, useState } from "react";

const data = {
  user: {
    name: "Demo User",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    { title: "Scheme Due Day", url: "/dashboard/Lifecycle", icon: Frame },
    { title: "Settings", url: "#", icon: Settings2 },
    { title: "Models", url: "#", icon: Bot },
    { title: "Documentation", url: "#", icon: BookOpen },
  ],
};

export function AppSidebar({ ...props }) {
  const { i18n } = useTranslation("GetStartedPage");
  const [sideBarRtl, setSideBarRtl] = useState(false);

  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  useLayoutEffect(() => {
    setSideBarRtl(i18n.dir() === "rtl");
  }, [i18n.dir()]);

  return (
    <Sidebar side={sideBarRtl ? "right" : "left"} collapsible="icon" {...props}>
      <SidebarHeader
        className={` transition-all h-24 py-4 items-start  ${
          isCollapsed ? "px-0.5" : "px-4"
        }`}
      >
        {/* <div className="flex items-center justify-start w-full"> */}
        {/* {!isCollapsed ? ( */}
        <img
          src="/assets/FULL-LOGO.png"
          alt="Logo"
          className="h-16 w-auto object-contain"
        />
        {/* // ) : (
          //   <img */}
        {/* //     src="/assets/short-logo.png"
          //     alt="Collapsed Logo"
          //     className="h-10 w-96 mx-auto object-contain"
          //   />
          // )} */}
        {/* </div> */}
      </SidebarHeader>

      <SidebarContent>
        <NavMain
          items={data.navMain.map((item) => ({
            title: item.title,
            url: item.url,
            icon: item.icon,
          }))}
        />
      </SidebarContent>

      <SidebarFooter>
        {!isCollapsed && <NavUser user={data.user} />}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

// "use client";

// import {
//   AudioWaveform,
//   BookOpen,
//   Bot,
//   Command,
//   Frame,
//   GalleryVerticalEnd,
//   Map,
//   PieChart,
//   Settings2,
//   SquareTerminal,
// } from "lucide-react";

// import { NavMain } from "@/components/layout/nav-main";
// import { NavProjects } from "@/components/layout/nav-projects";
// import { NavUser } from "@/components/layout/nav-user";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarRail,
// } from "@/components/ui/sidebar";
// import { useTranslation } from "react-i18next";
// import { useLayoutEffect, useState } from "react";

// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   teams: [
//     {
//       name: "Acme Inc",
//       logo: GalleryVerticalEnd,
//       plan: "Enterprise",
//     },
//     {
//       name: "Acme Corp.",
//       logo: AudioWaveform,
//       plan: "Startup",
//     },
//     {
//       name: "Evil Corp.",
//       logo: Command,
//       plan: "Free",
//     },
//   ],
//   navMain: [
//     {
//       title: "Pages",
//       url: "#",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         { title: "Dashboard", url: "/dashboard" },
//         { title: "Scheme Due Day", url: "/dashboard/Lifecycle" },
//         {
//           title: "Settings",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Models",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           title: "Genesis",
//           url: "#",
//         },
//         {
//           title: "Explorer",
//           url: "#",
//         },
//         {
//           title: "Quantum",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Documentation",
//       url: "#",
//       icon: BookOpen,
//       items: [
//         {
//           title: "Introduction",
//           url: "#",
//         },
//         {
//           title: "Get Started",
//           url: "#",
//         },
//         {
//           title: "Tutorials",
//           url: "#",
//         },
//         {
//           title: "Changelog",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   // projects: [
//   //   {
//   //     name: "Design Engineering",
//   //     url: "#",
//   //     icon: Frame,
//   //   },
//   //   {
//   //     name: "Sales & Marketing",
//   //     url: "#",
//   //     icon: PieChart,
//   //   },
//   //   {
//   //     name: "Travel",
//   //     url: "#",
//   //     icon: Map,
//   //   },
//   // ],
// };

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const { t, i18n } = useTranslation("GetStartedPage");
//   const [sideBarRtl, setSideBarRtl] = useState(false);

//   useLayoutEffect(() => {
//     i18n.dir() === "rtl" ? setSideBarRtl(true) : setSideBarRtl(false);
//   }, [i18n.dir()]);

//   return (
//     <Sidebar side={sideBarRtl ? "right" : "left"} collapsible="icon" {...props}>
//       <SidebarHeader></SidebarHeader>
//       <SidebarContent>
//         <NavMain items={data.navMain} />
//         {/* <NavProjects projects={data.projects} /> */}
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser user={data.user} />
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   );
// }
