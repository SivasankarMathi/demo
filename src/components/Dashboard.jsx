import styles from './Dashboard.module.css'

function Dashboard({ user, onLogout }) {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <button onClick={onLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.welcomeSection}>
            <h2 className={styles.welcomeTitle}>Welcome back!</h2>
            <p className={styles.userEmail}>{user.email}</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>✓</div>
            <div className={styles.infoContent}>
              <h3 className={styles.infoTitle}>Successfully Logged In</h3>
              <p className={styles.infoText}>
                You have successfully authenticated with the application.
              </p>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>0</div>
              <div className={styles.statLabel}>Tasks</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>0</div>
              <div className={styles.statLabel}>Projects</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>0</div>
              <div className={styles.statLabel}>Messages</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
