
const Header = () => {
    return (
        <header className="flex items-center justify-between px-4 py-2 border-b bg-zinc-950" >
            <h1 className="text-lg font-semibold text-amber-600">
                Image Caption Tool
            </h1>

            <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 truncate max-w-[240px]">
                    Prompt: concise caption
                </span>

                <button className="px-3 py-1.5 text-sm rounded-md border hover:bg-slate-100">
                    Edit config
                </button>
            </div>
        </header >
    )
}

export default Header