
import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUser() {
      const token =
        localStorage.getItem('token') ||
        sessionStorage.getItem('token');

      if (!token) return;

      try {
        const response = await fetch(
          'https://localhost:7120/api/test/protected',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) return;

        const data = await response.json();

        setUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
      } catch (error) {
        console.error('Could not load user:', error);
      }
    }

    loadUser();
  }, []);

  return (
    <DashboardLayout>
      <div className="dashboard-content">

        <div className="dashboard-welcome">
          <h1>
            Welcome back{user ? `, ${user.firstName}` : ''}!
          </h1>

          <p>Every sound brings you one step closer.</p>
        </div>

        <section className="dashboard-hero">
          <div className="dashboard-hero-content">
            <span className="dashboard-hero-label">
              YOUR SPEECH JOURNEY
            </span>

            <h2>Let's make every sound count.</h2>

            <p>
              Practice at your own pace. Small steps can
              make a big difference.
            </p>

            <button className="dashboard-hero-button">
              Continue learning
              <span>→</span>
            </button>
          </div>

          <div className="dashboard-hero-decoration">
            ♫
          </div>
        </section>

          
        <section className="dashboard-progress">

          <div className="dashboard-section-heading">
            <h2>Your progress</h2>
            <p>Every small step is a step forward.</p>
          </div>

          <div className="progress-grid">

            <div className="progress-card">
              <div className="progress-icon">
                ✓
              </div>

              <div className="progress-info">
                <span className="progress-value">0</span>
                <span className="progress-label">
                  Completed exercises
                </span>
              </div>
            </div>

            <div className="progress-card">
              <div className="progress-icon">
                ◷
              </div>

              <div className="progress-info">
                <span className="progress-value">0 min</span>
                <span className="progress-label">
                  Practice time
                </span>
              </div>
            </div>

            <div className="progress-card">
              <div className="progress-icon">
                ▦
              </div>

              <div className="progress-info">
                <span className="progress-value">0</span>
                <span className="progress-label">
                  Practice days
                </span>
              </div>
            </div>

          </div>
        </section>



        <section className="dashboard-exercises">

          <div className="dashboard-section-heading">
            <h2>Recommended exercises</h2>
            <p>Discover exercises to support your speech journey.</p>
          </div>

          <div className="exercise-grid">

            <article className="exercise-card">
              <div className="exercise-image">
                <span>◉</span>
              </div>

              <div className="exercise-card-content">
                <span className="exercise-category">
                  ARTICULATION
                </span>

                <h3>Learn the R Sound</h3>

                <p className="exercise-description">
                  Practice the English R sound and learn
                  correct tongue positioning.
                </p>

                <div className="exercise-meta">
                  <span>Beginner</span>
                  <span>5–10 min</span>
                </div>

                <button
                  className="exercise-button"
                  onClick={() => {
                    alert('The R Sound exercise is coming soon!');
                  }}
                >
                  Start exercise →
                </button>
              </div>
            </article>

            <article className="exercise-card">
              <div className="exercise-image listening">
                <span>♫</span>
              </div>

              <div className="exercise-card-content">
                <span className="exercise-category">
                  LISTENING
                </span>

                <h3>Auditory Discrimination</h3>

                <p className="exercise-description">
                  Train your ears to recognize and
                  distinguish similar sounds.
                </p>

                <div className="exercise-meta">
                  <span>Beginner</span>
                  <span>5–10 min</span>
                </div>

                <button
                  className="exercise-button"
                  onClick={() => {
                    alert('Auditory Discrimination is coming soon!');
                  }}
                >
                  Start exercise →
                </button>
              </div>
            </article>

          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;
