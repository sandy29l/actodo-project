import './index.css'
import Header from './header.js'
import Form from './form.jsx'
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Fonts + the one orchestrated motion (slow aurora drift). Reduced-motion is respected.
const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Manrope:wght@400;500;600;700&display=swap');

.actodo-root { font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif; }
.actodo-display { font-family: 'Fraunces', Georgia, 'Times New Roman', serif; letter-spacing: -0.02em; }

@keyframes actodo-drift-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(70px,50px) scale(1.12); } }
@keyframes actodo-drift-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-60px,40px) scale(1.08); } }
@keyframes actodo-drift-c { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(50px,-50px) scale(1.15); } }

.actodo-drift-a { animation: actodo-drift-a 24s ease-in-out infinite; }
.actodo-drift-b { animation: actodo-drift-b 28s ease-in-out infinite; }
.actodo-drift-c { animation: actodo-drift-c 26s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .actodo-drift-a, .actodo-drift-b, .actodo-drift-c { animation: none; }
}
`;

// Film-grain texture (inline SVG noise) and dotted notebook grid
const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

const DOT_GRID = {
    backgroundImage: 'radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)',
    backgroundSize: '24px 24px',
};

function Actodo() {

    const data = useLocation();
    // const history=useHistory();
    const navigate = useNavigate();
    // const [logout,setlogout]=useState(false);
    useEffect(()=>{
        if(!localStorage.getItem('auth')){
            navigate('/');
        }
    },[navigate])

    function handlelogout() {
        // replace: true so the Back button can't return to the dashboard
        localStorage.removeItem('auth');
        navigate('/');
        
    }

    // Live date instead of the hard-coded one
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('en-US', { month: 'long' });
    const weekday = now.toLocaleString('en-US', { weekday: 'long' });
    const year = now.getFullYear();

    return (
        <div className="actodo-root min-h-screen relative overflow-hidden bg-[#110d26] text-[#f4efff]">

            <style>{css}</style>

            {/* ---------- Background: aurora + dot grid + grain ---------- */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">

                <div className="actodo-drift-a absolute -top-48 -left-40 h-[34rem] w-[34rem] rounded-full bg-[#ff7a59]/25 blur-[120px]"></div>
                <div className="actodo-drift-b absolute top-1/3 -right-48 h-[38rem] w-[38rem] rounded-full bg-[#8b5cf6]/30 blur-[130px]"></div>
                <div className="actodo-drift-c absolute -bottom-56 left-1/4 h-[32rem] w-[32rem] rounded-full bg-[#2dd4bf]/20 blur-[120px]"></div>

                <div
                    className="absolute inset-0 opacity-60"
                    style={{
                        ...DOT_GRID,
                        maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 78%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 78%)',
                    }}
                ></div>

                <div
                    className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                    style={{ backgroundImage: GRAIN }}
                ></div>

            </div>


            {/* ---------- Main ---------- */}
            <div className="relative max-w-7xl mx-auto px-4 py-6 sm:px-8 sm:py-10">

                {/* Dashboard shell */}
                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#1a1438]/70 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">

                    {/* Top accent line */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-[#ff7a59] via-[#c4a4ff] to-[#5eead4]"></div>

                    <div className="p-5 sm:p-8 lg:p-10">

                        {/* Top bar: logout */}
                        <div className="flex justify-end mb-6">
                            <button
                                onClick={handlelogout}
                                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-[#f4efff] backdrop-blur-md transition-all hover:border-[#fb7185] hover:bg-[#fb7185] hover:text-[#1a1438] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb7185]"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                    aria-hidden="true"
                                >
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                    <path d="M10 17l5-5-5-5" />
                                    <path d="M15 12H3" />
                                </svg>
                                Logout
                            </button>
                        </div>


                        {/* Header */}
                        <Header username={data.state?.user} />


                        {/* Divider */}
                        <div className="flex items-center gap-4 my-9">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#ff7a59] shadow-[0_0_14px_#ff7a59]"></span>
                            <span className="text-sm font-semibold text-[#c9bff0]">
                                Today at a glance
                            </span>
                            <div className="flex-grow border-t border-dashed border-white/15"></div>
                        </div>


                        {/* ---------- Bento: weather / calendar / stack ---------- */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">

                            {/* Weather — the big warm card with a sun */}
                            <div className="md:col-span-2 relative overflow-hidden rounded-3xl border border-[#ffb58f]/25 bg-gradient-to-br from-[#ff7a59]/30 via-[#e0559a]/15 to-[#8b5cf6]/10 p-6 sm:p-7 min-h-[190px]">

                                {/* Sun graphic */}
                                <div aria-hidden="true" className="absolute -right-12 -top-12 flex h-64 w-64 items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border border-white/10"></div>
                                    <div className="absolute inset-9 rounded-full border border-white/15"></div>
                                    <div className="absolute inset-[4.5rem] rounded-full border border-dashed border-white/20"></div>
                                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#ffe08a] to-[#ff7a59] shadow-[0_0_90px_24px_rgba(255,176,102,0.45)]"></div>
                                </div>

                                <div className="relative flex h-full flex-col justify-between gap-10">

                                    <p className="text-sm font-semibold text-[#ffd9c4]">
                                        Weather
                                    </p>

                                    <div>
                                        <h2 className="actodo-display text-5xl sm:text-6xl font-bold leading-none">
                                            23°
                                        </h2>

                                        <p className="mt-2 text-base text-[#ffd9c4]">
                                            Sunny in Chennai
                                        </p>
                                    </div>

                                </div>

                            </div>


                            {/* Date — tear-off calendar page (the one light card, for contrast) */}
                            <div className="relative overflow-hidden rounded-3xl bg-[#f6f0ff] text-[#1a1438] shadow-[0_18px_40px_-12px_rgba(255,122,89,0.45)]">

                                {/* Month band with binder holes */}
                                <div className="relative flex items-center justify-between bg-[#ff7a59] px-6 py-3 text-white">
                                    <span className="absolute left-1/4 top-1.5 h-2.5 w-2.5 rounded-full bg-[#1a1438]/60"></span>
                                    <span className="absolute right-1/4 top-1.5 h-2.5 w-2.5 rounded-full bg-[#1a1438]/60"></span>
                                    <span className="mt-2 text-sm font-bold">{month}</span>
                                    <span className="mt-2 text-sm font-medium opacity-90">{year}</span>
                                </div>

                                <div className="px-6 pb-7 pt-5 text-center">
                                    <h2 className="actodo-display text-6xl font-bold leading-none">
                                        {day}
                                    </h2>

                                    <p className="mt-2 text-base font-semibold">
                                        {weekday}
                                    </p>

                                    <div className="mx-auto mt-5 h-1.5 w-16 rounded-full bg-gradient-to-r from-[#ff7a59] to-[#c4a4ff]"></div>
                                </div>

                            </div>


                            {/* Tech — slim strip with chips */}
                            <div className="md:col-span-3 flex flex-wrap items-center gap-3 rounded-3xl border border-[#5eead4]/20 bg-gradient-to-r from-[#5eead4]/12 via-transparent to-[#8b5cf6]/12 px-6 py-5">

                                <span className="text-2xl">⚡</span>

                                <span className="mr-2 text-sm font-semibold text-[#c9bff0]">
                                    Built with
                                </span>

                                <span className="rounded-full border border-[#67e8f9]/40 bg-[#67e8f9]/10 px-3.5 py-1 text-xs font-semibold text-[#a5f3fc]">
                                    React
                                </span>

                                <span className="rounded-full border border-[#fde68a]/40 bg-[#fde68a]/10 px-3.5 py-1 text-xs font-semibold text-[#fde68a]">
                                    Express
                                </span>

                                <span className="rounded-full border border-[#86efac]/40 bg-[#86efac]/10 px-3.5 py-1 text-xs font-semibold text-[#bbf7d0]">
                                    MongoDB
                                </span>

                                <span className="ml-auto rounded-full bg-gradient-to-r from-[#ff7a59] to-[#c4a4ff] px-3.5 py-1 text-xs font-bold text-[#1a1438]">
                                    Full stack
                                </span>

                            </div>

                        </div>


                        {/* ---------- Activity heading ---------- */}
                        <div className="mb-6">

                            <h2 className="actodo-display text-2xl sm:text-3xl font-bold leading-tight">
                                Activity Center
                            </h2>

                            <p className="mt-1.5 text-sm text-[#b9aee0]">
                                Plan • Do • Repeat
                            </p>

                        </div>


                        {/* ---------- Form on a notebook panel ---------- */}
                        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f0b24]/60 p-4 sm:p-6">

                            {/* Coral spine */}
                            <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[#ff7a59] via-[#c4a4ff] to-[#5eead4]"></div>

                            {/* Dotted notebook texture */}
                            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50" style={DOT_GRID}></div>

                            <div className="relative">
                                <Form username={data.state?.user} />
                            </div>

                        </div>


                        {/* ---------- Footer ---------- */}
                        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-dashed border-white/15 pt-6 text-sm sm:flex-row">

                            <p className="text-[#8f84b8]">
                                Built for better days.
                            </p>

                            <p className="text-[#8f84b8]">
                                Stay focused <span className="text-[#5eead4]">●</span>
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Actodo;