import {ColorSwatch} from "../components/ColorSwatch.tsx";

export const DesignTokens = () => {

    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            <section>
                <h2 className="text-[var(--text-secondary)] text-sm font-bold uppercase tracking-widest mb-4">Tokens Semánticos</h2>
                <div className="grid grid-cols-2 gap-4">
                    <ColorSwatch name="bg-base" hex="#121212" bg="bg-[var(--bg-base)]" border="border border-[var(--border-subtle)]" />
                    <ColorSwatch name="bg-surface" hex="#1E1E1E" bg="bg-[var(--bg-surface)]" />
                    <ColorSwatch name="action-primary" hex="#D4FF00" bg="bg-[var(--action-primary)]" textColor="text-[var(--text-inverse)]" />
                    <ColorSwatch name="action-secondary" hex="#94A3B8" bg="bg-[var(--action-secondary)]" textColor="text-[var(--text-inverse)]" />
                    <ColorSwatch name="feedback-success" hex="#00E676" bg="bg-[var(--feedback-success)]" textColor="text-[var(--text-inverse)]" />
                    <ColorSwatch name="feedback-danger" hex="#FF1744" bg="bg-[var(--feedback-danger)]" />
                    <ColorSwatch name="text-primary" hex="#FFFFFF" bg="bg-[var(--text-primary)]" textColor="text-[var(--text-inverse)]" />
                    <ColorSwatch name="text-secondary" hex="#A0A0A0" bg="bg-[var(--text-secondary)]" textColor="text-[var(--text-inverse)]" />
                </div>
            </section>

            <section>
                <h2 className="text-[var(--text-secondary)] text-sm font-bold uppercase tracking-widest mb-4">Tipografía</h2>
                <div className="space-y-6 bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-subtle)]/50">
                    <div>
                        <p className="text-[var(--text-secondary)] text-xs mb-1">Display (Barlow Bold, 72px) - Cronómetros</p>
                        <h1 className="font-['Barlow'] font-bold text-7xl tracking-tight leading-none text-[var(--action-primary)]">00:45</h1>
                    </div>
                    <hr className="border-[var(--border-subtle)]" />
                    <div>
                        <p className="text-[var(--text-secondary)] text-xs mb-1">H1 (Inter Bold, 32px) - Títulos de Pantalla</p>
                        <h1 className="font-bold text-3xl">Día de Pierna</h1>
                    </div>
                    <div>
                        <p className="text-[var(--text-secondary)] text-xs mb-1">H2 (Inter SemiBold, 20px) - Títulos de Cards</p>
                        <h2 className="font-semibold text-xl">Sentadilla Libre</h2>
                    </div>
                    <div>
                        <p className="text-[var(--text-secondary)] text-xs mb-1">Body (Inter Regular, 16px) - Descripciones</p>
                        <p className="font-normal text-base text-[var(--text-secondary)]">Mantén la espalda recta y rompe el paralelo. Descansa 90s entre series.</p>
                    </div>
                    <div>
                        <p className="text-[var(--text-secondary)] text-xs mb-1">Labels (Inter Medium, 14px) - Datos y Unidades</p>
                        <p className="font-medium text-sm text-[var(--action-secondary)] tracking-wide uppercase">4 series • 10 reps</p>
                    </div>
                </div>
            </section>
        </div>
    );
}