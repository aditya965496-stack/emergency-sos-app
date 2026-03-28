import { Sun, Moon, LogOut } from 'lucide-react';
import { useColorScheme } from '@dazl/color-scheme/react';
import classNames from 'classnames';
import styles from './top-bar.module.css';

interface TopBarProps {
  isEmergencyActive: boolean;
  onLogout: () => void;
}

export function TopBar({ isEmergencyActive, onLogout }: TopBarProps) {
  const { isDark, setColorScheme } = useColorScheme();

  const toggleTheme = () => setColorScheme(isDark ? 'light' : 'dark');

  return (
    <header className={styles.bar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>SOS</div>
        <div>
          <div className={styles.logoName}>Emergency SOS</div>
          <div className={styles.logoTag}>Safety System</div>
        </div>
      </div>

      <div className={styles.actions}>
        <div className={classNames(styles.statusPill, isEmergencyActive ? styles.emergency : styles.safe)}>
          <span className={styles.dot} />
          {isEmergencyActive ? 'EMERGENCY' : 'SAFE'}
        </div>
        <button className={styles.iconBtn} onClick={toggleTheme} aria-label="Toggle theme" type="button">
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button className={styles.iconBtn} onClick={onLogout} aria-label="Logout" type="button">
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
