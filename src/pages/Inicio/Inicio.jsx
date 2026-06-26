import "./Inicio.css";

function Inicio() {
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
              <strong>18 <small>/20</small></strong>
            </div>

            <div className="grade">
              <div className="grade-icon">📘</div>
              <div>
                <h4>Cálculo I</h4>
                <p>Examen Parcial</p>
              </div>
              <strong>16 <small>/20</small></strong>
            </div>

            <div className="grade">
              <div className="grade-icon">📘</div>
              <div>
                <h4>Historia Universal</h4>
                <p>Ensayo 2</p>
              </div>
              <strong>17 <small>/20</small></strong>
            </div>
          </div>
        </section>

        <button className="chat-btn">💬</button>
      </main>
    </div>
  );
}

export default Inicio;