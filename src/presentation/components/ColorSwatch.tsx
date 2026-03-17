export const ColorSwatch = ({ name, hex, bg, textColor = "text-[var(--text-primary)]", border = "" }) => {
    return (
        <div className="flex flex-col">
            <div className={`h-24 w-full rounded-2xl ${bg} ${border} flex items-end p-3`}>
                <span className={`font-mono text-xs font-bold ${textColor}`}>{hex}</span>
            </div>
            <span className="text-sm font-medium mt-2 text-[var(--text-primary)]">{name}</span>
        </div>
    );
}