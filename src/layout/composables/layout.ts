import { computed, reactive, type Ref } from 'vue';

// 1. Definisikan Interface (Tipe Data) untuk Konfigurasi Layout
export interface LayoutConfig {
    preset: 'Aura' | string;
    primary: string;
    surface: string | null;
    darkTheme: boolean;
    menuMode: 'static' | 'overlay' | 'slim' | 'reveal' | 'drawer'; // Menambahkan beberapa mode menu umum
}

// 2. Definisikan Interface (Tipe Data) untuk Status Layout
export interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
    activeMenuItem: string | null; // Asumsi item menu aktif berupa string ID/route
}

// Inisialisasi State dengan Tipe yang Sesuai
const layoutConfig: LayoutConfig = reactive({
    preset: 'Aura',
    primary: 'emerald',
    surface: null,
    darkTheme: false,
    menuMode: 'static'
});

const layoutState: LayoutState = reactive({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
    activeMenuItem: null
});

// 3. Tambahkan Tipe Pengembalian dan Argumen pada Fungsi Composables
export function useLayout() {
    // Mengatur item menu aktif berdasarkan input yang diterima komponen.
    const setActiveMenuItem = (item: { value: string | null } | string | null) => {
        // Menggunakan tipe assertion 'as' atau cek tipe untuk mengakomodasi struktur item
        if (typeof item === 'object' && item !== null && 'value' in item) {
            layoutState.activeMenuItem = item.value;
        } else {
            layoutState.activeMenuItem = item as string | null;
        }
    };

    // Mengubah tema gelap dengan efek transisi bila didukung browser.
    const toggleDarkMode = (): void => {
        if (!document.startViewTransition) {
            executeDarkModeToggle();
            return;
        }

        // Tipe 'event' dihapus karena tidak digunakan dalam fungsi executeDarkModeToggle
        document.startViewTransition(() => executeDarkModeToggle());
    };

    // Membalik nilai tema gelap dan menambahkan kelas tema pada elemen root.
    const executeDarkModeToggle = (): void => {
        layoutConfig.darkTheme = !layoutConfig.darkTheme;
        document.documentElement.classList.toggle('app-dark', layoutConfig.darkTheme);
        document.documentElement.classList.toggle('dark', layoutConfig.darkTheme);
    };

    // Menentukan perilaku pembukaan menu berdasarkan mode dan lebar layar.
    const toggleMenu = (): void => {
        if (layoutConfig.menuMode === 'overlay') {
            layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
        }

        if (window.innerWidth > 991) {
            layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
        } else {
            layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
        }
    };

    // Menyediakan status reaktif apakah sidebar sedang terlihat.
    const isSidebarActive: Ref<boolean> = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive);
    // Menyediakan status reaktif tema gelap saat ini.
    const isDarkTheme: Ref<boolean> = computed(() => layoutConfig.darkTheme);
    // Menyediakan warna primer yang digunakan tema.
    const getPrimary: Ref<string> = computed(() => layoutConfig.primary);
    // Menyediakan warna permukaan yang berlaku pada tema.
    const getSurface: Ref<string | null> = computed(() => layoutConfig.surface);

    return {
        layoutConfig,
        layoutState,
        toggleMenu,
        isSidebarActive,
        isDarkTheme,
        getPrimary,
        getSurface,
        setActiveMenuItem,
        toggleDarkMode
    };
}
