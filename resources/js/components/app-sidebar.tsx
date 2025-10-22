import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Folder,
    Hospital,
    LayoutGrid,
    Stethoscope,
    UserRoundPlus,
    Users,
} from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { props } = usePage<{ auth?: { roles?: string[] } }>();
    const roles = props.auth?.roles || [];
    const role = roles[0] || '';

    const prefix = (() => {
        switch (role) {
            case 'super_admin':
                return '/super-admin';
            case 'admin':
                return '/admin';
            case 'resepsionis':
                return '/resepsionis';
            default:
                return '';
        }
    })();

    let mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Fasilitas',
            href: `${prefix}/fasilitas`,
            icon: Hospital,
        },
        {
            title: 'Pasien',
            href: `${prefix}/pasien`,
            icon: Users,
        },
        {
            title: 'Rekam Medis',
            href: `${prefix}/rekam-medis`,
            icon: Stethoscope,
        },
        {
            title: 'Tambah User',
            href: `${prefix}/tambah-user`,
            icon: UserRoundPlus,
        },
    ];

    if (role === 'super_admin') {
        mainNavItems = mainNavItems.filter((item) => item.title !== 'Pasien');
    }

    if (role === 'admin') {
        mainNavItems = mainNavItems.filter(
            (item) => item.title !== 'Pasien' && item.title !== 'Rekam Medis',
        );
    }

    if (role === 'resepsionis' || role === 'dokter') {
        mainNavItems = mainNavItems.filter(
            (item) => item.title !== 'Tambah User',
        );
    }

    const footerNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: Folder,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="mt-4">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
