import { useEffect, useState } from "react";
import { getDatosAcademicos } from "../../api/services";
import "./Trabajos.css";

const FALLBACK = {
  trabajosPendientes: [
    { titulo: "Tarea de Derivadas", curso: "Cálculo I", vence: "1 de julio de 2026", restantes: "4 días restantes" },
    { titulo: "Ensayo Revolución Industrial", curso: "Historia Universal", vence: "4 de julio de 2026", restantes: "7 días restantes" },
    { titulo: "Proyecto Final - Aplicación Web", curso: "Programación Web", vence: "10 de julio de 2026", restantes: "13 días restantes" },
  ],
  trabajosCompletados: [
    { titulo: "Tarea 3", curso: "Programación Web", vence: "10 de mayo de 2026", nota: 18 },
  ],
};

const keyOf = (t) => `${t.titulo}|${t.curso}`;

function Trabajos() {
  const [data, setData] = useState(FALLBACK);
  const [tab, setTab] = useState("pendientes");
  const [entregados, setEntregados] = useState([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    getDatosAcademicos(1).then((d) => {
      if (d.online) setData(d);
    });
  }, []);

  const entregadosKeys = new Set(entregados.map(keyOf));
  const pendientes = data.trabajosPendientes.filter((t) => !entregadosKeys.has(keyOf(t)));
  const completadas = [
    ...entregados.map((t) => ({ ...t, enRevision: true })),
    ...data.trabajosCompletados,
  ];

  const entregar = (t) => {
    setEntregados((prev) => [...prev, t]);
    setToast(`✓ "${t.titulo}" entregado correctamente`);
    window.clearTimeout(entregar._t);
    entregar._t = window.setTimeout(() => setToast(""), 3000);
  };

  const esPend = tab === "pendientes";
  const lista = esPend ? pendientes : completadas;

  return (
    <div className="trabajos">
      <header className="page-head">
        <h1>Mis Trabajos</h1>
        <p>Gestiona tus tareas y entregas</p>
      </header>

      <div className="tabs">
        <button className={esPend ? "tab active" : "tab"} onClick={() => setTab("pendientes")}>
          Pendientes ({pendientes.length})
        </button>
        <button className={!esPend ? "tab active" : "tab"} onClick={() => setTab("completadas")}>
          Completadas ({completadas.length})
        </button>
      </div>

      <div className="trabajos-list">
        {lista.length === 0 && (
          <p className="vacio">
            {esPend ? "No tienes trabajos pendientes 🎉" : "Aún no hay trabajos completados."}
          </p>
        )}
        {lista.map((t, i) => (
          <div className="trabajo-card" key={keyOf(t) + i}>
            <div className="trabajo-icon">📄</div>
            <div className="trabajo-main">
              <div className="trabajo-top">
                <h3>{t.titulo}</h3>
                {esPend ? (
                  <span className="badge pendiente">Pendiente</span>
                ) : t.enRevision ? (
                  <span className="badge revision">En revisión</span>
                ) : (
                  <span className="badge completado">Completado</span>
                )}
              </div>
              <p className="trabajo-curso">{t.curso}</p>
              <div className="trabajo-meta">
                <span>📅 Vence: {t.vence}</span>
                {esPend ? (
                  <span className="restantes">⏱ {t.restantes}</span>
                ) : t.enRevision ? (
                  <span className="revision-txt">Entregado · pendiente de calificación</span>
                ) : (
                  <span className="nota-inline">Nota: {Number(t.nota).toFixed(0)}/20</span>
                )}
              </div>
              {esPend && (
                <button className="btn-entregar" onClick={() => entregar(t)}>
                  Entregar Trabajo
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default Trabajos;
