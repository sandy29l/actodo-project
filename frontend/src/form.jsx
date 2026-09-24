import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Rotating accent colours for the activity rows
const ACCENTS = ["#ff7a59", "#c4a4ff", "#5eead4", "#fde68a"];

function Form(props) {
    const [activityarr, setactivity] = useState([]);
    const [newactivity, setnewactivity] = useState("");
    const [refresh, setrefresh] = useState(0);
    const navigate=useNavigate();

    useEffect(function () {
        if (!props.username || props.username.length <= 0) {
            alert("Please login");
            localStorage.removeItem('auth');
            navigate('/');
        }
        axios.get(`http://localhost:5000/getact?username=${props.username}`)
            .then(function (data) {
                setactivity(data.data);
            })
            .catch(function () {
                console.log("error in retrieving data");
            });
    }, [refresh, props.username]);

    function handlechange(evt) {
        setnewactivity(evt.target.value);
    }

    function addnewactivity() {
        if (newactivity.trim() === "") {
            return;
        }

        axios.post("http://localhost:5000/activity", {
            username: props.username,
            activity: newactivity
        })
            .then(function (data) {
                console.log(data.data);
                setnewactivity("");
                setrefresh(function (prev) {
                    return prev + 1;
                });
            })
            .catch(function () {
                console.log("error adding activity");
            });
    }

    function handledelete(activity) {
        axios.delete("http://localhost:5000/activity", {
            data: {
                username: props.username,
                activity: activity
            }
        })
            .then(function () {
                setrefresh(function (prev) {
                    return prev + 1;
                });
            })
            .catch(function () {
                console.log("error deleting activity");
            });
    }

    return (
        <div className="relative">

            <div className="relative flex flex-col gap-6">

                {/* ---------- Add Activity ---------- */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-6 sm:p-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#ff7a59] to-[#e0559a] flex items-center justify-center shadow-lg shadow-[#ff7a59]/30">
                            <span className="text-xl">✨</span>
                        </div>

                        <div>
                            <h2 className="actodo-display text-xl font-bold text-[#f4efff]">
                                Add New Activity
                            </h2>
                            <p className="text-[#b9aee0] text-sm">
                                What do you want to accomplish today?
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            aria-label="New activity"
                            placeholder="e.g. Go to gym, Study React..."
                            value={newactivity}
                            onChange={handlechange}
                            onKeyDown={function (evt) {
                                if (evt.key === "Enter") {
                                    addnewactivity();
                                }
                            }}
                            className="flex-grow rounded-2xl border border-white/15 bg-[#0f0b24]/70 px-5 py-3.5 text-sm text-[#f4efff] placeholder-[#8f84b8] outline-none transition-all focus:border-[#ff7a59] focus:ring-2 focus:ring-[#ff7a59]/30"
                        />

                        <button
                            onClick={addnewactivity}
                            className="rounded-2xl bg-gradient-to-r from-[#ff7a59] to-[#c4a4ff] px-6 py-3.5 text-sm font-bold text-[#1a1438] shadow-lg shadow-[#ff7a59]/25 transition-all hover:shadow-[#ff7a59]/50 hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4a4ff]"
                        >
                            + Add Activity
                        </button>
                    </div>
                </div>


                {/* ---------- Activity List ---------- */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-6 sm:p-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">

                        <div>
                            <h2 className="actodo-display text-xl font-bold text-[#f4efff]">
                                Your Activities
                            </h2>

                            <p className="text-[#b9aee0] text-sm mt-1">
                                Stay consistent and keep moving forward 🚀
                            </p>
                        </div>

                        {/* Count badge */}
                        <div className="relative">
                            <div aria-hidden="true" className="absolute inset-0 rounded-full bg-[#5eead4] blur-md opacity-40"></div>
                            <div className="actodo-display relative w-12 h-12 rounded-full bg-[#5eead4] flex items-center justify-center text-[#0f0b24] font-bold text-lg">
                                {activityarr.length}
                            </div>
                        </div>
                    </div>


                    {/* Empty State */}
                    {activityarr.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-white/20 bg-[#0f0b24]/50 p-10 text-center">

                            <div className="text-5xl mb-4">
                                📝
                            </div>

                            <h3 className="actodo-display text-[#f4efff] text-lg font-bold">
                                No activities yet
                            </h3>

                            <p className="text-[#8f84b8] text-sm mt-2">
                                Add your first activity above and start being productive.
                            </p>

                        </div>
                    )}


                    {/* Activities */}
                    <div className="flex flex-col gap-3">

                        {activityarr.map(function (item, index) {

                            const accent = ACCENTS[index % ACCENTS.length];

                            return (
                                <div
                                    key={index}
                                    style={{ borderLeftColor: accent }}
                                    className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 border-l-4 bg-[#0f0b24]/60 py-4 pl-5 pr-4 transition-all duration-300 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-black/30"
                                >

                                    <div className="flex items-center gap-4 min-w-0">

                                        {/* Colour dot */}
                                        <span
                                            aria-hidden="true"
                                            style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }}
                                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                                        ></span>

                                        {/* Activity */}
                                        <p className="text-[#f4efff] text-sm sm:text-base truncate">
                                            {item}
                                        </p>

                                    </div>


                                    {/* Delete */}
                                    <button
                                        onClick={() => handledelete(item)}
                                        aria-label={`Delete ${item}`}
                                        className="shrink-0 rounded-xl border border-[#fb7185]/40 px-3.5 py-2 text-sm font-medium text-[#fda4af] transition-all hover:border-[#fb7185] hover:bg-[#fb7185] hover:text-[#1a1438] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb7185]"
                                    >
                                        Delete
                                    </button>

                                </div>
                            );
                        })}

                    </div>
                </div>


                {/* Bottom Message */}
                <div className="text-center py-3">
                    <p className="text-[#8f84b8] text-sm">
                        Small progress every day leads to big results.
                        <span className="text-[#5eead4] ml-1">✦</span>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Form;