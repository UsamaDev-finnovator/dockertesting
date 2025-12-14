"use client";

import { LogOut, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  async function logout() {
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      alert("An unexpected error occurred.");
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="flex items-center gap-2 rounded-lg
              data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800
              transition-colors"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 text-left overflow-hidden">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
            className="w-56 rounded-lg bg-white dark:bg-gray-900 shadow-lg p-2"
          >
            <DropdownMenuLabel className="px-2 py-1.5">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 overflow-hidden">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="my-1" />

            {/* Optional additional items */}
            {/* <DropdownMenuItem className="px-2 py-1">Account</DropdownMenuItem>
            <DropdownMenuItem className="px-2 py-1">Billing</DropdownMenuItem> */}

            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuItem
              className="flex items-center gap-2 px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

// "use client";

// import {
//   BadgeCheck,
//   Bell,
//   ChevronsUpDown,
//   CreditCard,
//   LogOut,
//   Sparkles,
// } from "lucide-react";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { useRouter } from "next/navigation";

// export function NavUser({
//   user,
// }: {
//   user: {
//     name: string;
//     email: string;
//     avatar: string;
//   };
// }) {
//   const { isMobile } = useSidebar();
//   const router = useRouter();

//   async function logout() {
//     try {
//       const response = await fetch("/api/logout", {
//         method: "POST",
//       });
//       if (response.ok) {
//         router.refresh();
//       }
//     } catch (error) {
//       console.error("Error during Logout:", error);
//       alert("An unexpected error occurred.");
//     }
//   }

//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <SidebarMenuButton
//               size="lg"
//               className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
//             >
//               <Avatar className="h-8 w-8 rounded-lg">
//                 <AvatarImage src={user.avatar} alt={user.name} />
//                 <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//               </Avatar>
//               <div className="grid flex-1 text-left text-sm leading-tight">
//                 <span className="truncate font-medium">{user.name}</span>
//                 <span className="truncate text-xs">{user.email}</span>
//               </div>
//               <ChevronsUpDown className="ml-auto size-4" />
//             </SidebarMenuButton>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
//             side={isMobile ? "bottom" : "right"}
//             align="end"
//             sideOffset={4}
//           >
//             <DropdownMenuLabel className="p-0 font-normal">
//               <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//                 <Avatar className="h-8 w-8 rounded-lg">
//                   <AvatarImage src={user.avatar} alt={user.name} />
//                   <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//                 </Avatar>
//                 <div className="grid flex-1 text-left text-sm leading-tight">
//                   <span className="truncate font-medium">{user.name}</span>
//                   <span className="truncate text-xs">{user.email}</span>
//                 </div>
//               </div>
//             </DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuGroup>
//               <DropdownMenuItem>
//                 <Sparkles />
//                 Upgrade to Pro
//               </DropdownMenuItem>
//             </DropdownMenuGroup>
//             <DropdownMenuSeparator />
//             <DropdownMenuGroup>
//               <DropdownMenuItem>
//                 <BadgeCheck />
//                 Account
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <CreditCard />
//                 Billing
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <Bell />
//                 Notifications
//               </DropdownMenuItem>
//             </DropdownMenuGroup>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem onClick={() => logout()}>
//               <LogOut />
//               Log out
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   );
// }
