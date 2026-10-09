import React, { useState, useEffect, useCallback } from 'react';
import { 
    Users, GraduationCap, BookOpen, FileText, TrendingUp, Shield, 
    CheckCircle, UserPlus, Edit2, Trash2, Link as LinkIcon, Book, 
    LayoutDashboard, LogOut, Menu, X, CheckSquare, XCircle, CalendarDays, ClipboardList
} from 'lucide-react';

const initialAlunos = [
    { id: 1, nome: "João Silva", cpf: "111.222.333-44", email: "joao@email.com", telefone: "(11) 9999-8888", endereco: "Rua A, 100", status: "Ativo" },
    { id: 2, nome: "Maria Oliveira", cpf: "222.333.444-55", email: "maria@email.com", telefone: "(11) 7777-6666", endereco: "Av. Brasil, 500", status: "Ativo" },
];

const initialProfessores = [
    { id: 1, nome: "Carlos Mendes", cpf: "333.444.555-66", especialidade: "Programação Web", email: "carlos@escola.com", telefone: "(11) 91111-2222", status: "Ativo" },
    { id: 2, nome: "Ana Costa", cpf: "444.555.666-77", especialidade: "Banco de Dados", email: "ana@escola.com", telefone: "(11) 92222-3333", status: "Ativo" }
];

const initialCursos = [
    { id: 1, nome: "Lógica de Programação", cargaHoraria: 40, valor: 250.00, prereqId: null, status: "Ativo" },
    { id: 2, nome: "Desenvolvimento React", cargaHoraria: 60, valor: 450.00, prereqId: 1, status: "Ativo" },
];

const initialProfessorCursos = [
    { id: 1, professorId: 1, cursoId: 1, dataHabilitacao: "2025-01-15" },
    { id: 2, professorId: 1, cursoId: 2, dataHabilitacao: "2025-02-01" },
];

const initialTurmas = [
    { id: 1, cursoId: 1, professorId: 1, horario: "Seg/Qua 19:00", dataInicio: "2026-02-01", dataFim: "2026-04-01", capacidade: 20 },
    { id: 2, cursoId: 2, professorId: 1, horario: "Ter/Qui 19:00", dataInicio: "2026-02-05", dataFim: "2026-05-01", capacidade: 15 }
];

const initialMatriculas = [
    { id: 1, alunoId: 1, turmaId: 1, data: "2026-02-01", status: "Ativa" }
];

const initialPagamentos = [
    { id: 1, matriculaId: 1, valor: 250.00, vencimento: "2026-03-05", status: "Pago", formaPagamento: "PIX", dataPagamento: "2026-03-02" }
];

const MarioLoading = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [showCoin, setShowCoin] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 2000); 
                    return 100;
                }
                return prev + 1.5; 
            });
        }, 60);
        return () => clearInterval(timer);
    }, [onComplete]);

    const handleJump = useCallback(() => {
        if (isJumping || progress >= 100) return;
        setIsJumping(true);
        setTimeout(() => {
            setShowCoin(true);
            setProgress(p => Math.min(p + 15, 100)); 
            setTimeout(() => setShowCoin(false), 300);
        }, 150);
        setTimeout(() => setIsJumping(false), 300);
    }, [isJumping, progress]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                handleJump();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleJump]);

    return (
        <div className="fixed inset-0 bg-sky-300 flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none" onClick={handleJump}>
            <div className="absolute top-10 text-white font-bold text-2xl tracking-widest drop-shadow-md text-center">
                <p>CARREGANDO SISTEMA</p>
                <p className="text-sm mt-2 font-normal opacity-80">Pressione ESPAÇO para acelerar!</p>
            </div>
            <div className="relative w-full max-w-2xl h-64 border-b-8 border-green-600 bg-sky-300">
                <div className="absolute top-8 left-10 w-16 h-8 bg-white rounded-full opacity-80"></div>
                <div className={`absolute left-1/2 -translate-x-1/2 w-6 h-8 bg-yellow-300 rounded-full border-2 border-yellow-500 transition-all duration-200 z-10 flex items-center justify-center text-yellow-600 font-bold text-xs ${showCoin ? 'bottom-40 opacity-100 scale-100' : 'bottom-32 opacity-0 scale-50'}`}>$</div>
                <div className={`absolute bottom-32 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-700 border-4 border-amber-900 rounded flex items-center justify-center shadow-lg transition-transform ${showCoin ? '-translate-y-1' : ''}`}><span className="text-amber-200 font-bold text-xl">?</span></div>
                <div className={`absolute left-1/2 -translate-x-1/2 w-10 h-10 transition-all duration-150 ease-out z-20 flex flex-col items-center justify-end ${isJumping ? 'bottom-20' : 'bottom-0'}`}>
                    <div className="w-8 h-4 bg-red-600 rounded-t-lg"></div>
                    <div className="w-6 h-4 bg-yellow-200 rounded-sm flex justify-center items-start">
                        <div className="w-4 h-1 bg-amber-900 mt-1 opacity-50"></div>
                    </div>
                    <div className="w-8 h-4 bg-blue-600 rounded-sm"></div>
                </div>
            </div>
            <div className="w-full h-32 bg-green-500 absolute bottom-0 border-t-4 border-green-400">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-md bg-green-800 rounded-full h-6 border-2 border-white shadow-inner overflow-hidden">
                    <div className="bg-yellow-400 h-full transition-all duration-100 flex items-center justify-end pr-2 font-bold text-xs text-yellow-900" style={{ width: `${progress}%` }}>
                        {Math.floor(progress)}%
                    </div>
                </div>
            </div>
        </div>
    );
};

const Notification = ({ message, type, onClose }) => {
    if (!message) return null;
    const bg = type === 'error' ? 'bg-red-500' : 'bg-emerald-500';
    const Icon = type === 'error' ? XCircle : CheckSquare;
    return (
        <div className={`fixed top-4 right-4 z-50 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 ${bg} animate-in fade-in slide-in-from-top-5`}>
            <Icon size={20} />
            <span className="font-medium">{message}</span>
            <button onClick={onClose} className="ml-4 text-white/80 hover:text-white">&times;</button>
        </div>
    );
};

const Card = ({ title, value, icon: Icon, color }) => (
    <div className="p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 bg-white hover:shadow-md transition-shadow">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${color}`}><Icon size={24} /></div>
        <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
    </div>
);

const ViewDashboard = ({ alunos, professores, cursos, turmas, matriculas, pagamentos }) => {
    const totalRecebido = pagamentos.filter(p => p.status === 'Pago').reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
    return (
        <div className="animate-in fade-in space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                <Card title="Alunos" value={alunos.length} icon={Users} color="bg-blue-500" />
                <Card title="Professores" value={professores.length} icon={GraduationCap} color="bg-purple-500" />
                <Card title="Turmas Abertas" value={turmas.length} icon={CalendarDays} color="bg-orange-500" />
                <Card title="Matrículas" value={matriculas.length} icon={ClipboardList} color="bg-emerald-500" />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2"><TrendingUp className="text-emerald-600" size={20} /> Financeiro Básico</h3>
                <div className="p-4 bg-emerald-50 rounded-lg flex justify-between items-center border border-emerald-100">
                    <span className="text-emerald-800 font-medium">Receita Total</span>
                    <span className="text-xl font-bold text-emerald-700">R$ {totalRecebido.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

const ViewAlunos = ({ alunos, setAlunos, notify }) => {
    const [form, setForm] = useState({ nome: '', cpf: '', email: '', telefone: '', endereco: '', status: 'Ativo' });
    const handleSubmit = (e) => {
        e.preventDefault();
        setAlunos([...alunos, { id: Date.now(), ...form }]);
        notify("Aluno cadastrado com sucesso!", "success");
        setForm({ nome: '', cpf: '', email: '', telefone: '', endereco: '', status: 'Ativo' });
    };
    return (
        <div className="animate-in fade-in flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><UserPlus className="text-blue-600" size={20}/> Cadastrar Aluno</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Nome" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" value={form.nome} onChange={e=>setForm({...form, nome: e.target.value})} required/>
                    <input type="text" placeholder="CPF" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" value={form.cpf} onChange={e=>setForm({...form, cpf: e.target.value})} required/>
                    <button type="submit" className="w-full bg-blue-600 text-white p-2.5 rounded-lg font-medium hover:bg-blue-700">Salvar Aluno</button>
                </form>
            </div>
            <div className="flex-[2] bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <h3 className="text-lg font-bold mb-4">Alunos</h3>
                <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead><tr className="bg-gray-50"><th className="p-3">ID</th><th className="p-3">Nome</th><th className="p-3">CPF</th><th className="p-3">Ações</th></tr></thead>
                    <tbody>
                        {alunos.map(a => (
                            <tr key={a.id} className="border-b border-gray-50"><td className="p-3">#{a.id}</td><td className="p-3">{a.nome}</td><td className="p-3">{a.cpf}</td>
                            <td className="p-3"><button onClick={() => setAlunos(alunos.filter(x => x.id !== a.id))} className="text-red-500"><Trash2 size={16}/></button></td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ViewProfessores = ({ professores, setProfessores, notify }) => {
    const [form, setForm] = useState({ nome: '', cpf: '', especialidade: '', email: '', telefone: '', status: 'Ativo' });
    const handleSubmit = (e) => {
        e.preventDefault();
        setProfessores([...professores, { id: Date.now(), ...form }]);
        notify("Professor cadastrado com sucesso!", "success");
        setForm({ nome: '', cpf: '', especialidade: '', email: '', telefone: '', status: 'Ativo' });
    };
    return (
        <div className="animate-in fade-in flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><GraduationCap className="text-purple-600" size={20}/> Cadastrar Professor</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Nome" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" value={form.nome} onChange={e=>setForm({...form, nome: e.target.value})} required/>
                    <input type="text" placeholder="Especialidade" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" value={form.especialidade} onChange={e=>setForm({...form, especialidade: e.target.value})} required/>
                    <button type="submit" className="w-full bg-purple-600 text-white p-2.5 rounded-lg font-medium hover:bg-purple-700">Salvar Professor</button>
                </form>
            </div>
            <div className="flex-[2] bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-4">Professores</h3>
                <table className="w-full text-left border-collapse">
                    <thead><tr className="bg-gray-50"><th className="p-3">Nome</th><th className="p-3">Especialidade</th><th className="p-3">Ações</th></tr></thead>
                    <tbody>
                        {professores.map(p => (
                            <tr key={p.id} className="border-b border-gray-50"><td className="p-3">{p.nome}</td><td className="p-3">{p.especialidade}</td>
                            <td className="p-3"><button onClick={() => setProfessores(professores.filter(x => x.id !== p.id))} className="text-red-500"><Trash2 size={16}/></button></td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ViewCursos = ({ cursos, setCursos, notify }) => {
    const [form, setForm] = useState({ nome: '', cargaHoraria: '', valor: '', prereqId: '', status: 'Ativo' });
    const handleSubmit = (e) => {
        e.preventDefault();
        setCursos([...cursos, { id: Date.now(), ...form }]);
        notify("Curso cadastrado com sucesso!", "success");
        setForm({ nome: '', cargaHoraria: '', valor: '', prereqId: '', status: 'Ativo' });
    };
    return (
        <div className="animate-in fade-in flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Book className="text-green-600" size={20}/> Cadastrar Curso</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Nome" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" value={form.nome} onChange={e=>setForm({...form, nome: e.target.value})} required/>
                    <input type="number" placeholder="Valor R$" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" value={form.valor} onChange={e=>setForm({...form, valor: e.target.value})} required/>
                    <button type="submit" className="w-full bg-green-600 text-white p-2.5 rounded-lg font-medium hover:bg-green-700">Salvar Curso</button>
                </form>
            </div>
            <div className="flex-[2] bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-4">Cursos</h3>
                <table className="w-full text-left border-collapse">
                    <thead><tr className="bg-gray-50"><th className="p-3">Nome</th><th className="p-3">Valor</th><th className="p-3">Ações</th></tr></thead>
                    <tbody>
                        {cursos.map(c => (
                            <tr key={c.id} className="border-b border-gray-50"><td className="p-3">{c.nome}</td><td className="p-3">R$ {parseFloat(c.valor).toFixed(2)}</td>
                            <td className="p-3"><button onClick={() => setCursos(cursos.filter(x => x.id !== c.id))} className="text-red-500"><Trash2 size={16}/></button></td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ViewTurmas = ({ turmas, setTurmas, cursos, professores, professorCursos, notify }) => {
    const [form, setForm] = useState({ cursoId: '', professorId: '', horario: '', dataInicio: '', dataFim: '', capacidade: '' });
    
    // Filter professors based on the selected course
    const availableProfessors = professores.filter(p => 
        professorCursos.some(pc => pc.professorId === p.id && pc.cursoId === Number(form.cursoId))
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setTurmas([...turmas, { id: Date.now(), ...form, cursoId: Number(form.cursoId), professorId: Number(form.professorId), capacidade: Number(form.capacidade) }]);
        notify("Turma criada com sucesso!", "success");
        setForm({ cursoId: '', professorId: '', horario: '', dataInicio: '', dataFim: '', capacidade: '' });
    };

    return (
        <div className="animate-in fade-in flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><CalendarDays className="text-orange-600" size={20}/> Nova Turma</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" value={form.cursoId} onChange={e=>setForm({...form, cursoId: e.target.value})} required>
                        <option value="">Selecione o Curso...</option>
                        {cursos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                    </select>
                    <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" value={form.professorId} onChange={e=>setForm({...form, professorId: e.target.value})} required disabled={!form.cursoId}>
                        <option value="">Selecione o Professor Habilitado...</option>
                        {availableProfessors.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                    </select>
                    <input type="text" placeholder="Horário (ex: Seg/Qua 19h)" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" value={form.horario} onChange={e=>setForm({...form, horario: e.target.value})} required/>
                    <div className="flex gap-2">
                        <input type="date" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" value={form.dataInicio} onChange={e=>setForm({...form, dataInicio: e.target.value})} required title="Data Início"/>
                        <input type="date" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" value={form.dataFim} onChange={e=>setForm({...form, dataFim: e.target.value})} required title="Data Fim"/>
                    </div>
                    <input type="number" placeholder="Capacidade (Vagas)" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" value={form.capacidade} onChange={e=>setForm({...form, capacidade: e.target.value})} required/>
                    <button type="submit" className="w-full bg-orange-600 text-white p-2.5 rounded-lg font-medium hover:bg-orange-700">Abrir Turma</button>
                </form>
            </div>
            <div className="flex-[2] bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <h3 className="text-lg font-bold mb-4">Turmas Ativas</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead><tr className="bg-gray-50"><th className="p-3">Curso</th><th className="p-3">Professor</th><th className="p-3">Horário</th><th className="p-3">Vagas</th><th className="p-3">Ações</th></tr></thead>
                        <tbody>
                            {turmas.map(t => {
                                const curso = cursos.find(c => c.id === t.cursoId);
                                const prof = professores.find(p => p.id === t.professorId);
                                return (
                                    <tr key={t.id} className="border-b border-gray-50">
                                        <td className="p-3 font-medium">{curso?.nome}</td>
                                        <td className="p-3 text-gray-600">{prof?.nome}</td>
                                        <td className="p-3 text-sm">{t.horario}</td>
                                        <td className="p-3">{t.capacidade}</td>
                                        <td className="p-3"><button onClick={() => setTurmas(turmas.filter(x => x.id !== t.id))} className="text-red-500"><Trash2 size={16}/></button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const ViewMatriculas = ({ matriculas, setMatriculas, alunos, turmas, cursos, notify }) => {
    const [form, setForm] = useState({ alunoId: '', turmaId: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        const turmaId = Number(form.turmaId);
        const ocupadas = matriculas.filter(m => m.turmaId === turmaId).length;
        const turma = turmas.find(t => t.id === turmaId);
        
        if (ocupadas >= turma?.capacidade) {
            notify("Turma sem vagas disponíveis!", "error");
            return;
        }

        setMatriculas([...matriculas, { id: Date.now(), ...form, alunoId: Number(form.alunoId), turmaId, data: new Date().toISOString().split('T')[0], status: 'Ativa' }]);
        notify("Matrícula efetuada com sucesso!", "success");
        setForm({ alunoId: '', turmaId: '' });
    };

    return (
        <div className="animate-in fade-in flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><ClipboardList className="text-emerald-600" size={20}/> Nova Matrícula</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" value={form.alunoId} onChange={e=>setForm({...form, alunoId: e.target.value})} required>
                        <option value="">Selecione o Aluno...</option>
                        {alunos.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}
                    </select>
                    <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" value={form.turmaId} onChange={e=>setForm({...form, turmaId: e.target.value})} required>
                        <option value="">Selecione a Turma...</option>
                        {turmas.map(t => {
                            const c = cursos.find(c => c.id === t.cursoId);
                            return <option key={t.id} value={t.id}>{c?.nome} - {t.horario}</option>
                        })}
                    </select>
                    <button type="submit" className="w-full bg-emerald-600 text-white p-2.5 rounded-lg font-medium hover:bg-emerald-700">Matricular Aluno</button>
                </form>
            </div>
            <div className="flex-[2] bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <h3 className="text-lg font-bold mb-4">Alunos Matriculados</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead><tr className="bg-gray-50"><th className="p-3">Aluno</th><th className="p-3">Turma / Curso</th><th className="p-3">Data</th><th className="p-3">Ações</th></tr></thead>
                        <tbody>
                            {matriculas.map(m => {
                                const aluno = alunos.find(a => a.id === m.alunoId);
                                const turma = turmas.find(t => t.id === m.turmaId);
                                const curso = cursos.find(c => c.id === turma?.cursoId);
                                return (
                                    <tr key={m.id} className="border-b border-gray-50">
                                        <td className="p-3 font-medium">{aluno?.nome}</td>
                                        <td className="p-3 text-sm">{curso?.nome} ({turma?.horario})</td>
                                        <td className="p-3 text-sm text-gray-500">{new Date(m.data).toLocaleDateString('pt-BR')}</td>
                                        <td className="p-3"><button onClick={() => setMatriculas(matriculas.filter(x => x.id !== m.id))} className="text-red-500"><Trash2 size={16}/></button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const [alunos, setAlunos] = useState(initialAlunos);
    const [professores, setProfessores] = useState(initialProfessores);
    const [cursos, setCursos] = useState(initialCursos);
    const [professorCursos, setProfessorCursos] = useState(initialProfessorCursos);
    const [turmas, setTurmas] = useState(initialTurmas);
    const [matriculas, setMatriculas] = useState(initialMatriculas);
    const [pagamentos, setPagamentos] = useState(initialPagamentos);

    const [notification, setNotification] = useState({ message: '', type: '' });
    
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: '', type: '' }), 4000);
    };

    if (isLoading) return <MarioLoading onComplete={() => setIsLoading(false)} />;

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'alunos', label: 'Alunos', icon: Users },
        { id: 'professores', label: 'Professores', icon: GraduationCap },
        { id: 'cursos', label: 'Cursos', icon: BookOpen },
        { id: 'turmas', label: 'Turmas', icon: CalendarDays },
        { id: 'matriculas', label: 'Matrículas', icon: ClipboardList }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <ViewDashboard alunos={alunos} professores={professores} cursos={cursos} turmas={turmas} matriculas={matriculas} pagamentos={pagamentos} />;
            case 'alunos': return <ViewAlunos alunos={alunos} setAlunos={setAlunos} notify={showNotification} />;
            case 'professores': return <ViewProfessores professores={professores} setProfessores={setProfessores} notify={showNotification} />;
            case 'cursos': return <ViewCursos cursos={cursos} setCursos={setCursos} notify={showNotification} />;
            case 'turmas': return <ViewTurmas turmas={turmas} setTurmas={setTurmas} cursos={cursos} professores={professores} professorCursos={professorCursos} notify={showNotification} />;
            case 'matriculas': return <ViewMatriculas matriculas={matriculas} setMatriculas={setMatriculas} alunos={alunos} turmas={turmas} cursos={cursos} notify={showNotification} />;
            default: return <ViewDashboard alunos={alunos} professores={professores} cursos={cursos} turmas={turmas} matriculas={matriculas} pagamentos={pagamentos} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
            <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />

            <div className="md:hidden bg-indigo-900 text-white p-4 flex justify-between items-center z-20 shadow-md">
                <div className="flex items-center gap-2 font-bold text-xl"><BookOpen size={24} /> Escola ERP</div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1">{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
            </div>

            <aside className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 z-10 w-64 bg-indigo-900 text-white flex flex-col transition-transform duration-200 ease-in-out shadow-xl`}>
                <div className="p-6 border-b border-indigo-800 hidden md:flex items-center gap-3">
                    <div className="bg-indigo-600 p-2 rounded-lg"><BookOpen size={24} className="text-white" /></div>
                    <span className="font-bold text-xl tracking-wide">Escola ERP</span>
                </div>
                <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                    {navItems.map(item => (
                        <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${activeTab === item.id ? 'bg-indigo-700 text-white shadow-inner' : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'}`}>
                            <item.icon size={20} />{item.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {isMobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-0 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />}

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="bg-white p-6 shadow-sm border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 capitalize">{navItems.find(i => i.id === activeTab)?.label}</h1>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/50">
                    <div className="max-w-7xl mx-auto">{renderContent()}</div>
                </div>
            </main>
        </div>
    );
};

export default App;