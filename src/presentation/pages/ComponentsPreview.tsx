import {Flame, Play, Plus, Timer, Trophy} from "lucide-react";

export function ComponentsPreview() {
    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            <section>
                <h2 className="text-[var(--text-secondary)] text-sm font-bold uppercase tracking-widest mb-4">1. Botones de Acción (CTAs)</h2>
                <div className="space-y-6 bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-subtle)]">

                    <div>
                        <p className="text-xs text-[var(--text-secondary)] mb-2 uppercase tracking-wider font-bold">Primario (Volt)</p>
                        <button className="w-full h-14 bg-[var(--action-primary)] hover:bg-[var(--action-primary-hover)] active:scale-[0.98] transition-all text-[var(--text-inverse)] font-bold text-lg rounded-full flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(212,255,0,0.15)]">
                            <Play size={20} className="fill-[var(--text-inverse)]" />
                            INICIAR ENTRENAMIENTO
                        </button>
                    </div>

                    <div>
                        <p className="text-xs text-[var(--text-secondary)] mb-2 uppercase tracking-wider font-bold">Destructivo (Peligro)</p>
                        <button className="w-full h-14 bg-[var(--bg-base)] border-2 border-[var(--feedback-danger)] text-[var(--text-primary)] font-bold text-sm rounded-full active:scale-[0.98] transition-colors shadow-[0_0_15px_rgba(255,23,68,0.15)] hover:bg-[var(--feedback-danger)]">
                            TERMINAR RUTINA
                        </button>
                    </div>

                    <div>
                        <p className="text-xs text-[var(--text-secondary)] mb-2 uppercase tracking-wider font-bold">Secundario (Fantasma / Añadir)</p>
                        <button className="w-full py-4 text-[var(--text-secondary)] font-semibold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:text-[var(--text-primary)] transition-colors border border-dashed border-[var(--border-subtle)] rounded-xl hover:border-[var(--text-secondary)]">
                            <Plus size={18} /> AÑADIR SERIE
                        </button>
                    </div>

                    <div>
                        <p className="text-xs text-[var(--text-secondary)] mb-2 uppercase tracking-wider font-bold">Deshabilitado</p>
                        <button className="w-full h-14 bg-[var(--border-subtle)] text-[var(--text-secondary)] font-bold text-lg rounded-full cursor-not-allowed flex items-center justify-center gap-2 opacity-50">
                            COMPLETAR (DESHABILITADO)
                        </button>
                    </div>

                </div>
            </section>

            <section>
                <h2 className="text-[var(--text-secondary)] text-sm font-bold uppercase tracking-widest mb-4">2. Floating Action Buttons (FABs)</h2>
                <div className="flex gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <button className="w-16 h-16 bg-[var(--action-primary)] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,255,0,0.2)] hover:scale-105 active:scale-95 transition-all">
                            <Timer size={28} className="text-[var(--text-inverse)]" />
                        </button>
                        <span className="text-xs text-[var(--text-secondary)] font-medium uppercase">Primario</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <button className="w-16 h-16 bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                            <Plus size={28} className="text-[var(--text-primary)]" />
                        </button>
                        <span className="text-xs text-[var(--text-secondary)] font-medium uppercase">Secundario</span>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-[var(--text-secondary)] text-sm font-bold uppercase tracking-widest mb-4">4. Badges y Banners</h2>
                <div className="space-y-4">
                    <div className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl p-3 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Trophy size={18} className="text-[var(--action-primary)]" />
                            <span className="text-sm font-medium text-[var(--text-secondary)]">Récord Personal (PR)</span>
                        </div>
                        <span className="font-bold text-[var(--text-primary)]">110 kg x 5</span>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex items-center gap-1.5 bg-[var(--bg-base)] border border-[var(--border-subtle)] px-3 py-1.5 rounded-lg">
                            <Timer size={14} className="text-[var(--action-primary)]" />
                            <span className="text-sm font-medium text-[var(--text-primary)]">60 min</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-[var(--bg-base)] border border-[var(--border-subtle)] px-3 py-1.5 rounded-lg">
                            <Flame size={14} className="text-[var(--action-secondary)]" />
                            <span className="text-sm font-medium text-[var(--text-primary)]">520 kcal</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}