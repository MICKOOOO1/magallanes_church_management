(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Navbar({ showLoginModal = false, showSignupModal = false, setShowLoginModal = ()=>{}, setShowSignupModal = ()=>{} }) {
    _s();
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hoveredLink, setHoveredLink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [activePath, setActivePath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // Get current path to show active page
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            setActivePath(pathname);
        }
    }["Navbar.useEffect"], [
        pathname
    ]);
    const toggleMenu = ()=>{
        setIsMenuOpen(!isMenuOpen);
    };
    // Close menu when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            const handleClickOutside = {
                "Navbar.useEffect.handleClickOutside": (event)=>{
                    const target = event.target;
                    if (isMenuOpen && !target.closest('.navbar-container')) {
                        setIsMenuOpen(false);
                    }
                }
            }["Navbar.useEffect.handleClickOutside"];
            if (isMenuOpen) {
                document.addEventListener('mousedown', handleClickOutside);
            }
            return ({
                "Navbar.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], [
        isMenuOpen
    ]);
    const styles = {
        navbar: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            background: '#102B4E',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
        },
        navContainer: {
            maxWidth: 1400,
            margin: '0 auto',
            padding: '0 10px 0 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 76,
            position: 'relative'
        },
        navBrand: {
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            left: 0
        },
        logo: {
            height: 50,
            width: 'auto'
        },
        brandText: {
            fontSize: 15,
            fontWeight: 600,
            color: '#FFF',
            marginLeft: 5,
            display: 'flex',
            alignItems: 'center'
        },
        navLink: {
            textDecoration: 'none',
            color: '#FFF',
            fontSize: 15,
            fontWeight: 600,
            transition: 'color 0.3s ease',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '8px 16px',
            borderRadius: 8
        },
        navLinkHover: {
            color: '#FFD700',
            borderBottom: '2px solid #FFD700',
            background: 'transparent'
        },
        navLinkActive: {
            color: '#FFD700',
            borderBottom: '2px solid #FFD700',
            background: 'transparent'
        },
        aboutUsActive: {
            color: '#FFD700',
            borderBottom: '2px solid #FFD700',
            background: 'transparent'
        },
        navCenter: {
            display: 'flex',
            gap: 16,
            alignItems: 'center'
        },
        navButton: {
            background: 'transparent',
            color: '#FFF',
            border: '2px solid #FFF',
            borderRadius: 6,
            padding: '10px 20px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        navButtonPrimary: {
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '10px 20px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        navMenu: {
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            position: 'absolute',
            right: 20
        },
        profileIconButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            borderRadius: 8,
            padding: '8px 12px',
            fontSize: 16,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            color: '#fff'
        },
        profileIcon: {
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 600
        },
        navToggle: {
            display: 'none',
            flexDirection: 'column',
            gap: 4,
            cursor: 'pointer',
            padding: '8px',
            borderRadius: 4,
            transition: 'background-color 0.3s ease',
            zIndex: 1001,
            position: 'relative'
        },
        toggleIcon: {
            width: 25,
            height: 2,
            background: '#111827',
            transition: 'all 0.3s ease'
        },
        // Mobile menu styles
        mobileMenu: {
            display: 'none',
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        },
        mobileMenuOpen: {
            display: 'block'
        },
        mobileNavCenter: {
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            gap: 0
        },
        mobileNavLink: {
            display: 'block',
            padding: '12px 16px',
            textDecoration: 'none',
            color: '#111827',
            fontWeight: 500,
            fontSize: 16,
            transition: 'background-color 0.3s ease',
            borderRadius: 8,
            marginBottom: '8px'
        },
        mobileNavLinkActive: {
            background: 'rgba(59, 130, 246, 0.1)',
            color: '#3b82f6',
            fontWeight: 600
        },
        mobileNavMenu: {
            display: 'flex',
            flexDirection: 'column',
            padding: '0 20px 20px',
            gap: '12px'
        },
        mobileNavButton: {
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '12px 16px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '100%'
        },
        mobileNavButtonPrimary: {
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '12px 16px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '100%'
        },
        // Responsive breakpoints
        '@media (max-width: 1024px)': {
            navContainer: {
                padding: '0 16px'
            },
            navCenter: {
                display: 'none'
            },
            navMenu: {
                display: 'none'
            },
            navToggle: {
                display: 'flex',
                position: 'absolute',
                right: 20
            },
            navBrand: {
                left: 16
            },
            logo: {
                height: 40
            },
            brandText: {
                fontSize: 16
            }
        },
        '@media (max-width: 480px)': {
            navContainer: {
                height: 64,
                padding: '0 12px'
            },
            logo: {
                height: 36
            },
            brandText: {
                fontSize: 14,
                marginLeft: 8
            },
            navToggle: {
                right: 16,
                display: 'flex !important',
                visibility: 'visible !important'
            },
            navCenter: {
                display: 'none !important'
            },
            navMenu: {
                display: 'none !important'
            }
        },
        '@media (max-width: 414px)': {
            navContainer: {
                padding: '0 10px'
            },
            logo: {
                height: 32
            },
            brandText: {
                fontSize: 13,
                marginLeft: 6
            },
            navToggle: {
                padding: '6px'
            },
            toggleIcon: {
                width: 20,
                height: 2
            }
        },
        '@media (max-width: 375px)': {
            navContainer: {
                height: 60,
                padding: '0 8px'
            },
            logo: {
                height: 28
            },
            brandText: {
                fontSize: 12,
                marginLeft: 4
            },
            navToggle: {
                right: 12,
                padding: '4px',
                display: 'flex !important',
                visibility: 'visible !important'
            },
            toggleIcon: {
                width: 18,
                height: 1.5
            },
            mobileNavCenter: {
                padding: '16px'
            },
            mobileNavLink: {
                padding: '10px 12px',
                fontSize: 14
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        style: styles.navbar,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "navbar-container",
            style: styles.navContainer,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.navBrand,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        style: styles.navLink,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/images/logo church.png",
                                alt: "Church Logo",
                                style: styles.logo
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 422,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: styles.brandText,
                                children: "Church Management"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 423,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Navbar.tsx",
                        lineNumber: 421,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 420,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.navCenter,
                    children: user ? // User is logged in - show dashboard navigation
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/userdashboard",
                                style: {
                                    ...styles.navLink,
                                    ...hoveredLink === 'dashboard' ? styles.navLinkHover : {},
                                    ...activePath === '/userdashboard' ? styles.navLinkActive : {}
                                },
                                onMouseEnter: ()=>setHoveredLink('dashboard'),
                                onMouseLeave: ()=>setHoveredLink(null),
                                children: "Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 431,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/bookings",
                                style: {
                                    ...styles.navLink,
                                    ...hoveredLink === 'bookings' ? styles.navLinkHover : {},
                                    ...activePath === '/bookings' ? styles.navLinkActive : {}
                                },
                                onMouseEnter: ()=>setHoveredLink('bookings'),
                                onMouseLeave: ()=>setHoveredLink(null),
                                children: "Booking"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 443,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/records",
                                style: {
                                    ...styles.navLink,
                                    ...hoveredLink === 'records' ? styles.navLinkHover : {},
                                    ...activePath === '/records' ? styles.navLinkActive : {}
                                },
                                onMouseEnter: ()=>setHoveredLink('records'),
                                onMouseLeave: ()=>setHoveredLink(null),
                                children: "Records"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 456,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true) : // User is not logged in - show main navigation
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                style: {
                                    ...styles.navLink,
                                    ...hoveredLink === 'home' ? styles.navLinkHover : {},
                                    ...activePath === '/' ? styles.navLinkActive : {}
                                },
                                onMouseEnter: ()=>setHoveredLink('home'),
                                onMouseLeave: ()=>setHoveredLink(null),
                                children: "Home"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 473,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/about",
                                style: {
                                    ...styles.navLink,
                                    ...hoveredLink === 'about' ? styles.navLinkHover : {},
                                    ...activePath === '/about' ? styles.aboutUsActive : {}
                                },
                                onMouseEnter: ()=>setHoveredLink('about'),
                                onMouseLeave: ()=>setHoveredLink(null),
                                children: "About Us"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 485,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/mass",
                                style: {
                                    ...styles.navLink,
                                    ...hoveredLink === 'mass' ? styles.navLinkHover : {},
                                    ...activePath === '/mass' ? styles.navLinkActive : {}
                                },
                                onMouseEnter: ()=>setHoveredLink('mass'),
                                onMouseLeave: ()=>setHoveredLink(null),
                                children: "Mass Schedule"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 497,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/events",
                                style: {
                                    ...styles.navLink,
                                    ...hoveredLink === 'events' ? styles.navLinkHover : {},
                                    ...activePath === '/events' ? styles.navLinkActive : {}
                                },
                                onMouseEnter: ()=>setHoveredLink('events'),
                                onMouseLeave: ()=>setHoveredLink(null),
                                children: "Events"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 509,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 427,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.navMenu,
                    children: user ? // User is logged in - show profile and settings icons
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/userdashboard?section=profile",
                                style: styles.profileIconButton,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 16
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Navbar.tsx",
                                            lineNumber: 534,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Profile"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Navbar.tsx",
                                            lineNumber: 535,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Navbar.tsx",
                                    lineNumber: 533,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 529,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: async ()=>{
                                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
                                    window.location.href = '/';
                                },
                                style: styles.navButton,
                                children: "Logout"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 538,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true) : // User is not logged in - show login
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowLoginModal(true),
                            style: styles.navButton,
                            children: "Sign In"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 551,
                            columnNumber: 15
                        }, this)
                    }, void 0, false)
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 525,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.navToggle,
                    onClick: toggleMenu,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: styles.toggleIcon
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 562,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: styles.toggleIcon
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 563,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: styles.toggleIcon
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 564,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 561,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        ...styles.mobileMenu,
                        ...isMenuOpen ? styles.mobileMenuOpen : {}
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.mobileNavCenter,
                            children: user ? // User is logged in - show dashboard navigation
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/userdashboard",
                                        style: {
                                            ...styles.mobileNavLink,
                                            ...activePath === '/userdashboard' ? styles.mobileNavLinkActive : {}
                                        },
                                        onClick: ()=>setIsMenuOpen(false),
                                        children: "Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 576,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/bookings",
                                        style: {
                                            ...styles.mobileNavLink,
                                            ...activePath === '/bookings' ? styles.mobileNavLinkActive : {}
                                        },
                                        onClick: ()=>setIsMenuOpen(false),
                                        children: "Booking"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 586,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/records",
                                        style: {
                                            ...styles.mobileNavLink,
                                            ...activePath === '/records' ? styles.mobileNavLinkActive : {}
                                        },
                                        onClick: ()=>setIsMenuOpen(false),
                                        children: "Records"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 597,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : // User is not logged in - no center navigation
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 572,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.mobileNavMenu,
                            children: user ? // User is logged in - show user menu
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/userdashboard?section=profile",
                                        style: {
                                            ...styles.mobileNavLink,
                                            ...activePath === '/userdashboard' && window.location.search.includes('section=profile') ? styles.mobileNavLinkActive : {}
                                        },
                                        onClick: ()=>setIsMenuOpen(false),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 16
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Navbar.tsx",
                                                    lineNumber: 627,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Profile"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Navbar.tsx",
                                                    lineNumber: 628,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Navbar.tsx",
                                            lineNumber: 626,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 618,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/userdashboard?section=settings",
                                        style: {
                                            ...styles.mobileNavLink,
                                            ...activePath === '/userdashboard' && window.location.search.includes('section=settings') ? styles.mobileNavLinkActive : {}
                                        },
                                        onClick: ()=>setIsMenuOpen(false),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 16
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Navbar.tsx",
                                                    lineNumber: 640,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Settings"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Navbar.tsx",
                                                    lineNumber: 641,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Navbar.tsx",
                                            lineNumber: 639,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 631,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: async ()=>{
                                            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
                                            setIsMenuOpen(false);
                                            window.location.href = '/';
                                        },
                                        style: styles.mobileNavLink,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 16
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Navbar.tsx",
                                                    lineNumber: 653,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Logout"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Navbar.tsx",
                                                    lineNumber: 654,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Navbar.tsx",
                                            lineNumber: 652,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 644,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : // User is not logged in - show login
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowLoginModal(true);
                                        setIsMenuOpen(false);
                                    },
                                    style: styles.mobileNavButton,
                                    children: "Sign In"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.tsx",
                                    lineNumber: 661,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 614,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 568,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Navbar.tsx",
            lineNumber: 419,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Navbar.tsx",
        lineNumber: 418,
        columnNumber: 5
    }, this);
}
_s(Navbar, "5UTYLqADHo0416y8AOU9h7i3Qj0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Footer = ()=>{
    const styles = {
        footer: {
            background: 'linear-gradient(135deg, #0F2A4A, #2F5FA8)',
            color: '#F5F5F4',
            padding: '20px 20px 5px',
            marginTop: 0
        },
        footerContainer: {
            maxWidth: 1200,
            margin: '0 auto'
        },
        footerContent: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 40,
            marginBottom: 30,
            alignItems: 'start'
        },
        footerBrand: {
            flex: 1
        },
        footerHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 6
        },
        footerLogo: {
            height: 30,
            width: 'auto'
        },
        footerTitle: {
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 8,
            color: '#F5F5F4',
            fontFamily: 'Poppins, sans-serif',
            textAlign: 'left'
        },
        footerDescription: {
            fontSize: 13,
            color: '#D6D3D1',
            marginBottom: 12,
            fontFamily: 'Inter, sans-serif',
            lineHeight: 1.4,
            maxWidth: '280px',
            textAlign: 'left'
        },
        socialIcons: {
            display: 'flex',
            gap: 8,
            marginTop: 8
        },
        socialIcon: {
            width: 32,
            height: 32,
            background: 'rgba(244, 196, 48, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F4C430',
            fontSize: 16,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(244, 196, 48, 0.3)'
        },
        footerLinks: {
            display: 'flex',
            flexDirection: 'column',
            gap: 8
        },
        footerLinkGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: 4
        },
        footerLinkTitle: {
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 8,
            color: '#F5F5F4',
            fontFamily: 'Poppins, sans-serif',
            borderBottom: '2px solid #F4C430',
            paddingBottom: 2,
            display: 'inline-block'
        },
        footerLink: {
            color: '#D6D3D1',
            textDecoration: 'none',
            fontSize: 13,
            transition: 'color 0.3s ease',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            marginBottom: 4,
            lineHeight: 1.3
        },
        footerBottom: {
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            paddingTop: 5,
            textAlign: 'center'
        },
        footerCopyright: {
            fontSize: 11,
            color: '#A8A29E',
            fontFamily: 'Inter, sans-serif'
        },
        // Responsive styles
        '@media (max-width: 768px)': {
            footer: {
                padding: '30px 15px 15px'
            },
            footerContent: {
                gridTemplateColumns: '1fr',
                gap: 20
            },
            footerBrand: {
                textAlign: 'center'
            },
            footerTitle: {
                textAlign: 'center'
            },
            footerDescription: {
                textAlign: 'center',
                maxWidth: '100%'
            },
            socialIcons: {
                justifyContent: 'center'
            },
            footerLinks: {
                textAlign: 'center'
            },
            footerBottom: {
                marginTop: 20
            }
        },
        '@media (max-width: 480px)': {
            footer: {
                padding: '20px 15px 10px'
            },
            footerTitle: {
                fontSize: 14
            },
            footerCopyright: {
                fontSize: 10
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        style: styles.footer,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: styles.footerContainer,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.footerContent,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.footerBrand,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.footerHeader,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/images/logo church.png",
                                            alt: "Church Logo",
                                            style: styles.footerLogo
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 181,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: styles.footerTitle,
                                            children: "Our Lady of the Rosary Parish"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 182,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 180,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: styles.footerDescription,
                                    children: "A community of faith, hope, and love. We are dedicated to worship, service, and spiritual growth."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 184,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.socialIcons,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.socialIcon,
                                            children: "f"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 186,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.socialIcon,
                                            children: "t"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 187,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.socialIcon,
                                            children: "in"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 188,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 185,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Footer.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.footerLinks,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: styles.footerLinkGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        style: styles.footerLinkTitle,
                                        children: "Contact"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer.tsx",
                                        lineNumber: 193,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: styles.footerLink,
                                        children: "Purok-4, Barangay Poblacion"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer.tsx",
                                        lineNumber: 194,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: styles.footerLink,
                                        children: "Magallanes, Agusan del Norte"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer.tsx",
                                        lineNumber: 195,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: styles.footerLink,
                                        children: "09919417157"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer.tsx",
                                        lineNumber: 196,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: styles.footerLink,
                                        children: "nsdrparish56@gmail.com"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer.tsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Footer.tsx",
                                lineNumber: 192,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/Footer.tsx",
                            lineNumber: 191,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.footerLinks,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: styles.footerLinkGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        style: styles.footerLinkTitle,
                                        children: "Working Time"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer.tsx",
                                        lineNumber: 202,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: styles.footerLink,
                                        children: "Monday - Friday"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer.tsx",
                                        lineNumber: 203,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: styles.footerLink,
                                        children: "8:00 AM - 5:00 PM"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer.tsx",
                                        lineNumber: 204,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: styles.footerLink,
                                        children: "Saturday"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer.tsx",
                                        lineNumber: 205,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: styles.footerLink,
                                        children: "9:00 AM - 12:00 PM"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer.tsx",
                                        lineNumber: 206,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: styles.footerLink,
                                        children: "Sunday"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer.tsx",
                                        lineNumber: 207,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: styles.footerLink,
                                        children: "Mass Schedule"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer.tsx",
                                        lineNumber: 208,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Footer.tsx",
                                lineNumber: 201,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/Footer.tsx",
                            lineNumber: 200,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Footer.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.footerBottom,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: styles.footerCopyright,
                        children: "© 2024 Our Lady of the Rosary Parish. All rights reserved."
                    }, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/Footer.tsx",
                    lineNumber: 212,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Footer.tsx",
            lineNumber: 177,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Footer.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Footer;
const __TURBOPACK__default__export__ = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AuthModals.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthModals
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function AuthModals({ showLoginModal, showSignupModal, setShowLoginModal, setShowSignupModal }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { refreshUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Login state
    const [loginData, setLoginData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        email: '',
        password: ''
    });
    const [loginTouched, setLoginTouched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        email: false,
        password: false
    });
    const [loginErrors, setLoginErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        email: '',
        password: ''
    });
    // Signup state
    const [signupData, setSignupData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        firstName: '',
        middleName: '',
        lastName: '',
        extensionName: '',
        dob: '',
        age: '',
        sex: '',
        email: '',
        purok: '',
        barangay: '',
        password: '',
        confirmPassword: ''
    });
    const [signupTouched, setSignupTouched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        firstName: false,
        middleName: false,
        lastName: false,
        extensionName: false,
        dob: false,
        age: false,
        sex: false,
        email: false,
        purok: false,
        barangay: false,
        password: false,
        confirmPassword: false
    });
    const [signupErrors, setSignupErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        firstName: '',
        middleName: '',
        lastName: '',
        extensionName: '',
        dob: '',
        age: '',
        sex: '',
        email: '',
        purok: '',
        barangay: '',
        password: '',
        confirmPassword: ''
    });
    // Validation function for single field (returns error string)
    const validateField = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthModals.useCallback[validateField]": (name, value, formData, isSignup = false)=>{
            let error = '';
            if (isSignup) {
                switch(name){
                    case 'firstName':
                    case 'lastName':
                        if (!value.trim()) error = 'This field is required';
                        else if (value.trim().length < 2) error = 'Minimum 2 characters';
                        else {
                            const nameRegex = /^[a-zA-Z\s\-'.]+$/;
                            if (!nameRegex.test(value.trim())) error = 'No numbers allowed';
                            // Check if first letter of each word is capitalized
                            const words = value.trim().split(/\s+/);
                            const hasCapitalizationError = words.some({
                                "AuthModals.useCallback[validateField].hasCapitalizationError": (word)=>word.charAt(0) !== word.charAt(0).toUpperCase()
                            }["AuthModals.useCallback[validateField].hasCapitalizationError"]);
                            if (hasCapitalizationError) error = 'First letter of each word must be capitalized';
                        }
                        break;
                    case 'middleName':
                    case 'extensionName':
                        if (value.trim() && value.trim().length < 2) error = 'Minimum 2 characters';
                        else if (value.trim()) {
                            const nameRegex = /^[a-zA-Z\s\-'.]+$/;
                            if (!nameRegex.test(value.trim())) error = 'No numbers allowed';
                            // Check if first letter of each word is capitalized
                            const words = value.trim().split(/\s+/);
                            const hasCapitalizationError = words.some({
                                "AuthModals.useCallback[validateField].hasCapitalizationError": (word)=>word.charAt(0) !== word.charAt(0).toUpperCase()
                            }["AuthModals.useCallback[validateField].hasCapitalizationError"]);
                            if (hasCapitalizationError) error = 'First letter of each word must be capitalized';
                        }
                        break;
                    case 'purok':
                    case 'barangay':
                        if (!value.trim()) error = 'This field is required';
                        else if (value.trim().length < 2) error = 'Minimum 2 characters';
                        else {
                            // Check if first letter of each word is capitalized
                            const words = value.trim().split(/\s+/);
                            const hasCapitalizationError = words.some({
                                "AuthModals.useCallback[validateField].hasCapitalizationError": (word)=>word.charAt(0) !== word.charAt(0).toUpperCase()
                            }["AuthModals.useCallback[validateField].hasCapitalizationError"]);
                            if (hasCapitalizationError) error = 'First letter of each word must be capitalized';
                        }
                        break;
                    case 'dob':
                        if (!value) error = 'Date of birth is required';
                        else {
                            const today = new Date();
                            const birthDate = new Date(value);
                            if (birthDate > today) error = 'Date cannot be in the future';
                        }
                        break;
                    case 'age':
                        if (!value) error = 'Age is required';
                        else {
                            const age = parseInt(value);
                            if (isNaN(age) || age <= 0 || age > 150) error = 'Age must be between 1-150';
                        }
                        break;
                    case 'sex':
                        if (!value || value === '') error = 'Please select your sex';
                        break;
                    case 'email':
                        if (!value.trim()) error = 'Email is required';
                        else {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(value)) error = 'Invalid email format';
                        }
                        break;
                    case 'password':
                        if (!value) error = 'Password is required';
                        else if (value.length < 8) error = 'Password must be at least 8 characters';
                        break;
                    case 'confirmPassword':
                        if (!value) error = 'Please confirm your password';
                        else if (value !== formData.password) error = 'Passwords do not match';
                        break;
                    default:
                        break;
                }
            } else {
                // Login
                if (name === 'email') {
                    if (!value.trim()) error = 'Email is required';
                } else if (name === 'password') {
                    if (!value) error = 'Password is required';
                }
            }
            return error;
        }
    }["AuthModals.useCallback[validateField]"], []);
    // Live validation handlers
    const handleLoginChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthModals.useCallback[handleLoginChange]": (name)=>({
                "AuthModals.useCallback[handleLoginChange]": (e)=>{
                    const value = e.target.value;
                    setLoginData({
                        "AuthModals.useCallback[handleLoginChange]": (prev)=>{
                            const newData = {
                                ...prev,
                                [name]: value
                            };
                            const error = validateField(name, value, newData, false);
                            setLoginErrors({
                                "AuthModals.useCallback[handleLoginChange]": (prevErrors)=>({
                                        ...prevErrors,
                                        [name]: error
                                    })
                            }["AuthModals.useCallback[handleLoginChange]"]);
                            return newData;
                        }
                    }["AuthModals.useCallback[handleLoginChange]"]);
                    setLoginTouched({
                        "AuthModals.useCallback[handleLoginChange]": (prev)=>({
                                ...prev,
                                [name]: true
                            })
                    }["AuthModals.useCallback[handleLoginChange]"]);
                }
            })["AuthModals.useCallback[handleLoginChange]"]
    }["AuthModals.useCallback[handleLoginChange]"], [
        validateField
    ]);
    const handleLoginBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthModals.useCallback[handleLoginBlur]": (name)=>({
                "AuthModals.useCallback[handleLoginBlur]": (e)=>{
                    setLoginTouched({
                        "AuthModals.useCallback[handleLoginBlur]": (prev)=>({
                                ...prev,
                                [name]: true
                            })
                    }["AuthModals.useCallback[handleLoginBlur]"]);
                    const value = loginData[name];
                    const error = validateField(name, value, loginData, false);
                    setLoginErrors({
                        "AuthModals.useCallback[handleLoginBlur]": (prevErrors)=>({
                                ...prevErrors,
                                [name]: error
                            })
                    }["AuthModals.useCallback[handleLoginBlur]"]);
                }
            })["AuthModals.useCallback[handleLoginBlur]"]
    }["AuthModals.useCallback[handleLoginBlur]"], [
        validateField,
        loginData
    ]);
    const handleSignupChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthModals.useCallback[handleSignupChange]": (name)=>({
                "AuthModals.useCallback[handleSignupChange]": (e)=>{
                    const value = e.target.value;
                    setSignupData({
                        "AuthModals.useCallback[handleSignupChange]": (prev)=>{
                            const newData = {
                                ...prev,
                                [name]: value
                            };
                            // Auto-calculate age when date of birth changes
                            if (name === 'dob' && value) {
                                const birthDate = new Date(value);
                                const today = new Date();
                                let calculatedAge = today.getFullYear() - birthDate.getFullYear();
                                const monthDiff = today.getMonth() - birthDate.getMonth();
                                if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {
                                    calculatedAge--;
                                }
                                newData.age = calculatedAge.toString();
                            }
                            const error = validateField(name, value, newData, true);
                            setSignupErrors({
                                "AuthModals.useCallback[handleSignupChange]": (prevErrors)=>({
                                        ...prevErrors,
                                        [name]: error
                                    })
                            }["AuthModals.useCallback[handleSignupChange]"]);
                            return newData;
                        }
                    }["AuthModals.useCallback[handleSignupChange]"]);
                    setSignupTouched({
                        "AuthModals.useCallback[handleSignupChange]": (prev)=>({
                                ...prev,
                                [name]: true
                            })
                    }["AuthModals.useCallback[handleSignupChange]"]);
                }
            })["AuthModals.useCallback[handleSignupChange]"]
    }["AuthModals.useCallback[handleSignupChange]"], [
        validateField
    ]);
    const handleSignupBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthModals.useCallback[handleSignupBlur]": (name)=>({
                "AuthModals.useCallback[handleSignupBlur]": (e)=>{
                    setSignupTouched({
                        "AuthModals.useCallback[handleSignupBlur]": (prev)=>({
                                ...prev,
                                [name]: true
                            })
                    }["AuthModals.useCallback[handleSignupBlur]"]);
                    const value = signupData[name];
                    const error = validateField(name, value, signupData, true);
                    setSignupErrors({
                        "AuthModals.useCallback[handleSignupBlur]": (prevErrors)=>({
                                ...prevErrors,
                                [name]: error
                            })
                    }["AuthModals.useCallback[handleSignupBlur]"]);
                }
            })["AuthModals.useCallback[handleSignupBlur]"]
    }["AuthModals.useCallback[handleSignupBlur]"], [
        validateField,
        signupData
    ]);
    const styles = {
        modalOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        },
        modal: {
            background: '#fff',
            borderRadius: 12,
            padding: 0,
            maxWidth: 400,
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        },
        signupModal: {
            background: '#fff',
            borderRadius: 12,
            padding: 0,
            maxWidth: 1000,
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        },
        modalHeader: {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '24px 24px 20px',
            borderBottom: '1px solid #e5e7eb',
            position: 'relative'
        },
        modalTitle: {
            fontSize: 20,
            fontWeight: 700,
            color: '#111827',
            margin: 0
        },
        modalClose: {
            background: 'none',
            border: 'none',
            fontSize: 24,
            color: '#6b7280',
            cursor: 'pointer',
            padding: 0,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
            transition: 'background-color 0.2s',
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1
        },
        modalBody: {
            padding: '24px'
        },
        modalInput: {
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: 8,
            fontSize: 14,
            marginBottom: 4,
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s ease'
        },
        modalInputError: {
            borderColor: '#ef4444 !important',
            backgroundColor: '#fff5f5'
        },
        modalInputSuccess: {
            borderColor: '#10b981 !important',
            backgroundColor: '#f0fdf4'
        },
        helperText: {
            fontSize: 12,
            marginTop: 2,
            marginBottom: 8,
            padding: 0
        },
        helperTextError: {
            color: '#ef4444'
        },
        helperTextSuccess: {
            color: '#10b981'
        },
        modalButton: {
            width: '100%',
            background: `linear-gradient(135deg, ${loading ? '#9ca3af' : '#3b82f6'} 0%, ${loading ? '#6b7280' : '#2563eb'} 100%)`,
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '14px 16px',
            fontSize: 16,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            marginBottom: 8
        },
        errorMessage: {
            color: '#ef4444',
            fontSize: 14,
            marginBottom: 16,
            padding: '8px 12px',
            background: '#fee2e2',
            borderRadius: 6,
            borderLeft: '3px solid #ef4444'
        },
        modalHeaderContent: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            flex: 1
        },
        modalIcon: {
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 16,
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
        },
        modalSubtitle: {
            fontSize: 14,
            color: '#6b7280',
            margin: '8px 0 0 0',
            fontWeight: 400
        },
        inputGroup: {
            marginBottom: 0
        },
        inputLabel: {
            display: 'block',
            fontSize: 14,
            fontWeight: 600,
            color: '#374151',
            marginBottom: 0,
            padding: 0
        },
        modalOptions: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12
        },
        checkboxLabel: {
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
            color: '#6b7280',
            cursor: 'pointer',
            margin: 0,
            padding: 0
        },
        checkbox: {
            marginRight: 8,
            width: 16,
            height: 16,
            cursor: 'pointer'
        },
        forgotPassword: {
            color: '#3b82f6',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 500,
            transition: 'color 0.2s'
        },
        modalFooter: {
            textAlign: 'center',
            paddingTop: 16,
            borderTop: '1px solid #e5e7eb'
        },
        modalFooterText: {
            margin: 0,
            padding: 0,
            fontSize: 14,
            color: '#6b7280'
        },
        linkButton: {
            background: 'none',
            border: 'none',
            color: '#3b82f6',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            textDecoration: 'underline',
            transition: 'color 0.2s'
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            showLoginModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.modalOverlay,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.modal,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.modalHeader,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.modalHeaderContent,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: styles.modalTitle,
                                            children: "Welcome Back"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 456,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: styles.modalSubtitle,
                                            children: "Sign in to your account"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 457,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AuthModals.tsx",
                                    lineNumber: 455,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowLoginModal(false),
                                    style: styles.modalClose,
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthModals.tsx",
                                    lineNumber: 459,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuthModals.tsx",
                            lineNumber: 454,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.modalBody,
                            children: [
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.errorMessage,
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthModals.tsx",
                                    lineNumber: 462,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.inputGroup,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: styles.inputLabel,
                                            children: "Email"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 464,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "email",
                                            placeholder: "Enter your email",
                                            style: {
                                                ...styles.modalInput,
                                                ...loginErrors.email && {
                                                    ...styles.modalInputError
                                                },
                                                ...loginData.email && !loginErrors.email && loginTouched.email && {
                                                    ...styles.modalInputSuccess
                                                }
                                            },
                                            value: loginData.email,
                                            onChange: handleLoginChange('email'),
                                            onBlur: handleLoginBlur('email'),
                                            disabled: loading
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 465,
                                            columnNumber: 17
                                        }, this),
                                        loginTouched.email && loginErrors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...styles.helperText,
                                                ...styles.helperTextError
                                            },
                                            children: loginErrors.email
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 475,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AuthModals.tsx",
                                    lineNumber: 463,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.inputGroup,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: styles.inputLabel,
                                            children: "Password"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 479,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "password",
                                            placeholder: "Enter your password",
                                            style: {
                                                ...styles.modalInput,
                                                ...loginErrors.password && {
                                                    ...styles.modalInputError
                                                },
                                                ...loginData.password && !loginErrors.password && loginTouched.password && {
                                                    ...styles.modalInputSuccess
                                                }
                                            },
                                            value: loginData.password,
                                            onChange: handleLoginChange('password'),
                                            onBlur: handleLoginBlur('password'),
                                            disabled: loading
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 480,
                                            columnNumber: 17
                                        }, this),
                                        loginTouched.password && loginErrors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...styles.helperText,
                                                ...styles.helperTextError
                                            },
                                            children: loginErrors.password
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 490,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AuthModals.tsx",
                                    lineNumber: 478,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 12
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#",
                                        style: styles.forgotPassword,
                                        onClick: (e)=>e.preventDefault(),
                                        children: "Forgot password?"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AuthModals.tsx",
                                        lineNumber: 494,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthModals.tsx",
                                    lineNumber: 493,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: async ()=>{
                                        setLoading(true);
                                        setError('');
                                        if (loginData.email && loginData.password && !loginErrors.email && !loginErrors.password) {
                                            try {
                                                const response = await fetch('/api/auth/login', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify({
                                                        email: loginData.email,
                                                        password: loginData.password
                                                    })
                                                });
                                                const result = await response.json();
                                                if (!response.ok) {
                                                    if (result.error?.includes('Invalid login credentials')) {
                                                        setError('Invalid email or password. Please try again.');
                                                    } else if (result.error?.includes('User')) {
                                                        setError('User not found. Please check your email or sign up.');
                                                    } else {
                                                        setError(result.error || 'Login failed');
                                                    }
                                                } else {
                                                    // After successful login, set the session in the Supabase client
                                                    // This ensures the Navbar receives the auth state update
                                                    if (result.data?.session) {
                                                        const { access_token, refresh_token } = result.data.session;
                                                        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.setSession({
                                                            access_token,
                                                            refresh_token
                                                        });
                                                    }
                                                    // Refresh auth context to update navbar
                                                    await refreshUser();
                                                    setShowLoginModal(false);
                                                    router.push('/userdashboard');
                                                }
                                            } catch (err) {
                                                setError('Unable to connect to server. Please try again later.');
                                            }
                                        }
                                        setLoading(false);
                                    },
                                    style: styles.modalButton,
                                    disabled: loading || !!loginErrors.email || !!loginErrors.password,
                                    children: loading ? 'Signing In...' : 'Sign In'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthModals.tsx",
                                    lineNumber: 496,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.modalFooter,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: styles.modalFooterText,
                                        children: [
                                            "Don't have an account?",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setShowLoginModal(false);
                                                    setShowSignupModal(true);
                                                },
                                                style: styles.linkButton,
                                                children: "Sign Up"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AuthModals.tsx",
                                                lineNumber: 550,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AuthModals.tsx",
                                        lineNumber: 548,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthModals.tsx",
                                    lineNumber: 547,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuthModals.tsx",
                            lineNumber: 461,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AuthModals.tsx",
                    lineNumber: 453,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AuthModals.tsx",
                lineNumber: 452,
                columnNumber: 9
            }, this),
            showSignupModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.modalOverlay,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.signupModal,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.modalHeader,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.modalHeaderContent,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: styles.modalTitle,
                                            children: "Create Account"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 569,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: styles.modalSubtitle,
                                            children: "Join our church community"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 570,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AuthModals.tsx",
                                    lineNumber: 568,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowSignupModal(false),
                                    style: styles.modalClose,
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthModals.tsx",
                                    lineNumber: 572,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuthModals.tsx",
                            lineNumber: 567,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.modalBody,
                            children: [
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.errorMessage,
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthModals.tsx",
                                    lineNumber: 575,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: '16px',
                                        paddingBottom: '12px',
                                        borderBottom: '1px solid #e5e7eb'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                fontSize: 16,
                                                fontWeight: 600,
                                                color: '#111827',
                                                marginBottom: '12px'
                                            },
                                            children: "Personal Information"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 579,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                gap: '12px',
                                                marginBottom: '8px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.inputGroup,
                                                        flex: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            style: styles.inputLabel,
                                                            children: [
                                                                "First Name ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        color: '#ef4444'
                                                                    },
                                                                    children: "*"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                                    lineNumber: 582,
                                                                    columnNumber: 65
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 582,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            placeholder: "Enter your first name",
                                                            style: {
                                                                ...styles.modalInput,
                                                                ...signupErrors.firstName && {
                                                                    ...styles.modalInputError
                                                                },
                                                                ...signupData.firstName && !signupErrors.firstName && signupTouched.firstName && {
                                                                    ...styles.modalInputSuccess
                                                                }
                                                            },
                                                            value: signupData.firstName,
                                                            onChange: handleSignupChange('firstName'),
                                                            onBlur: handleSignupBlur('firstName'),
                                                            disabled: loading
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 583,
                                                            columnNumber: 21
                                                        }, this),
                                                        signupTouched.firstName && signupErrors.firstName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                ...styles.helperText,
                                                                ...styles.helperTextError
                                                            },
                                                            children: signupErrors.firstName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 593,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 581,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.inputGroup,
                                                        flex: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            style: styles.inputLabel,
                                                            children: [
                                                                "Middle Name ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        color: '#10b981'
                                                                    },
                                                                    children: "(optional)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                                    lineNumber: 597,
                                                                    columnNumber: 66
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 597,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            placeholder: "Enter your middle name",
                                                            style: {
                                                                ...styles.modalInput,
                                                                ...signupErrors.middleName && {
                                                                    ...styles.modalInputError
                                                                },
                                                                ...signupData.middleName && !signupErrors.middleName && signupTouched.middleName && {
                                                                    ...styles.modalInputSuccess
                                                                }
                                                            },
                                                            value: signupData.middleName,
                                                            onChange: handleSignupChange('middleName'),
                                                            onBlur: handleSignupBlur('middleName'),
                                                            disabled: loading
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 598,
                                                            columnNumber: 21
                                                        }, this),
                                                        signupTouched.middleName && signupErrors.middleName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                ...styles.helperText,
                                                                ...styles.helperTextError
                                                            },
                                                            children: signupErrors.middleName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 608,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 596,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.inputGroup,
                                                        flex: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            style: styles.inputLabel,
                                                            children: [
                                                                "Last Name ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        color: '#ef4444'
                                                                    },
                                                                    children: "*"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                                    lineNumber: 612,
                                                                    columnNumber: 64
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 612,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            placeholder: "Enter your last name",
                                                            style: {
                                                                ...styles.modalInput,
                                                                ...signupErrors.lastName && {
                                                                    ...styles.modalInputError
                                                                },
                                                                ...signupData.lastName && !signupErrors.lastName && signupTouched.lastName && {
                                                                    ...styles.modalInputSuccess
                                                                }
                                                            },
                                                            value: signupData.lastName,
                                                            onChange: handleSignupChange('lastName'),
                                                            onBlur: handleSignupBlur('lastName'),
                                                            disabled: loading
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 613,
                                                            columnNumber: 21
                                                        }, this),
                                                        signupTouched.lastName && signupErrors.lastName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                ...styles.helperText,
                                                                ...styles.helperTextError
                                                            },
                                                            children: signupErrors.lastName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 623,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 611,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.inputGroup,
                                                        flex: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            style: styles.inputLabel,
                                                            children: [
                                                                "Extension Name ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        color: '#10b981'
                                                                    },
                                                                    children: "(optional)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                                    lineNumber: 627,
                                                                    columnNumber: 69
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 627,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            placeholder: "Enter your extension name",
                                                            style: {
                                                                ...styles.modalInput,
                                                                ...signupErrors.extensionName && {
                                                                    ...styles.modalInputError
                                                                },
                                                                ...signupData.extensionName && !signupErrors.extensionName && signupTouched.extensionName && {
                                                                    ...styles.modalInputSuccess
                                                                }
                                                            },
                                                            value: signupData.extensionName,
                                                            onChange: handleSignupChange('extensionName'),
                                                            onBlur: handleSignupBlur('extensionName'),
                                                            disabled: loading
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 628,
                                                            columnNumber: 21
                                                        }, this),
                                                        signupTouched.extensionName && signupErrors.extensionName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                ...styles.helperText,
                                                                ...styles.helperTextError
                                                            },
                                                            children: signupErrors.extensionName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 638,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 626,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 580,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AuthModals.tsx",
                                    lineNumber: 578,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '12px',
                                        marginBottom: '8px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...styles.inputGroup,
                                                flex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: styles.inputLabel,
                                                    children: [
                                                        "Date of Birth ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: '#ef4444'
                                                            },
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 647,
                                                            columnNumber: 66
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 647,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "date",
                                                    style: {
                                                        ...styles.modalInput,
                                                        ...signupErrors.dob && {
                                                            ...styles.modalInputError
                                                        },
                                                        ...signupData.dob && !signupErrors.dob && signupTouched.dob && {
                                                            ...styles.modalInputSuccess
                                                        }
                                                    },
                                                    value: signupData.dob,
                                                    onChange: handleSignupChange('dob'),
                                                    onBlur: handleSignupBlur('dob'),
                                                    disabled: loading
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 648,
                                                    columnNumber: 19
                                                }, this),
                                                signupTouched.dob && signupErrors.dob && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.helperText,
                                                        ...styles.helperTextError
                                                    },
                                                    children: signupErrors.dob
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 657,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 646,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...styles.inputGroup,
                                                flex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: styles.inputLabel,
                                                    children: [
                                                        "Age ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: '#ef4444'
                                                            },
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 661,
                                                            columnNumber: 56
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 661,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    placeholder: "Auto-calculated",
                                                    style: {
                                                        ...styles.modalInput,
                                                        ...signupErrors.age && {
                                                            ...styles.modalInputError
                                                        },
                                                        ...signupData.age && !signupErrors.age && signupTouched.age && {
                                                            ...styles.modalInputSuccess
                                                        },
                                                        backgroundColor: '#f3f4f6'
                                                    },
                                                    value: signupData.age,
                                                    onChange: handleSignupChange('age'),
                                                    onBlur: handleSignupBlur('age'),
                                                    disabled: loading,
                                                    readOnly: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 662,
                                                    columnNumber: 19
                                                }, this),
                                                signupTouched.age && signupErrors.age && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.helperText,
                                                        ...styles.helperTextError
                                                    },
                                                    children: signupErrors.age
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 673,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 660,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...styles.inputGroup,
                                                flex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: styles.inputLabel,
                                                    children: [
                                                        "Sex ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: '#ef4444'
                                                            },
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 677,
                                                            columnNumber: 56
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 677,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    style: {
                                                        ...styles.modalInput,
                                                        ...signupErrors.sex && {
                                                            ...styles.modalInputError
                                                        },
                                                        ...signupData.sex && !signupErrors.sex && signupTouched.sex && {
                                                            ...styles.modalInputSuccess
                                                        }
                                                    },
                                                    value: signupData.sex,
                                                    onChange: handleSignupChange('sex'),
                                                    onBlur: handleSignupBlur('sex'),
                                                    disabled: loading,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "--Select--"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 685,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "male",
                                                            children: "Male"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 686,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "female",
                                                            children: "Female"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 687,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 678,
                                                    columnNumber: 19
                                                }, this),
                                                signupTouched.sex && signupErrors.sex && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.helperText,
                                                        ...styles.helperTextError
                                                    },
                                                    children: signupErrors.sex
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 690,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 676,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...styles.inputGroup,
                                                flex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: styles.inputLabel,
                                                    children: [
                                                        "Email Address ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: '#ef4444'
                                                            },
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 694,
                                                            columnNumber: 66
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 694,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "email",
                                                    placeholder: "Enter your email",
                                                    style: {
                                                        ...styles.modalInput,
                                                        ...signupErrors.email && {
                                                            ...styles.modalInputError
                                                        },
                                                        ...signupData.email && !signupErrors.email && signupTouched.email && {
                                                            ...styles.modalInputSuccess
                                                        }
                                                    },
                                                    value: signupData.email,
                                                    onChange: handleSignupChange('email'),
                                                    onBlur: handleSignupBlur('email'),
                                                    disabled: loading
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 695,
                                                    columnNumber: 19
                                                }, this),
                                                signupTouched.email && signupErrors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.helperText,
                                                        ...styles.helperTextError
                                                    },
                                                    children: signupErrors.email
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 705,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 693,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AuthModals.tsx",
                                    lineNumber: 645,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '12px',
                                        marginBottom: '8px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...styles.inputGroup,
                                                flex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: styles.inputLabel,
                                                    children: [
                                                        "Purok/Street ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: '#ef4444'
                                                            },
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 713,
                                                            columnNumber: 65
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 713,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "Enter your purok/street",
                                                    style: {
                                                        ...styles.modalInput,
                                                        ...signupErrors.purok && {
                                                            ...styles.modalInputError
                                                        },
                                                        ...signupData.purok && !signupErrors.purok && signupTouched.purok && {
                                                            ...styles.modalInputSuccess
                                                        }
                                                    },
                                                    value: signupData.purok,
                                                    onChange: handleSignupChange('purok'),
                                                    onBlur: handleSignupBlur('purok'),
                                                    disabled: loading
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 714,
                                                    columnNumber: 19
                                                }, this),
                                                signupTouched.purok && signupErrors.purok && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.helperText,
                                                        ...styles.helperTextError
                                                    },
                                                    children: signupErrors.purok
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 724,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 712,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...styles.inputGroup,
                                                flex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: styles.inputLabel,
                                                    children: [
                                                        "Barangay ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: '#ef4444'
                                                            },
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 728,
                                                            columnNumber: 61
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 728,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "Enter your barangay",
                                                    style: {
                                                        ...styles.modalInput,
                                                        ...signupErrors.barangay && {
                                                            ...styles.modalInputError
                                                        },
                                                        ...signupData.barangay && !signupErrors.barangay && signupTouched.barangay && {
                                                            ...styles.modalInputSuccess
                                                        }
                                                    },
                                                    value: signupData.barangay,
                                                    onChange: handleSignupChange('barangay'),
                                                    onBlur: handleSignupBlur('barangay'),
                                                    disabled: loading
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 729,
                                                    columnNumber: 19
                                                }, this),
                                                signupTouched.barangay && signupErrors.barangay && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.helperText,
                                                        ...styles.helperTextError
                                                    },
                                                    children: signupErrors.barangay
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 739,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 727,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...styles.inputGroup,
                                                flex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: styles.inputLabel,
                                                    children: [
                                                        "Password ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: '#ef4444'
                                                            },
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 743,
                                                            columnNumber: 61
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 743,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "password",
                                                    placeholder: "Create a password",
                                                    style: {
                                                        ...styles.modalInput,
                                                        ...signupErrors.password && {
                                                            ...styles.modalInputError
                                                        },
                                                        ...signupData.password && !signupErrors.password && signupTouched.password && {
                                                            ...styles.modalInputSuccess
                                                        }
                                                    },
                                                    value: signupData.password,
                                                    onChange: handleSignupChange('password'),
                                                    onBlur: handleSignupBlur('password'),
                                                    disabled: loading
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 744,
                                                    columnNumber: 19
                                                }, this),
                                                signupTouched.password && signupErrors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.helperText,
                                                        ...styles.helperTextError
                                                    },
                                                    children: signupErrors.password
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 754,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 742,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...styles.inputGroup,
                                                flex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: styles.inputLabel,
                                                    children: [
                                                        "Confirm Password ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: '#ef4444'
                                                            },
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuthModals.tsx",
                                                            lineNumber: 758,
                                                            columnNumber: 69
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 758,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "password",
                                                    placeholder: "Confirm your password",
                                                    style: {
                                                        ...styles.modalInput,
                                                        ...signupErrors.confirmPassword && {
                                                            ...styles.modalInputError
                                                        },
                                                        ...signupData.confirmPassword && !signupErrors.confirmPassword && signupTouched.confirmPassword && {
                                                            ...styles.modalInputSuccess
                                                        }
                                                    },
                                                    value: signupData.confirmPassword,
                                                    onChange: handleSignupChange('confirmPassword'),
                                                    onBlur: handleSignupBlur('confirmPassword'),
                                                    disabled: loading
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 759,
                                                    columnNumber: 19
                                                }, this),
                                                signupTouched.confirmPassword && signupErrors.confirmPassword && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.helperText,
                                                        ...styles.helperTextError
                                                    },
                                                    children: signupErrors.confirmPassword
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 769,
                                                    columnNumber: 21
                                                }, this),
                                                signupTouched.confirmPassword && !signupErrors.confirmPassword && signupData.confirmPassword && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.helperText,
                                                        ...styles.helperTextSuccess
                                                    },
                                                    children: "Matches!"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuthModals.tsx",
                                                    lineNumber: 772,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AuthModals.tsx",
                                            lineNumber: 757,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AuthModals.tsx",
                                    lineNumber: 711,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: async ()=>{
                                        // Check if form is valid
                                        const hasErrors = Object.values(signupErrors).some((err)=>err);
                                        if (hasErrors) {
                                            setError('Please fix the errors below');
                                            return;
                                        }
                                        setLoading(true);
                                        setError('');
                                        if (signupData.email && signupData.password && signupData.confirmPassword) {
                                            if (signupData.password !== signupData.confirmPassword) {
                                                setError('Passwords do not match');
                                                setLoading(false);
                                                return;
                                            }
                                            try {
                                                const response = await fetch('/api/auth/signup', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify({
                                                        email: signupData.email,
                                                        password: signupData.password,
                                                        firstName: signupData.firstName,
                                                        middleName: signupData.middleName,
                                                        lastName: signupData.lastName,
                                                        extensionName: signupData.extensionName,
                                                        dob: signupData.dob,
                                                        age: signupData.age,
                                                        sex: signupData.sex,
                                                        purok: signupData.purok,
                                                        barangay: signupData.barangay
                                                    })
                                                });
                                                const result = await response.json();
                                                console.log('Signup result:', result);
                                                if (!response.ok) {
                                                    const detailMessage = result.details?.message || result.details?.hint || result.details?.details;
                                                    setError(detailMessage ? `${result.error}: ${detailMessage}` : result.error || 'Signup failed');
                                                } else {
                                                    // Check if email confirmation is required
                                                    if (result.data?.user?.confirmation_sent_at) {
                                                        setError('Please check your email to confirm your account.');
                                                    } else {
                                                        // Refresh auth context to update navbar
                                                        await refreshUser();
                                                        setShowSignupModal(false);
                                                        router.push('/userdashboard');
                                                    }
                                                }
                                            } catch (err) {
                                                setError('Unable to connect to server. Please try again later.');
                                            }
                                        }
                                        setLoading(false);
                                    },
                                    style: styles.modalButton,
                                    disabled: loading || Object.values(signupErrors).some(Boolean),
                                    children: loading ? 'Creating Account...' : 'Create Account'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthModals.tsx",
                                    lineNumber: 776,
                                    columnNumber: 1
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.modalFooter,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: styles.modalFooterText,
                                        children: [
                                            "Already have an account?",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setShowSignupModal(false);
                                                    setShowLoginModal(true);
                                                },
                                                style: styles.linkButton,
                                                children: "Sign In"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AuthModals.tsx",
                                                lineNumber: 843,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AuthModals.tsx",
                                        lineNumber: 841,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthModals.tsx",
                                    lineNumber: 840,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuthModals.tsx",
                            lineNumber: 574,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AuthModals.tsx",
                    lineNumber: 566,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AuthModals.tsx",
                lineNumber: 565,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(AuthModals, "8w4DAnrD30uAmMK2te7FDrkDo1M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = AuthModals;
var _c;
__turbopack_context__.k.register(_c, "AuthModals");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Navbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AuthModals$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AuthModals.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function Home() {
    _s();
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [timeUntilNextMass, setTimeUntilNextMass] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [nextMassInfo, setNextMassInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        day: '',
        time: '',
        dateTime: new Date()
    });
    const [showLoginModal, setShowLoginModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSignupModal, setShowSignupModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const schedule = [
        {
            day: 'Sunday',
            time: '5:30 AM, 7:00 AM, 9:00 AM, 4:00 PM, 6:00 PM'
        },
        {
            day: 'Monday',
            time: '6:00 AM'
        },
        {
            day: 'Tuesday',
            time: '6:00 AM'
        },
        {
            day: 'Wednesday',
            time: '6:00 PM'
        },
        {
            day: 'Thursday',
            time: '6:00 AM'
        },
        {
            day: 'Friday',
            time: '6:00 PM'
        },
        {
            day: 'Saturday',
            time: '5:30 AM, 7:00 AM, 9:00 AM, 4:00 PM, 6:00 PM'
        }
    ];
    // Calculate next mass time
    const getNextMass = ()=>{
        const now = new Date();
        const currentDay = now.getDay();
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        for(let i = 0; i < 7; i++){
            const checkDay = (currentDay + i) % 7;
            const dayName = days[checkDay];
            const daySchedule = schedule.find((s)=>s.day === dayName);
            if (daySchedule) {
                const times = daySchedule.time.split(', ');
                for (const timeStr of times){
                    const [time, period] = timeStr.split(' ');
                    const [hours, minutes] = time.split(':').map(Number);
                    const massHours = period === 'PM' && hours !== 12 ? hours + 12 : period === 'AM' && hours === 12 ? 0 : hours;
                    const massDate = new Date(now);
                    massDate.setDate(now.getDate() + i);
                    massDate.setHours(massHours, minutes, 0, 0);
                    if (massDate > now) {
                        return {
                            day: dayName,
                            time: timeStr,
                            dateTime: massDate
                        };
                    }
                }
            }
        }
        return {
            day: 'Sunday',
            time: '5:30 AM',
            dateTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
        };
    };
    // Update countdown timer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const updateTimer = {
                "Home.useEffect.updateTimer": ()=>{
                    const nextMass = getNextMass();
                    setNextMassInfo({
                        day: nextMass.day,
                        time: nextMass.time,
                        dateTime: nextMass.dateTime
                    });
                    const now = new Date();
                    const diff = nextMass.dateTime.getTime() - now.getTime();
                    if (diff > 0) {
                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                        const hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
                        const minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
                        const seconds = Math.floor(diff % (1000 * 60) / 1000);
                        setTimeUntilNextMass({
                            days,
                            hours,
                            minutes,
                            seconds
                        });
                    }
                }
            }["Home.useEffect.updateTimer"];
            updateTimer();
            const interval = setInterval(updateTimer, 1000);
            return ({
                "Home.useEffect": ()=>clearInterval(interval)
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    const toggleMenu = ()=>{
        setIsMenuOpen(!isMenuOpen);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.page,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                showLoginModal: showLoginModal,
                showSignupModal: showSignupModal,
                setShowLoginModal: setShowLoginModal,
                setShowSignupModal: setShowSignupModal
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: styles.heroSection,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.heroContainer,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.heroContent,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: styles.welcomeText,
                                children: "Welcome to"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: styles.heroTitle,
                                children: "Our Lady of the Rosary Parish"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: styles.heroDescription,
                                children: "Magallanes, Agusan del Norte"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowLoginModal(true),
                                style: styles.heroButtonPrimary,
                                children: "Book Now"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: styles.communitySection,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.communityContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.communityImages,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/images/Nuestra landing page 2.jpg",
                                    alt: "Church Interior",
                                    style: styles.communityImage
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/images/Nuestra landing page 3.jpg",
                                    alt: "Church Community",
                                    style: styles.communityImage
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.communityContent,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        ...styles.communityTitle,
                                        fontFamily: 'Georgia, serif'
                                    },
                                    children: "Serving God and Community in Faith"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        ...styles.communityDescription,
                                        fontFamily: 'Poppins'
                                    },
                                    children: "Our Lady of the Rosary Parish is a welcoming Catholic community in Magallanes, Agusan del Norte. We are dedicated to worship, service, and spiritual growth, bringing people together to live out the Gospel in everyday life."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        ...styles.communityDescription,
                                        fontFamily: 'Poppins'
                                    },
                                    children: "Through the Holy Mass, sacraments, and parish activities, we support one another in faith and invite everyone to be part of our journey with Christ."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 121,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AuthModals$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                showLoginModal: showLoginModal,
                showSignupModal: showSignupModal,
                setShowLoginModal: setShowLoginModal,
                setShowSignupModal: setShowSignupModal
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_s(Home, "q/7zCKKpvTXOZp+gsoXaCGJ1LkI=");
_c = Home;
const styles = {
    page: {
        minHeight: '100vh',
        background: '#ffffff',
        color: '#111827'
    },
    // Navigation
    navbar: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
    },
    navContainer: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 76,
        position: 'relative'
    },
    navBrand: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        left: 20
    },
    logo: {
        height: 50,
        width: 'auto'
    },
    brandText: {
        fontSize: 18,
        fontWeight: 600,
        color: '#111827',
        marginLeft: 12
    },
    navLink: {
        textDecoration: 'none',
        color: '#111827',
        fontWeight: 500,
        fontSize: 16,
        transition: 'color 0.3s ease',
        display: 'flex',
        alignItems: 'center'
    },
    navMenu: {
        display: 'flex',
        gap: 32,
        alignItems: 'center',
        position: 'absolute',
        right: 20
    },
    navCenter: {
        display: 'flex',
        gap: 32,
        alignItems: 'center'
    },
    navToggle: {
        display: 'none',
        flexDirection: 'column',
        gap: 4,
        cursor: 'pointer'
    },
    toggleIcon: {
        width: 25,
        height: 2,
        background: '#111827',
        transition: 'all 0.3s ease'
    },
    navButton: {
        display: 'inline-block',
        padding: '8px 16px',
        borderRadius: 6,
        fontSize: 14,
        fontWeight: 500,
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        color: '#111827',
        border: '1px solid #d1d5db'
    },
    navButtonPrimary: {
        display: 'inline-block',
        padding: '8px 16px',
        borderRadius: 6,
        fontSize: 14,
        fontWeight: 600,
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        color: '#fff',
        background: '#3b82f6',
        border: '1px solid #3b82f6'
    },
    // Hero Section
    heroSection: {
        padding: '200px 50px 70px',
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/mary2.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
    },
    heroContainer: {
        maxWidth: 1300,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        gap: 60
    },
    heroContent: {
        flex: 1,
        textAlign: 'left'
    },
    heroBadge: {
        display: 'inline-block',
        background: 'rgba(255, 255, 255, 0.15)',
        color: '#fff',
        padding: '10px 24px',
        borderRadius: 25,
        fontSize: 13,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 24
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: 400,
        color: '#FFD700',
        fontFamily: 'Georgia, serif',
        marginBottom: 10,
        lineHeight: 1.2,
        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
        letterSpacing: '1px',
        fontStyle: 'italic'
    },
    heroTitle: {
        fontSize: 50,
        fontWeight: 700,
        color: '#fff',
        fontFamily: 'Times New Roman, serif',
        marginBottom: 20,
        lineHeight: 1.1,
        textShadow: '0 4px 8px rgba(0,0,0,0.5)',
        letterSpacing: '2px',
        fontStyle: 'italic'
    },
    heroSubtitle: {
        fontSize: 20,
        color: 'rgba(255, 255, 255, 0.85)',
        marginBottom: 40,
        fontWeight: 400,
        letterSpacing: 0.5
    },
    heroHeading2: {
        fontSize: 28,
        color: '#fff',
        marginBottom: 20,
        fontWeight: 600,
        letterSpacing: 0.5
    },
    heroDescription: {
        fontSize: 15,
        color: '#FFF',
        marginBottom: 30,
        maxWidth: 500,
        lineHeight: 1.2,
        fontFamily: 'Times New Roman, serif',
        fontWeight: 600,
        textShadow: '0 3px 6px rgba(0,0,0,0.5)',
        letterSpacing: '1.5px',
        fontStyle: 'italic',
        textTransform: 'uppercase'
    },
    heroButtons: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        alignItems: 'center'
    },
    heroButtonPrimary: {
        display: 'inline-block',
        background: '#1E3A6F',
        color: '#FFFFFF',
        padding: '10px 20px',
        borderRadius: 5,
        fontSize: 14,
        fontWeight: 600,
        textDecoration: 'none',
        lineHeight: 1.6,
        transition: 'all 0.3s ease',
        fontFamily: 'Inter, sans-serif'
    },
    heroButtonSecondary: {
        display: 'inline-block',
        background: 'transparent',
        color: '#fff',
        padding: '16px 32px',
        borderRadius: 8,
        fontSize: 16,
        fontWeight: 600,
        textDecoration: 'none',
        border: '2px solid #fff',
        transition: 'all 0.3s ease'
    },
    // Mass Section
    massSection: {
        padding: '50px 20px',
        background: '#F5F8FD'
    },
    massContainer: {
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 30,
        background: '#FFFFFF',
        padding: '40px',
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
    },
    massHeader: {
        textAlign: 'left'
    },
    massLeftSection: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center'
    },
    dateDisplay: {
        background: '#1E3A6F',
        color: '#fff',
        padding: '20px',
        borderRadius: 6,
        textAlign: 'center',
        minWidth: 90,
        minHeight: 90,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateDay: {
        fontSize: 28,
        fontWeight: 600,
        lineHeight: 1,
        fontFamily: 'Poppins, sans-serif'
    },
    dateMonth: {
        fontSize: 12,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        fontFamily: 'Inter, sans-serif'
    },
    massBadge: {
        display: 'inline-block',
        background: '#2563EB',
        color: '#fff',
        padding: '5px 12px',
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 8,
        fontFamily: 'Inter, sans-serif'
    },
    massTitle: {
        fontSize: 26,
        fontWeight: 600,
        color: '#1E3A6F',
        marginBottom: 4,
        fontFamily: 'Poppins, sans-serif'
    },
    massSubtitle: {
        fontSize: 16,
        color: '#4B5563',
        marginBottom: 2,
        fontFamily: 'Inter, sans-serif'
    },
    massLocation: {
        fontSize: 16,
        color: '#4B5563',
        marginBottom: 0,
        fontFamily: 'Inter, sans-serif'
    },
    allMassButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
        background: '#1E3A6F',
        color: '#fff',
        padding: '11px 19px',
        borderRadius: 6,
        fontSize: 16,
        fontWeight: 500,
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        marginTop: '20px',
        fontFamily: 'Inter, sans-serif'
    },
    EventsButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
        background: '#1E3A6F',
        color: '#fff',
        padding: '11px 14px',
        borderRadius: 5,
        fontSize: 15,
        fontWeight: 500,
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        marginTop: '20px'
    },
    countdownDisplay: {
        display: 'flex',
        justifyContent: 'center',
        gap: 15,
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    countdownSeparator: {
        fontSize: 18,
        fontWeight: 200,
        color: '#1E3A6F',
        margin: '0 4px'
    },
    countdownUnit: {
        background: 'transparent',
        borderRadius: 0,
        padding: '30',
        boxShadow: 'none',
        minWidth: 'auto',
        textAlign: 'center'
    },
    countdownValue: {
        fontSize: 28,
        fontWeight: 600,
        color: '#1E3A6F',
        marginBottom: 6,
        fontFamily: 'Poppins, sans-serif',
        letterSpacing: 0
    },
    countdownLabel: {
        fontSize: 12,
        color: '#4B5563',
        fontWeight: 400,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        fontFamily: 'Inter, sans-serif'
    },
    // Community of Faith Section
    communitySection: {
        padding: '60px 20px',
        background: '#F5F8FD'
    },
    communityContainer: {
        maxWidth: 1300,
        margin: '0 auto',
        display: 'flex',
        gap: 60,
        alignItems: 'center'
    },
    communityImages: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 25
    },
    communityImage: {
        width: '90%',
        height: 200,
        objectFit: 'cover',
        borderRadius: 12,
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
    },
    communityContent: {
        flex: 1,
        padding: '20px 0'
    },
    communityTitle: {
        fontSize: 32,
        fontWeight: 800,
        color: '#1E3A6F',
        marginBottom: 40,
        lineHeight: 1.2,
        fontFamily: 'Poppins, sans-serif'
    },
    communityDescription: {
        fontSize: 19,
        fontWeight: 500,
        color: '#000',
        lineHeight: 2,
        marginBottom: 30,
        fontFamily: 'Inter, sans-serif'
    },
    aboutButton: {
        display: 'inline-block',
        background: '#1E3A6F',
        color: '#FFFFFF',
        padding: '10px 20px',
        borderRadius: 5,
        fontSize: 14,
        fontWeight: 600,
        textDecoration: 'none',
        lineHeight: 1.6,
        transition: 'all 0.3s ease',
        fontFamily: 'Inter, sans-serif'
    },
    // Events Section
    eventsSection: {
        padding: '80px 20px',
        background: `#B9D9F7`
    },
    eventsContainer: {
        maxWidth: 1200,
        margin: '0 auto'
    },
    eventsHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 60
    },
    eventsTitle: {
        fontSize: 35,
        fontWeight: 800,
        color: '#1E3A6F',
        marginBottom: 16
    },
    eventsSubtitle: {
        fontSize: 20,
        color: '#000',
        maxWidth: 500,
        margin: '0 auto'
    },
    eventsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 40
    },
    eventCard: {
        background: '#fff',
        borderRadius: 15,
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease'
    },
    eventImage: {
        width: '100%',
        height: 200,
        objectFit: 'cover'
    },
    eventContent: {
        padding: '20px'
    },
    eventTitle: {
        fontSize: 15,
        fontWeight: 700,
        color: '#1e40af',
        marginBottom: 8
    },
    eventDate: {
        fontSize: 14,
        color: '#3b82f6',
        fontWeight: 600,
        marginBottom: 12
    },
    eventDescription: {
        fontSize: 15,
        color: '#000',
        lineHeight: 1.6
    },
    // About Section
    aboutSection: {
        padding: '80px 20px',
        background: '#000'
    },
    aboutContainer: {
        maxWidth: 1200,
        margin: '0 auto'
    },
    aboutContent: {
        display: 'flex',
        gap: 60,
        alignItems: 'center'
    },
    aboutText: {
        flex: 1
    },
    aboutTitle: {
        fontSize: 32,
        fontWeight: 700,
        fontFamily: 'Poppins',
        color: '#1e40af',
        marginBottom: 24
    },
    aboutDescription: {
        fontSize: 16,
        color: '#000',
        lineHeight: 1.8,
        marginBottom: 24
    },
    aboutImage: {
        flex: 1
    },
    aboutImg: {
        width: '100%',
        height: 400,
        objectFit: 'cover',
        borderRadius: 16
    },
    // Footer
    footer: {
        background: '#8DC2EA',
        color: '#000',
        padding: '60px 20px 20px'
    },
    footerContainer: {
        maxWidth: 1200,
        margin: '0 auto'
    },
    footerContent: {
        display: 'flex',
        gap: 60,
        marginBottom: 40
    },
    footerBrand: {
        flex: 1
    },
    footerLogo: {
        height: 40,
        width: 'auto',
        marginBottom: 16
    },
    footerTitle: {
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 8
    },
    footerDescription: {
        fontSize: 14,
        color: '#000',
        lineHeight: 1.6
    },
    footerLinks: {
        display: 'flex',
        gap: 60
    },
    footerLinkGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
    },
    footerLinkTitle: {
        fontSize: 16,
        fontWeight: 600,
        marginBottom: 8
    },
    footerLink: {
        color: '#000',
        textDecoration: 'none',
        fontSize: 14,
        transition: 'color 0.3s ease'
    },
    footerBottom: {
        borderTop: '1px solid #000',
        paddingTop: 20,
        textAlign: 'center'
    },
    footerCopyright: {
        fontSize: 12,
        color: '#000'
    },
    // Modal Styles
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    },
    modal: {
        background: '#fff',
        borderRadius: 12,
        padding: 0,
        maxWidth: 400,
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    modalHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '24px 24px 20px',
        borderBottom: '1px solid #e5e7eb',
        position: 'relative'
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 700,
        color: '#111827',
        margin: 0
    },
    modalClose: {
        background: 'none',
        border: 'none',
        fontSize: 24,
        color: '#6b7280',
        cursor: 'pointer',
        padding: 0,
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        transition: 'background-color 0.2s',
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1
    },
    modalBody: {
        padding: '24px'
    },
    modalInput: {
        width: '100%',
        padding: '12px 16px',
        border: '1px solid #d1d5db',
        borderRadius: 8,
        fontSize: 14,
        marginBottom: 16,
        outline: 'none',
        boxSizing: 'border-box'
    },
    modalButton: {
        width: '100%',
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '14px 16px',
        fontSize: 16,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
        marginBottom: 8
    },
    modalHeaderContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        flex: 1
    },
    modalIcon: {
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        fontWeight: 700,
        marginBottom: 16,
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#6b7280',
        margin: '8px 0 0 0',
        fontWeight: 400
    },
    inputGroup: {
        marginBottom: 8
    },
    inputLabel: {
        display: 'block',
        fontSize: 14,
        fontWeight: 600,
        color: '#374151',
        marginBottom: 0,
        padding: 0
    },
    modalOptions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 14,
        color: '#6b7280',
        cursor: 'pointer',
        margin: 0,
        padding: 0
    },
    checkbox: {
        marginRight: 8,
        width: 16,
        height: 16,
        cursor: 'pointer'
    },
    forgotPassword: {
        color: '#3b82f6',
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: 500,
        transition: 'color 0.2s'
    },
    modalFooter: {
        textAlign: 'center',
        paddingTop: 16,
        borderTop: '1px solid #e5e7eb'
    },
    modalFooterText: {
        margin: 0,
        padding: 0,
        fontSize: 14,
        color: '#6b7280'
    },
    linkButton: {
        background: 'none',
        border: 'none',
        color: '#3b82f6',
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        textDecoration: 'underline',
        transition: 'color 0.2s'
    },
    // Responsive Design
    '@media (max-width: 1024px)': {
        heroSection: {
            padding: '120px 0 80px',
            backgroundAttachment: 'scroll'
        },
        heroContainer: {
            padding: '0 20px',
            textAlign: 'center'
        },
        communityContainer: {
            padding: '0 40px'
        },
        eventsContainer: {
            padding: '0 40px'
        },
        pastorContainer: {
            padding: '0 40px'
        },
        footerContainer: {
            padding: '0 40px'
        }
    },
    '@media (max-width: 768px)': {
        heroSection: {
            padding: '100px 0 60px',
            backgroundAttachment: 'scroll',
            backgroundPosition: 'center center'
        },
        heroContainer: {
            padding: '0 20px',
            textAlign: 'center'
        },
        heroBadge: {
            fontSize: 12,
            padding: '8px 20px',
            marginBottom: 20
        },
        heroTitle: {
            fontSize: 36,
            lineHeight: 1.2,
            marginBottom: 20
        },
        heroSubtitle: {
            fontSize: 18,
            marginBottom: 30
        },
        heroHeading2: {
            fontSize: 24,
            marginBottom: 16
        },
        heroDescription: {
            fontSize: 16,
            marginBottom: 24,
            maxWidth: '100%'
        },
        heroButtons: {
            flexDirection: 'column',
            gap: 16,
            alignItems: 'center'
        },
        heroButtonPrimary: {
            padding: '14px 28px',
            fontSize: 15
        },
        heroButtonSecondary: {
            padding: '14px 28px',
            fontSize: 15
        },
        joinButton: {
            width: '100%',
            maxWidth: 300
        },
        secondaryButton: {
            width: '100%',
            maxWidth: 300
        },
        massSection: {
            padding: '60px 20px'
        },
        massContainer: {
            flexDirection: 'column',
            gap: 40,
            textAlign: 'center'
        },
        massHeader: {
            textAlign: 'center'
        },
        massTitle: {
            fontSize: 24,
            marginBottom: 12
        },
        massSubtitle: {
            fontSize: 14,
            marginBottom: 24
        },
        massImage: {
            order: -1,
            marginBottom: 30
        },
        countdownDisplay: {
            flexWrap: 'wrap',
            gap: 16,
            justifyContent: 'center'
        },
        countdownUnit: {
            minWidth: 80,
            padding: '16px 12px'
        },
        allEventsButton: {
            width: '100%',
            maxWidth: 200,
            textAlign: 'center',
            justifyContent: 'center'
        },
        communitySection: {
            padding: '60px 0'
        },
        communityContainer: {
            padding: '0 20px'
        },
        communityImages: {
            flexDirection: 'column'
        },
        communityImage: {
            width: '100%',
            height: 200
        },
        eventsSection: {
            padding: '60px 0'
        },
        eventsContainer: {
            padding: '0 20px'
        },
        eventsGrid: {
            gridTemplateColumns: '1fr',
            gap: 24
        },
        eventCard: {
            flexDirection: 'column'
        },
        eventImage: {
            width: '100%',
            height: 200
        },
        pastorSection: {
            padding: '60px 0'
        },
        pastorContainer: {
            padding: '0 20px'
        },
        pastorContent: {
            flexDirection: 'column',
            textAlign: 'center'
        },
        pastorImage: {
            width: 150,
            height: 150,
            marginBottom: 24
        },
        pastorTitle: {
            fontSize: 24
        },
        pastorSubtitle: {
            fontSize: 14
        },
        footer: {
            padding: '40px 0 20px'
        },
        footerContainer: {
            padding: '0 20px'
        },
        footerContent: {
            flexDirection: 'column',
            gap: 40
        },
        footerBrand: {
            flex: 'none'
        },
        footerLinks: {
            flexDirection: 'column',
            gap: 40
        },
        footerBottom: {
            marginTop: 40
        }
    },
    '@media (max-width: 480px)': {
        heroSection: {
            padding: '80px 0 40px',
            backgroundAttachment: 'scroll',
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
        },
        heroContainer: {
            padding: '0 16px'
        },
        heroBadge: {
            fontSize: 11,
            padding: '6px 16px',
            marginBottom: 16
        },
        heroTitle: {
            fontSize: 28,
            lineHeight: 1.3,
            marginBottom: 16
        },
        heroSubtitle: {
            fontSize: 16,
            marginBottom: 24
        },
        heroHeading2: {
            fontSize: 20,
            marginBottom: 12
        },
        heroDescription: {
            fontSize: 14,
            marginBottom: 20
        },
        heroButtons: {
            gap: 12
        },
        heroButtonPrimary: {
            padding: '12px 24px',
            fontSize: 14
        },
        heroButtonSecondary: {
            padding: '12px 24px',
            fontSize: 14
        },
        massSection: {
            padding: '40px 16px'
        },
        massContainer: {
            gap: 30
        },
        massTitle: {
            fontSize: 20,
            marginBottom: 10
        },
        massSubtitle: {
            fontSize: 13,
            marginBottom: 20
        },
        massImage: {
            marginBottom: 20
        },
        countdownDisplay: {
            gap: 12
        },
        countdownUnit: {
            minWidth: 60,
            padding: '12px 8px'
        },
        countdownValue: {
            fontSize: 20
        },
        countdownLabel: {
            fontSize: 10
        },
        allEventsButton: {
            padding: '12px 20px',
            fontSize: 13
        },
        communitySection: {
            padding: '40px 16px'
        },
        communityContainer: {
            padding: '0 16px'
        },
        communityTitle: {
            fontSize: 20
        },
        communitySubtitle: {
            fontSize: 14
        },
        eventsSection: {
            padding: '40px 16px'
        },
        eventsContainer: {
            padding: '0 16px'
        },
        eventsTitle: {
            fontSize: 20
        },
        eventsSubtitle: {
            fontSize: 14
        },
        eventsGrid: {
            gridTemplateColumns: '1fr',
            gap: 16
        },
        eventCard: {
            padding: '16px'
        },
        pastorSection: {
            padding: '40px 16px'
        },
        pastorContainer: {
            padding: '0 16px'
        },
        pastorTitle: {
            fontSize: 18
        },
        pastorSubtitle: {
            fontSize: 12
        },
        pastorImage: {
            height: 200,
            marginBottom: 20
        },
        pastorContent: {
            textAlign: 'center'
        },
        footer: {
            padding: '30px 16px 15px'
        },
        footerContainer: {
            padding: '0 16px'
        },
        footerCopyright: {
            fontSize: 10
        }
    }
};
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0r_1bt~._.js.map