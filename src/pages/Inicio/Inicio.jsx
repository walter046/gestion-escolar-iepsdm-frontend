import { useState } from "react";
import axios from "axios";
import "./Inicio.css";

function Inicio() {
  const [chatAbierto, setChatAbierto] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mensajes, setMensajes] = useState([
    {
      tipo: "bot",
      texto: "Hola Juan, soy tu asistente IA. Pregúntame sobre cursos, tareas, notas o asistencia.",
    },
  ]);

  const enviarMensaje = async () => {
    if (!mensaje.trim() || cargando) return;

    const pregunta = mensaje;

    setMensajes((prev) => [...prev, { tipo: "user", texto: pregunta }]);
    setMensaje("");
    setCargando(true);

    try {
      const response = await axios.post("http://localhost:8080/api/chat", {
        alumnoId: 1,
        mensaje: pregunta,
      });

      setMensajes((prev) => [
        ...prev,
        {
          tipo: "bot",
          texto: response.data.respuesta || "No recibí respuesta del servidor.",
        },
      ]);
    } catch (error) {
      setMensajes((prev) => [
        ...prev,
        {
          tipo: "bot",
          texto: "No pude conectarme con el backend. Verifica que Spring Boot esté corriendo y que /api/chat funcione.",
        },
      ]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="inicio-page">
      <aside className="sidebar">
        <div className="brand">
          <h2>Campus Virtual</h2>
          <p>Portal del Estudiante</p>
        </div>

        <nav className="menu">
          <a className="active">🏠 Inicio</a>
          <a>📘 Notas</a>
          <a>📄 Trabajos</a>
          <a>📅 Temas Semanales</a>
        </nav>

        <div className="user-box">
          <div className="avatar">JP</div>
          <div>
            <strong>Juan Pérez</strong>
            <span>Estudiante</span>
          </div>
        </div>
      </aside>

      <main className="content">
        <header className="welcome">
          <h1>Bienvenido de nuevo, Juan</h1>
          <p>Aquí está tu resumen académico</p>
        </header>

        <section className="cards">
          <div className="card">
            <p>Promedio General</p>
            <h3>16.8</h3>
            <span>📈</span>
          </div>

          <div className="card">
            <p>Cursos Activos</p>
            <h3>6</h3>
            <span>📖</span>
          </div>

          <div className="card">
            <p>Trabajos Pendientes</p>
            <h3>3</h3>
            <span>📋</span>
          </div>

          <div className="card">
            <p>Asistencia</p>
            <h3>92%</h3>
            <span>🟣</span>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="panel">
            <div className="panel-header">
              <h2>Próximos Trabajos</h2>
              <button>Ver todos</button>
            </div>

            <div className="task">
              <div className="task-icon">📄</div>
              <div>
                <h4>Ensayo de Historia</h4>
                <p>Historia Universal</p>
                <small>Vence: 29 de mayo</small>
              </div>
              <span className="badge">Pendiente</span>
            </div>

            <div className="task">
              <div className="task-icon">📄</div>
              <div>
                <h4>Proyecto Final de Programación</h4>
                <p>Programación Web</p>
                <small>Vence: 1 de junio</small>
              </div>
              <span className="badge">Pendiente</span>
            </div>

            <div className="task">
              <div className="task-icon">📄</div>
              <div>
                <h4>Tarea de Matemáticas</h4>
                <p>Cálculo I</p>
                <small>Vence: 26 de mayo</small>
              </div>
              <span className="badge">Pendiente</span>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>Calificaciones Recientes</h2>
              <button>Ver todas</button>
            </div>

            <div className="grade">
              <div className="grade-icon">📘</div>
              <div>
                <h4>Programación Web</h4>
                <p>Tarea 3</p>
              </div>
              <strong>
                18 <small>/20</small>
              </strong>
            </div>

            <div className="grade">
              <div className="grade-icon">📘</div>
              <div>
                <h4>Cálculo I</h4>
                <p>Examen Parcial</p>
              </div>
              <strong>
                16 <small>/20</small>
              </strong>
            </div>

            <div className="grade">
              <div className="grade-icon">📘</div>
              <div>
                <h4>Historia Universal</h4>
                <p>Ensayo 2</p>
              </div>
              <strong>
                17 <small>/20</small>
              </strong>
            </div>
          </div>
        </section>

        {chatAbierto && (
          <div className="chat-window">
            <div className="chat-header">
              <div>
                <strong>Asistente IA</strong>
                <p>Campus Virtual</p>
              </div>
              <button onClick={() => setChatAbierto(false)}>×</button>
            </div>

            <div className="chat-body">
              {mensajes.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.tipo}`}>
                  {msg.texto}
                </div>
              ))}

              {cargando && (
                <div className="chat-message bot">Pensando respuesta...</div>
              )}
            </div>

            <div className="chat-input">
              <input
                type="text"
                value={mensaje}
                placeholder="Escribe tu pregunta..."
                onChange={(e) => setMensaje(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
              />
              <button onClick={enviarMensaje} disabled={cargando}>
                Enviar
              </button>
            </div>
          </div>
        )}

        <button className="chat-btn" onClick={() => setChatAbierto(true)}>
          💬
        </button>
      </main>
    </div>
  );
}

export default Inicio;