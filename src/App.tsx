import React, { useState } from 'react';
import './App.css';

// --- DATOS DE PRUEBA ---
const aprendiz = {
  nombre: 'Santiago Castillo',
  programa: 'Analisis y Desarrollo software',
  centro: 'CIMM - Duitama',
  carnet: '4941962',
  ficha: '3232476',
  saldo: 10300,
};

const movimientos = [
  { id: 1, lugar: 'Cafetería bloque C', hora: 'Hoy 12:14', monto: -8500 },
  { id: 2, lugar: 'Recarga PSE',        hora: 'Ayer 08:00', monto: 50000 },
  { id: 3, lugar: 'Fotocopias bloque A',hora: 'Lun 9:30',  monto: -2000 },
  { id: 4, lugar: 'Cafetería bloque A', hora: 'Lun 7:50',  monto: -6500 },
  { id: 5, lugar: 'Recarga PSE',        hora: 'Dom 10:00', monto: 30000 },
];

// --- UTILIDAD ---
const formatCOP = (n: number) =>
  '$' + Math.abs(n).toLocaleString('es-CO');

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [pantalla, setPantalla] = useState<'inicio' | 'carnet' | 'historial'>('inicio');

  return (
    <div className="app-shell">
      {/* Simulación de celular */}
      <div className="phone-frame">
        <div className="phone-notch" />

        {pantalla === 'inicio'   && <PantallaInicio   ir={setPantalla} />}
        {pantalla === 'carnet'   && <PantallaCarnet   ir={setPantalla} />}
        {pantalla === 'historial'&& <PantallaHistorial ir={setPantalla} />}

        {/* Barra de navegación inferior */}
        <nav className="bottom-nav">
          <button
            className={`nav-btn ${pantalla === 'inicio' ? 'active' : ''}`}
            onClick={() => setPantalla('inicio')}
          >
            <IconHome />
            <span>Inicio</span>
          </button>
          <button
            className={`nav-btn ${pantalla === 'carnet' ? 'active' : ''}`}
            onClick={() => setPantalla('carnet')}
          >
            <IconCard />
            <span>Carnet</span>
          </button>
          <button
            className={`nav-btn ${pantalla === 'historial' ? 'active' : ''}`}
            onClick={() => setPantalla('historial')}
          >
            <IconHistory />
            <span>Historial</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

// ─── PANTALLA 1: INICIO ───────────────────────────────────────────────────────
function PantallaInicio({ ir }: { ir: (p: any) => void }) {
  return (
    <div className="screen">
      {/* Header */}
      <div className="screen-header">
        <div>
          <p className="header-saludo">Bienvenido,</p>
          <p className="header-nombre">{aprendiz.nombre}</p>
        </div>
        <div className="avatar">{aprendiz.nombre.split(' ').map(n => n[0]).join('')}</div>
      </div>

      {/* Tarjeta de saldo */}
      <div className="saldo-card">
        <p className="saldo-label">Saldo disponible</p>
        <p className="saldo-monto">{formatCOP(aprendiz.saldo)}</p>
        <p className="saldo-carnet">Carnet · {aprendiz.carnet}</p>
        <div className="saldo-pill">Activo</div>
      </div>

      {/* Acciones rápidas */}
      <div className="acciones">
        <button className="accion-btn">
          <IconPlus />
          <span>Recargar</span>
        </button>
        <button className="accion-btn" onClick={() => ir('carnet')}>
          <IconQr />
          <span>Pagar QR</span>
        </button>
        <button className="accion-btn" onClick={() => ir('historial')}>
          <IconHistory />
          <span>Historial</span>
        </button>
      </div>

      {/* Últimos movimientos */}
      <div className="section-header">
        <span className="section-title">Últimos movimientos</span>
        <button className="ver-todo" onClick={() => ir('historial')}>Ver todo</button>
      </div>

      <div className="movimientos-lista">
        {movimientos.slice(0, 3).map(m => (
          <div className="movimiento-row" key={m.id}>
            <div className={`mov-icono ${m.monto > 0 ? 'ingreso' : 'gasto'}`}>
              {m.monto > 0 ? <IconPlus /> : <IconMinus />}
            </div>
            <div className="mov-info">
              <p className="mov-lugar">{m.lugar}</p>
              <p className="mov-hora">{m.hora}</p>
            </div>
            <p className={`mov-monto ${m.monto > 0 ? 'pos' : 'neg'}`}>
              {m.monto > 0 ? '+' : '-'}{formatCOP(m.monto)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PANTALLA 2: CARNET / QR ──────────────────────────────────────────────────
function PantallaCarnet({ ir }: { ir: (p: any) => void }) {
  return (
    <div className="screen">
      <div className="screen-header">
        <p className="header-nombre">Mi carnet digital</p>
      </div>

      <div className="carnet-card">
        <div className="carnet-top">
          <div className="sena-logo">SENA</div>
          <div className="carnet-tipo">Aprendiz</div>
        </div>
        <div className="avatar large">{aprendiz.nombre.split(' ').map(n => n[0]).join('')}</div>
        <p className="carnet-nombre">{aprendiz.nombre}</p>
        <p className="carnet-programa">{aprendiz.programa}</p>
        <p className="carnet-ficha">Ficha: {aprendiz.ficha}</p>
      </div>

      {/* QR de pago */}
      <div className="qr-zona">
        <p className="qr-label">Código de pago</p>
        <div className="qr-box">
          <QrSimulado />
        </div>
        <p className="qr-id">{aprendiz.carnet}</p>
        <p className="qr-timer">Se renueva automáticamente cada 60 s</p>
      </div>

      <div className="saldo-mini">
        <span className="saldo-mini-label">Saldo disponible</span>
        <span className="saldo-mini-valor">{formatCOP(aprendiz.saldo)}</span>
      </div>
    </div>
  );
}

// ─── PANTALLA 3: HISTORIAL ────────────────────────────────────────────────────
function PantallaHistorial({ ir }: { ir: (p: any) => void }) {
  return (
    <div className="screen">
      <div className="screen-header">
        <p className="header-nombre">Historial</p>
      </div>

      {/* Resumen */}
      <div className="resumen-row">
        <div className="resumen-card ingreso">
          <p className="res-label">Ingresos</p>
          <p className="res-valor">+{formatCOP(80000)}</p>
        </div>
        <div className="resumen-card gasto">
          <p className="res-label">Gastos</p>
          <p className="res-valor">-{formatCOP(17000)}</p>
        </div>
      </div>

      {/* Lista completa */}
      <div className="movimientos-lista">
        {movimientos.map(m => (
          <div className="movimiento-row" key={m.id}>
            <div className={`mov-icono ${m.monto > 0 ? 'ingreso' : 'gasto'}`}>
              {m.monto > 0 ? <IconPlus /> : <IconMinus />}
            </div>
            <div className="mov-info">
              <p className="mov-lugar">{m.lugar}</p>
              <p className="mov-hora">{m.hora}</p>
            </div>
            <p className={`mov-monto ${m.monto > 0 ? 'pos' : 'neg'}`}>
              {m.monto > 0 ? '+' : '-'}{formatCOP(m.monto)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── QR SIMULADO ─────────────────────────────────────────────────────────────
function QrSimulado() {
  const pattern = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,1,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,0,1,1,0,1,0,1,1,0,1,1],
    [0,1,0,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0],
    [1,1,1,0,1,1,1,1,0,1,1,0,1,1,1,0,1,1,1],
    [0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,0,0,1,0],
    [1,1,1,1,1,1,1,0,0,1,0,0,1,0,1,1,0,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,1,0,1,0,1,1,0,0],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,0,1,0,0,1,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,0,1,1,0,1,0,0],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,1,0,1,1,1,0],
    [1,0,0,0,0,0,1,0,1,1,0,0,0,0,1,0,0,0,1],
    [1,1,1,1,1,1,1,0,0,0,1,1,0,1,0,1,1,0,1],
  ];
  return (
    <div className="qr-grid">
      {pattern.map((fila, i) =>
        fila.map((cel, j) => (
          <div key={`${i}-${j}`} className={`qr-cel ${cel ? 'on' : 'off'}`} />
        ))
      )}
    </div>
  );
}

// ─── ÍCONOS SVG ──────────────────────────────────────────────────────────────
const IconHome = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconCard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
);
const IconHistory = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="12 8 12 12 14 14"/><path d="M3.05 11a9 9 0 1 0 .5-4H1"/>
    <polyline points="1 3 1 7 5 7"/>
  </svg>
);
const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconMinus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconQr = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><line x1="14" y1="14" x2="14" y2="14"/>
    <line x1="21" y1="14" x2="21" y2="14"/><line x1="14" y1="21" x2="14" y2="21"/>
    <line x1="21" y1="21" x2="21" y2="21"/><line x1="17.5" y1="14" x2="17.5" y2="17.5"/>
    <line x1="14" y1="17.5" x2="17.5" y2="17.5"/>
  </svg>
);