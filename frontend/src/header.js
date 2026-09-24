import './index.css';

function Header(props) {

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

                {/* Status pill */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[#5eead4]/30 bg-[#5eead4]/10 px-3.5 py-1.5 mb-5">

                    <span className="w-2 h-2 rounded-full bg-[#5eead4] shadow-[0_0_12px_#5eead4]"></span>

                    <p className="text-[#99f6e4] text-xs font-semibold">
                        Personal dashboard
                    </p>

                </div>


                <h1 className="actodo-display text-3xl sm:text-4xl font-bold leading-[1.1]">
                    Hey, {props.username}
                    <span className="text-[#ff7a59]">.</span>
                </h1>

                <p className="text-[#b9aee0] mt-3 text-sm sm:text-base max-w-md">
                    Organize your day. Focus on what matters.
                </p>

            </div>


            {/* Profile badge */}
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md px-5 py-4 w-fit shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)]">

                <div className="relative">

                    {/* Soft halo behind the avatar */}
                    <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ff7a59] to-[#c4a4ff] blur-md opacity-60"></div>

                    <div className="actodo-display relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff7a59] to-[#c4a4ff] flex items-center justify-center text-[#1a1438] font-bold text-lg">
                        {props.username?.charAt(0).toUpperCase()}
                    </div>

                </div>

                <div>
                    <p className="text-xs text-[#8f84b8]">
                        Logged in as
                    </p>

                    <p className="text-sm text-[#f4efff] font-semibold">
                        {props.username}
                    </p>
                </div>

            </div>

        </div>
    )
}

export default Header;